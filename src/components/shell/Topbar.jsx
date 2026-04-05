import React from 'react'

export function ClickUpLogo({ width = "120", height = "40", showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width={width === "120" ? "32" : width} height={width === "120" ? "32" : height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 10L12 16L20 10L12 4Z" fill="url(#paint0_linear)" />
        <path d="M4 14C4 14 7.5 17.5 12 17.5C16.5 17.5 20 14 20 14" stroke="url(#paint1_linear)" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="paint0_linear" x1="4" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5DE1" />
            <stop offset="1" stopColor="#7B68EE" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="4" y1="15.75" x2="20" y2="15.75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7B68EE" />
            <stop offset="1" stopColor="#36B8F5" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
          Click<span style={{ color: '#fff' }}>Up</span>
        </span>
      )}
    </div>
  )
}

export default function Topbar({ currentLabel }) {
  return (
    <header className="cu-topbar">
      <div className="cu-topbar-left">
        <div className="cu-logo-wrap">
          <ClickUpLogo width="24" height="24" />
        </div>
        <span className="cu-topbar-separator" />
        <span className="cu-app-label">Content Lead Intelligence</span>
        <span className="cu-topbar-separator" />
        <span className="cu-breadcrumb-meta">{currentLabel}</span>
      </div>

      <div className="cu-topbar-right">
        <span className="cu-badge cu-badge--internal">INTERNAL · MARKETING</span>
        <span className="cu-badge cu-badge--model">Gemini 1.5 Flash</span>
        <div className="cu-avatar">SA</div>
      </div>
    </header>
  )
}
