import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import KVRow from '../ui/KVRow.jsx'
import InsightBar from '../ui/InsightBar.jsx'
import { TagPill, TagPillGray } from '../ui/TagPill.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

function intentBadgeVariant(intent) {
  if (!intent) return 'gray'
  const i = intent.toLowerCase()
  if (i.includes('commercial')) return 'amber'
  if (i.includes('transactional')) return 'green'
  if (i.includes('navigational')) return 'purple'
  return 'blue'
}

export default function TabBrief({ data, loading, error, inputs, onNext }) {
  if (loading) return <LoadingState />
  if (!data && !error) return (
    <EmptyState
      icon="📋"
      title="Your content brief will appear here"
      desc="Fill in the inputs on the left and click Generate Full Brief to get a Claude-powered strategy tailored to your keyword, persona, and business goal."
    />
  )
  if (error) return (
    <div className="error-card">
      <div className="error-title">⚠️ Generation Failed</div>
      <div className="error-msg">{error}</div>
    </div>
  )

  const b = data.brief
  return (
    <div>
      <InsightBar>
        Generated for: <strong>{inputs.keyword}</strong> · {inputs.contentType} · {inputs.persona} · {inputs.goal} · {inputs.funnel}
      </InsightBar>

      <div className="grid-2">
        {/* Search Intent */}
        <Card>
          <CardHeader
            icon="🎯"
            iconBg="#EFF6FF"
            title="Search Intent"
            badge={<Badge variant={intentBadgeVariant(b.intent)}>{b.intent}</Badge>}
          />
          <CardBody>
            <div className="kv-list">
              <KVRow label="Rationale" value={b.intent_rationale} />
              <KVRow label="Primary Pain" value={b.primary_pain} />
              <KVRow label="Format" value={b.content_format} />
              <KVRow label="Word Count" value={b.word_count_recommendation} />
            </div>
          </CardBody>
        </Card>

        {/* Recommended Angle */}
        <Card>
          <CardHeader icon="💡" iconBg="#F0FDF4" title="Recommended Angle" />
          <CardBody>
            <p className="text-body" style={{ marginBottom: 12 }}>{b.recommended_angle}</p>
            <div className="hook-box">
              <div className="hook-label">Opening Hook</div>
              <div className="hook-text">&ldquo;{b.unique_hook}&rdquo;</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Keywords & Entities */}
      <Card>
        <CardHeader icon="🔑" iconBg="#FAF5FF" title="Keywords & Semantic Entities" />
        <CardBody>
          <div className="sublabel">Secondary Keywords</div>
          <div className="tags-row">
            {(b.secondary_keywords || []).map(kw => <TagPill key={kw}>{kw}</TagPill>)}
          </div>
          <div className="sublabel">Semantic Entities to Include</div>
          <div className="tags-row">
            {(b.semantic_entities || []).map(e => <TagPillGray key={e}>{e}</TagPillGray>)}
          </div>
        </CardBody>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: SERP Research &rarr;
        </button>
      </div>
    </div>
  )
}
