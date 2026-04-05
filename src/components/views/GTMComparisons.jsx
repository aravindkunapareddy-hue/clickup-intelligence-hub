import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts'
import { PERSONA_SIGNALS, CTA_LIBRARY } from '../../data/intelligence.js'

export default function GTMComparisons({ triggerAction }) {
  const personaData = PERSONA_SIGNALS.map(p => ({
    name: p.persona,
    heat: p.heat,
    assets: p.assets,
    meetings: p.repeat,
    pipeline: p.heat * 1.25 // Calculated Intent Magnitude
  }))

  const radarData = [
    { subject: 'Pipeline', A: 120, B: 110, fullMark: 150 },
    { subject: 'Engagement', A: 98, B: 130, fullMark: 150 },
    { subject: 'Conversion', A: 86, B: 130, fullMark: 150 },
    { subject: 'Retention', A: 99, B: 100, fullMark: 150 },
    { subject: 'Volume', A: 85, B: 90, fullMark: 150 },
  ]

  return (
    <div className="fade-in" style={{ padding: '60px 80px' }}>
      
      {/* 1. Comparison Header */}
      <div style={{ marginBottom: '56px' }}>
         <div className="section-label">GTM PERFORMANCE</div>
         <h1 style={{ fontSize: '32px' }}>Revenue <span style={{ color: 'var(--accent-main)' }}>Comparisons</span></h1>
         <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Head-to-head persona intent velocity and CTA conversion magnitude.</p>
      </div>

      {/* 2. Analytical Charts (2-Column) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', marginBottom: '64px' }}>
         
         {/* Persona Intent Velocity (Serious Bar Chart) */}
         <div className="gtm-card">
            <h3 style={{ fontSize: '16px', marginBottom: '32px' }}>Persona <span style={{ color: 'var(--accent-main)' }}>Intent Velocity</span></h3>
            <div style={{ height: '320px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={personaData} layout="vertical">
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-main)', fontSize: 13, fontWeight: 700 }} width={120} />
                     <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                     />
                     <Bar dataKey="heat" fill="var(--accent-main)" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Segment Heatmap (Analytical Radar) */}
         <div className="gtm-card">
            <h3 style={{ fontSize: '16px', marginBottom: '32px' }}>Segment <span style={{ color: 'var(--accent-main)' }}>Heatmap Radar</span></h3>
            <div style={{ height: '320px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                     <PolarGrid stroke="var(--border-light)" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 900 }} />
                     <Radar name="Enterprise" dataKey="A" stroke="var(--accent-main)" fill="var(--accent-main)" fillOpacity={0.1} />
                     <Radar name="Mid-Market" dataKey="B" stroke="var(--status-warning)" fill="var(--status-warning)" fillOpacity={0.1} />
                     <Tooltip />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </div>

      </div>

      {/* 3. CTA Library Performance (Premium Matrix) */}
      <div className="gtm-card">
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px' }}>CTA <span style={{ color: 'var(--accent-main)' }}>Performance Core</span></h3>
            <div className="section-label">REAL-TIME CONVERSION AUDIT</div>
         </div>

         <div className="gtm-table-container">
            <table className="gtm-table">
               <thead>
                  <tr>
                     <th>CTA Copy</th>
                     <th>Primary Persona</th>
                     <th>Avg CTR</th>
                     <th>Pipe Per Click</th>
                     <th>Analytical Rationale</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {CTA_LIBRARY.map((cta, i) => (
                    <tr key={i}>
                       <td><strong>{cta.copy}</strong></td>
                       <td><span className="tag-badge" style={{ background: '#f1f5f9', color: 'var(--text-main)' }}>{cta.persona}</span></td>
                       <td style={{ fontWeight: 900, color: 'var(--status-positive)' }}>{cta.ctr}</td>
                       <td style={{ fontFamily: 'monospace', fontWeight: 800 }}>{cta.pipePerClick}</td>
                       <td style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '300px' }}>{cta.rationale}</td>
                       <td>
                          <button 
                            onClick={() => triggerAction(cta)}
                            className="gtm-button-primary" 
                            style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 800 }}
                          >
                            AUDIT →
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
