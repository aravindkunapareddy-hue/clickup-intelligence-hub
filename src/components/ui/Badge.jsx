export default function Badge({ variant = 'gray', dot = false, children }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  )
}
