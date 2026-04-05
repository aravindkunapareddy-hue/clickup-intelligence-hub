import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { scoreLead } from '../../api.js'
import { LEAD_PRESETS, PREBUILT_SIGNALS } from '../../data/intelligence.js'

function tierColor(tier) {
  if (tier === 'Hot') return '#dc2626'
  if (tier === 'Warm') return '#2563eb'
  return '#64748b'
}

function BarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{payload[0].payload.signal}</div>
      <div className="chart-tooltip-value">{payload[0].payload.value}</div>
    </div>
  )
}

export default function LeadScorer({ apiKey, presetKey, onPresetChange, onLeadScored, onNavigate }) {
  const [profile, setProfile] = useState(LEAD_PRESETS[presetKey].profile)
  const [toggles, setToggles] = useState(LEAD_PRESETS[presetKey].toggles)
  const [customSignals, setCustomSignals] = useState([])
  const [draftSignal, setDraftSignal] = useState({ label: '', weight: 6 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setProfile(LEAD_PRESETS[presetKey].profile)
    setToggles(LEAD_PRESETS[presetKey].toggles)
    setCustomSignals([])
    setResult(null)
    setError(null)
  }, [presetKey])

  const activeSignals = useMemo(() => {
    const builtin = PREBUILT_SIGNALS.filter((signal) => toggles[signal.id]).map((signal) => ({
      label: signal.label,
      weight: signal.weight,
    }))

    return [...builtin, ...customSignals]
  }, [toggles, customSignals])

  const weightedTotal = activeSignals.reduce((sum, item) => sum + Number(item.weight || 0), 0)

  const signalChartData = result?.signalBreakdown?.map((item, index) => ({
    signal: item.signal,
    value: 100 - index * 12,
  })) || []

  const radialData = result ? [{ name: 'intent', value: result.score, fill: tierColor(result.intentTier) }] : []

  const addCustomSignal = () => {
    if (!draftSignal.label.trim()) return

    setCustomSignals((current) => [...current, { label: draftSignal.label.trim(), weight: Number(draftSignal.weight) || 0 }])
    setDraftSignal({ label: '', weight: 6 })
  }

  const handleScore = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await scoreLead(
        {
          name: `${profile.name}, ${profile.company}`,
          seniority: profile.seniority,
          recency: profile.recency,
          topicCluster: profile.topicCluster,
          activeSignals: activeSignals.map((signal) => `${signal.label} (+${signal.weight})`),
        },
        apiKey || 'demo',
      )

      setResult(response)
      onLeadScored(response, profile)
    } catch (err) {
      setError(err.message || 'Unable to score this contact right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="view-frame">
      <section className="hero-surface hero-surface--compact">
        <div className="hero-badge-row">
          <span className="eyebrow eyebrow--blue">Persona scoring</span>
          <span className="eyebrow">ICP intent + content fit</span>
        </div>
        <h1 className="hero-title">Score an ICP persona and map the next content move.</h1>
        <p className="hero-copy">Intent tier, content fit, and recommended content path.</p>
      </section>

      <section className="two-column-layout scorer-layout">
        <aside className="panel">
          <div className="section-label">Scenario presets</div>
          <div className="preset-stack">
            {Object.entries(LEAD_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                className={`preset-card${presetKey === key ? ' is-active' : ''}`}
                onClick={() => onPresetChange(key)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="section-label section-spacer">Contact context</div>
          <div className="form-stack">
            <label className="field">
              <span className="field-label">Name</span>
              <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
            </label>
            <label className="field">
              <span className="field-label">Company</span>
              <input value={profile.company} onChange={(event) => setProfile({ ...profile, company: event.target.value })} />
            </label>
            <label className="field">
              <span className="field-label">Persona role</span>
              <select value={profile.seniority} onChange={(event) => setProfile({ ...profile, seniority: event.target.value })}>
                <option>Marketing Ops Lead</option>
                <option>Program Manager</option>
                <option>Content Lead</option>
                <option>Ops Analyst</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">Engagement recency</span>
              <select value={profile.recency} onChange={(event) => setProfile({ ...profile, recency: event.target.value })}>
                <option>Within 24 hours</option>
                <option>Within 7 days</option>
                <option>Within 30 days</option>
                <option>Over 30 days</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">Vertical</span>
              <input value={profile.topicCluster} onChange={(event) => setProfile({ ...profile, topicCluster: event.target.value })} />
            </label>
          </div>

          <div className="section-label section-spacer">Signals</div>
          <div className="signal-grid">
            {PREBUILT_SIGNALS.map((signal) => (
              <button
                key={signal.id}
                className={`signal-card${toggles[signal.id] ? ' is-active' : ''}`}
                onClick={() => setToggles((current) => ({ ...current, [signal.id]: !current[signal.id] }))}
                type="button"
              >
                <strong>{signal.label}</strong>
                <span>{signal.weight} pts</span>
              </button>
            ))}
          </div>

          <div className="section-label section-spacer">Custom signal</div>
          <div className="custom-signal-row">
            <input
              value={draftSignal.label}
              onChange={(event) => setDraftSignal({ ...draftSignal, label: event.target.value })}
              placeholder="Added product tour, FAQ page, or template hub"
            />
            <input
              type="number"
              min="1"
              max="30"
              value={draftSignal.weight}
              onChange={(event) => setDraftSignal({ ...draftSignal, weight: event.target.value })}
            />
          </div>
          <button className="secondary-button secondary-button--full" onClick={addCustomSignal} type="button">
            Add signal
          </button>

          {customSignals.length > 0 && (
            <div className="tag-list section-spacer-sm">
              {customSignals.map((item) => (
                <span key={`${item.label}-${item.weight}`} className="tag-chip">
                  {item.label} (+{item.weight})
                </span>
              ))}
            </div>
          )}

          <div className="summary-strip">
            <div>
              <div className="metric-label">Weighted total</div>
              <div className="summary-value summary-value--big">{weightedTotal}</div>
            </div>
            <button className="primary-button" onClick={handleScore} disabled={loading} type="button">
              {loading ? 'Scoring…' : 'Score persona'}
            </button>
          </div>
        </aside>

        <section className="result-column">
          {!result && !loading && (
            <div className="empty-panel">
              <div className="empty-panel-title">Ready to score?</div>
              <div className="empty-panel-copy">Start with Sarah Chen to see a high-intent journey.</div>
            </div>
          )}

          {loading && (
            <div className="empty-panel">
              <div className="spinner" />
              <div className="empty-panel-title">Computing intent</div>
              <div className="empty-panel-copy">Weighting signal depth, recency, and content proximity to conversion.</div>
            </div>
          )}

          {error && <div className="error-banner">{error}</div>}

          {result && !loading && (
            <div className="result-stack">
              {(() => {
                const distribution = result.distributionRecommendation || result.nurtureRecommendation
                const contentRecommendation = result.contentRecommendation || result.salesRecommendation || { summary: '', steps: [] }
                return (
                  <>
                    <div className="result-grid">
                      <article className="panel score-panel">
                        <div className="section-label">Persona score</div>
                        <div className="score-chart">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart data={radialData} innerRadius="74%" outerRadius="100%" startAngle={90} endAngle={-270} barSize={16}>
                              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                              <RadialBar dataKey="value" background={{ fill: '#eef2f7' }} cornerRadius={100} />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="score-center">
                            <div className="score-number">{result.score}</div>
                            <div className="score-tier" style={{ color: tierColor(result.intentTier) }}>
                              {result.intentTier}
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="panel">
                        <div className="section-label">Content action</div>
                        <h2 className="panel-title">{contentRecommendation.summary}</h2>
                        <p>{result.intentAnalysis}</p>
                        <div className="list-stack">
                          {contentRecommendation.steps.map((step) => (
                            <div key={step} className="bullet-row">
                              <span className="bullet-dot" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                        <div className="panel-actions section-spacer-sm">
                          <button className="primary-button" onClick={() => onNavigate('intelligence')} type="button">
                            Generate intelligence
                          </button>
                        </div>
                      </article>
                    </div>

                    <div className="result-grid">
                      <article className="panel">
                        <div className="section-label">Signal breakdown</div>
                        <div className="chart-area chart-area--medium">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={signalChartData} margin={{ top: 8, right: 16, bottom: 0, left: -24 }}>
                              <CartesianGrid vertical={false} stroke="#e8ecf4" />
                              <XAxis dataKey="signal" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
                              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
                              <Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </article>

                      <article className="panel">
                        <div className="section-label">Attribution and gaps</div>
                        <p>{result.attributionStory}</p>
                        <div className="insight-block">
                          <div className="summary-title">Content gap</div>
                          <div className="summary-value">{result.contentGap}</div>
                        </div>
                        <div className="insight-block">
                          <div className="summary-title">Distribution recommendation</div>
                          <div className="summary-value">{distribution}</div>
                        </div>
                      </article>
                    </div>

                    <article className="panel">
                      <div className="section-label">Signal insights</div>
                      <div className="detail-list">
                        {result.signalBreakdown.map((item) => (
                          <div key={item.signal} className="detail-item">
                            <strong>{item.signal}</strong>
                            <span>{item.insight}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </>
                )
              })()}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}
