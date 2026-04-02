import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import TaskItem from '../ui/TaskItem.jsx'
import InsightBar from '../ui/InsightBar.jsx'
import { TagPillGray } from '../ui/TagPill.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

export default function TabExecution({ data, loading, onNext }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="✅" title="Execution plan will appear here" desc="Generate a brief to see tasks, dependencies, and risks." />

  const e = data.execution
  return (
    <div>
      <InsightBar>
        Timeline: <strong>{e.total_timeline_days} days</strong> · <strong>{(e.tasks || []).length} tasks</strong> · Copy task titles directly into ClickUp
      </InsightBar>

      <div className="grid-2">
        {/* Task Breakdown */}
        <Card>
          <CardHeader icon="📋" iconBg="#EFF6FF" title="Task Breakdown" />
          <CardBody>
            <div className="task-list">
              {(e.tasks || []).map((task, i) => (
                <TaskItem key={i} task={task} number={i + 1} />
              ))}
            </div>
          </CardBody>
        </Card>

        <div>
          {/* Key Dependencies */}
          <Card>
            <CardHeader icon="🔗" iconBg="var(--purple-faint-bg)" title="Key Dependencies" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(e.key_dependencies || []).map((dep, i) => (
                  <TagPillGray key={i}>{dep}</TagPillGray>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Risks & Blockers */}
          <Card>
            <CardHeader icon="⚠️" iconBg="#FEF2F2" title="Risks & Blockers" />
            <CardBody>
              {(e.risks || []).map((r, i) => (
                <div key={i} className="risk-item">
                  <span className="risk-icon">⚠️</span>
                  <span>{r}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: SEO Metadata &rarr;
        </button>
      </div>
    </div>
  )
}
