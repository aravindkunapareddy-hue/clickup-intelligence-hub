import React from 'react'

const TABS = [
  { id: 'brief', label: 'Brief' },
  { id: 'serp', label: 'Research' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'execution', label: 'Execution' },
  { id: 'seo', label: 'SEO' },
  { id: 'geo', label: 'GEO' },
]

export default function ContentHeader({
  activeTab,
  onTabChange,
  generated,
  apiKey,
  onApiKeyChange,
  onSaveBrief,
  onNewBrief,
}) {
  return (
    <div className="content-header">
      <div className="content-header-main">
        <div>
          <div className="content-header-eyebrow">Brief workspace</div>
          <h1 className="content-header-title">Content Revenue Orchestrator</h1>
          <p className="content-header-copy">
            A focused ClickUp-style workspace for turning one input into a structured, usable plan.
          </p>
        </div>

        <div className="content-header-controls">
          <label className="api-key-field">
            <span className="api-key-label">Gemini API key</span>
            <input
              type="password"
              placeholder="Use demo for mock data"
              value={apiKey}
              onChange={(event) => onApiKeyChange(event.target.value)}
            />
          </label>

          <div className="content-header-actions">
            <button className="secondary-button" onClick={onNewBrief} type="button">
              Reset
            </button>
            <button className="primary-button" disabled={!generated} onClick={onSaveBrief} type="button">
              Save brief
            </button>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
