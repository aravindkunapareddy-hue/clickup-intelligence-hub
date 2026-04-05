import React from 'react';

export default function Badge({ children, variant = 'gray' }) {
  const styles = {
    gray: { background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' },
    blue: { background: 'rgba(54, 184, 245, 0.1)', color: '#36B8F5', border: '1px solid rgba(54, 184, 245, 0.2)' },
    green: { background: 'rgba(5, 150, 105, 0.1)', color: '#10B981', border: '1px solid rgba(5, 150, 105, 0.2)' },
    purple: { background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', border: '1px solid rgba(139, 92, 246, 0.2)' },
    pink: { background: 'rgba(255, 2, 240, 0.1)', color: '#FF02F0', border: '1px solid rgba(255, 2, 240, 0.2)' },
    amber: { background: 'rgba(217, 119, 6, 0.1)', color: '#D97706', border: '1px solid rgba(217, 119, 6, 0.2)' },
    red: { background: 'rgba(220, 38, 38, 0.1)', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.2)' },
  };

  const style = styles[variant] || styles.gray;

  return (
    <span style={{
      padding: '2px 10px',
      borderRadius: '99px',
      fontSize: '11px',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      ...style
    }}>
      {children}
    </span>
  );
}
