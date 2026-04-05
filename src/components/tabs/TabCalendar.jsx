import React from 'react'
import { ORCHESTRATION_TIMELINE } from '../../data/intelligence.js'

export default function TabCalendar({ contact }) {
  if (!contact) return null

  return (
    <div style={{ padding: '20px 0' }}>
      
      {/* 1. Header with Persona Context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
         <div>
            <h3 style={{ fontSize: '24px', fontWeight: 900 }}>{contact.name}'s <span className="luxury-neon-purple">Deployment Timeline</span></h3>
            <p style={{ color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>Strategic publish & distribution cadence mapped to high-intent signals.</p>
         </div>
         <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>LIVE TRACKING ACTIVE</span>
         </div>
      </div>

      {/* 2. Horizontal Orchestration Timeline */}
      <div style={{ 
        display: 'flex', 
        gap: '24px', 
        overflowX: 'auto', 
        paddingBottom: '24px',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {ORCHESTRATION_TIMELINE.map((item, i) => (
          <div key={i} className="luxury-card" style={{ 
            minWidth: '280px', 
            padding: '32px', 
            background: item.status === 'Complete' ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.02)',
            borderLeft: `4px solid ${item.color}`,
            position: 'relative'
          }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff' }}>{item.day}</span>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
             </div>
             
             <h4 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px', color: '#fff' }}>{item.label}</h4>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  color: item.color, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{item.status}</span>
             </div>

             <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />
             
             <div style={{ fontSize: '11px', color: '#71717a', lineHeight: 1.5 }}>
                {item.day === 'Day 4' ? `Asset: ${contact.topicCluster} Guide` : 
                 item.day === 'Day 7' ? `Action: AE Follow-up in 24h` : 
                 'Strategic task automated by Orchestrator.'}
             </div>
          </div>
        ))}
      </div>

      {/* 3. Temporal Insights Card */}
      <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
         <div className="luxury-card" style={{ padding: '32px', background: 'rgba(123, 104, 238, 0.03)', border: '1px solid rgba(123, 104, 238, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#7B68EE', marginBottom: '12px', textTransform: 'uppercase' }}>PEAK SIGNAL WINDOW</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>Wednesday, 10:00 AM EST</div>
            <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Historical data suggests Sarah Chen is most active in the mid-week comparison cycle.</p>
         </div>
         <div className="luxury-card" style={{ padding: '32px', background: 'rgba(255, 93, 225, 0.03)', border: '1px solid rgba(255, 93, 225, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FF5DE1', marginBottom: '12px', textTransform: 'uppercase' }}>ORCHESTRATION VELOCITY</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>48h Handoff Threshold</div>
            <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Deployment is optimized for high-speed conversion once signal loop completes.</p>
         </div>
      </div>

    </div>
  )
}
