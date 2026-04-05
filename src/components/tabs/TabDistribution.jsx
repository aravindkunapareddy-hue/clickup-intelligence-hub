import React from 'react'

export default function TabDistribution({ data, loading }) {
  if (loading) return (
    <div className="premium-card" style={{ height: '400px', display: 'grid', placeItems: 'center' }}>
      <div className="premium-neon-badge" style={{ color: 'var(--premium-neon-green)' }}>Optimizing Distribution Routes...</div>
    </div>
  )

  const distribution = data?.distribution || {
    priority: 'High Intensity',
    channels: [
      { name: 'Organic Search', focus: 'Keyword Capture', reach: '80%' },
      { name: 'LinkedIn Ads', focus: 'Retargeting Pricing Visitors', reach: '95%' },
      { name: 'Email Lifecycle', focus: 'Nurture Sequence', reach: '100%' },
      { name: 'Communities', focus: 'Subreddit/Slack Mentions', reach: '40%' },
    ]
  }

  return (
    <div className="tab-pane-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Distribution Intensity Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>📣</span>
            <span className="card-title">Distribution Intensity</span>
          </div>
          <div className="premium-card-body">
            <div className="premium-stat-label">Strategy Mode</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--premium-neon-purple)', marginBottom: '20px' }}>{distribution.priority}</div>
            
            <div style={{ background: 'rgba(0, 210, 255, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
              <div style={{ fontSize: '13px', lineHeight: 1.6 }}>Deploying a three-touch sequence built around migration proof, setup speed, and team rollout templates.</div>
            </div>
          </div>
        </div>

        {/* Channel Matrix Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🌐</span>
            <span className="card-title">Channel Strategic Matrix</span>
          </div>
          <div className="premium-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {distribution.channels.map(ch => (
                <div key={ch.name} style={{ background: 'var(--premium-dark-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--premium-dark-border)' }}>
                  <div className="premium-stat-label" style={{ marginBottom: '4px' }}>{ch.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{ch.focus}</div>
                  <div style={{ marginTop: '8px', height: '4px', background: 'var(--premium-dark-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: ch.reach, height: '100%', background: 'var(--premium-neon-blue)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paid / Organic Split Card */}
      <div className="premium-card">
        <div className="premium-card-header">
          <span style={{ fontSize: '18px' }}>📈</span>
          <span className="card-title">Strategic Allocation</span>
        </div>
        <div className="premium-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div>
              <div className="premium-stat-label">Organic (SEO)</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>65%</div>
            </div>
            <div>
              <div className="premium-stat-label">Paid (Social)</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>25%</div>
            </div>
            <div>
              <div className="premium-stat-label">Direct (Email)</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>10%</div>
            </div>
            <div>
              <div className="premium-stat-label">Target ROAS</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-green)' }}>4.2×</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
