import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import KVRow from '../ui/KVRow.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

export default function TabDistribution({ data, loading, onNext }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="📣" title="Distribution plan will appear here" desc="Generate a brief to see CTA strategy, repurposing plays, and internal links." />

  const d = data.distribution
  return (
    <div>
      <div className="grid-2">
        {/* CTA Strategy */}
        <Card>
          <CardHeader
            icon="🎯"
            iconBg="#FFF7ED"
            title="CTA Strategy"
            badge={<Badge variant="green">{d.cta_type}</Badge>}
          />
          <CardBody>
            <div className="kv-list" style={{ marginBottom: 14 }}>
              <KVRow label="Placement" value={d.cta_placement} />
            </div>
            <div className="cta-preview-box">
              <div className="cta-preview-headline">{d.cta_headline}</div>
              <div className="cta-preview-body">{d.cta_body_copy}</div>
              <span className="cta-preview-btn">{d.cta_button_text}</span>
            </div>
          </CardBody>
        </Card>

        {/* Social & Newsletter */}
        <Card>
          <CardHeader icon="📱" iconBg="#F0FDF4" title="Social & Newsletter" />
          <CardBody>
            <div className="sublabel">LinkedIn Hook</div>
            <div className="linkedin-box" style={{ marginBottom: 12 }}>{d.linkedin_hook}</div>
            <div className="sublabel">Newsletter Angle</div>
            <p className="text-muted-sm" style={{ marginBottom: 10 }}>{d.newsletter_angle}</p>
            <div className="sublabel">YouTube Companion</div>
            <p className="text-muted-sm">{d.youtube_companion_angle}</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid-2">
        {/* Repurposing Plays */}
        <Card>
          <CardHeader icon="♻️" iconBg="#FAF5FF" title="Repurposing Plays" />
          <CardBody>
            {(d.repurposing_plays || []).map((p, i) => (
              <div key={i} className="play-item">
                <Badge variant="cu" style={{ flexShrink: 0 }}>{p.platform}</Badge>
                <div className="play-content">
                  <div className="play-format">{p.format}</div>
                  <div className="play-angle">{p.angle}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Internal Links */}
        <Card>
          <CardHeader icon="🔗" iconBg={undefined} title="Internal Links" />
          <CardBody>
            {(d.internal_links || []).map((link, i) => (
              <div key={i} className="task-item">
                <div className="task-num">{i + 1}</div>
                <div className="task-content">
                  <div className="task-name">{link.title}</div>
                  <div className="task-meta">
                    <span style={{ fontSize: 11, color: 'var(--dark-purple)', fontStyle: 'italic' }}>Anchor: &ldquo;{link.anchor_text}&rdquo;</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{link.rationale}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: Calendar &rarr;
        </button>
      </div>
    </div>
  )
}
