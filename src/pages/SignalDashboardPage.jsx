import React from 'react'
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, PieChart, Pie,
  AreaChart, Area,
  ComposedChart, Line,
  ScatterChart, Scatter,
} from 'recharts'
import { 
  SIGNAL_CONVERSION_HEATMAP, 
  TIMEFRAME_OPTIONS, 
  BLOG_STATS, 
  GLOBAL_SIGNALS,
  PIPELINE_FUNNEL,
  POD_REVENUE_CONTRIBUTION,
  CTA_STATS
} from '../data/intelligence.js'

export default function SignalDashboardPage({ timeframe, onChangeTimeframe, onNavigate }) {
  const COLORS = ['#FF5DE1', '#7B68EE', '#36B8F5', '#10b981', '#f59e0b'];

  return (
    <div className="luxury-dark-page" style={{ padding: '60px 80px' }}>
      
      {/* 1. Global Intelligence Header */}
      <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="luxury-neon-purple" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.2em' }}>Universal Signal Command</div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>Global <span className="luxury-neon-purple">Signal Intelligence</span></h1>
          <p style={{ color: '#a1a1aa', fontSize: '16px', fontWeight: 600 }}>Consolidated view of 200+ monthly assets vs. global revenue velocity.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="luxury-card" style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 800, borderColor: 'rgba(124, 58, 237, 0.4)', background: 'rgba(124, 58, 237, 0.05)' }}>
            <span className="luxury-neon-purple">LIVE ORCHESTRATION</span> · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* 2. Primary Executive Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '60px' }}>
        <div className="luxury-card" style={{ padding: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase' }}>OVERALL INTENSITY</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>{GLOBAL_SIGNALS.intensityScore}%</div>
          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>Elite Match Magnitude</div>
        </div>
        <div className="luxury-card" style={{ padding: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase' }}>PIPELINE VELOCITY</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#7B68EE' }}>{GLOBAL_SIGNALS.pipelineVelocity}</div>
          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>↑ Trend Magnitude</div>
        </div>
        <div className="luxury-card" style={{ padding: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase' }}>CTA MATCH ACCURACY</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#36B8F5' }}>{CTA_STATS.matchAccuracy}%</div>
          <div style={{ fontSize: '12px', color: '#36B8F5', fontWeight: 700 }}>AI Orchestration Precision</div>
        </div>
        <div className="luxury-card" style={{ padding: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase' }}>MONTHLY ASSETS</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#FF5DE1' }}>238</div>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 700 }}>Blog (214) + Video (24)</div>
        </div>
      </div>

      {/* 3. CTA Intelligence Dashboards (NEW SECTION) */}
      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Action <span className="luxury-neon-purple">Intelligence Engine</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '32px', marginBottom: '60px' }}>
        
        {/* CTA Conversion Magnitude */}
        <div className="luxury-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h3 style={{ fontSize: '18px', fontWeight: 900 }}>CTA <span className="luxury-neon-purple">Magnitude</span></h3>
             <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Conversion Distribution</span>
          </div>
          <div style={{ height: '250px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CTA_STATS.conversionMagnitude}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ background: '#09090b', border: 'none' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {CTA_STATS.conversionMagnitude.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Click Velocity Heatmap */}
        <div className="luxury-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Click <span className="luxury-neon-purple">Velocity</span></h3>
             <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Signal to Action Time</span>
          </div>
          <div style={{ height: '250px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CTA_STATS.clickVelocity}>
                  <XAxis dataKey="time" hide />
                  <Tooltip contentStyle={{ background: '#09090b', border: 'none' }} />
                  <Area type="monotone" dataKey="clicks" stroke="#7B68EE" strokeWidth={3} fill="rgba(123, 104, 238, 0.1)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Top Converting Assets */}
        <div className="luxury-card" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Top <span className="luxury-neon-purple">Assets</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             {CTA_STATS.topConvertingAssets.map(asset => (
               <div key={asset.title} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                     <div style={{ fontSize: '13px', fontWeight: 800 }}>{asset.title}</div>
                     <div style={{ fontSize: '10px', color: '#71717a' }}>{asset.signal} Match</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#10b981' }}>{asset.rate}</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 4. Critical Pipeline Dashboards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '32px', marginBottom: '60px' }}>
        
        {/* Pipeline Conversion Funnel */}
        <div className="luxury-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h3 style={{ fontSize: '22px', fontWeight: 900 }}>Universal <span className="luxury-neon-purple">Pipeline Funnel</span></h3>
             <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 700 }}>Discovery to SQL Handoff</span>
          </div>
          <div style={{ height: '350px' }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={PIPELINE_FUNNEL} margin={{ left: 100 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: '#fff', fontSize: 13, fontWeight: 800 }} width={140} />
                  <Tooltip contentStyle={{ background: '#0c0c10', border: 'none' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {PIPELINE_FUNNEL.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Pod Revenue Contribution */}
        <div className="luxury-card" style={{ padding: '40px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h3 style={{ fontSize: '22px', fontWeight: 900 }}>Pod Revenue <span className="luxury-neon-purple">Contribution</span></h3>
             <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 700 }}>Signal Matching Value ($M)</span>
           </div>
           <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={POD_REVENUE_CONTRIBUTION}>
                  <XAxis dataKey="pod" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 800 }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#09090b', border: 'none' }} />
                  <Bar dataKey="revenue" radius={[12, 12, 0, 0]}>
                    {POD_REVENUE_CONTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Line type="monotone" dataKey="signals" stroke="#fff" strokeWidth={3} dot={{ fill: '#fff', r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* 5. Leads Intelligence Log */}
      <div className="luxury-card" style={{ padding: '40px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900 }}>Hot Leads <span className="luxury-neon-purple">in Motion</span></h3>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {GLOBAL_SIGNALS.leadsInMotion.map((lead, i) => (
              <div key={i} className="luxury-list-item" style={{ padding: '24px 0' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1.5fr) minmax(200px, 2fr) minmax(150px, 1fr) 140px', alignItems: 'center', gap: '32px' }}>
                    <div>
                       <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff' }}>{lead.name}</div>
                       <div style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 700 }}>{lead.company}</div>
                    </div>
                    <div>
                       <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 800, marginBottom: '4px', textTransform: 'uppercase' }}>BEHAVIORAL SIGNAL</div>
                       <div style={{ fontSize: '15px', color: '#fff', fontWeight: 700 }}>{lead.signal}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                       <span className="luxury-tag pill" style={{ 
                          background: lead.to === 'Hot' ? 'rgba(255,93,225,0.1)' : lead.to === 'SQL' ? 'rgba(16,185,129,0.1)' : 'rgba(123,104,238,0.1)', 
                          color: lead.to === 'Hot' ? '#FF5DE1' : lead.to === 'SQL' ? '#10b981' : '#7B68EE', 
                          padding: '6px 16px',
                          fontSize: '12px'
                       }}>
                          {lead.from} → {lead.to}
                       </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <button className="luxury-glow-button" style={{ padding: '10px 16px', fontSize: '12px', width: '100%' }} onClick={() => onNavigate('intelligence')}>ORCHESTRATE</button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  )
}
