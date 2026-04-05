import React, { useEffect, useMemo, useState } from 'react'
import { ONBOARDING_DEMO_SIGNALS } from '../../data/intelligence.js'
import { ScoreDial } from '../charts/Visuals.jsx'

function DemoTier({ score }) {
  if (score >= 75) return 'Sales-Ready'
  if (score >= 50) return 'Nurture-Ready'
  return 'Early Stage'
}

function PreviewGrid() {
  const cards = [
    ['Intent Score + Tier', 'mini-preview mini-preview--dial'],
    ['Signal Breakdown', 'mini-preview mini-preview--bars'],
    ['Topic Cluster', 'mini-preview mini-preview--donut'],
    ['Sales Recommendation', 'mini-preview mini-preview--copy'],
    ['Attribution Story', 'mini-preview mini-preview--timeline'],
    ['Content Gap', 'mini-preview mini-preview--gap'],
  ]

  return (
    <div className="onboarding-output-grid">
      {cards.map(([label, className]) => (
        <div key={label} className="onboarding-output-card">
          <div className="onboarding-output-icon">◌</div>
          <div className="onboarding-output-label">{label}</div>
          <div className={className}>
            {className.includes('copy') ? 'Call within 24h and reference the pricing journey.' : null}
            {className.includes('gap') ? 'Create: ClickUp vs Jira for Engineering' : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function OnboardingOverlay({ open, onClose, initialStep = 0, initialDemo = [] }) {
  const [step, setStep] = useState(initialStep)
  const [demoSelected, setDemoSelected] = useState(initialDemo)
  const demoScore = useMemo(
    () =>
      ONBOARDING_DEMO_SIGNALS.filter((signal) => demoSelected.includes(signal.id)).reduce(
        (sum, signal) => sum + signal.points,
        0,
      ),
    [demoSelected],
  )

  useEffect(() => {
    if (!open) return undefined
    const handler = (event) => {
      if (event.key === 'ArrowRight') setStep((current) => Math.min(3, current + 1))
      if (event.key === 'ArrowLeft') setStep((current) => Math.max(0, current - 1))
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) setStep(initialStep)
  }, [initialStep, open])

  useEffect(() => {
    if (open) setDemoSelected(initialDemo)
  }, [initialDemo, open])

  if (!open) return null

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-progress-bar">
          <div className="onboarding-progress-fill" style={{ width: `${(step + 1) * 25}%` }} />
        </div>

        <div className={`onboarding-hero ${step === 0 ? 'is-dark' : ''}`}>
          {step === 0 ? <div className="onboarding-score-demo"><ScoreDial score={82} /></div> : null}
        </div>

        <div className="onboarding-body">
          <div className="onboarding-step-meta">
            <span className="onboarding-eyebrow">
              {step === 0
                ? 'ClickUp Content Intelligence'
                : step === 1
                  ? 'The Scoring Engine'
                  : step === 2
                    ? 'What You Get'
                    : 'Ready to score'}
            </span>
            <span className="onboarding-step-counter">Step {step + 1} of 4</span>
          </div>

          {step === 0 ? (
            <>
              <h2 className="onboarding-title">Finally know which contacts are actually ready to buy.</h2>
              <p className="onboarding-copy">
                Most CRMs treat every lead equally. This tool reads the full content consumption pattern — blog posts, video views, template downloads, pricing page visits — and converts those signals into a precise buying intent score with a recommended action for Sales.
              </p>
              <div className="onboarding-value-grid">
                <div className="onboarding-value-card">
                  <div className="onboarding-value-icon">🎯</div>
                  <div className="onboarding-value-label">0–100 intent score</div>
                  <div className="onboarding-value-copy">Based on content signals</div>
                </div>
                <div className="onboarding-value-card">
                  <div className="onboarding-value-icon">⚡</div>
                  <div className="onboarding-value-label">Sales action in seconds</div>
                  <div className="onboarding-value-copy">Specific, personalised</div>
                </div>
                <div className="onboarding-value-card">
                  <div className="onboarding-value-icon">📊</div>
                  <div className="onboarding-value-label">Full attribution story</div>
                  <div className="onboarding-value-copy">Content that drove intent</div>
                </div>
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="onboarding-title">Not all signals are created equal.</h2>
              <p className="onboarding-copy">
                We weight signals based on their proximity to conversion. A pricing page visit is worth 25 points. A blog post read is worth 15. A demo request is worth 35. The engine combines your selected signals with contact context to produce a score the whole team can act on.
              </p>
              <div className="onboarding-demo-label">Click the signals to see how scoring works →</div>
              <div className="onboarding-demo-signals">
                {ONBOARDING_DEMO_SIGNALS.map((signal) => (
                  <button
                    key={signal.id}
                    type="button"
                    className={`onboarding-demo-chip${demoSelected.includes(signal.id) ? ' is-active' : ''}`}
                    onClick={() =>
                      setDemoSelected((current) =>
                        current.includes(signal.id) ? current.filter((item) => item !== signal.id) : [...current, signal.id],
                      )
                    }
                  >
                    {signal.label}
                  </button>
                ))}
              </div>
              <div className="onboarding-mini-dial">
                <ScoreDial score={Math.min(100, demoScore)} />
              </div>
              <div className="onboarding-mini-caption">
                Score updates as you select signals · <strong>{DemoTier(demoScore)}</strong>
              </div>
              <div className="onboarding-tier-list">
                <div className="onboarding-tier-row onboarding-tier-row--hot">
                  <span>Sales-Ready (75+)</span>
                  <span>Route to AE now. Sales call within 24h.</span>
                </div>
                <div className="onboarding-tier-row onboarding-tier-row--warm">
                  <span>Nurture-Ready (50–74)</span>
                  <span>Enroll in topic-matched nurture sequence.</span>
                </div>
                <div className="onboarding-tier-row onboarding-tier-row--cold">
                  <span>Early Stage (0–49)</span>
                  <span>Continue broad content exposure. Not ready.</span>
                </div>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h2 className="onboarding-title">Six outputs from one scoring run.</h2>
              <PreviewGrid />
              <p className="onboarding-footnote">
                Every output is generated in real-time by Gemini using the signal pattern you enter. No templates. No preset outputs. The intelligence is specific to this contact, every time.
              </p>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h2 className="onboarding-title">Score your first contact in 60 seconds.</h2>
              <div className="onboarding-steps">
                <div className="onboarding-step-row">
                  <div className="onboarding-step-number">1</div>
                  <div>
                    <div className="onboarding-step-title">Add contact details</div>
                    <div className="onboarding-step-copy">Name, company, role, and team size give the AI context to personalise the recommendation.</div>
                  </div>
                </div>
                <div className="onboarding-step-row">
                  <div className="onboarding-step-number">2</div>
                  <div>
                    <div className="onboarding-step-title">Select the signals you&apos;ve observed</div>
                    <div className="onboarding-step-copy">Check every content interaction you know about — pages visited, content downloaded, videos watched, emails clicked.</div>
                  </div>
                </div>
                <div className="onboarding-step-row">
                  <div className="onboarding-step-number">3</div>
                  <div>
                    <div className="onboarding-step-title">Click Score and read the report</div>
                    <div className="onboarding-step-copy">The AI returns a full intelligence report in 10–15 seconds. Hot leads route to Sales. Warm leads go to targeted nurture.</div>
                  </div>
                </div>
              </div>
              <div className="onboarding-ui-preview">
                <div className="onboarding-ui-preview-overlay">↑ You&apos;ll see this when you start</div>
              </div>
            </>
          ) : null}

          <div className="onboarding-footer">
            <button type="button" className={`onboarding-link${step === 0 ? ' is-hidden' : ''}`} onClick={() => setStep((current) => Math.max(0, current - 1))}>
              ← Back
            </button>
            <button type="button" className="onboarding-link onboarding-link--muted" onClick={onClose}>
              {step === 3 ? "I'll explore on my own" : 'Skip setup'}
            </button>
            <button
              type="button"
              className="onboarding-cta"
              onClick={() => {
                if (step === 3) onClose()
                else setStep((current) => Math.min(3, current + 1))
              }}
            >
              {step === 0 ? 'Get Started →' : step === 1 ? 'Understood →' : step === 2 ? 'See the dashboard →' : 'Start Scoring →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
