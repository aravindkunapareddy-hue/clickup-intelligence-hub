import React, { useState, useMemo, useEffect } from 'react'
import { LEAD_LIBRARY } from '../data/intelligence.js'

export default function LeadScorerPage({ context, activePersona, activeICP, triggerAction }) {
  const [selectedLead, setSelectedLead] = useState(null)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const FILTERS = ['ALL', 'TOP TARGETS', 'DORMANT', 'HIGH INTENT', 'MALIGNANT']

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [activeFilter, activePersona, activeICP])

  useEffect(() => {
    if (context?.name || context?.asset) {
       const match = LEAD_LIBRARY.find(l => l.name === context.name || l.company === context.asset)
       if (match) setSelectedLead(match)
    }
  }, [context])

  const filteredLeads = useMemo(() => {
    return LEAD_LIBRARY.filter(l => {
      const matchesSearch = (l.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
                            (l.company?.toLowerCase() || '').includes(search.toLowerCase())
      
      const matchesPersona = activePersona === 'ALL PERSONAS' || l.role === activePersona
      const matchesICP = activeICP === 'ALL SEGMENTS' || l.segment === activeICP

      return matchesSearch && matchesPersona && matchesICP
    }).slice(0, 100) // UI Performance Slice for Demo
  }, [search, activePersona, activeICP])

  return (
    <div className="fade-in" style={{ padding: '40px 60px' }}>
      
      {/* PAGE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
         <div>
            <h1 className="page-title">Account & <span style={{ color: 'var(--accent-main)' }}>Lead Scorer</span></h1>
            <p className="page-subtitle">Firmographic fit, behavioral intent, and account proximity scoring.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
               <span className="status-chip chip-live">CRM SYNC: ACTIVE</span>
               <span className="source-indicator">SOURCE: SALESFORCE / 6SENSE</span>
            </div>
         </div>
         <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span className="source-indicator" style={{ border: 'none' }}>FILTER ENTITIES:</span>
            <input 
               type="text" 
               placeholder="Search Companies / Personas..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{
                 padding: '10px 16px',
                 borderRadius: '8px',
                 border: '1px solid var(--border-main)',
                 width: '320px',
                 fontSize: '13px',
                 fontWeight: 600,
                 outline: 'none',
                 boxShadow: 'var(--shadow-sm)'
               }}
            />
         </div>
      </div>

      {/* 2. INTELLIGENCE MATRIX (WHAT IS HAPPENING) */}
      <div className="decision-card" style={{ padding: '0', overflow: 'hidden' }}>
         
         <div className="decision-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
               <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Intent & Fit <span style={{ color: 'var(--accent-main)' }}>Context Matrix</span></h3>
               <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Displaying {filteredLeads.length} prioritized revenue entities.</p>
            </div>
            <div className="drilldown-link">CONFIGURE SCORING WEIGHTS →</div>
         </div>

         <div className="gtm-table-container" style={{ border: 'none', borderRadius: 0, maxHeight: '600px', overflowY: 'auto' }}>
            <table className="gtm-table">
               <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr style={{ background: '#f8fafc' }}>
                     <th style={{ paddingLeft: '32px' }}>Entity / Contact</th>
                     <th>Role / Firm</th>
                     <th>Precision Score</th>
                     <th>Intent</th>
                     <th>Fit</th>
                     <th>Status</th>
                     <th style={{ paddingRight: '32px', textAlign: 'right' }}>CRM Context</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="clickable-row">
                       <td style={{ paddingLeft: '32px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 900 }}>{lead.name}</div>
                          <div className="source-indicator" style={{ display: 'inline-flex', fontSize: '8px' }}>Active {lead.lastActive}</div>
                       </td>
                       <td>
                          <div style={{ fontWeight: 800, fontSize: '12px' }}>{lead.role}</div>
                          <div style={{ fontSize: '10px', color: '#94a3b8' }}>{lead.company}</div>
                       </td>
                       <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <span className="numeric-emphasis" style={{ fontWeight: 800, color: lead.score > 90 ? 'var(--status-positive)' : 'var(--text-main)' }}>{lead.score}</span>
                             <div className="confidence-badge" style={{ fontSize: '8px', padding: '1px 4px' }}>CRM LINK</div>
                          </div>
                       </td>
                       <td><span className="numeric-emphasis" style={{ color: 'var(--text-muted)' }}>{lead.intent}%</span></td>
                       <td><span className="numeric-emphasis" style={{ color: 'var(--text-muted)' }}>{lead.fit}%</span></td>
                       <td>
                          <span className={`status-chip ${lead.status === 'CRITICAL' ? 'chip-live' : 'chip-modeled'}`} style={{ color: lead.status === 'CRITICAL' ? 'var(--status-negative)' : 'var(--status-positive)', borderColor: lead.status === 'CRITICAL' ? 'var(--status-negative)' : '#d1fae5' }}>{lead.status}</span>
                       </td>
                       <td style={{ paddingRight: '32px', textAlign: 'right' }}>
                          <button 
                             onClick={() => triggerAction({ 
                               type: 'PROFILE', 
                               title: `Strategic Profile: ${lead.name}`, 
                               rationale: `${lead.name} from ${lead.company} is displaying a 98% Fit Score with CRITICAL intent markers on Enterprise Security content.` 
                             })}
                             className="drilldown-link" 
                             style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                          >
                             VIEW PROFILE →
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="decision-footer">
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
               <strong>WHY IT MATTERS:</strong> Lead priority is weighted by firmographic fit (30%) and engagement velocity (70%). High scores represent ripe accounts for immediate sales outreach.
            </div>
            <div className="drilldown-link">SYNC TO SALESFORCE →</div>
         </div>
      </div>

      {/* 3. SCORING METHODOLOGY (WHAT TO DO NEXT) */}
      <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
         {[
           { label: 'Fit Score (30%)', text: 'Firmographic alignment with ICP clusters.', detail: 'WHY: Ensures sales time is spent on high-yield accounts.' },
           { label: 'Behavioral Intent (30%)', text: 'Proprietary signals from Signal Hub interaction.', detail: 'ACTION: Trigger retargeting if Intent > 80%.' },
           { label: 'Content Engagement (20%)', text: 'Direct asset velocity across blog/YT.', detail: 'WHAT: Measures "High-Trust" interactions.' },
           { label: 'Pipe Proximity (20%)', text: 'Account history and active influence.', detail: 'NEXT: Move to "Priority" in CRM if Score > 90.' }
         ].map((m, i) => (
           <div key={i} className="decision-card" style={{ padding: '24px' }}>
              <div className="section-label" style={{ fontSize: '9px' }}>{m.label}</div>
              <p style={{ fontSize: '11px', color: 'var(--text-main)', fontWeight: 600, marginTop: '8px' }}>{m.text}</p>
              <div style={{ marginTop: '12px', padding: '8px', background: '#f8fafc', borderRadius: '4px', fontSize: '9px', fontWeight: 900, color: 'var(--text-muted)' }}>
                 {m.detail}
              </div>
           </div>
         ))}
      </div>

    </div>
  )
}
