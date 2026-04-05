import React from 'react';

export default function InsightBar({ label, value, color = '#36B8F5', suffix = '%' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{value}{suffix}</span>
      </div>
      <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, transition: 'width 0.6s' }} />
      </div>
    </div>
  );
}
