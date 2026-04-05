import React from 'react';

export default function ProgressBar({ value, color = '#36B8F5', height = 4 }) {
  return (
    <div style={{ width: '100%', height, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
    </div>
  );
}
