export default function KVRow({ label, value }) {
  return (
    <div className="kv-row">
      <span className="kv-key">{label}</span>
      <span className="kv-value">{value}</span>
    </div>
  )
}
