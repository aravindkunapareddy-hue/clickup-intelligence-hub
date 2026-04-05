import React from 'react'

const VIEW_META = {
  onboarding: { label: 'Onboarding', summary: 'Set operator, signals, and outcome.' },
  overview: { label: 'Content Command', summary: 'See 12-month performance, CTA winners, and pipeline impact.' },
  scorer: { label: 'Persona Scoring', summary: 'Score ICP intent and content fit.' },
  intelligence: { label: 'Content Intelligence', summary: 'Turn winning signals into CTA, SEO, and content plans.' },
  execution: { label: 'Content Ops', summary: 'Assign owners, milestones, and production flow.' },
}

const TIMEFRAME_OPTIONS = [
  { id: 'last12m', label: 'Last 12 months' },
  { id: 'last6m', label: 'Last 6 months' },
  { id: 'last3m', label: 'Last 3 months' },
  { id: 'last2m', label: 'Last 2 months' },
  { id: 'last1w', label: 'Last 1 week' },
]

export default function Topbar({ activeView, timeframe, apiKey, onApiKeyChange, onTimeframeChange, theme, onThemeToggle }) {
  const meta = VIEW_META[activeView] || VIEW_META.onboarding

  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
        </div>
        <div>
          <div className="eyebrow">ClickUp Content Intelligence</div>
          <div className="brand-title">Content Revenue Orchestrator</div>
        </div>
      </div>

      <div className="topbar-center">
        <div className="topbar-view">{meta.label}</div>
        <div className="topbar-summary">{meta.summary}</div>
      </div>

      <div className="topbar-controls">
        <div className="segmented-control">
          {TIMEFRAME_OPTIONS.map((item) => (
            <button
              key={item.id}
              className={`segment${timeframe === item.id ? ' is-active' : ''}`}
              onClick={() => onTimeframeChange(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="theme-toggle" onClick={onThemeToggle} type="button">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <div className="status-pill">
          <span className="status-dot" />
          Pods connected
        </div>

        <label className="api-field">
          <span>Gemini key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(event) => onApiKeyChange(event.target.value)}
            placeholder="demo"
          />
        </label>
      </div>
    </header>
  )
}
