import { Card, CardHeader, CardBody } from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'

export default function TabSeoMetadata({ data, loading, onNext }) {
  if (loading) return <LoadingState />
  if (!data) return <EmptyState icon="🏷" title="SEO metadata will appear here" desc="Generate a brief to see title tag, meta description, H1, slug, and more." />

  const s = data.seo
  return (
    <div className="grid-2">
      {/* Left column — meta boxes */}
      <div>
        <div className="meta-box">
          <div className="meta-box-label">Title Tag</div>
          <div className="meta-field-title">{s.title_tag}</div>
          <ProgressBar value={(s.title_tag || '').length} limit={60} />
        </div>

        <div className="meta-box">
          <div className="meta-box-label">Meta Description</div>
          <div className="meta-field-desc">{s.meta_description}</div>
          <ProgressBar value={(s.meta_description || '').length} limit={155} />
        </div>

        <div className="meta-box">
          <div className="meta-box-label">H1</div>
          <div className="meta-field-h1">{s.h1}</div>
        </div>

        <div className="meta-box">
          <div className="meta-box-label">URL Slug</div>
          <div className="meta-field-slug">
            <span className="slug-base">clickup.com/blog/</span>
            <span className="slug-val">{s.url_slug}</span>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div>
        <Card>
          <CardHeader
            icon="⭐"
            iconBg="#FAF5FF"
            title="Featured Snippet Target"
            badge={<Badge variant="purple">{s.schema_type}</Badge>}
          />
          <CardBody>
            <div className="snippet-box">{s.featured_snippet_target}</div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader icon="🖼️" iconBg="var(--purple-faint-bg)" title="Image Alt Texts" />
          <CardBody>
            {(s.image_alt_texts || []).map((alt, i) => (
              <div key={i} className="alt-text-box">{alt}</div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 24 }}>
        <button onClick={onNext} style={{ background: '#7B68EE', color: 'white', padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)' }}>
          Next Step: GEO / AI Search &rarr;
        </button>
      </div>
    </div>
  )
}
