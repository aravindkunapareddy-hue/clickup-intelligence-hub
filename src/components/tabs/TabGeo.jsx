import React from 'react'

export default function TabGeo({ data, loading }) {
  if (loading) return (
    <div className="premium-card" style={{ height: '400px', display: 'grid', placeItems: 'center' }}>
      <div className="premium-neon-badge" style={{ color: 'var(--premium-neon-purple)' }}>Benchmarking Discovery Velocity...</div>
    </div>
  )

  const geo = data?.geo || {
    citationShare: 24,
    topSources: ['ClickUp Blog', 'G2 Crowd', 'Reddit r/MarketingOps'],
    discoveryIntent: 'Problem/Solution ↗ Direct Recommendation'
  }

  return (
    <div className="tab-pane-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '20px', marginBottom: '20px' }}>
        
        {/* Answer Engine Share Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🤖</span>
            <span className="card-title">Answer Engine Citation Share</span>
          </div>
          <div className="premium-card-body" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--premium-neon-purple)', marginBottom: '8px' }}>{geo.citationShare}%</div>
            <div className="premium-stat-label">Discovery Share (Gemini/Perplexity)</div>
            <div style={{ marginTop: '24px', height: '8px', background: 'var(--premium-dark-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${geo.citationShare}%`, height: '100%', background: 'var(--premium-neon-purple)' }}></div>
            </div>
          </div>
        </div>

        {/* Discovery Influence Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>💎</span>
            <span className="card-title">Discovery Influence Channels</span>
          </div>
          <div className="premium-card-body">
            <div className="premium-stat-label">Core Strategic Intent</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>{geo.discoveryIntent}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div className="premium-stat-label">Top Citations</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {geo.topSources.map(s => (
                    <div key={s} style={{ fontSize: '12px', color: 'var(--premium-neon-blue)' }}>{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="premium-stat-label">Model Reciprocity</div>
                <div style={{ fontSize: '13px', color: 'var(--premium-neon-green)' }}>High (94%) ↗</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Benchmarking */}
      <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.05), rgba(0, 210, 255, 0.05))' }}>
        <div className="premium-card-header">
          <span style={{ fontSize: '18px' }}>⚡</span>
          <span className="card-title">GEO Visibility Metrics</span>
        </div>
        <div className="premium-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div>
              <div className="premium-stat-label">Entity Rank</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>#3</div>
            </div>
            <div>
              <div className="premium-stat-label">Trust Score</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-green)' }}>A+</div>
            </div>
            <div>
              <div className="premium-stat-label">Topic Authority</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>98%</div>
            </div>
            <div>
              <div className="premium-stat-label">AI Mentions/day</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-purple)' }}>420+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
