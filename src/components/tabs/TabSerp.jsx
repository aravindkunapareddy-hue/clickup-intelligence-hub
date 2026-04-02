import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import KVRow from '../ui/KVRow.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

function difficultyBadge(d) {
  if (!d) return null
  if (d === 'Low') return <Badge variant="green">Low Difficulty</Badge>
  if (d === 'High') return <Badge variant="red">High Difficulty</Badge>
  return <Badge variant="amber">Medium Difficulty</Badge>
}

export default function TabSerp({ data, loading, onNext }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="🔍" title="SERP analysis will appear here" desc="Generate a brief to see the competitive landscape." />

  const r = data.research
  return (
    <div>
      <div className="grid-2">
        {/* SERP Landscape */}
        <Card>
          <CardHeader
            icon="🗺️"
            iconBg="#FEF2F2"
            title="SERP Landscape"
            badge={difficultyBadge(r.diviculty_assessment)}
          />
          <CardBody>
            <div className="kv-list">
              <KVRow label="Current SERP" value={r.serp_landscape} />
              <KVRow label="Time to Rank" value={r.estimated_months_to_rank} />
              <KVRow
                label="SERP Features"
                value={
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
                    {(r.serp_features_to_target || []).map(f => (
                      <Badge key={f} variant="blue">{f}</Badge>
                    ))}
                  </div>
                }
              />
            </div>
          </CardBody>
        </Card>

        {/* ClickUp's Advantage */}
        <Card>
          <CardHeader icon="🏆" iconBg="#F0FDF4" title="ClickUp's Advantage" />
          <CardBody>
            <div className="advantage-box" style={{ marginBottom: 14 }}>
              {r.our_unfair_advantage}
            </div>
            <div className="sublabel">Content Gap</div>
            <p className="text-muted-sm">{r.content_gap}</p>
          </CardBody>
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader icon="⚔️" iconBg="#FFF7ED" title="Competitor Analysis" />
        <CardBody>
          <div style={{ marginBottom: 14 }}>
            <div className="sublabel" style={{ marginBottom: 8 }}>Competitor Weaknesses</div>
            {(r.competitor_weaknesses || []).map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: 'var(--error)', flexShrink: 0 }}>✗</span>
                <span>{w}</span>
              </div>
            ))}
          </div>
          <div className="sublabel" style={{ marginBottom: 10 }}>Top Ranking Examples</div>
          <table className="comp-table">
            <thead>
              <tr>
                <th>Competitor</th>
                <th>Content Type</th>
                <th>Weakness</th>
              </tr>
            </thead>
            <tbody>
              {(r.competitor_examples || []).map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.content_type}</td>
                  <td className="td-red">{c.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: Distribution &rarr;
        </button>
      </div>
    </div>
  )
}
