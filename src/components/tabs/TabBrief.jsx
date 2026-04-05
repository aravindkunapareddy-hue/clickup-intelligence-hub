import React from 'react'
import { CTA_STRATEGY_MAP } from '../../data/intelligence.js'

export default function TabBrief({ contact }) {
  const strategy = CTA_STRATEGY_MAP[contact.name] || CTA_STRATEGY_MAP['Sarah Chen']

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '32px' }}>
      
      {/* Main Strategy Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* I. Content Objective */}
        <div className="luxury-card" style={{ padding: '32px', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '8px', background: 'rgba(123, 104, 238, 0.1)', borderRadius: '8px', fontSize: '18px' }}>📝</div>
             <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Content <span className="luxury-neon-purple">Objective</span></h3>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', marginBottom: '4px', textTransform: 'uppercase' }}>WORKING TITLE</div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>{contact.topicCluster} Platform Migration Guide</h2>
          <div style={{ padding: '20px', background: 'rgba(10, 10, 10, 0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: 1.6 }}>Accelerate vendor evaluation by solving the "migration fear" roadblock. Focus on high-intent signals tied to {contact.topicCluster} to route this Lead into our migration template.</p>
          </div>
        </div>

        {/* II. Primary Action Strategy (NEW) */}
        <div className="luxury-card" style={{ padding: '32px', border: '1px solid rgba(54, 184, 245, 0.2)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <div style={{ padding: '8px', background: 'rgba(54, 184, 245, 0.1)', borderRadius: '8px', fontSize: '18px' }}>🎯</div>
             <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Primary Action <span className="luxury-neon-purple">Architecture</span></h3>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(54, 184, 245, 0.05)', borderRadius: '12px' }}>
                 <div style={{ fontSize: '10px', fontWeight: 800, color: '#36B8F5', marginBottom: '4px' }}>PRIMARY CTA</div>
                 <div style={{ fontSize: '14px', fontWeight: 900 }}>{strategy.primary}</div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255, 93, 225, 0.05)', borderRadius: '12px' }}>
                 <div style={{ fontSize: '10px', fontWeight: 800, color: '#FF5DE1', marginBottom: '4px' }}>SECONDARY CTA</div>
                 <div style={{ fontSize: '14px', fontWeight: 900 }}>{strategy.secondary}</div>
              </div>
           </div>

           <div style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', marginBottom: '8px', textTransform: 'uppercase' }}>PLACEMENT LOGIC</div>
           <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>{strategy.placement}</div>
           
           <div style={{ pading: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', marginBottom: '4px' }}>STRATEGIC RATIONALE</div>
              <div style={{ color: '#a1a1aa', fontSize: '13px' }}>{strategy.rationale}</div>
           </div>
        </div>

      </div>

      {/* Sidebar Inputs */}
      <div>
        <div className="luxury-card" style={{ padding: '24px', marginBottom: '32px' }}>
           <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '16px', textTransform: 'uppercase' }}>Brief Inputs</h4>
           <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', color: '#71717a', fontWeight: 800, display: 'block', marginBottom: '8px' }}>TARGET KEYWORD</label>
              <div className="luxury-card" style={{ padding: '12px', background: '#000', fontSize: '13px', fontWeight: 700 }}>{contact.topicCluster} platform</div>
           </div>
           <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', color: '#71717a', fontWeight: 800, display: 'block', marginBottom: '8px' }}>CONTENT POD</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                 <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(54, 184, 245, 0.1)', color: '#36B8F5', fontSize: '11px', fontWeight: 800, textAlign: 'center' }}>SEO BLOG</div>
                 <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', color: '#71717a', fontSize: '11px', fontWeight: 800, textAlign: 'center' }}>YOUTUBE</div>
              </div>
           </div>
        </div>

        <div className="luxury-card" style={{ padding: '24px' }}>
           <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '16px', textTransform: 'uppercase' }}>Distribution Logic</h4>
           <div style={{ color: '#a1a1aa', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🚀 <span>Twitter/LinkedIn Thread</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📧 <span>Post-Click Lifecycle</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🔥 <span>AE Outreach Kit</span></div>
           </div>
        </div>
      </div>

    </div>
  )
}
