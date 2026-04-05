import React from 'react';

export function Card({ children, style }) {
  return (
    <div className="glass-panel" style={{ 
      background: 'rgba(255,255,255,0.03)', 
      border: '1px solid rgba(255,255,255,0.05)', 
      borderRadius: 16, 
      padding: 0,
      overflow: 'hidden',
      ...style 
    }}>
      {children}
    </div>
  );
}

export function CardHeader({ icon, title, action }) {
  return (
    <div style={{ 
      padding: '16px 20px', 
      borderBottom: '1px solid rgba(255,255,255,0.05)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: 'rgba(255,255,255,0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {icon}
        <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, style }) {
  return (
    <div style={{ padding: 20, ...style }}>
      {children}
    </div>
  );
}
