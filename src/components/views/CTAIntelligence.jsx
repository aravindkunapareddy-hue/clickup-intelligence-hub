import React, { useState, useMemo } from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts'
import { CTA_LIBRARY, CTA_ANOMALIES, CTA_AI_STRATEGY } from '../../data/intelligence.js'
import OperatingState from '../shared/OperatingState.jsx'

export default function CTAIntelligence({ triggerAction }) {
  const [activeTab, setActiveTab] = useState('persona')
  const [filterSegment, setFilterSegment] = useState('All')

  // Filter logic (simulated for empty state)
  const filteredLibrary = filterSegment === 'Non-Existent Segment' ? [] : CTA_LIBRARY

  const COLORS = ['#7B68EE', '#FF5DE1', '#36B8F5', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  // Helper for aggregating data
  const getAggregatedData = (key) => {
    const map = {}
    CTA_LIBRARY.forEach(cta => {
      const val = cta[key] || 'Unknown'
      if (!map[val]) map[val] = { name: val, ctr: 0, count: 0, pipe: 0 }
      map[val].ctr += parseFloat(cta.ctr || 0)
      map[val].count += 1
      const pipeVal = typeof cta.pipePerClick === 'string' ? parseFloat(cta.pipePerClick.replace('$', '').replace('k', '')) * 1000 : 0
      map[val].pipe += pipeVal
    })
    return Object.values(map).map((item, index) => ({
      ...item,
      avgCtr: (item.ctr / item.count).toFixed(2),
      pipeMagnitude: item.pipe / item.count,
      fill: COLORS[index % COLORS.length]
    }))
  }

  const personaData = useMemo(() => getAggregatedData('persona'), [CTA_LIBRARY])
  const channelData = useMemo(() => getAggregatedData('channel'), [CTA_LIBRARY])
  const stageData = useMemo(() => getAggregatedData('stage'), [CTA_LIBRARY])
  const placementData = useMemo(() => getAggregatedData('placement'), [CTA_LIBRARY])
  const assetTypeData = useMemo(() => getAggregatedData('assetType'), [CTA_LIBRARY])

  const currentChartData = {
    persona: personaData,
    channel: channelData,
    stage: stageData,
    placement: placementData,
    asset: assetTypeData
  }[activeTab]

  return (
    <div className="fade-in" style={{ padding: '60px 80px' }}>
      
      {/* 1. HEADER & GLOBAL METRICS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
         <div>
            <div className="section-label">REVENUE LEVER: CTA</div>
            <h1 className="page-title" style={{ marginTop: '8px' }}>CTA <span style={{ color: 'var(--accent-main)' }}>Intelligence Hub</span></h1>
            <p className="page-subtitle">Tracking conversion units as first-class operational assets across the funnel.</p>
         </div>
         <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ textAlign: 'right' }}>
               <div className="section-label">GLOBAL AVG CTR</div>
               <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent-main)' }}>5.8%</div>
            </div>
            <div style={{ textAlign: 'right' }}>
               <div className="section-label">PIPELINE YIELD</div>
               <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--status-positive)' }}>$12.4M</div>
            </div>
         </div>
      </div>

      {/* 2. ANALYTICAL COMPARISON LAYER */}
      <div className="gtm-card" style={{ padding: '40px', marginBottom: '40px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Operational <span style={{ color: 'var(--accent-main)' }}>Performance Benchmarks</span></h3>
            <div style={{ display: 'flex', gap: '4px', background: '#f8fafc', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-main)' }}>
               {['persona', 'channel', 'stage', 'placement', 'asset'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '6px 14px', 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                    color: activeTab === tab ? 'var(--accent-main)' : '#94a3b8',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                 >
                   {tab}
                 </button>
               ))}
            </div>
         </div>

         <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={currentChartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#fcfdfe' }} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} 
                  />
                  <Bar dataKey="avgCtr" fill="var(--accent-main)" radius={[4, 4, 0, 0]} barSize={40}>
                     {currentChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                     ))}
                  </Bar>
                  <Bar dataKey="pipeMagnitude" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={10} fillOpacity={0.2} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 3. DIAGNOSTIC GAPS (WINS vs LEAKS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '40px', marginBottom: '40px' }}>
         
         {/* CTA FATIGUE & MISMATCHES */}
         <div className="gtm-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
               <h3 style={{ fontSize: '15px' }}>Critical <span style={{ color: 'var(--status-negative)' }}>Revenue Leaks</span></h3>
               <span className="source-indicator" style={{ background: '#fef2f2', color: 'var(--status-negative)', borderColor: '#fee2e2' }}>ANOMALY DETECTED</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {CTA_ANOMALIES.map((leak, i) => (
                 <div key={i} style={{ padding: '16px', background: '#fcfdfe', border: '1px solid var(--border-main)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div>
                          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--status-negative)', textTransform: 'uppercase' }}>{leak.type}: {leak.severity}</div>
                          <div style={{ fontSize: '14px', fontWeight: 900, marginTop: '4px' }}>{leak.asset}</div>
                       </div>
                       <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--status-negative)' }}>{leak.impact}</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.6 }}>{leak.issue}</p>
                 </div>
               ))}
            </div>
         </div>

         {/* AI STRATEGIC INSIGHT PANEL */}
         <div className="decision-card" style={{ margin: 0, padding: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
               <div style={{ width: '32px', height: '32px', background: 'var(--accent-main)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px' }}>✨</span>
               </div>
               <h3 style={{ fontSize: '18px', fontWeight: 900 }}>CTA <span style={{ color: 'var(--accent-main)' }}>Strategy Brief</span></h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
               <div>
                  <div className="section-label" style={{ color: 'var(--status-positive)' }}>WINNING PATTERNS</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.6, marginTop: '12px' }}>{CTA_AI_STRATEGY.winning}</p>
               </div>
               <div>
                  <div className="section-label" style={{ color: 'var(--status-negative)' }}>UNDERPERFORMING</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.6, marginTop: '12px' }}>{CTA_AI_STRATEGY.leaking}</p>
               </div>
            </div>

            <div style={{ padding: '24px', background: '#f1f5f9', borderRadius: '12px', borderLeft: '4px solid var(--accent-main)' }}>
               <div className="section-label">TEST NEXT (PRIORITY 1)</div>
               <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--accent-main)', marginTop: '8px' }}>{CTA_AI_STRATEGY.testNext}</div>
            </div>
         </div>
      </div>

      {/* 4. PRIMARY CTA LIBRARY (HIGH DENSITY OPERATING SURFACE) */}
      <div className="gtm-card" style={{ padding: '0', overflow: 'hidden' }}>
         <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Global <span style={{ color: 'var(--accent-main)' }}>CTA Operating Library</span></h3>
            <select 
              value={filterSegment}
              onChange={(e) => setFilterSegment(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid var(--border-main)', borderRadius: '6px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
            >
               <option value="All">ALL SEGMENTS</option>
               <option value="Non-Existent Segment">EMERGING ALPHA (0 DATA)</option>
            </select>
         </div>

         <div className="gtm-table-container gtm-table-sticky" style={{ maxHeight: '600px', minHeight: '300px' }}>
            {filteredLibrary.length === 0 ? (
               <div style={{ padding: '60px' }}>
                  <OperatingState 
                     type="EMPTY" 
                     title="No CTA Performance Data Found"
                     message="Statistical significance hasn't been reached for the 'Emerging Alpha' segment yet. We require 1,200+ impressions per variant to generate reliable insights."
                     actionLabel="RESET FILTERS"
                     onAction={() => setFilterSegment('All')}
                  />
               </div>
            ) : (
               <table className="gtm-table">
                  <thead>
                     <tr>
                        <th>CTA Variant</th>
                        <th>Targeting Context</th>
                        <th>Performance CTR</th>
                        <th>Pipe / Click</th>
                        <th>Unit Status</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredLibrary.slice(0, 40).map((cta, i) => (
                       <tr key={i} className="gtm-row-compact clickable-row">
                          <td>
                             <div style={{ fontSize: '15px', fontWeight: 900 }}>{cta.copy}</div>
                             <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 800 }}>TYPE: {cta.type}</div>
                          </td>
                          <td>
                             <span className="tag-badge" style={{ background: '#f1f5f9', color: 'var(--text-main)', fontSize: '11px' }}>{cta.stage}</span>
                             <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px', color: 'var(--text-muted)' }}>{cta.persona}</div>
                          </td>
                          <td>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="numeric-emphasis" style={{ color: parseFloat(cta.ctr) > 3 ? 'var(--status-positive)' : 'var(--status-negative)' }}>{cta.ctr}</span>
                                <div style={{ width: '40px', height: '16px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                                   {cta.history.map((h, hi) => (
                                     <div key={hi} style={{ flex: 1, background: 'var(--accent-main)', height: `${(h/15)*100}%`, opacity: 0.2 + (hi * 0.2) }} />
                                   ))}
                                </div>
                             </div>
                          </td>
                          <td className="numeric-emphasis" style={{ fontWeight: 900 }}>{cta.pipePerClick}</td>
                          <td>
                             <span className={`status-chip ${cta.status === 'STABLE' ? 'chip-live' : cta.status === 'OPTIMIZE' ? 'chip-predictive' : 'chip-modeled'}`} style={{ fontSize: '9px', color: cta.status === 'STABLE' ? 'var(--status-positive)' : cta.status === 'FATIGUE' ? 'var(--status-negative)' : 'var(--status-warning)', borderColor: cta.status === 'STABLE' ? 'var(--status-positive)' : cta.status === 'FATIGUE' ? 'var(--status-negative)' : 'var(--status-warning)' }}>
                                {cta.status}
                             </span>
                          </td>
                          <td>
                             <button 
                                onClick={() => triggerAction(cta)}
                                className="gtm-button-primary" 
                                style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 800 }}
                             >
                                ACTIVATE →
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>

    </div>
  )
}
