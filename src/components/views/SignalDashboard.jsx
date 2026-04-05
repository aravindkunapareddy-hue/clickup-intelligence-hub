import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LEAD_LIBRARY, SEO_ASSETS, EXECUTIVE_KPIs } from '../data/intelligence.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      <div className="chart-tooltip-value">{payload[0].value}% conversion rate</div>
    </div>
  )
}

export default function SignalDashboard({ onNavigate }) {
  const KPI_CARDS = [
     { label: 'Hot personas this week', value: '34', delta: '+9 vs last week' },
     { label: 'Warm personas this week', value: '118', delta: '+13 vs last week' },
     { label: 'Total Scored Leads', value: LEAD_LIBRARY.length.toLocaleString(), delta: EXECUTIVE_KPIs.leads.delta },
     { label: 'Average Intent Score', value: '67', delta: '+6 points' },
  ]

  const HOT_LEADS = LEAD_LIBRARY.slice(0, 4).map(l => ({
    name: l.name,
    company: l.company || 'Unknown Corp',
    score: l.total_score || l.score,
    action: `Trigger ${l.role} outreach for ${l.industry} segment.`
  }))

  const CONTENT_ROWS = SEO_ASSETS.slice(0, 4).map(a => ({
    title: a.title,
    rate: parseFloat(((a.cta_ctr || 0) * 100).toFixed(1)),
    influenced: `$${((a.sourced_pipeline || 0) / 1000).toFixed(0)}k`
  }))

  const SIGNAL_BENCHMARKS = [
    { signal: 'Pricing page', conversionRate: 78 },
    { signal: 'Comparison page', conversionRate: 64 },
    { signal: 'Template download', conversionRate: 49 },
    { signal: 'Case study', conversionRate: 41 },
    { signal: 'YouTube > 50%', conversionRate: 24 },
    { signal: 'Newsletter click', conversionRate: 12 },
  ]

  return (
    <div className="view-frame">
      <section className="view-header">
        <div>
          <div className="section-label">Macro visibility</div>
          <h1 className="view-title">See which content is creating pipeline, not just clicks.</h1>
          <p className="view-copy">
            The dashboard gives the shared picture across pods: who is heating up, which assets are influencing revenue,
            and which signals are most predictive of conversion.
          </p>
        </div>
        <button className="primary-button" onClick={() => onNavigate('scorer')} type="button">
          Open persona scorer
        </button>
      </section>

      <section className="section-grid section-grid--four">
        {KPI_CARDS.map((card) => (
          <article key={card.label} className="metric-card">
            <div className="metric-label">{card.label}</div>
            <div className="metric-value">{card.value}</div>
            <div className="metric-delta">{card.delta}</div>
          </article>
        ))}
      </section>

      <section className="split-panel">
        <article className="feature-panel feature-panel--table">
          <div className="section-label">Hot persona queue</div>
          <div className="table-list">
            {HOT_LEADS.map((lead) => (
              <div key={lead.name} className="table-row">
                <div className="table-main">
                  <div className="table-title">
                    {lead.name} <span>{lead.company}</span>
                  </div>
                  <div className="table-subtitle">{lead.action}</div>
                </div>
                <div className="score-pill">{lead.score}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="feature-panel feature-panel--table">
          <div className="section-label">Top converting content this week</div>
          <div className="content-bar-list">
            {CONTENT_ROWS.map((row) => (
              <div key={row.title} className="content-bar-row">
                <div className="content-bar-copy">
                  <div className="table-title">
                    {row.title} <span>{row.influenced} influenced pipeline</span>
                  </div>
                  <div className="content-bar-track">
                    <div className="content-bar-fill" style={{ width: `${Math.min(row.rate * 5, 100)}%` }} />
                  </div>
                </div>
                <div className="content-bar-rate">{row.rate}%</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="feature-panel feature-panel--chart">
        <div className="section-label">Signal to conversion benchmark</div>
        <h2>Pricing page visits and comparison behavior are pulling the most pipeline weight.</h2>
        <div className="dashboard-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SIGNAL_BENCHMARKS} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid vertical={false} stroke="#e8ecf4" />
              <XAxis dataKey="signal" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
              <Bar dataKey="conversionRate" fill="url(#signalGradient)" radius={[10, 10, 0, 0]} />
              <defs>
                <linearGradient id="signalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
