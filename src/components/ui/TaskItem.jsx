import Badge from './Badge.jsx'

export default function TaskItem({ task, useNumber, number }) {
  const priorityClass = task.priority === 'P0' ? 'dot-p0' : task.priority === 'P1' ? 'dot-p1' : 'dot-p2'
  const badgeVariant = task.priority === 'P0' ? 'red' : task.priority === 'P1' ? 'amber' : 'gray'

  return (
    <div className="task-item">
      <div className={`task-priority-dot ${priorityClass}`} />
      {useNumber
        ? <div className="task-num">{number}</div>
        : <div className="task-check">{number}</div>
      }
      <div className="task-content">
        <div className="task-name">{task.title}</div>
        <div className="task-meta">
          <span className="task-meta-text">{task.owner}</span>
          {task.day_start != null && (
            <span className="task-meta-text">Day {task.day_start}</span>
          )}
          {task.duration_hrs != null && (
            <span className="task-meta-text">{task.duration_hrs}h</span>
          )}
          <Badge variant={badgeVariant}>{task.priority}</Badge>
        </div>
      </div>
    </div>
  )
}
