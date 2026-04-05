import React from 'react';
import Icon from '../ui/Icon.jsx';
import Badge from '../ui/Badge.jsx';
import { Card, CardHeader, CardBody } from '../ui/Card.jsx';

const JOURNEYS = [
  { id: 'marketing', name: 'Marketing Ops', goals: '12%', avgScore: '84', icon: 'zap', color: '#36B8F5' },
  { id: 'ops', name: 'Content Ops', goals: '24%', avgScore: '92', icon: 'award', color: '#8B5CF6' },
  { id: 'cust_mktg', name: 'Customer Mktg', goals: '8%', avgScore: '76', icon: 'layers', color: '#F59E0B' },
];

export default function TeamJourneys({ onNavigate }) {
  return (
    <div className="team-journeys fade-in" style={{ padding: '48px 40px', background: 'var(--page-bg)', minHeight: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 56, textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 950, color: '#fff', marginBottom: 14, letterSpacing: '-0.03em' }}>
          Team <span style={{ color: 'var(--purple)' }}>Command Center</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
          Select a specialist pod to view multi-channel execution plans and performance metrics tailored to your revenue objectives.
        </p>
      </div>

      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
        {JOURNEYS.map(j => (
          <div 
            key={j.id}
            onClick={() => onNavigate('briefs')}
            className="glass-card"
            style={{ 
              padding: '40px 32px', 
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = j.color;
              e.currentTarget.style.boxShadow = `0 12px 30px -10px ${j.color}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ 
              width: 72, 
              height: 72, 
              borderRadius: 20, 
              background: 'var(--surface)', 
              border: '1px solid var(--border)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 28px' 
            }}>
               <Icon name={j.icon} size={36} color={j.color} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 850, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>{j.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
               <Badge variant="blue">{j.goals} Conversion</Badge>
               <Badge variant="purple">{j.avgScore} Quality</Badge>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6, fontWeight: 600 }}>
               Tactical orchestration of briefs and content assets optimized for growth.
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: j.color, opacity: 0.3 }}></div>
          </div>
        ))}
      </div>

      <div>
        <div className="glass-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
             <Icon name="activity" size={20} color="var(--accent-pink)" />
             <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Cross-Team Synergies</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
             <div>
               <h4 style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-dim)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Active Strategy Loops</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[1, 2].map(i => (
                    <div key={i} style={{ padding: '20px', border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: 14, transition: 'all 0.2s', cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                       <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>Channel Optimization Loop {i}</div>
                       <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5 }}>Routing SEO signals into content ops for refresh and republish cycles.</div>
                    </div>
                  ))}
               </div>
             </div>
             <div style={{ 
               padding: '40px', 
               background: 'linear-gradient(135deg, var(--accent-pink), var(--purple), var(--accent-blue))', 
               borderRadius: 24, 
               color: '#fff', 
               display: 'flex', 
               flexDirection: 'column', 
               justifyContent: 'center', 
               boxShadow: '0 12px 32px -8px rgba(255, 2, 240, 0.4)',
               position: 'relative',
               overflow: 'hidden'
             }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: '#fff', opacity: 0.1, filter: 'blur(40px)' }}></div>
                <div style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', marginBottom: 12, opacity: 0.9, letterSpacing: '0.1em' }}>Recommended Action</div>
                <div style={{ fontSize: 24, fontWeight: 950, marginBottom: 28, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Initialize Enterprise Content Audit</div>
                <button 
                  style={{ 
                    padding: '14px 28px', 
                    borderRadius: 12, 
                    border: 'none', 
                    background: '#fff', 
                    color: 'var(--accent-pink)', 
                    fontSize: 14,
                    fontWeight: 900, 
                    cursor: 'pointer', 
                    alignSelf: 'flex-start',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Start Scan
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
