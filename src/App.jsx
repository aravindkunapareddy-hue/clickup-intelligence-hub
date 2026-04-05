import React, { useState, useEffect } from 'react'
import { GLOBAL_FILTERS } from './data/intelligence.js'

// Import Pages
import PodWorkspacePage from './pages/PodWorkspacePage.jsx'
import ContentIntelligencePage from './pages/ContentIntelligencePage.jsx'
import LeadScorerPage from './pages/LeadScorerPage.jsx'

// Import Views
import ExecutiveOverview from './components/views/ExecutiveOverview.jsx'
import CTAIntelligence from './components/views/CTAIntelligence.jsx'
import PersonaSignals from './components/views/PersonaSignals.jsx'
import OpportunityQueue from './components/views/OpportunityQueue.jsx'
import GTMComparisons from './components/views/GTMComparisons.jsx'

const SidebarIcon = ({ id, active }) => {
  const color = active ? 'var(--accent-main)' : 'currentColor'
  const size = 18

  const icons = {
    executive: <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v10h-2V7zm-4 3h2v7H7v-7zm8 4h2v3h-2v-3z" />,
    seo: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 3.5L18.5 8H14zM11.5 13H15v1.5h-3.5zm0 3H15v1.5h-3.5zm-2.5-3h1.5v1.5H9zm0 3h1.5v1.5H9z" />,
    youtube: <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 2.9 2.9 0 0 0-.46-5.33zM9.75 15.02V8.48L15.45 11.75z" />,
    cta: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />,
    comparisons: <path d="M16 3h5v5h-2V5h-3zm-7 0h2v18H9zm-5 0h5v2H6v3H4zM21 16h-2v3h-3v2h5zM4 16h2v3h3v2H4z" />,
    signals: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.5-3.5-.5-3.5S7 7 7 9.5c0 1.38 1.5 2 1.5 5zm4.5 1.5c-4 0-5.5-3.5-3-5.5 0 0-1.5 1.5-1.5 3s.5 2 1.5 2 2-1 2-1z" />,
    scorer: <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6zM18 9h1.5a2.5 2.5 0 0 0 0-5H18zM4 22h16v-2H4zm11-13V4h-6v5c0 1.66 1.34 3 3 3s3-1.34 3-3z" />,
    queue: <path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2zm0 2H3v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm-9 6l-4-4h8l-4 4z" />,
    studio: <path d="M12 3L4 12h7v9l8-9h-7z" />,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
      {icons[id] || <circle cx="12" cy="12" r="10" />}
    </svg>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState('executive')
  const [selectedContext, setSelectedContext] = useState({ 
    asset: 'Enterprise Security Whitepaper', 
    type: 'LEAK',
    details: 'Revenue Leak: $1.4M' 
  })
  const [modal, setModal] = useState({ isOpen: false, title: '', content: '' })
  const [lastSync, setLastSync] = useState('0m ago')
  const [syncStatus, setSyncStatus] = useState('LIVE')
  const [demoMode, setDemoMode] = useState(true)
  const [activePersona, setActivePersona] = useState('ALL PERSONAS')
  const [activeICP, setActiveICP] = useState('ALL SEGMENTS')

  // Demo Navigation Shortcuts (One-Click Reveal)
  const revealLeadScorer = () => setActivePage('scorer')
  const revealContentIntel = () => setActivePage('cta')

  // Browser Navigation Stability
  useEffect(() => {
    const handlePopState = () => {
      const page = window.location.hash.replace('#', '') || 'executive'
      setActivePage(page)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    window.location.hash = activePage
  }, [activePage])

  const SECTIONS = [
    { id: 'executive', label: 'Executive Overview', group: 'SIGNAL' },
    { id: 'seo', label: 'SEO Content Hub', group: 'SIGNAL' },
    { id: 'youtube', label: 'YouTube Hub', group: 'SIGNAL' },
    { id: 'cta', label: 'CTA Intelligence', group: 'SIGNAL' },
    { id: 'comparisons', label: 'GTM Comparisons', group: 'SIGNAL' },
    { id: 'signals', label: 'Persona & Accounts', group: 'SCORE' },
    { id: 'scorer', label: 'Lead Scorer', group: 'SCORE' },
    { id: 'queue', label: 'Opportunity Hub', group: 'ACT' },
    { id: 'studio', label: 'Intelligence Studio', group: 'ACT' },
  ]

  const triggerAction = (context) => {
    // Demo Scenario Triggers
    if (context.type === 'LEAK' || context.priority === 'CRITICAL') {
      setActivePage('queue')
      setSelectedContext({ asset: context.asset || 'Enterprise Security Whitepaper', highlight: true })
      return
    }
    if (context.type === 'INTENT') {
      setActivePage('scorer')
      return
    }
    if (context.type === 'DEPLOY' || context.action?.includes('STUDIO')) {
      setActivePage('studio')
      setSelectedContext({ 
        asset: context.asset || 'YouTube: Agile Governance', 
        why: context.issue || context.why || 'Conversion Mismatch Detected',
        impact: context.lift || context.impact || '↑ 1.2pt Conv'
      })
      return
    }

    // Deep Dive: If it has details, go to Studio.
    if (context.details) {
      setSelectedContext(context.details)
      setActivePage('studio')
      return
    }

    // Default Fallback: Modal Brief
    setModal({
      isOpen: true,
      title: `Operating Strategy: ${context.action || context.title || 'Revenue Optimization'}`,
      content: context.rationale || context.why || 'Standard operating procedure: Initiating cross-channel signal audit and CRM sync.'
    })
  }

  // Shared Modal Component (Executive Aesthetic)
  const ActionModal = () => !modal.isOpen ? null : (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <div className="gtm-card fade-in" style={{ width: '500px', padding: '40px', background: '#fff', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div className="section-label" style={{ marginBottom: '16px' }}>STRATEGIC BRIEF</div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>{modal.title}</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '32px' }}>{modal.content}</p>
          <button 
            onClick={() => setModal({ ...modal, isOpen: false })}
            className="gtm-button-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '13px' }}
          >
            ACKNOWLEDGE & PROCEED →
          </button>
       </div>
    </div>
  )

  const currentSection = SECTIONS.find(s => s.id === activePage)
  const activePhase = currentSection?.group || 'SIGNAL'

  const renderPage = () => {
    switch (activePage) {
      case 'executive': return <ExecutiveOverview triggerAction={triggerAction} />;
      case 'seo': return <PodWorkspacePage podType="SEO Blog" triggerAction={triggerAction} />;
      case 'youtube': return <PodWorkspacePage podType="YouTube" triggerAction={triggerAction} />;
      case 'cta': return <CTAIntelligence triggerAction={triggerAction} />;
      case 'comparisons': return <GTMComparisons triggerAction={triggerAction} />;
      case 'signals': return <PersonaSignals triggerAction={triggerAction} />;
      case 'scorer': return <LeadScorerPage context={selectedContext} activePersona={activePersona} activeICP={activeICP} triggerAction={triggerAction} />;
      case 'queue': return <OpportunityQueue triggerAction={triggerAction} selectedContext={selectedContext} activePersona={activePersona} activeICP={activeICP} />;
      case 'studio': return <ContentIntelligencePage context={selectedContext} />;
      default: return <ExecutiveOverview />;
    }
  }

  // Visual Stepper Component
  const ProcessStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {['SIGNAL', 'SCORE', 'ACT'].map((phase, idx) => (
        <React.Fragment key={phase}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              background: activePhase === phase ? 'var(--accent-main)' : '#f1f5f9',
              color: activePhase === phase ? '#fff' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 900,
              boxShadow: activePhase === phase ? '0 0 12px rgba(123, 104, 238, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>{idx + 1}</div>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 900, 
              color: activePhase === phase ? 'var(--text-main)' : '#cbd5e1',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>{phase}</div>
          </div>
          {idx < 2 && <div style={{ width: '40px', height: '2px', background: activePhase === ['SIGNAL', 'SCORE', 'ACT'][idx+1] || activePhase === phase ? '#e2e8f0' : '#f1f5f9' }} />}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="gtm-os-container">
      
      {/* 1. Sidebar (Persistent Phase Nav) */}
      <aside className="gtm-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '56px' }}>
               <div style={{ width: '40px', height: '40px', background: 'var(--accent-main)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 900, boxShadow: '0 4px 12px rgba(123, 104, 238, 0.3)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
               </div>
               <div>
                  <h1 style={{ fontSize: '18px', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 900, color: '#fff' }}>GTM <span style={{ color: 'var(--accent-main)' }}>OS</span></h1>
                  <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--sidebar-text-muted)', letterSpacing: '0.08em', marginTop: '4px' }}>PRODUCTION ENGINE</div>
               </div>
            </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {['SIGNAL', 'SCORE', 'ACT'].map(group => (
            <div key={group}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--sidebar-text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px', paddingLeft: '8px' }}>{group} PHASE</div>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {SECTIONS.filter(s => s.group === group).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActivePage(section.id)}
                    aria-current={activePage === section.id ? 'page' : undefined}
                    className={`sidebar-link ${activePage === section.id ? 'sidebar-link-active' : ''}`}
                  >
                    <SidebarIcon id={section.id} active={activePage === section.id} />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {selectedContext && (
          <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--sidebar-border)' }}>
             <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--sidebar-text-muted)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>ACTIVE DECISION</div>
             <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>{selectedContext.asset || 'Persona Target'}</div>
             <button onClick={() => setActivePage('studio')} style={{ width: '100%', padding: '10px', background: 'var(--accent-main)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', transition: 'transform 0.2s' }}>RESUME STUDIO</button>
          </div>
        )}
      </aside>

      {/* 2. Main Workstation (Integrated Process Shell) */}
      <main className="gtm-main">
        
        {/* PERSISTENT TOP NAV (Orientation & Process Stepper) */}
        <header className="gtm-top-nav">
           <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              <div className="breadcrumb">
                 <span style={{ color: '#94a3b8' }}>GTM OS</span>
                 <span style={{ color: '#cbd5e1' }}>/</span>
                 <span className="breadcrumb-active" style={{ textTransform: 'uppercase' }}>{currentSection?.label}</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
              <ProcessStepper />
           </div>

           <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div className="source-indicator" onClick={() => setSyncStatus(syncStatus === 'LIVE' ? 'DEGRADED' : 'LIVE')} style={{ cursor: 'pointer' }}>
                 <div className={syncStatus === 'LIVE' ? "live-dot" : "live-dot-off"} style={{ width: '6px', height: '6px', background: syncStatus === 'LIVE' ? 'var(--status-positive)' : 'var(--status-warning)', borderRadius: '50%' }} />
                 <span>GSC: <strong>{syncStatus}</strong></span>
              </div>
              <div className="source-indicator">
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-main)' }} />
                 <span>CRM: <strong>LINKED</strong></span>
              </div>
              <div style={{ height: '20px', width: '1px', background: 'var(--border-main)' }} />
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)' }}>
                 LAST SYNC: <span style={{ color: 'var(--text-main)' }}>{lastSync}</span>
              </div>
              <button 
                onClick={() => {
                  setSyncStatus('ERROR')
                  setTimeout(() => setSyncStatus('LIVE'), 3000)
                }} 
                className="gtm-button-primary" 
                style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 800 }}
              >
                REFRESH
              </button>
           </div>
        </header>

        {/* 2. DEMO SCENARIO CONTROLLER */}
        {demoMode && (
           <div style={{ background: 'var(--text-main)', color: 'white', padding: '10px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'inset 0 -2px 10px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>🎧</span>
                    <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '1px' }}>DEMO NARRATIVE: ACTIVE</span>
                 </div>
                 <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }}></div>
                 <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>Objective: Transform $1.4M Revenue Leak into Pipeline Velocity.</div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                 <button onClick={revealLeadScorer} className="demo-btn" style={{ padding: '8px 16px', fontSize: '11px' }}>1-CLICK: REVEAL LEAD SCORER</button>
                 <button onClick={revealContentIntel} className="demo-btn" style={{ padding: '8px 16px', fontSize: '11px' }}>1-CLICK: REVEAL CONTENT INTEL</button>
                 <button onClick={() => setDemoMode(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#94a3b8', fontSize: '11px', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>EXIT DEMO</button>
              </div>
           </div>
        )}

        {/* 3. SYNC STATUS BANNER (CONDITIONAL) */}
        {syncStatus === 'DEGRADED' && (
          <div className="gtm-alert-banner banner-warning">
             <span>⚠️ <strong>PARTIAL DATA MODE</strong>: CRM enrichment is currently incomplete. CRM-sourced metrics are modeled based on last successful sync.</span>
             <span className="recovery-link" onClick={() => setSyncStatus('LIVE')}>RETRY CRM SYNC →</span>
          </div>
        )}
        {syncStatus === 'ERROR' && (
          <div className="gtm-alert-banner banner-error">
             <span>🚫 <strong>API SYNC FAILURE</strong>: Failed to connect to the YouTube API. Retrying connection in 5s...</span>
             <span className="recovery-link" onClick={() => setSyncStatus('LIVE')}>FORCE REFRESH →</span>
          </div>
        )}

        {/* STICKY FILTER BAR */}
        <div style={{ 
          height: '56px', 
          background: 'var(--bg-page)', 
          borderBottom: '1px solid var(--border-main)', 
          padding: '0 40px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          position: 'sticky',
          top: '64px',
          zIndex: 100,
          boxShadow: 'var(--shadow-sm)'
        }}>
           <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', marginRight: '8px' }}>GLOBAL CONTEXT:</div>
           <select 
             value={activePersona}
             onChange={(e) => setActivePersona(e.target.value)}
             style={{ height: '28px', padding: '0 8px', background: '#fcfdfe', borderRadius: '6px', border: '1px solid var(--border-main)', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
           >
             <option value="ALL PERSONAS">ALL PERSONAS</option>
             {GLOBAL_FILTERS.personas.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
           </select>
           <select 
             value={activeICP}
             onChange={(e) => setActiveICP(e.target.value)}
             style={{ height: '28px', padding: '0 8px', background: '#fcfdfe', borderRadius: '6px', border: '1px solid var(--border-main)', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
           >
             <option value="ALL SEGMENTS">ALL SEGMENTS</option>
             {GLOBAL_FILTERS.segments.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
           </select>
           <div style={{ width: '1px', height: '16px', background: 'var(--border-main)', margin: '0 8px' }} />
           <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--status-positive)' }}>● FILTERING ACTIVE</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
           {renderPage()}
        </div>
        <ActionModal />
      </main>
    </div>
  )
}
