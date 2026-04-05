import React from 'react'

export default function TabExecution({ data, loading }) {
  if (loading) return (
    <div className="premium-card" style={{ height: '400px', display: 'grid', placeItems: 'center' }}>
      <div className="premium-neon-badge" style={{ color: 'var(--premium-neon-green)' }}>Syncing CMS Execution Hub...</div>
    </div>
  )

  const assets = [
    { type: 'Blog Post', title: 'The 2024 Migration Checklist', status: 'READY', owner: 'SEO Pod' },
    { type: 'Comparison', title: 'ClickUp vs Asana: Migration ROI', status: 'IN_DESIGN', owner: 'Brand Pod' },
    { type: 'YouTube', title: 'How to move 1000+ tasks in 5 mins', status: 'SCRIPTING', owner: 'Video Pod' },
    { type: 'Email', title: 'Nurture: From Vendor Fear to Setup Speed', status: 'READY', owner: 'Lifecycle' },
  ]

  return (
    <div className="tab-pane-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px', marginBottom: '20px' }}>
        
        {/* Execution Matrix Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>⚙️</span>
            <span className="card-title">Asset Deployment Matrix</span>
          </div>
          <div className="premium-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {assets.map((asset, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--premium-dark-surface)', borderRadius: '12px', border: '1px solid var(--premium-dark-border)' }}>
                  <div style={{ width: '80px', fontSize: '10px', color: 'var(--premium-dark-text-muted)' }}>{asset.type}</div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 600 }}>{asset.title}</div>
                  <div className="premium-neon-badge" style={{ 
                    fontSize: '9px', 
                    color: asset.status === 'READY' ? 'var(--premium-neon-green)' : asset.status === 'IN_DESIGN' ? 'var(--premium-neon-blue)' : '#a1a1aa' ,
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}>
                    {asset.status.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CMS Sync Status Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🔄</span>
            <span className="card-title">CMS Sync & API Status</span>
          </div>
          <div className="premium-card-body">
            <div className="premium-stat-label">System Health</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-green)', marginBottom: '24px' }}>OPERATIONAL (99.9%)</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div className="premium-stat-label">Wordpress Sync</div>
                <div style={{ fontSize: '13px', color: '#fff' }}>Online 🚀</div>
              </div>
              <div>
                <div className="premium-stat-label">YouTube API</div>
                <div style={{ fontSize: '13px', color: '#fff' }}>Connected 🏁</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Load */}
      <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(0, 210, 255, 0.05))' }}>
        <div className="premium-card-header">
          <span style={{ fontSize: '18px' }}>🧵</span>
          <span className="card-title">Production Thread Velocity</span>
        </div>
        <div className="premium-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div>
              <div className="premium-stat-label">Total Load</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>18.2%</div>
            </div>
            <div>
              <div className="premium-stat-label">Active Gaps</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-red)' }}>3</div>
            </div>
            <div>
              <div className="premium-stat-label">CMS Drafts</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>12</div>
            </div>
            <div>
              <div className="premium-stat-label">Scheduled</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-blue)' }}>8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
