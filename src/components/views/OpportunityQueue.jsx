import React, { useState, useMemo, useEffect } from 'react'
import { OPPORTUNITY_QUEUE } from '../../data/intelligence.js'
import OperatingState from '../shared/OperatingState.jsx'

export default function OpportunityQueue({ triggerAction, selectedContext, activePersona, activeICP }) {
  const [selectedOpp, setSelectedOpp] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortKey, setSortKey] = useState('score')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [activeFilter])

  // Demo Highlight Hook
  useEffect(() => {
    if (selectedContext?.highlight && selectedContext?.asset) {
       const match = OPPORTUNITY_QUEUE.find(o => o.asset === selectedContext.asset)
       if (match) setSelectedOpp(match)
    }
  }, [selectedContext])

  const FILTERS = [
    { id: 'all', label: 'All Levers' },
    { id: 'high-traffic-low-conv', label: 'High Traffic / Low Conv' },
    { id: 'strong-eng-weak-cta', label: 'Strong Eng / Weak CTA' },
    { id: 'stale-content', label: 'Stale Content' },
    { id: 'missing-proof', label: 'Missing Proof' },
    { id: 'repurpose-to-youtube', label: 'Repurpose to Video' },
    { id: 'nurture-opp', label: 'Nurture Opportunity' },
    { id: 'no-action', label: 'No Action' }
  ]

  const sortedData = useMemo(() => {
    return [...OPPORTUNITY_QUEUE].filter(opp => {
      // Internal Category Filter
      const matchesCategory = activeFilter === 'all' || opp.tags.includes(activeFilter)
      
      // Global Persona Filter
      const matchesPersona = activePersona === 'ALL PERSONAS' || opp.details.persona === activePersona
      
      // Global ICP Filter
      const matchesICP = activeICP === 'ALL SEGMENTS' || opp.details.segment === activeICP
      
      return matchesCategory && matchesPersona && matchesICP
    }).sort((a, b) => {
      const valA = typeof a[sortKey] === 'string' ? parseFloat(a[sortKey].replace('↑', '').replace('%', '').replace('$', '').replace('M', '')) : a[sortKey]
      const valB = typeof b[sortKey] === 'string' ? parseFloat(b[sortKey].replace('↑', '').replace('%', '').replace('$', '').replace('M', '')) : b[sortKey]
      return valB - valA
    }).slice(0, 50) // UI Performance Slice for Demo
  }, [activeFilter, sortKey, activePersona, activeICP])

  const Sparkline = ({ values }) => (
    <div className="sparkline-container" style={{ width: '40px' }}>
      {values.map((v, i) => (
        <div key={i} className="spark-bar" style={{ height: `${(v / 20) * 100}%`, background: 'var(--accent-main)', opacity: 0.2 + (i * 0.2) }} />
      ))}
    </div>
  )

  return (
    <div className="fade-in" style={{ position: 'relative', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      
      <div style={{ padding: '40px 60px', height: '100%', overflowY: 'auto' }}>
         <div style={{ marginBottom: '40px' }}>
            <div className="section-label">PHASE 3: ACT</div>
            <h1 className="page-title">Content <span style={{ color: 'var(--accent-main)' }}>Opportunity Queue</span></h1>
            <p className="page-subtitle">Central operating surface for revenue-segment tactical orchestration.</p>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
               {FILTERS.map(f => (
                 <button
                   key={f.id}
                   onClick={() => setActiveFilter(f.id)}
                   className={`status-chip ${activeFilter === f.id ? 'chip-live' : 'chip-predictive'}`}
                   style={{ 
                     padding: '10px 20px', 
                     fontSize: '12px',
                     cursor: 'pointer', 
                     borderColor: activeFilter === f.id ? 'var(--accent-main)' : 'var(--border-main)',
                     background: activeFilter === f.id ? 'var(--accent-main)' : 'transparent',
                     color: activeFilter === f.id ? '#fff' : 'var(--text-muted)',
                     fontWeight: 800,
                     transition: 'all 0.2s ease',
                     borderRadius: '8px'
                   }}
                 >
                   {f.label}
                 </button>
               ))}
            </div>
         </div>

         <div className="gtm-card" style={{ padding: '0', overflow: 'hidden', minHeight: '400px' }}>
            {isLoading ? (
               <div style={{ padding: '40px 0' }}>
                  <OperatingState type="SKELETON_TABLE" />
               </div>
            ) : sortedData.length === 0 ? (
               <div style={{ padding: '40px' }}>
                  <OperatingState 
                     type="EMPTY" 
                     title="No High-Priority Opportunities Found"
                     message={`We couldn't find any signals matching the "${activeFilter}" criteria for the current segment. Try widening your filter or checking a different pod.`}
                     actionLabel="CLEAR FILTERS"
                     onAction={() => setActiveFilter('all')}
                  />
               </div>
            ) : (
               <div className="gtm-table-container gtm-table-sticky" style={{ maxHeight: '700px' }}>
                  <table className="gtm-table">
                     <thead>
                        <tr>
                           <th onClick={() => setSortKey('asset')} style={{ paddingLeft: '32px', cursor: 'pointer' }}>Asset / Surface <span className="sort-icon">↕</span></th>
                           <th>Problem Area</th>
                           <th onClick={() => setSortKey('score')} style={{ cursor: 'pointer' }}>Op Score <span className="sort-icon">↕</span></th>
                           <th>Confidence</th>
                           <th>Owner Pod</th>
                           <th onClick={() => setSortKey('lift')} style={{ cursor: 'pointer' }}>Exp. Lift <span className="sort-icon">↕</span></th>
                           <th>Velocity</th>
                           <th>Priority</th>
                           <th style={{ paddingRight: '32px' }}>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {sortedData.map((opp, i) => (
                          <tr 
                            key={i} 
                            className={`clickable-row gtm-row-compact ${opp.priority === 'CRITICAL' ? 'gtm-row-urgent' : ''} ${selectedOpp?.asset === opp.asset ? 'active-row' : ''}`}
                            onClick={() => setSelectedOpp(opp)}
                          >
                             <td style={{ paddingLeft: '32px' }}>
                                <div style={{ fontSize: '15px', fontWeight: 900 }}>{opp.asset}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>GTM SIGNAL: DETECTED</div>
                             </td>
                             <td style={{ fontSize: '14px', fontWeight: 700 }}>{opp.issue}</td>
                             <td><span className="numeric-emphasis" style={{ fontSize: '16px', color: opp.score > 90 ? 'var(--status-negative)' : 'var(--accent-main)' }}>{opp.score}</span></td>
                             <td><div className="confidence-badge" style={{ fontSize: '11px', fontWeight: 900 }}>{opp.confidence}</div></td>
                             <td style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)' }}>{opp.pod.replace('Pod', '')}</td>
                             <td style={{ color: 'var(--status-positive)', fontWeight: 900, fontSize: '12px' }}>{opp.lift}</td>
                             <td><Sparkline values={[4, 8, 12, 16, 20]} /></td>
                             <td>
                                <span className="status-chip" style={{ fontSize: '10px', fontWeight: 900, color: opp.priority === 'CRITICAL' ? 'var(--status-negative)' : 'var(--status-warning)', borderColor: opp.priority === 'CRITICAL' ? 'var(--status-negative)' : 'var(--status-warning)' }}>
                                   {opp.priority}
                                </span>
                             </td>
                             <td style={{ paddingRight: '32px' }}>
                                <span className="source-indicator" style={{ border: '1px solid #e2e8f0', background: '#f8fafc', padding: '6px 10px', fontSize: '11px' }}>{opp.status}</span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </div>

      {/* 3. GROWTH OPERATOR SIDE PANEL */}
      {selectedOpp && (
        <div className="fade-in" style={{ 
          position: 'absolute', right: 0, top: 0, width: '480px', height: '100%', 
          background: '#fff', borderLeft: '1px solid var(--border-main)', boxShadow: 'var(--shadow-xl)', zIndex: 100, display: 'flex', flexDirection: 'column' 
        }}>
           <div style={{ padding: '32px', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                 <div className="section-label">PHASE 3: ACT</div>
                 <h2 style={{ fontSize: '18px', fontWeight: 900, marginTop: '4px' }}>{selectedOpp.asset}</h2>
              </div>
              <button onClick={() => setSelectedOpp(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>×</button>
           </div>
           {/* ... existing panel detail view (no major chart/table changes here) */}
           <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
              <div style={{ marginBottom: '32px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1.2px solid #e2e8f0' }}>
                 <div className="section-label">SOURCE SIGNAL</div>
                 <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--accent-main)', marginTop: '8px' }}>{selectedOpp.sourceSignal}</div>
              </div>
              <button onClick={() => triggerAction(selectedOpp)} className="gtm-button-primary" style={{ width: '100%', padding: '20px', fontSize: '14px', fontWeight: 900 }}>DEPLOY TO STUDIO →</button>
           </div>
        </div>
      )}

    </div>
  )
}
