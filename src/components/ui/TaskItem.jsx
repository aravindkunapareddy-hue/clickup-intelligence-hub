import React from 'react'

const PRIORITY_COLORS = {
  high: '#F43F5E',
  medium: '#F59E0B',
  low: '#10B981'
}

export default function TaskItem({ priority, content, meta }) {
  const normalizedPriority = (priority || '').toLowerCase()
  const color = PRIORITY_COLORS[normalizedPriority] || '#64748B'
  
  return (
    <div className="task-item" style={{ 
      display: 'flex', 
      gap: 16, 
      padding: '14px 0', 
      borderBottom: '1px solid var(--border)',
      alignItems: 'flex-start'
    }}>
      <div style={{ 
        width: 12, 
        height: 12, 
        borderRadius: 4, 
        background: color, 
        marginTop: 4, 
        boxShadow: `0 0 10px ${color}40`,
        flexShrink: 0
      }} />
      <div style={{ flex: 1 }}>
        <p className="task-name" style={{ 
          fontSize: 14, 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          marginBottom: 4,
          lineHeight: 1.4 
        }}>
          {content}
        </p>
        <div className="task-meta" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{priority}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{meta}</span>
        </div>
      </div>
    </div>
  )
}
