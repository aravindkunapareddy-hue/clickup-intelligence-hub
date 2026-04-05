import React from 'react'

export default function OperatingState({ type, title, message, icon, onAction, actionLabel }) {
  
  if (type === 'SKELETON_TABLE') {
    return (
      <div style={{ padding: '0 32px' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="gtm-skeleton" style={{ width: '200px', height: '16px' }} />
            <div className="gtm-skeleton" style={{ width: '120px', height: '16px' }} />
            <div className="gtm-skeleton" style={{ width: '80px', height: '16px' }} />
            <div className="gtm-skeleton" style={{ width: '140px', height: '16px', marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'SKELETON_BLOCK') {
    return <div className="gtm-skeleton" style={{ width: '100%', height: '100%', borderRadius: '12px' }} />
  }

  const getStatusStyle = () => {
    switch (type) {
      case 'ERROR': return { borderColor: 'var(--status-negative)', background: '#fff' };
      case 'PARTIAL': return { borderColor: 'var(--status-warning)', background: '#fff' };
      case 'EMPTY': return { borderColor: 'var(--border-main)', background: 'var(--bg-primary)' };
      default: return { borderColor: 'var(--border-main)', background: '#fff' };
    }
  }

  const getIcon = () => {
    if (icon) return icon
    switch (type) {
      case 'ERROR': return '⚠️';
      case 'PARTIAL': return '📡';
      case 'EMPTY': return '🔍';
      default: return '❄️';
    }
  }

  return (
    <div className="gtm-status-placard fade-in" style={getStatusStyle()}>
      <div style={{ fontSize: '32px', marginBottom: '20px' }}>{getIcon()}</div>
      <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', color: 'var(--text-main)' }}>{title || 'Status Update'}</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '24px' }}>
        {message || 'Synchronizing with external data sources...'}
      </p>
      {onAction && actionLabel && (
        <button 
          onClick={onAction} 
          className="gtm-button-primary" 
          style={{ padding: '10px 24px', fontSize: '12px' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
