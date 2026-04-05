import React from 'react';
import Icon from '../ui/Icon.jsx';
import { Card, CardHeader, CardBody } from '../ui/Card.jsx';

const STATS = [
  { label: 'Active Campaigns', value: '12', change: '+2', trend: 'up' },
  { label: 'Avg. Lead Score', value: '78', change: '+12%', trend: 'up' },
  { label: 'Revenue Pipeline', value: '$2.4M', change: '+$400k', trend: 'up' },
];

const ACTIONS = [
  { id: 'dashboard', title: 'Revenue Signals', desc: 'Real-time performance distribution.', icon: 'activity', color: '#36B8F5' },
  { id: 'briefs', title: 'Orchestrate Brief', desc: 'Generate new content strategy.', icon: 'cpu', color: '#8B5CF6' },
  { id: 'scorer', title: 'Persona Scorer', desc: 'Predictive persona scoring.', icon: 'award', color: '#F59E0B' },
];

export default function HomeHub({ onNavigate }) {
  return (
    <div className="home-hub fade-in" style={{ padding: '48px 40px', background: 'var(--page-bg)', minHeight: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
           <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
           <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Core System Active</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: '-0.03em' }}>
          Welcome, <span style={{ background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Revenue Architect</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 500, maxWidth: 600, lineHeight: 1.6 }}>Your strategic command center is synchronized. <span style={{ color: '#fff', fontWeight: 700 }}>4 high-intent content gaps</span> have been identified for your Q3 revenue targets.</p>
      </div>

      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
        {STATS.map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <div style={{ fontSize: 36, fontWeight: 950, color: '#fff', letterSpacing: '-0.04em' }}>{s.value}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="trending_up" size={14} />
                {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
           <h3 style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Strategic Shortcuts</h3>
           <div style={{ height: 1, flex: 1, background: 'var(--border)', marginLeft: 24 }}></div>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {ACTIONS.map(a => (
            <div 
              key={a.id} 
              onClick={() => onNavigate(a.id)}
              className="glass-card" 
              style={{ 
                padding: '32px', 
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = a.color;
                e.currentTarget.style.boxShadow = `0 12px 30px -10px ${a.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                 <Icon name={a.icon} size={28} color={a.color} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 850, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>{a.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>{a.desc}</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: a.color, opacity: 0.3 }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
             <Icon name="bell" size={18} color="var(--accent-pink)" />
             <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>System Intelligence</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderLeft: '4px solid var(--accent-pink)', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--accent-pink)', textTransform: 'uppercase', marginBottom: 8 }}>Critical Alert</div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>
                SEO visibility for <span style={{ color: 'var(--accent-pink)' }}>"Project Management"</span> decreased by <span style={{ fontWeight: 800 }}>4%</span>. Orchestration required.
              </div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderLeft: '4px solid var(--accent-blue)', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: 8 }}>Opportunity Detected</div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>
                New Enterprise persona scored <span style={{ color: 'var(--accent-blue)', fontWeight: 800 }}>94/100</span> from your "Agile Workflows" brief.
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
             <Icon name="users" size={18} color="var(--purple)" />
             <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>Collaborative Pulse</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
             {[1, 2, 3].map(i => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 12, transition: 'all 0.2s' }}
                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
               >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, var(--purple), var(--accent-blue))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 900 }}>
                    U{i}
                  </div>
                  <div style={{ flex: 1 }}>
                     <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Strategic User {i}</div>
                     <div style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Updated "Enterprise Core" brief · {i * 2} hours ago</div>
                  </div>
                  <div style={{ height: 6, width: 6, borderRadius: '50%', background: 'var(--accent-blue)', opacity: 0.6 }}></div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
