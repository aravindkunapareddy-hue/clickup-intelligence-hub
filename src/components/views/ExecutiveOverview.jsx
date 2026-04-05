import React from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, LabelList, Legend
} from 'recharts'
import { 
  EXECUTIVE_KPIs, EXECUTIVE_WINS, EXECUTIVE_LOSSES, AI_WEEKLY_SUMMARY, EXECUTIVE_NBA,
  DEMO_INSIGHTS, POD_EXECUTIVE_STATS 
} from '../../data/intelligence.js'
import OperatingState from '../shared/OperatingState.jsx'

export default function ExecutiveOverview({ triggerAction }) {
  
  // High-density data for Funnel Visual (Derived from Scale Engine)
  const funnelData = [
    { step: 'Leads', value: parseInt(EXECUTIVE_KPIs.leads.val.replace(/,/g, '')), fill: '#6366f1' },
    { step: 'MQLs', value: parseInt(EXECUTIVE_KPIs.mqls.val.replace(/,/g, '')), fill: '#7B68EE' },
    { step: 'SQLs', value: parseInt(EXECUTIVE_KPIs.sqls.val.replace(/,/g, '')), fill: '#8b5cf6' },
    { step: 'Opportunities', value: 186, fill: '#a855f7' }
  ]

  // Pipeline Velocity Trend (Derived from Scale Engine)
  const velocityData = POD_EXECUTIVE_STATS.pipeVelocity.map(v => ({
    month: v.month,
    pipe: v.value,
    target: Math.round(v.value * 0.9 * 10) / 10
  }))

  return (
    <div className="fade-in" style={{ padding: '40px 60px' }}>
      
      {/* 0. NARRATIVE DEMO HIGHLIGHTS (NEW) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
         {DEMO_INSIGHTS.map((insight, i) => (
           <div key={i} className="gtm-card" style={{ padding: '24px', borderLeft: `4px solid ${i === 0 ? 'var(--status-negative)' : i === 1 ? 'var(--accent-main)' : 'var(--status-positive)'}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '40px', opacity: 0.05 }}>
                 {i === 0 ? '📉' : i === 1 ? '🔥' : '📈'}
              </div>
              <div className="section-label" style={{ color: i === 0 ? 'var(--status-negative)' : i === 1 ? 'var(--accent-main)' : 'var(--status-positive)' }}>{insight.label}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, marginTop: '8px', marginBottom: '12px' }}>{insight.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>{insight.detail}</p>
              <button 
                className="gtm-button-primary" 
                style={{ width: '100%', fontSize: '12px', padding: '14px', background: i === 0 ? 'var(--status-negative)' : i === 1 ? 'var(--accent-main)' : 'var(--status-positive)', border: 'none' }}
                onClick={() => i === 0 ? triggerAction({ type: 'LEAK' }) : i === 1 ? triggerAction({ type: 'INTENT' }) : triggerAction({ type: 'DEPLOY' })}
              >
                {insight.action} →
              </button>
           </div>
         ))}
      </div>

      {/* 0.1 DATA CONFIDENCE PLACARD */}
      <div style={{ marginBottom: '40px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px' }}>
            <span style={{ fontSize: '18px' }}>📡</span>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#92400e' }}>MODELED DATA ACTIVE</div>
                <div style={{ fontSize: '12px', color: '#b45309', fontWeight: 600 }}>CRM enrichment is currently 84% complete. Pipeline influenced metrics are modeled based on historical engagement patterns.</div>
             </div>
             <button className="gtm-button-primary" style={{ background: '#92400e', color: '#fff', padding: '10px 16px', fontSize: '11px', fontWeight: 800 }}>RE-SYNC CRM</button>
         </div>
      </div>

      {/* 1. KPI STRATEGIC STRIP (9-POINTS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '12px', marginBottom: '40px' }}>
         {Object.entries(EXECUTIVE_KPIs).map(([key, data]) => (
           <div key={key} className="gtm-card" style={{ padding: '20px 16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                 <div className="numeric-emphasis" style={{ fontSize: '20px' }}>{data.val}</div>
                 <div style={{ fontSize: '11px', fontWeight: 900, color: data.trend === 'up' ? 'var(--status-positive)' : 'var(--status-negative)' }}>{data.delta}</div>
              </div>
              <div className="source-indicator" style={{ marginTop: '12px', fontSize: '10px', fontWeight: 800 }}>{data.source}</div>
           </div>
         ))}
      </div>

      {/* 2. ANALYTICAL CHARTS (FUNNEL & TREND) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '40px', marginBottom: '40px' }}>
         
         <div className="gtm-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900 }}>Conversion <span style={{ color: 'var(--accent-main)' }}>Funnel Analytics</span></h3>
            <div className="chart-subtitle" style={{ marginTop: '4px' }}>Leads to Opportunities (NAMER Segment)</div>
            <div style={{ height: '280px' }}>
               <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 60 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="step" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-main)', fontSize: 13, fontWeight: 800 }} />
                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                        {funnelData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                        ))}
                        <LabelList dataKey="value" position="right" style={{ fontSize: '12px', fontWeight: 900, fill: 'var(--text-main)' }} />
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
               PHASE SIGNAL: <span style={{ color: 'var(--status-positive)' }}>+14% SQL Velocity</span> detected in June.
            </div>
         </div>

         <div className="gtm-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900 }}>Pipeline <span style={{ color: 'var(--accent-main)' }}>Velocity Trend</span></h3>
            <div className="chart-subtitle" style={{ marginTop: '4px' }}>Actual vs Target ($M USD)</div>
            <div style={{ height: '280px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={velocityData}>
                     <defs>
                        <linearGradient id="colorPipe" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="var(--accent-main)" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="var(--accent-main)" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" padding={{ left: 20, right: 20 }} axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 800 }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 800 }} />
                     <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                     <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 900, paddingTop: '20px' }} />
                     <Area type="monotone" dataKey="pipe" name="Actual Pipeline" stroke="var(--accent-main)" strokeWidth={4} fillOpacity={1} fill="url(#colorPipe)" />
                     <Area type="monotone" dataKey="target" name="Revenue Target" stroke="#94a3b8" strokeDasharray="5 5" fill="transparent" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

      </div>

      {/* 3. HEAD-TO-HEAD: WINS VS LEAKS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
         <div className="gtm-card" style={{ padding: '32px' }}>
            <div className="section-label" style={{ color: 'var(--status-positive)', marginBottom: '20px' }}>TOP GROWTH LEVERS (WINS)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {EXECUTIVE_WINS.map((win, i) => (
                 <div key={i} className="gtm-row-compact" style={{ padding: '16px', background: '#fcfdfe', border: '1px solid var(--border-main)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                           <div style={{ fontSize: '16px', fontWeight: 900 }}>{win.item}</div>
                           <div style={{ fontSize: '13px', color: 'var(--status-positive)', fontWeight: 800, marginTop: '4px' }}>{win.impact}</div>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--status-positive)' }}>{win.delta}</div>
                     </div>
                     <p style={{ fontSize: '13px', color: '#475569', marginTop: '12px', lineHeight: 1.6 }}>{win.reason}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="gtm-card" style={{ padding: '32px' }}>
            <div className="section-label" style={{ color: 'var(--status-negative)', marginBottom: '20px' }}>CRITICAL REVENUE LEAKS (ANOMALIES)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {EXECUTIVE_LOSSES.map((loss, i) => (
                 <div key={i} className="gtm-row-urgent" style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                           <div style={{ fontSize: '16px', fontWeight: 900 }}>{loss.item}</div>
                           <div style={{ fontSize: '13px', color: 'var(--status-negative)', fontWeight: 800, marginTop: '4px' }}>{loss.impact}</div>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--status-negative)' }}>{loss.delta}</div>
                     </div>
                     <p style={{ fontSize: '13px', color: '#475569', marginTop: '12px', lineHeight: 1.6 }}>{loss.reason}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 4. AI STRATEGIC SUMMARY PANEL */}
      <div className="decision-card" style={{ padding: '40px', marginBottom: '40px' }}>
         <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent-main)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px' }}>✨</div>
            <div>
               <h3 style={{ fontSize: '20px', fontWeight: 900 }}>AI <span style={{ color: 'var(--accent-main)' }}>Strategic Summary</span></h3>
               <div className="section-label">WEEK 14 PERFORMANCE AUDIT</div>
            </div>
         </div>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-main)', fontWeight: 500 }}>{AI_WEEKLY_SUMMARY}</p>
      </div>

      {/* 5. RANKED NEXT BEST ACTIONS */}
      <div className="gtm-card" style={{ padding: '40px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900 }}>Ranked <span style={{ color: 'var(--accent-main)' }}>Next Best Actions</span></h3>
            <div className="section-label">SORTED BY REVENUE IMPACT</div>
         </div>
         <div className="gtm-table-container">
            <table className="gtm-table">
               <thead>
                  <tr>
                     <th>Action Priority</th>
                     <th>Primary Goal</th>
                     <th>Expected Lift</th>
                     <th>Strategic Rationale</th>
                     <th>Operational Owner</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {EXECUTIVE_NBA.map((nba, i) => (
                    <tr key={i} className="clickable-row">
                       <td style={{ fontWeight: 900 }}>
                          <span className={`${nba.priority === 'CRITICAL' ? 'urgent-badge' : ''}`} style={{ color: nba.priority === 'CRITICAL' ? 'var(--status-negative)' : 'var(--accent-main)' }}>{nba.priority}</span>
                          <div style={{ fontSize: '13px', marginTop: '4px' }}>{nba.action}</div>
                       </td>
                        <td className="numeric-emphasis" style={{ fontSize: '15px' }}>{nba.goal}</td>
                        <td className="numeric-emphasis" style={{ color: 'var(--status-positive)', fontSize: '15px' }}>{nba.impact}</td>
                        <td style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{nba.rationale}</td>
                       <td>
                          <span className="tag-badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)' }}>REVOPS</span>
                       </td>
                        <td style={{ textAlign: 'right' }}>
                           <button onClick={() => triggerAction(nba)} className="gtm-button-primary" style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 800 }}>ACT NOW</button>
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
