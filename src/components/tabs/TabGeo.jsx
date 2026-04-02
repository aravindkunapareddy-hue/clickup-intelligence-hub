import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import { TagPill } from '../ui/TagPill.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

function aiCompBadge(level) {
  if (level === 'Low') return <Badge variant="green">Competition: Low</Badge>
  if (level === 'High') return <Badge variant="red">Competition: High</Badge>
  return <Badge variant="amber">Competition: Medium</Badge>
}

export default function TabGeo({ data, loading }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="🤖" title="GEO / AI Search strategy will appear here" desc="Generate a brief to see AI search optimization and citation strategy." />

  const g = data.geo
  return (
    <div>
      {/* Primary AI Search Target */}
      <Card>
        <CardHeader
          icon="🤖"
          iconBg="#FAF5FF"
          title="Primary AI Search Target"
          badge={aiCompBadge(g.ai_search_competition)}
        />
        <CardBody>
          <div className="geo-gradient-box">
            <div className="geo-question">&ldquo;{g.primary_question}&rdquo;</div>
            <div className="geo-answer">{g.structured_answer}</div>
            <div className="geo-source-pills">
              {['clickup.com', 'Perplexity', 'ChatGPT', 'Google AI Overviews'].map(src => (
                <span key={src} className="geo-source-pill">{src}</span>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid-2">
        {/* Citation Strategy */}
        <Card>
          <CardHeader icon="📎" iconBg="#EFF6FF" title="Citation Strategy" />
          <CardBody>
            <p className="text-body" style={{ marginBottom: 14 }}>{g.citation_strategy}</p>
            <div className="sublabel">Entities to Mention</div>
            <div className="tags-row" style={{ marginBottom: 12 }}>
              {(g.entities_to_mention || []).map(e => <TagPill key={e}>{e}</TagPill>)}
            </div>
            <div className="sublabel">Schema Markup</div>
            <Badge variant="cu">{g.schema_markup_type}</Badge>
          </CardBody>
        </Card>

        {/* Secondary AI Queries */}
        <Card>
          <CardHeader icon="❓" iconBg="#F0FDF4" title="Secondary AI Queries" />
          <CardBody>
            {(g.secondary_questions || []).map((q, i) => (
              <div key={i} className="query-item">
                <span className="query-icon">?</span>
                <span>{q}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
