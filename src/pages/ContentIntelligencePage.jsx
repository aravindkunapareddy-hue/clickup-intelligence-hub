import React, { useState, useEffect } from 'react'

export default function ContentIntelligencePage({ context }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const STEPS = [
    { label: 'Primary Issue', icon: '🚨' },
    { label: 'Insight Summary', icon: '💡' },
    { label: 'Recommended Action', icon: '🎯' },
    { label: 'Owner Pod', icon: '👥' },
    { label: 'Hypothesis', icon: '🧪' },
    { label: 'KPI to Watch', icon: '📈' },
    { label: 'Generated Deliverable', icon: '📄' }
  ]

  const generateStrategy = () => {
    setIsGenerating(true)
    let current = 0
    const interval = setInterval(() => {
      if (current >= STEPS.length) {
        clearInterval(interval)
        setIsGenerating(false)
      } else {
        setActiveStep(current)
        current++
      }
    }, 400)
  }

  useEffect(() => {
    if (context) generateStrategy()
  }, [context])

  return (
    <div className="fade-in" style={{ padding: '60px 80px' }}>
      
      {/* 1. STUDIO HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
         <div>
            <div className="section-label">PHASE 3: ACT</div>
            <h1 className="page-title" style={{ marginTop: '8px' }}>Intelligence <span style={{ color: 'var(--accent-main)' }}>Studio</span></h1>
            <p className="page-subtitle">Generating context-aware GTM briefs and scripts from upstream signals.</p>
         </div>
         <div className="source-indicator" style={{ background: '#fcfdfe', border: '1px solid var(--border-main)', padding: '12px 24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>ENGINE STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--accent-main)', marginTop: '4px' }}>GEMINI 1.5 PRO: READY</div>
         </div>
      </div>

      {/* 2. SIGNAL BASIS (THE TRACEABILITY PANEL) */}
      {context && (
        <div className="gtm-card" style={{ padding: '32px', borderLeft: '4px solid var(--accent-main)', marginBottom: '40px', background: '#f8fafc' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900 }}>Signal <span style={{ color: 'var(--accent-main)' }}>Traceability Basis</span></h3>
              <div className="confidence-badge">92% CONFIDENCE</div>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              <div>
                 <div className="section-label">ASSET ORIGIN</div>
                 <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '4px' }}>{context.asset}</div>
              </div>
              <div>
                 <div className="section-label">DETECTED SIGNAL</div>
                 <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '4px', color: 'var(--accent-main)' }}>{context.sourceSignal || 'GSC: ORGANIC_PEAK'}</div>
              </div>
              <div>
                 <div className="section-label">PRIMARY ISSUE</div>
                 <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '4px', color: 'var(--status-negative)' }}>{context.issue}</div>
              </div>
              <div>
                 <div className="section-label">SCORING LIFT</div>
                 <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '4px', color: 'var(--status-warning)' }}>{context.scoringImpact || '+12 Heat'}</div>
              </div>
           </div>
        </div>
      )}

      {/* 3. GENERATION ENGINE */}
      {!context ? (
        <div className="gtm-card" style={{ textAlign: 'center', padding: '100px 40px', border: '2px dashed var(--border-main)', background: 'transparent' }}>
           <div style={{ fontSize: '48px', marginBottom: '24px' }}>🤖</div>
           <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Studio is <span style={{ color: 'var(--text-muted)' }}>Idle</span></h2>
           <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '12px', maxWidth: '480px', marginInline: 'auto' }}>
              Navigate to the <strong>Signal Hubs</strong> or <strong>Opportunity Hub</strong> to deploy context into the intelligence studio.
           </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '40px' }}>
           
           {/* Progress Sidebar */}
           <div className="gtm-card" style={{ padding: '32px' }}>
              <div className="section-label">GENERATION PIPELINE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                 {STEPS.map((s, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: i <= activeStep ? 1 : 0.3, transition: 'all 0.4s ease' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i < activeStep ? 'var(--status-positive)' : i === activeStep ? 'var(--accent-main)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontSize: '14px', color: i <= activeStep ? '#fff' : '#94a3b8' }}>{i < activeStep ? '✓' : s.icon}</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: i <= activeStep ? 'var(--text-main)' : 'var(--text-muted)' }}>{s.label}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Results Viewer */}
           <div className="decision-card" style={{ margin: 0, padding: '48px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                 <div className="tag-badge" style={{ background: 'var(--accent-main)', color: '#fff' }}>DEPLOYMENT READY</div>
                 <div style={{ fontSize: '11px', color: '#94a3b8' }}>GENERATED: NOW</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                 {/* Field 1: Primary Issue */}
                 {activeStep >= 0 && (
                   <div className="fade-in">
                      <div className="section-label" style={{ color: 'var(--status-negative)' }}>1. PRIMARY ISSUE</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, marginTop: '12px' }}>{context.issue}</div>
                   </div>
                 )}

                 {/* Field 2: Insight Summary */}
                 {activeStep >= 1 && (
                   <div className="fade-in">
                      <div className="section-label">2. ANALYTICAL INSIGHT</div>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569', marginTop: '12px' }}>{context.details.why}</p>
                   </div>
                 )}

                 {/* Field 3: Recommended Action */}
                 {activeStep >= 2 && (
                   <div className="fade-in">
                      <div className="section-label" style={{ color: 'var(--accent-main)' }}>3. RECOMMENDED ACTION</div>
                      <div style={{ padding: '20px', background: '#fcfdfe', border: '1.2px dashed var(--accent-main)', borderRadius: '12px', marginTop: '12px' }}>
                         <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--accent-main)' }}>{context.action}</div>
                      </div>
                   </div>
                 )}

                 {/* Field 7: Deliverable */}
                 {activeStep >= 6 && (
                   <div className="fade-in">
                      <div className="section-label">4. GENERATED TACTICAL DELIVERABLE</div>
                      <div style={{ padding: '32px', background: '#0f172a', borderRadius: '16px', color: '#cbd5e1', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, marginTop: '16px' }}>
                         {context.details.brief}
                         <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #334155', color: '#64748b', fontSize: '10px' }}>
                            // SIGNAL BASIS: {context.sourceSignal}<br/>
                            // KPI TRACKED: {context.details.kpi}<br/>
                            // TARGET PERSONA: {context.persona || 'VP Account'}
                         </div>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                         <button className="gtm-button-primary" style={{ flex: 1, padding: '16px' }}>DEPLOY TO CMS (SLACK) →</button>
                         <button className="gtm-button-secondary" style={{ flex: 1, padding: '16px', border: '1.5px solid #e2e8f0' }}>EXPORT TO TICKET (JIRA)</button>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  )
}
