import React, { useState, useEffect, useMemo } from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'
import { SEO_ASSETS, YOUTUBE_ASSETS, POD_EXECUTIVE_STATS } from '../data/intelligence.js'
import OperatingState from '../components/shared/OperatingState.jsx'

export default function PodWorkspacePage({ podType, triggerAction }) {
  const assets = podType === 'SEO Blog' ? SEO_ASSETS : YOUTUBE_ASSETS
  const [sortKey, setSortKey] = useState('sourced_pipeline')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [podType])

  // Sparkline Component
  const Sparkline = ({ values }) => (
    <div className="sparkline-container">
      {values.map((v, i) => (
        <div 
          key={i} 
          className="spark-bar" 
          style={{ height: `${(v / Math.max(...values, 1)) * 100}%`, opacity: 0.3 + (i * 0.2) }} 
        />
      ))}
    </div>
  )

  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => {
      const valA = parseFloat((a[sortKey] || 0).toString().replace(/[^\d.]/g, ''))
      const valB = parseFloat((b[sortKey] || 0).toString().replace(/[^\d.]/g, ''))
      return valB - valA
    }).slice(0, 50) // UI Performance Slice
  }, [assets, sortKey])

  return (
    <div className="fade-in" style={{ padding: '40px 60px' }}>
      
      {/* 1. HEADER & POD METRICS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
         <div>
            <div className="section-label">PHASE 1: SIGNAL DETECTION</div>
            <h1 className="page-title">{podType} <span style={{ color: 'var(--accent-main)' }}>Operating Node</span></h1>
            <p className="page-subtitle">Tracking high-velocity revenue signals and content decay.</p>
         </div>
         <div style={{ display: 'flex', gap: '24px' }}>
            <div className="gtm-card" style={{ padding: '12px 24px', textAlign: 'right' }}>
               <div className="section-label">POD REVENUE</div>
               <div style={{ fontSize: '20px', fontWeight: 900 }}>$14.2M</div>
            </div>
            <div className="gtm-card" style={{ padding: '12px 24px', textAlign: 'right' }}>
               <div className="section-label">AVG VELOCITY</div>
               <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--status-positive)' }}>+18%</div>
            </div>
         </div>
      </div>

      {/* 2. ANALYTICAL TREND (AREA CHART) */}
      <div className="gtm-card" style={{ padding: '32px', marginBottom: '40px' }}>
         <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Pipeline <span style={{ color: 'var(--accent-main)' }}>Velocity Analytics</span></h3>
         <div className="chart-subtitle" style={{ marginTop: '4px' }}>Attributed Revenue Sourced MoM</div>
         <div style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={POD_EXECUTIVE_STATS.pipeVelocity}>
                  <defs>
                     <linearGradient id="colorPipe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-main)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--accent-main)" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-main)" strokeWidth={3} fillOpacity={1} fill="url(#colorPipe)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 3. HIGH-DENSITY OPERATING TABLE */}
      <div className="gtm-card" style={{ padding: '0', overflow: 'hidden' }}>
         <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Asset <span style={{ color: 'var(--accent-main)' }}>Performance Matrix</span></h3>
            <div className="section-label">STICKY OPERATING SURFACE</div>
         </div>

         <div className="gtm-table-container gtm-table-sticky" style={{ maxHeight: '600px', minHeight: '300px' }}>
            {isLoading ? (
               <div style={{ padding: '24px 0' }}>
                  <OperatingState type="SKELETON_TABLE" />
               </div>
            ) : (
               <table className="gtm-table">
                  <thead>
                     <tr>
                        <th onClick={() => setSortKey('title')} style={{ cursor: 'pointer' }}>Asset Entity <span className="sort-icon">↕</span></th>
                        <th>Persona / Stage</th>
                        <th onClick={() => setSortKey('sessions')} style={{ cursor: 'pointer' }}>Volume <span className="sort-icon">↕</span></th>
                        <th onClick={() => setSortKey('sourcedPipe')} style={{ cursor: 'pointer' }}>Revenue Sourced <span className="sort-icon">↕</span></th>
                        <th>CTR Trend</th>
                        <th>Health Flags</th>
                        <th>Confidence</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {sortedAssets.map((asset, i) => (
                       <tr key={i} className={`clickable-row gtm-row-compact ${asset.flags?.includes('Proof-Gap') ? 'gtm-row-urgent' : ''}`}>
                          <td>
                             <div style={{ fontSize: '13px', fontWeight: 900 }}>{asset.title}</div>
                             <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{asset.cluster}</div>
                          </td>
                          <td>
                             <div style={{ fontSize: '12px', fontWeight: 800 }}>{asset.persona}</div>
                             <div style={{ fontSize: '9px', fontWeight: 900, color: 'var(--accent-main)', textTransform: 'uppercase' }}>{asset.stage}</div>
                          </td>
                          <td className="numeric-emphasis">{asset.sessions || asset.views}</td>
                          <td className="numeric-emphasis" style={{ fontWeight: 900, color: 'var(--text-main)' }}>{asset.sourcedPipe || asset.pipeline}</td>
                          <td>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 900 }}>{asset.ctr || '5.2%'}</div>
                                <Sparkline values={[12, 18, 14, 22, 28]} />
                             </div>
                          </td>
                          <td>
                             <div style={{ display: 'flex', gap: '4px' }}>
                                {asset.flags?.map(f => (
                                  <span key={f} className="status-chip chip-predictive" style={{ fontSize: '8px', padding: '1px 6px' }}>{f}</span>
                                ))}
                                {asset.decay > 10 && <span className="status-chip chip-live" style={{ fontSize: '8px', padding: '1px 6px', color: 'var(--status-negative)', borderColor: 'var(--status-negative)', background: '#fef2f2' }}>DECAY: {asset.decay}%</span>}
                             </div>
                          </td>
                          <td>
                             <div className="confidence-badge">94%</div>
                          </td>
                          <td>
                             <button onClick={() => triggerAction(asset)} className="gtm-button-primary" style={{ padding: '6px 12px', fontSize: '10px' }}>DEPLOY →</button>
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
