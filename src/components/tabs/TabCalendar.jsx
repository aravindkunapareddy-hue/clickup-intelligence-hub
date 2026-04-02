import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import KVRow from '../ui/KVRow.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

function priorityBadge(p) {
  if (p === 'P0') return <Badge variant="red">{p}</Badge>
  if (p === 'P1') return <Badge variant="amber">{p}</Badge>
  return <Badge variant="cu">{p}</Badge>
}

export default function TabCalendar({ data, loading, onNext }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="📅" title="Production calendar will appear here" desc="Generate a brief to see priority, publish window, and 4-week plan." />

  const c = data.calendar
  return (
    <div>
      <div className="grid-3">
        <Card>
          <CardHeader icon="🚦" iconBg="#FEF2F2" title="Priority" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {priorityBadge(c.priority)}
            <p className="text-muted-sm">{c.priority_rationale}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader icon="🗓️" iconBg="#EFF6FF" title="Publish Window" />
          <CardBody>
            <div className="kv-list">
              <KVRow label="Window" value={c.recommended_publish_window} />
              <KVRow label="Lead time" value={`${c.lead_time_weeks} weeks`} />
              <KVRow label="Update freq." value={c.update_frequency} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader icon="🧩" iconBg="#FAF5FF" title="Series Potential" />
          <CardBody>
            <p className="text-muted-sm" style={{ marginBottom: 10 }}>{c.content_series_potential}</p>
            <div className="sublabel">Seasonal Relevance</div>
            <p className="text-muted-sm">{c.seasonal_relevance}</p>
          </CardBody>
        </Card>
      </div>

      {/* 4-Week Timeline */}
      <Card>
        <CardHeader icon="📆" iconBg="#EFF6FF" title="4-Week Production Timeline" />
        <CardBody>
          <div className="grid-4">
            {(c.weekly_tasks || []).map((week, i) => (
              <div key={i} className="week-card">
                <div className="week-label">Week {week.week}</div>
                <ul className="week-tasks">
                  {(week.tasks || []).map((task, j) => (
                    <li key={j} className="week-task">{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: Execution &rarr;
        </button>
      </div>
    </div>
  )
}
