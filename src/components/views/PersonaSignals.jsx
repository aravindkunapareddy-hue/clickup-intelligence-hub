import React from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts'
import { PERSONA_SIGNALS } from '../../data/intelligence.js'

export default function PersonaSignals({ triggerAction }) {
  
  // Custom Heatmap Data (Simulated for high-density matrix)
  const heatmapData = [
    { persona: 'VP Product', Blog: 92, YouTube: 84, CRM: 78, Trial: 94 },
    { persona: 'IT Director', Blog: 68, YouTube: 92, CRM: 88, Trial: 72 },
    { persona: 'Marketing Ops', Blog: 84, YouTube: 72, CRM: 92, Trial: 88 },
    { persona: 'Founder', Blog: 54, YouTube: 88, CRM: 64, Trial: 92 }
  ]

  const channels = ['Blog', 'YouTube', 'CRM', 'Trial']

  const getHeatColor = (val) => {
    if (val > 90) return 'rgba(239, 68, 68, 0.8)'
    if (val > 80) return 'rgba(123, 104, 238, 0.8)'
    if (val > 70) return 'rgba(123, 104, 238, 0.5)'
    return 'rgba(123, 104, 238, 0.2)'
  }

  return (
    <div className="fade-in" style={{ padding: '60px 80px' }}>
      
      {/* 1. HEADER */}
      <div style={{ marginBottom: '48px' }}>
         <div className="section-label">PHASE 2: SCORE</div>
         <h1 className="page-title" style={{ marginTop: '8px' }}>Persona & <span style={{ color: 'var(--accent-main)' }}>Account Signals</span></h1>
         <p className="page-subtitle">Mapping behavioral intent density across high-value ICP segments.</p>
      </div>

      {/* 2. INTENT HEATMAP (THE OPERATING SURFACE) */}
      <div className="gtm-card" style={{ padding: '40px', marginBottom: '40px' }}>
         <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>Strategic <span style={{ color: 'var(--accent-main)' }}>Intent Heatmap</span></h3>
         <div className="chart-subtitle">Cross-Channel Activity Density (0-100 Heat Index)</div>
         
         <div style={{ marginTop: '32px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
                <thead>
                   <tr>
                      <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 800 }}>PERSONA TARGET</th>
                      {channels.map(c => <th key={c} style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 800 }}>{c.toUpperCase()}</th>)}
                   </tr>
                </thead>
               <tbody>
                  {heatmapData.map((row, i) => (
                     <tr key={i}>
                        <td style={{ padding: '16px 12px', fontSize: '15px', fontWeight: 900 }}>{row.persona}</td>
                       {channels.map(c => (
                         <td key={c} style={{ 
                            padding: '24px', 
                            textAlign: 'center', 
                            background: getHeatColor(row[c]), 
                            borderRadius: '4px',
                            color: row[c] > 80 ? '#fff' : 'var(--text-main)',
                            fontSize: '14px',
                            fontWeight: 900,
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}>
                           {row[c]}
                         </td>
                       ))}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
          <div style={{ display: 'flex', gap: '32px', marginTop: '32px', justifyContent: 'flex-end' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)' }}>
                <div style={{ width: '16px', height: '16px', background: 'rgba(239, 68, 68, 0.8)', borderRadius: '4px' }} /> CRITICAL INTENT
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)' }}>
                <div style={{ width: '16px', height: '16px', background: 'rgba(123, 104, 238, 0.8)', borderRadius: '4px' }} /> HIGH HEAT
             </div>
          </div>
      </div>

      {/* 3. ACCOUNT INTENT MATRIX (TABLE) */}
      <div className="gtm-card" style={{ padding: '0', overflow: 'hidden' }}>
         <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Segment <span style={{ color: 'var(--accent-main)' }}>Buying Intensity</span></h3>
            <div className="section-label">STICKY MATRIX</div>
         </div>
         <div className="gtm-table-container gtm-table-sticky" style={{ maxHeight: '500px' }}>
            <table className="gtm-table">
               <thead>
                  <tr>
                     <th>Target Segment</th>
                     <th>Heat Score</th>
                     <th>Assets / Surfaces</th>
                     <th>Demo Index</th>
                     <th>Repeat Threshold</th>
                     <th>Buying Phase</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {PERSONA_SIGNALS.map((p, i) => (
                    <tr key={i} className={`gtm-row-compact ${p.heat > 90 ? 'gtm-row-urgent' : ''}`}>
                        <td>
                           <div style={{ fontSize: '15px', fontWeight: 900 }}>{p.persona}</div>
                           <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 800, textTransform: 'uppercase' }}>CLUSTER: ENTERPRISE</div>
                        </td>
                       <td className="numeric-emphasis" style={{ fontSize: '16px', color: p.heat > 90 ? 'var(--status-negative)' : 'var(--accent-main)' }}>{p.heat}</td>
                       <td className="numeric-emphasis">{p.assets} units</td>
                       <td>
                          <div className="status-chip chip-modeled" style={{ borderColor: 'var(--accent-main)' }}>{p.pipeline} PIPELINE</div>
                       </td>
                       <td className="numeric-emphasis">{p.repeat} meetings</td>
                       <td>
                          <span className={`${p.heat > 90 ? 'urgent-badge' : ''} tag-badge`} style={{ color: p.heat > 90 ? 'var(--status-negative)' : 'var(--status-positive)' }}>
                             High Intensity
                          </span>
                       </td>
                        <td>
                           <button 
                              onClick={() => triggerAction({ type: 'INTENT', persona: p.persona })}
                              className="gtm-button-primary" 
                              style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 800 }}
                           >
                              ACTIVATE
                           </button>
                        </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

    </div>
  )
}
