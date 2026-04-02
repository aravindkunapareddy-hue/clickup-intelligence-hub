export function Card({ children, style }) {
  return <div className="card" style={style}>{children}</div>
}

export function CardHeader({ icon, iconBg, title, badge, children }) {
  return (
    <div className="card-header">
      {icon && (
        <div className="card-icon" style={{ background: iconBg || '#F7F8FA' }}>
          {icon}
        </div>
      )}
      <span className="card-title">{title}</span>
      {badge && <span className="card-badge">{badge}</span>}
      {children}
    </div>
  )
}

export function CardBody({ children, style }) {
  return <div className="card-body" style={style}>{children}</div>
}
