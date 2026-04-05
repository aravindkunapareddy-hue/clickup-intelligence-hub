import React from 'react'

export default function TabSeoMetadata({ data, loading }) {
  if (loading) return (
    <div className="premium-card" style={{ height: '400px', display: 'grid', placeItems: 'center' }}>
      <div className="premium-neon-badge" style={{ color: 'var(--premium-neon-blue)' }}>Extracting SEO Metadata...</div>
    </div>
  )

  const metadata = data?.seo || {
    title: 'Migration Guide: Marketing Operations Software (2024)',
    desc: 'The complete marketing operations platform migration guide. Why ClickUp is the primary destination for Asana and Monday teams moving in 2024.',
    slug: '/marketing-ops-migration-guide',
    keywords: ['marketing ops', 'software migration', 'project management'],
    schema: 'Article, FAQ, Product Comparison'
  }

  return (
    <div className="tab-pane-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '20px', marginBottom: '20px' }}>
        
        {/* SERP Meta Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🤖</span>
            <span className="card-title">SERP Meta & Appearance</span>
          </div>
          <div className="premium-card-body">
            <div style={{ padding: '24px', background: 'var(--premium-dark-surface)', borderRadius: '16px', border: '1px solid var(--premium-dark-border)' }}>
              <div style={{ fontSize: '18px', color: 'var(--premium-neon-blue)', fontWeight: 600, marginBottom: '8px' }}>{metadata.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--premium-neon-green)', marginBottom: '8px' }}>https://clickup.com{metadata.slug}</div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--premium-dark-text-muted)' }}>{metadata.desc}</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
              <div>
                <div className="premium-stat-label">Canonical Tag</div>
                <div style={{ fontSize: '11px' }}>https://clickup.com{metadata.slug}</div>
              </div>
              <div>
                <div className="premium-stat-label">Breadcrumb (JSON-LD)</div>
                <div style={{ fontSize: '11px' }}>Resource &gt; Marketing Ops &gt; Migration</div>
              </div>
            </div>
          </div>
        </div>

        {/* LSI & Semantic Card */}
        <div className="premium-card">
          <div className="premium-card-header">
            <span style={{ fontSize: '18px' }}>🧬</span>
            <span className="card-title">Semantic SEO & LSI Keywords</span>
          </div>
          <div className="premium-card-body">
            <div className="premium-stat-label">Primary LSI Clusters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {metadata.keywords.map(kw => (
                <div key={kw} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--premium-neon-blue)' }}></div>
                  <div style={{ fontSize: '13px' }}>{kw}</div>
                </div>
              ))}
            </div>
            
            <div className="premium-stat-label">Schema Markup</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{metadata.schema}</div>
          </div>
        </div>
      </div>

      {/* Semantic Entities Card */}
      <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(167, 139, 250, 0.05))' }}>
        <div className="premium-card-header">
          <span style={{ fontSize: '18px' }}>🧠</span>
          <span className="card-title">Entity Salience & Density Engine</span>
        </div>
        <div className="premium-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div>
              <div className="premium-stat-label">Entity Count</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>42</div>
            </div>
            <div>
              <div className="premium-stat-label">Semantic Score</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-green)' }}>92/100</div>
            </div>
            <div>
              <div className="premium-stat-label">Readability</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Grade 8</div>
            </div>
            <div>
              <div className="premium-stat-label">NLP Ready</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--premium-neon-blue)' }}>YES 🏁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
