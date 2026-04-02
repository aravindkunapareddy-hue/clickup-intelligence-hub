export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 8 L12 3 L20 8" stroke="#7B68EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M4 14 L12 9 L20 14" stroke="#36B8F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span className="topbar-brand-name">ClickUp</span>
      </div>

      <div className="topbar-right">
        <span className="topbar-internal-badge">Content Intelligence · Internal</span>
      </div>
    </header>
  )
}
