const SPACES = [
  { label: 'Campaigns (Coming soon)', color: '#7B68EE', disabled: true },
  { label: 'Blogs (Coming soon)', color: '#36B8F5', disabled: true },
  { label: 'Brand Assets (Coming soon)', color: '#59C6A5', disabled: true },
  { label: 'Design Workflows (Coming soon)', color: '#F59E0B', disabled: true },
  { label: 'Launch Plans (Coming soon)', color: '#EF4444', disabled: true },
]

const WORKSPACE_ITEMS = [
  { icon: '⚡', label: 'Content Intelligence', active: true },
  { icon: '📊', label: 'Analytics Hub (Coming soon)', disabled: true },
  { icon: '📋', label: 'Campaign Tracker (Coming soon)', disabled: true },
  { icon: '🤖', label: 'AI Workflows (Coming soon)', disabled: true },
]

const POD_ITEMS = [
  { icon: '✍️', label: 'SEO / Blog Pod (Coming soon)', disabled: true },
  { icon: '🎥', label: 'YouTube Pod (Coming soon)', disabled: true },
  { icon: '⭐', label: 'Customer Marketing (Coming soon)', disabled: true },
  { icon: '📣', label: 'Demand Pod (Coming soon)', disabled: true },
]

export default function Sidebar({ savedBriefs = [], activeBriefId, onLoadBrief }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">Marketing Workspace</div>
      {WORKSPACE_ITEMS.map(item => (
        <div key={item.label} className={`sidebar-item${item.active ? ' active' : ''}`} style={item.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
          <span className="sidebar-item-icon">{item.icon}</span>
          <span className="sidebar-item-label">{item.label}</span>
        </div>
      ))}

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Workspace Briefs ({savedBriefs.length})</div>
      {savedBriefs.length === 0 && <div style={{ fontSize: 12, color: '#9CA3AF', padding: '0 12px', marginBottom: 12 }}>No saved briefs yet.</div>}
      {savedBriefs.map(b => (
        <div 
          key={b.id} 
          className={`sidebar-item${activeBriefId === b.id ? ' active' : ''}`}
          onClick={() => onLoadBrief(b.id)}
          title={b.name}
        >
          <span className="sidebar-item-icon">📄</span>
          <span className="sidebar-item-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</span>
        </div>
      ))}

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Content Pods</div>
      {POD_ITEMS.map(item => (
        <div key={item.label} className="sidebar-item" style={item.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
          <span className="sidebar-item-icon">{item.icon}</span>
          <span className="sidebar-item-label">{item.label}</span>
          {item.count && <span className="sidebar-count">{item.count}</span>}
        </div>
      ))}

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Spaces</div>
      {SPACES.map(s => (
        <div key={s.label} className="sidebar-item" style={s.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
          <span className="sidebar-space-dot" style={{ background: s.color }} />
          <span className="sidebar-item-label">{s.label}</span>
        </div>
      ))}
    </aside>
  )
}
