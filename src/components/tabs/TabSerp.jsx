import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function TabSerp({ data, loading }) {
  if (loading) return (
    <div className="premium-card" style={{ height: '400px', display: 'grid', placeItems: 'center' }}>
      <div className="premium-neon-badge" style={{ color: 'var(--premium-neon-blue)' }}>Analyzing SERP Signals...</div>
    </div>
  )

  const serp = data?.serp || {
    marketShare: [
      { name: 'Asana', share: 28, color: 'var(--premium-neon-red)' },
      { name: 'Monday', share: 22, color: 'var(--premium-neon-blue)' },
      { name: 'ClickUp', share: 18, color: 'var(--premium-neon-purple)' },
      { name: 'Smartsheet', share: 12, color: '#a1a1aa' },
    ],
    gaps: ['Workflow Templates', 'Role-based Migration', 'ROI Calculators'],
    intent: 'Informational ↗ Commercial'
  }

  return (
    <div className="tab-pane-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '20px', marginBottom: '20px' }}>
        
        {/* Marketplace Share Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🌐</span>
            <span className="card-title">SERP Marketplace Share</span>
          </div>
          <div className="premium-card-body" style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serp.marketShare} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 11 }} width={80} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#121217', border: '1px solid #27272a', borderRadius: '8px' }} />
                <Bar dataKey="share" radius={[0, 4, 4, 0]} barSize={16}>
                  {serp.marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategic Gaps Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🔎</span>
            <span className="card-title">Content Gap Analysis</span>
          </div>
          <div className="premium-card-body">
            <div className="premium-stat-label">SERP Search Intent</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>{serp.intent}</div>
            
            <div className="premium-stat-label">Identified Gaps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {serp.gaps.map(gap => (
                <div key={gap} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--premium-neon-purple)' }}></div>
                  <div style={{ fontSize: '13px' }}>{gap}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Landing Matrix */}
      <div className="premium-card">
        <div className="premium-card-header">
          <span style={{ fontSize: '18px' }}>⚔️</span>
          <span className="card-title">Competitor Landing Matrix</span>
        </div>
        <div className="premium-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {serp.marketShare.map(m => (
              <div key={m.name}>
                <div className="premium-stat-label" style={{ color: m.color }}>{m.name} Focus</div>
                <div style={{ fontSize: '12px', lineHeight: 1.4 }}>Feature parity and enterprise robustness messaging.</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
