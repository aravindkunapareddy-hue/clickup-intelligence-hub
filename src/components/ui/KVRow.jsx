import React from 'react';

export default function KVRow({ label, value }) {
  return (
    <div className="kv-row">
      <div className="kv-label">{label}</div>
      <div className="kv-value">{value}</div>
    </div>
  )
}
