import React, { useEffect, useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const POD_LOAD = [
  { name: 'SEO Blog', value: 26, color: 'var(--accent-blue)' },
  { name: 'YouTube', value: 22, color: 'var(--accent-indigo)' },
  { name: 'Podcast', value: 18, color: 'var(--accent-purple)' },
  { name: 'Lifecycle', value: 20, color: 'var(--accent-green)' },
  { name: 'Social', value: 14, color: 'var(--accent-orange)' },
]

const LIVE_QUEUE = [
  { id: 'q1', task: 'Publish comparison update', pod: 'SEO Blog', status: 'In progress', eta: 'Today' },
  { id: 'q2', task: 'Ship template refresh', pod: 'Lifecycle', status: 'Queued', eta: '2 hrs' },
  { id: 'q3', task: 'Record AI workflow walkthrough', pod: 'YouTube', status: 'Queued', eta: 'Tomorrow' },
  { id: 'q4', task: 'Edit podcast companion guide', pod: 'Podcast', status: 'Blocked', eta: 'Pending' },
]

const WORKFLOW_STAGES = [
  { id: 'detect', label: 'Detect performance', owner: 'Analytics' },
  { id: 'score', label: 'Score personas', owner: 'Strategy' },
  { id: 'recommend', label: 'Generate plan', owner: 'Content lead' },
  { id: 'route', label: 'Route to pods', owner: 'Content Ops' },
  { id: 'execute', label: 'Publish + refresh', owner: 'Pod owners' },
]

const RULES_KEY = 'clickup_intelligence_rules_v1'
const DEFAULT_RULES = {
  seoScoreThreshold: 72,
  refreshThreshold: 60,
  distributionThreshold: 50,
  autoRefresh: true,
  autoDistribute: true,
  gapTrigger: true,
}

const rotateQueue = (queue) => {
  if (queue.length === 0) return queue
  const [first, ...rest] = queue
  return [...rest, first]
}

export default function ExecutionHub({ timeframe, onboarding, opportunity, leadResult, plan, onNavigate }) {
  const timeframeLabelMap = {
    last12m: 'last 12 months',
    last6m: 'last 6 months',
    last3m: 'last 3 months',
    last2m: 'last 2 months',
    last1w: 'last 1 week',
  }
  const timeframeLabel = timeframeLabelMap[timeframe] || timeframe
  const [liveMode, setLiveMode] = useState(true)
  const [queue, setQueue] = useState(LIVE_QUEUE)
  const [stageIndex, setStageIndex] = useState(2)
  const [rules, setRules] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RULES_KEY))
      if (!stored) return DEFAULT_RULES
      return {
        seoScoreThreshold: stored.seoScoreThreshold ?? stored.revopsThreshold ?? DEFAULT_RULES.seoScoreThreshold,
        refreshThreshold: stored.refreshThreshold ?? stored.demandThreshold ?? DEFAULT_RULES.refreshThreshold,
        distributionThreshold: stored.distributionThreshold ?? stored.contentThreshold ?? DEFAULT_RULES.distributionThreshold,
        autoRefresh: stored.autoRefresh ?? stored.routeHot ?? DEFAULT_RULES.autoRefresh,
        autoDistribute: stored.autoDistribute ?? stored.nurtureWarm ?? DEFAULT_RULES.autoDistribute,
        gapTrigger: stored.gapTrigger ?? DEFAULT_RULES.gapTrigger,
      }
    } catch {
      return DEFAULT_RULES
    }
  })

  useEffect(() => {
    if (!liveMode) return
    const interval = setInterval(() => setQueue((current) => rotateQueue(current)), 4000)
    return () => clearInterval(interval)
  }, [liveMode])

  useEffect(() => {
    if (!liveMode) return
    const interval = setInterval(
      () => setStageIndex((current) => (current + 1) % WORKFLOW_STAGES.length),
      3500,
    )
    return () => clearInterval(interval)
  }, [liveMode])

  useEffect(() => {
    localStorage.setItem(RULES_KEY, JSON.stringify(rules))
  }, [rules])

  const loadMix = useMemo(() => {
    if (!liveMode) return POD_LOAD
    return POD_LOAD.map((item) => ({
      ...item,
      value: Math.max(12, Math.min(52, item.value + Math.round((Math.random() * 6) - 3))),
    }))
  }, [liveMode, queue])

  return (
    <div className="view-frame">
      <section className="hero-surface hero-surface--compact">
        <div className="hero-badge-row">
          <span className="eyebrow eyebrow--blue">Content ops</span>
          <span className="eyebrow">{timeframeLabel} operating plan</span>
        </div>
        <h1 className="hero-title">Turn insight into a content production plan.</h1>
        <p className="hero-copy">Assign owners, ship assets, and track impact.</p>
      </section>

      <section className="section-grid section-grid--three">
        <article className="panel">
          <div className="section-label">Focus pod</div>
          <div className="summary-value summary-value--big">{onboarding.priorityPod}</div>
          <p>{opportunity.action}</p>
        </article>
        <article className="panel">
          <div className="section-label">Current focus</div>
          <div className="summary-value summary-value--big">{opportunity.theme}</div>
          <p>{plan.contentBet.format}</p>
        </article>
        <article className="panel">
          <div className="section-label">Persona readiness</div>
          <div className="summary-value summary-value--big">{leadResult?.intentTier || 'Warm'}</div>
          <p>{leadResult?.contentRecommendation?.summary || 'Score a persona to unlock the content path.'}</p>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel panel--visual">
          <div className="section-label">Workload distribution</div>
          <div className="chart-area chart-area--medium">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={loadMix} dataKey="value" innerRadius={62} outerRadius={96} paddingAngle={4}>
                  {loadMix.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="tag-list">
            {loadMix.map((item) => (
              <span key={item.name} className="tag-chip">
                {item.name} {item.value}%
              </span>
            ))}
          </div>
        </article>

        <article className="panel execution-highlight">
          <div className="panel-head">
            <div className="section-label">Execution priority</div>
            <button className="secondary-button" onClick={() => setLiveMode((current) => !current)} type="button">
              {liveMode ? 'Pause live' : 'Go live'}
            </button>
          </div>
          <div className="highlight-metric">{onboarding.priorityPod}</div>
          <div className="highlight-copy">{opportunity.action}</div>
          <div className="highlight-subcopy">{leadResult?.contentRecommendation?.summary || 'Score a persona to unlock pod-specific routing.'}</div>
        </article>
      </section>

      <section className="two-column-layout">
        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Workflow timeline</div>
              <h2 className="panel-title">Live stages with SLAs.</h2>
            </div>
            <div className={`live-chip${liveMode ? ' is-live' : ''}`}>{liveMode ? 'Live' : 'Paused'}</div>
          </div>
          <div className="timeline">
            {WORKFLOW_STAGES.map((stage, index) => (
              <div
                key={stage.id}
                className={`timeline-row${index < stageIndex ? ' is-complete' : ''}${index === stageIndex ? ' is-active' : ''}`}
              >
                <div className="timeline-dot" />
                <div>
                  <div className="timeline-title">{stage.label}</div>
                  <div className="timeline-meta">{stage.owner}</div>
                </div>
                <div className="timeline-status">
                  {index < stageIndex ? 'Complete' : index === stageIndex ? 'In progress' : 'Queued'}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <div className="section-label">Content rules</div>
              <h2 className="panel-title">Thresholds that trigger content actions.</h2>
            </div>
          </div>
          <div className="rules-grid">
            <div className="rule-card">
              <div>
                <div className="rule-title">SEO priority threshold</div>
                <div className="rule-copy">Prioritize refreshes above this score.</div>
              </div>
              <input
                type="number"
                min="50"
                max="95"
                value={rules.seoScoreThreshold}
                onChange={(event) => setRules((current) => ({ ...current, seoScoreThreshold: Number(event.target.value) }))}
              />
            </div>
            <div className="rule-card">
              <div>
                <div className="rule-title">Refresh threshold</div>
                <div className="rule-copy">Trigger content refresh above this score.</div>
              </div>
              <input
                type="number"
                min="35"
                max="80"
                value={rules.refreshThreshold}
                onChange={(event) => setRules((current) => ({ ...current, refreshThreshold: Number(event.target.value) }))}
              />
            </div>
            <div className="rule-card">
              <div>
                <div className="rule-title">Distribution threshold</div>
                <div className="rule-copy">Trigger distribution push above this score.</div>
              </div>
              <input
                type="number"
                min="40"
                max="85"
                value={rules.distributionThreshold}
                onChange={(event) => setRules((current) => ({ ...current, distributionThreshold: Number(event.target.value) }))}
              />
            </div>
            <button
              className={`toggle-card${rules.autoRefresh ? ' is-active' : ''}`}
              type="button"
              onClick={() => setRules((current) => ({ ...current, autoRefresh: !current.autoRefresh }))}
            >
              Auto-refresh high performers
            </button>
            <button
              className={`toggle-card${rules.autoDistribute ? ' is-active' : ''}`}
              type="button"
              onClick={() => setRules((current) => ({ ...current, autoDistribute: !current.autoDistribute }))}
            >
              Auto-distribute top content
            </button>
            <button
              className={`toggle-card${rules.gapTrigger ? ' is-active' : ''}`}
              type="button"
              onClick={() => setRules((current) => ({ ...current, gapTrigger: !current.gapTrigger }))}
            >
              Trigger content gap alerts
            </button>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <div className="section-label">Live workflow queue</div>
            <h2 className="panel-title">Work items auto-route as performance shifts.</h2>
          </div>
        </div>
        <div className="queue-list">
          {queue.map((item) => (
            <div key={item.id} className={`queue-row queue-${item.status.toLowerCase().replace(' ', '-')}`}>
              <div>
                <div className="queue-title">{item.task}</div>
                <div className="queue-meta">{item.pod}</div>
              </div>
              <div className="queue-status">{item.status}</div>
              <div className="queue-eta">{item.eta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-label">Milestones</div>
        <div className="execution-grid">
          {plan.executionMilestones.map((item) => (
            <div key={item.phase} className="execution-card">
              <div className="execution-phase">{item.phase}</div>
              <div className="execution-owner">{item.owner}</div>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="two-column-layout">
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

        <article className="panel">
          <div className="section-label">Launch checklist</div>
          <div className="detail-list">
            <div className="detail-item">
              <strong>CTA launch</strong>
              <span>Ship the primary CTA and supporting CTA in the asset.</span>
            </div>
            <div className="detail-item">
              <strong>Persona scoring</strong>
              <span>Attach persona insights to every new asset before publishing.</span>
            </div>
            <div className="detail-item">
              <strong>Measurement</strong>
              <span>Review pipeline lift, CTA conversion rate, and content velocity in the next {timeframeLabel} cycle.</span>
            </div>
          </div>
        </article>
      </section>

      <div className="panel-actions">
        <button className="secondary-button" onClick={() => onNavigate('intelligence')} type="button">
          Back to intelligence
        </button>
        <button className="primary-button" onClick={() => onNavigate('overview')} type="button">
          Return to command center
        </button>
      </div>
    </div>
  )
}
