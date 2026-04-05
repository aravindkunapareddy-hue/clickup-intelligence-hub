import React from 'react'
import { CONTENT_PODS, INTELLIGENCE_NAV, SPACE_ITEMS } from '../../data/intelligence.js'

function ClickUpLogoSmall() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px', marginBottom: '12px' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 10L12 16L20 10L12 4Z" fill="url(#paint0_linear_side)" />
        <path d="M4 14C4 14 7.5 17.5 12 17.5C16.5 17.5 20 14 20 14" stroke="url(#paint1_linear_side)" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="paint0_linear_side" x1="4" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5DE1" />
            <stop offset="1" stopColor="#7B68EE" />
          </linearGradient>
          <linearGradient id="paint1_linear_side" x1="4" y1="15.75" x2="20" y2="15.75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7B68EE" />
            <stop offset="1" stopColor="#36B8F5" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>ClickUp</span>
    </div>
  )
}

function SidebarIcon({ name }) {
  const paths = {
    target: <path d="M8 2.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 8 2.5Zm0 2a3.5 3.5 0 1 1-3.5 3.5A3.5 3.5 0 0 1 8 4.5Zm0 1.75a1.75 1.75 0 1 0 1.75 1.75A1.75 1.75 0 0 0 8 6.25Z" />,
    chart: <path d="M2.5 12.5h11M4 10V7.5M7.5 10V4.5M11 10V6.25" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    memo: <path d="M4.5 3.5h7l2 2v7H4.5Z M6 6.5h6M6 8.75h6M6 11h4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    lock: <path d="M5.5 7V5.8a2.5 2.5 0 0 1 5 0V7M4.75 7h6.5v5.5h-6.5z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default function Sidebar({ activePage, activePod, onNavigate }) {
  return (
    <aside className="cu-sidebar">
      <div className="cu-sidebar-scroll">
        <ClickUpLogoSmall />
        
        <div className="cu-sidebar-section">
          <div className="cu-sidebar-label">Intelligence</div>
          {INTELLIGENCE_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`cu-sidebar-item${activePage === item.id ? ' is-active' : ''}${item.locked ? ' is-locked' : ''}`}
              onClick={() => !item.locked && onNavigate(item.id)}
            >
              <span className="cu-sidebar-icon"><SidebarIcon name={item.icon} /></span>
              <span>{item.label}</span>
              {item.badge ? <span className="cu-sidebar-count">{item.badge}</span> : null}
            </button>
          ))}
        </div>

        <div className="cu-sidebar-divider" />

        <div className="cu-sidebar-section">
          <div className="cu-sidebar-label">Content Pods</div>
          {CONTENT_PODS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`cu-sidebar-item${activePod === item.id ? ' is-active' : ''}`}
              onClick={() => onNavigate('pod', item.id)}
            >
              <span className="cu-sidebar-icon">{item.label.startsWith('SEO') ? '✍️' : item.id === 'youtube' ? '🎥' : item.id === 'customer' ? '⭐' : '📣'}</span>
              <span>{item.label}</span>
              {item.count ? <span className="cu-sidebar-count">{item.count}</span> : null}
            </button>
          ))}
        </div>

        <div className="cu-sidebar-divider" />

        <div className="cu-sidebar-section">
          <div className="cu-sidebar-label">Spaces</div>
          {SPACE_ITEMS.map((item) => (
            <button key={item.id} type="button" className="cu-sidebar-item cu-sidebar-item--space">
              <span className="cu-space-dot" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cu-sidebar-footer">
        <div className="cu-sidebar-divider" />
        <div className="cu-user-row">
          <div className="cu-avatar cu-avatar--small">SA</div>
          <div>
            <div className="cu-user-name">Sai Aravind</div>
            <div className="cu-user-role">Marketing Ops</div>
          </div>
          <span className="cu-settings-icon">⚙</span>
        </div>
      </div>
    </aside>
  )
}
