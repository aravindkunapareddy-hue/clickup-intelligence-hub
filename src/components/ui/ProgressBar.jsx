export default function ProgressBar({ value, limit }) {
  const pct = Math.min((value / limit) * 100, 100)
  const over = value > limit
  return (
    <>
      <div className="progress-wrap">
        <div className={`progress-fill${over ? ' over' : ''}`} style={{ width: `${pct}%` }} />
      </div>
      <div className={`progress-count${over ? ' over' : ''}`}>{value} / {limit} chars{over ? ' — over limit' : ''}</div>
    </>
  )
}
