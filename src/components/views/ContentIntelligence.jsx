import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

function buildRadar(plan) {
  return [
    { area: 'SEO', score: 83 },
    { area: 'CTA', score: 90 },
    { area: 'Attribution', score: 76 },
    { area: 'Pod fit', score: 88 },
    { area: 'Execution', score: 81 },
  ]
}

export default function ContentIntelligence({ timeframe, opportunity, leadResult, leadContext, plan, onNavigate }) {
  const radarData = buildRadar(plan)
  const timeframeLabelMap = {
    last12m: 'last 12 months',
    last6m: 'last 6 months',
    last3m: 'last 3 months',
    last2m: 'last 2 months',
    last1w: 'last 1 week',
  }
  const timeframeLabel = timeframeLabelMap[timeframe] || timeframe

  return (
    <div className="view-frame">
      <section className="hero-surface hero-surface--compact">
        <div className="hero-badge-row">
          <span className="eyebrow eyebrow--blue">Content intelligence</span>
          <span className="eyebrow">{timeframeLabel} strategy</span>
        </div>
        <h1 className="hero-title">Turn winning signals into a content system.</h1>
        <p className="hero-copy">CTA plan, SEO direction, and content gaps in one view.</p>
      </section>

      <section className="two-column-layout">
        <article className="panel panel--visual">
          <div className="section-label">Strategy balance</div>
          <div className="chart-area chart-area--medium">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="area" tick={{ fill: 'var(--text-dim)', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="score" stroke="var(--accent-blue)" fill="var(--accent-blue)" fillOpacity={0.22} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel intelligence-highlight">
          <div className="section-label">Generated direction</div>
          <div className="highlight-metric">{opportunity.theme}</div>
          <div className="highlight-copy">{plan.ctaStrategy.primary}</div>
          <div className="highlight-subcopy">{plan.ctaStrategy.secondary}</div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="section-label">Detected signal pattern</div>
          <h2 className="panel-title">{plan.title}</h2>
          <p>{plan.summary}</p>
          <div className="list-stack">
            {plan.detectedSignals.map((item) => (
              <div key={item} className="bullet-row">
                <span className="bullet-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Context carried forward</div>
          <div className="detail-item">
            <strong>Selected opportunity</strong>
            <span>{opportunity.title}</span>
          </div>
          <div className="detail-item">
            <strong>Persona context</strong>
            <span>
              {leadContext?.name || 'No persona scored yet'} {leadContext?.company ? `· ${leadContext.company}` : ''}
            </span>
          </div>
          <div className="detail-item">
            <strong>Intent tier</strong>
            <span>{leadResult?.intentTier || 'Warm by default'}</span>
          </div>
          <div className="detail-item">
            <strong>Persona score</strong>
            <span>{leadResult?.score || 'Not scored yet'}</span>
          </div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="section-label">Content bet</div>
          <h2 className="panel-title">{plan.contentBet.headline}</h2>
          <div className="detail-list">
            <div className="detail-item">
              <strong>Format</strong>
              <span>{plan.contentBet.format}</span>
            </div>
            <div className="detail-item">
              <strong>Audience</strong>
              <span>{plan.contentBet.audience}</span>
            </div>
            <div className="detail-item">
              <strong>Rationale</strong>
              <span>{plan.contentBet.rationale}</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="section-label">CTA strategy</div>
          <div className="detail-list">
            <div className="detail-item">
              <strong>Primary CTA</strong>
              <span>{plan.ctaStrategy.primary}</span>
            </div>
            <div className="detail-item">
              <strong>Secondary CTA</strong>
              <span>{plan.ctaStrategy.secondary}</span>
            </div>
            <div className="detail-item">
              <strong>Resource CTA</strong>
              <span>{plan.ctaStrategy.resourceCTA}</span>
            </div>
            <div className="detail-item">
              <strong>Placement</strong>
              <span>{plan.ctaStrategy.placement}</span>
            </div>
            <div className="detail-item">
              <strong>Messaging logic</strong>
              <span>{plan.ctaStrategy.messaging}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="section-label">CTA winners</div>
          <div className="detail-list">
            {plan.ctaWinners.map((item) => (
              <div key={item} className="detail-item">
                <strong>CTA</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Top blogs</div>
          <div className="detail-list">
            {plan.blogWinners.map((item) => (
              <div key={item} className="detail-item">
                <strong>Blog</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Production mix</div>
          <div className="detail-list">
            {plan.productionMix.map((item) => (
              <div key={item.format} className="detail-item">
                <strong>{item.format}</strong>
                <span>{item.count} · {item.focus}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Useful content patterns</div>
          <div className="detail-list">
            {plan.usefulContentAssets.map((item) => (
              <div key={item} className="detail-item">
                <strong>Asset</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">SEO recommendations</div>
          <div className="detail-list">
            {plan.seoRecommendations.map((item) => (
              <div key={item} className="detail-item">
                <strong>Recommendation</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">SERP analysis</div>
          <div className="detail-list">
            {plan.serpAnalysis.map((item) => (
              <div key={item} className="detail-item">
                <strong>Insight</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">AI search + GEO</div>
          <div className="detail-list">
            {plan.aiSearchRecommendations.map((item) => (
              <div key={item} className="detail-item">
                <strong>Recommendation</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">ClickUp content patterns</div>
          <div className="detail-list">
            {plan.clickupPatterns.map((item) => (
              <div key={item} className="detail-item">
                <strong>Pattern</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Content pod playbook</div>
          <div className="detail-list">
            {plan.podPlaybook.map((item) => (
              <div key={item.pod} className="detail-item">
                <strong>{item.pod}</strong>
                <span>{item.action}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="section-label">Content gaps by stage</div>
          <div className="detail-list">
            {plan.stageGaps.map((item) => (
              <div key={item} className="detail-item">
                <strong>Gap</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-label">Pipeline influence</div>
          <div className="detail-list">
            {plan.pipelineInfluence.map((item) => (
              <div key={item} className="detail-item">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="panel-actions">
        <button className="secondary-button" onClick={() => onNavigate('scorer')} type="button">
          Back to persona scoring
        </button>
        <button className="primary-button" onClick={() => onNavigate('execution')} type="button">
          Move to execution
        </button>
      </div>
    </div>
  )
}
