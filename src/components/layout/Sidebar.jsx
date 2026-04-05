import React from 'react'
import Icon from '../ui/Icon.jsx'
import { NAV_ITEMS } from '../../data/intelligence.js'

const ICONS = {
  onboarding: 'cpu',
  overview: 'chart',
  scorer: 'target',
  intelligence: 'search',
  execution: 'check_square',
}

export default function Sidebar({ activeView, onboardingComplete, onNavigate, onboarding }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-block">
        <div className="sidebar-label">Flows</div>
        <div className="nav-stack">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              className={`nav-card${activeView === item.id ? ' is-active' : ''}${!onboardingComplete && item.id !== 'onboarding' ? ' is-locked' : ''}`}
              onClick={() => {
                if (onboardingComplete || item.id === 'onboarding') onNavigate(item.id)
              }}
              type="button"
            >
              <div className="nav-card-index">0{index + 1}</div>
              <div className="nav-card-icon">
                <Icon name={ICONS[item.id]} size={16} />
              </div>
              <div className="nav-card-copy">
                <div className="nav-card-title">{item.label}</div>
                <div className="nav-card-description">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-block">
        <div className="sidebar-label">Operating context</div>
        <div className="context-card">
          <div className="context-title">Current operator</div>
          <div className="context-value">{onboarding.userRole}</div>
          <div className="context-title">Content pod focus</div>
          <div className="context-value">{onboarding.priorityPod}</div>
          <div className="context-title">Outcome</div>
          <div className="context-value">{onboarding.outcome}</div>
          <div className="context-title">Connected sources</div>
          <div className="tag-list">
            {onboarding.sources.map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-footnote">
        Built for the ClickUp content team to see performance, gaps, and next bets in one system.
      </div>
    </aside>
  )
}
