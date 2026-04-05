import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TIMEFRAME_DATA } from '../../data/intelligence.js'

const jitter = (value, maxDelta) => value + Math.round((Math.random() * 2 - 1) * maxDelta)

const parseMetric = (value) => {
  if (typeof value !== 'string') return { numeric: value, suffix: '' }
  const match = value.match(/([0-9.]+)(.*)/)
  if (!match) return { numeric: value, suffix: '' }
  return { numeric: parseFloat(match[1]), suffix: match[2] }
}

export default function Overview({
  timeframe,
  onboarding,
  selectedOpportunityId,
  onSelectOpportunity,
  onOpenScorer,
  onOpenIntelligence,
}) {
  const view = TIMEFRAME_DATA[timeframe]
  const timeframeLabelMap = {
    last12m: 'last 12 months',
    last6m: 'last 6 months',
    last3m: 'last 3 months',
    last2m: 'last 2 months',
    last1w: 'last 1 week',
  }
  const timeframeLabel = timeframeLabelMap[timeframe] || timeframe
  const activeOpportunity = view.opportunities.find((item) => item.id === selectedOpportunityId) || view.opportunities[0]
  const [liveMode, setLiveMode] = useState(true)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!liveMode) return
    const interval = setInterval(() => setTick((current) => current + 1), 3000)
    return () => clearInterval(interval)
  }, [liveMode])

  const liveSeries = useMemo(() => {
    if (!liveMode) return view.dashboardSeries
    return view.dashboardSeries.map((row) => ({
      ...row,
      detect: jitter(row.detect, 3),
      score: jitter(row.score, 2),
      execute: jitter(row.execute, 2),
    }))
  }, [liveMode, tick, view.dashboardSeries])

  const pipelineBars = view.pipelineAttribution || []
  const ctaPerformance = view.ctaPerformance || []
  const topBlogs = view.topBlogs || []
  const leadScoreBands = view.leadScoreBands || []
  const podPerformance = view.podPerformance || []
  const verticalPerformance = view.verticalPerformance || []

  const liveTrends = useMemo(() => {
    if (!liveMode) return view.trends
    return view.trends.map((trend) => ({
      ...trend,
      value: Math.max(4, jitter(trend.value, 2)),
    }))
  }, [liveMode, tick, view.trends])

  const liveMetrics = useMemo(() => {
    if (!liveMode) return view.metrics
    return view.metrics.map((metric) => {
      const parsed = parseMetric(metric.value)
      if (Number.isNaN(parsed.numeric)) return metric
      const adjusted = jitter(parsed.numeric, Math.max(1, parsed.numeric * 0.02))
      return { ...metric, value: `${adjusted}${parsed.suffix}` }
    })
  }, [liveMode, tick, view.metrics])

  return (
    <div className="view-frame">
      <section className="hero-surface">
        <div className="hero-badge-row">
          <span className="eyebrow eyebrow--blue">{timeframeLabel} intelligence</span>
          <span className="eyebrow">{onboarding.userRole}</span>
          <span className="eyebrow">{onboarding.priorityPod} focus</span>
          <span className={`eyebrow ${liveMode ? 'eyebrow--live' : ''}`}>{liveMode ? 'Live' : 'Paused'}</span>
        </div>
        <h1 className="hero-title">{view.headline}</h1>
        <p className="hero-copy">{view.subhead}</p>

        <div className="hero-metrics">
          {liveMetrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-delta">{metric.delta}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid section-grid--three">
        {view.podSummaries.map((item) => (
          <article key={item.pod} className="panel insight-panel">
            <div className="section-label">{item.pod}</div>
            <p>{item.insight}</p>
          </article>
        ))}
      </section>

      <section className="two-column-layout">
        <article className="panel panel--visual">
          <div className="panel-head">
            <div>
              <div className="section-label">Pipeline contribution</div>
              <h2 className="panel-title">Which content clusters drove pipeline.</h2>
            </div>
          </div>
          <div className="chart-area chart-area--medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineBars} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 12 }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="pipeline" name="% of pipeline" fill="var(--accent-indigo)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Persona score distribution</div>
              <h2 className="panel-title">How content is converting into intent tiers.</h2>
            </div>
            <button className="secondary-button" onClick={onOpenScorer} type="button">
              Open persona scoring
            </button>
          </div>
          <div className="detail-list">
            {leadScoreBands.map((band) => (
              <div key={band.band} className="detail-item">
                <strong>{band.band}</strong>
                <span>{band.value}% of content-touched personas</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel panel--visual">
          <div className="panel-head">
            <div>
              <div className="section-label">Pod performance</div>
              <h2 className="panel-title">How each content pod is performing.</h2>
            </div>
          </div>
          <div className="chart-area chart-area--medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={podPerformance} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="pod" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 12 }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="score" name="Performance score" fill="var(--accent-blue)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel panel--visual">
          <div className="panel-head">
            <div>
              <div className="section-label">Vertical performance</div>
              <h2 className="panel-title">Which verticals are winning now.</h2>
            </div>
          </div>
          <div className="chart-area chart-area--medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={verticalPerformance} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="vertical" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 12 }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="score" name="Performance score" fill="var(--accent-indigo)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">CTA performance</div>
              <h2 className="panel-title">Which CTAs lift conversion right now.</h2>
            </div>
            <button className="secondary-button" onClick={onOpenIntelligence} type="button">
              Open CTA plan
            </button>
          </div>
          <div className="detail-list">
            {ctaPerformance.map((item) => (
              <button
                key={item.cta}
                className="detail-item detail-item--clickable"
                onClick={() => {
                  if (item.opportunityId) onSelectOpportunity(item.opportunityId)
                  onOpenIntelligence()
                }}
                type="button"
              >
                <strong>{item.cta}</strong>
                <span>Lift {item.lift}% · Pipeline {item.pipeline}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Top blog performance</div>
              <h2 className="panel-title">Which posts influenced pipeline the most.</h2>
            </div>
          </div>
          <div className="detail-list">
            {topBlogs.map((item) => (
              <button
                key={item.title}
                className="detail-item detail-item--clickable"
                onClick={() => {
                  if (item.opportunityId) onSelectOpportunity(item.opportunityId)
                  onOpenIntelligence()
                }}
                type="button"
              >
                <strong>{item.title}</strong>
                <span>{item.topic} · Pipeline {item.pipeline}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <div className="section-label">Flow chain</div>
            <h2 className="panel-title">12-month data → persona scoring → content gaps.</h2>
          </div>
        </div>
        <div className="flow-rail">
          <div className="flow-rail-step">
            <div className="flow-rail-index">1</div>
            <div>
              <div className="flow-rail-title">Performance baseline</div>
              <div className="flow-rail-copy">CTA winners, top blogs, pipeline contribution.</div>
            </div>
          </div>
          <div className="flow-rail-step">
            <div className="flow-rail-index">2</div>
            <div>
              <div className="flow-rail-title">Persona scoring</div>
              <div className="flow-rail-copy">Intent tiers from content signals.</div>
            </div>
          </div>
          <div className="flow-rail-step">
            <div className="flow-rail-index">3</div>
            <div>
              <div className="flow-rail-title">Content gaps</div>
              <div className="flow-rail-copy">Missing assets by funnel stage.</div>
            </div>
          </div>
          <div className="flow-rail-step">
            <div className="flow-rail-index">4</div>
            <div>
              <div className="flow-rail-title">Execution</div>
              <div className="flow-rail-copy">Routes + owners by content pod.</div>
            </div>
          </div>
        </div>
        <div className="panel-actions">
          <button className="secondary-button" onClick={onOpenScorer} type="button">
            Open persona scoring
          </button>
          <button className="primary-button" onClick={onOpenIntelligence} type="button">
            Open content intelligence
          </button>
        </div>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Independent variables</div>
              <h2 className="panel-title">Inputs that drive scoring.</h2>
            </div>
          </div>
          <div className="detail-list">
            {view.engineInputs.map((item) => (
              <div key={item.label} className="detail-item">
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Dependent outcomes</div>
              <h2 className="panel-title">Outcomes that prove impact.</h2>
            </div>
          </div>
          <div className="detail-list">
            {view.engineOutputs.map((item) => (
              <div key={item.label} className="detail-item">
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel panel--visual">
        <div className="panel-head">
          <div>
            <div className="section-label">Engine view</div>
            <h2 className="panel-title">Detect, score, and execute across the workflow.</h2>
          </div>
          <button className="secondary-button" onClick={() => setLiveMode((current) => !current)} type="button">
            {liveMode ? 'Pause live' : 'Go live'}
          </button>
        </div>
        <div className="chart-area chart-area--large">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={liveSeries} margin={{ top: 8, right: 0, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 12 }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <Bar dataKey="detect" name="Detect" fill="var(--accent-blue)" radius={[10, 10, 0, 0]} />
              <Bar dataKey="score" name="Score" fill="var(--accent-indigo)" radius={[10, 10, 0, 0]} />
              <Bar dataKey="execute" name="Execute" fill="var(--accent-green)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Detected opportunities</div>
              <h2 className="panel-title">Top opportunities by pod.</h2>
            </div>
            <button className="secondary-button" onClick={onOpenIntelligence} type="button">
              Open intelligence
            </button>
          </div>

          <div className="opportunity-stack">
            {view.opportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                className={`opportunity-card${activeOpportunity.id === opportunity.id ? ' is-active' : ''}`}
                onClick={() => onSelectOpportunity(opportunity.id)}
                type="button"
              >
                <div className="opportunity-score">{opportunity.score}</div>
                <div className="opportunity-copy">
                  <div className="opportunity-title-row">
                    <strong>{opportunity.title}</strong>
                    <span>{opportunity.pod}</span>
                  </div>
                  <p>{opportunity.story}</p>
                  <div className="opportunity-action">{opportunity.action}</div>
                </div>
              </button>
            ))}
          </div>
        </article>

        <aside className="panel panel--detail">
          <div className="section-label">Selected focus</div>
          <h2 className="panel-title">{activeOpportunity.title}</h2>
          <p>{activeOpportunity.story}</p>

          <div className="detail-block">
            <div className="summary-title">Theme</div>
            <div className="summary-value">{activeOpportunity.theme}</div>
          </div>

          <div className="detail-block">
            <div className="summary-title">Primary CTA</div>
            <div className="summary-value">{activeOpportunity.primaryCTA}</div>
          </div>

          <div className="detail-block">
            <div className="summary-title">Secondary CTA</div>
            <div className="summary-value">{activeOpportunity.secondaryCTA}</div>
          </div>

          <div className="panel-actions">
            <button className="primary-button" onClick={() => onOpenScorer(activeOpportunity)} type="button">
              Open persona scoring
            </button>
            <button className="secondary-button" onClick={onOpenIntelligence} type="button">
              Generate content intelligence
            </button>
          </div>
        </aside>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <div className="section-label">What is converting</div>
            <h2 className="panel-title">Detected content patterns based on current signal strength and ClickUp-style content archetypes.</h2>
          </div>
        </div>
        <div className="trend-bars">
          {liveTrends.map((trend) => (
            <div key={trend.label} className="trend-row">
              <div className="trend-copy">
                <strong>{trend.label}</strong>
                <span>{trend.value}% conversion proximity</span>
              </div>
              <div className="trend-track">
                <div className="trend-fill" style={{ width: `${trend.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
