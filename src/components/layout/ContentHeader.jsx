import Badge from '../ui/Badge.jsx'

const TABS = [
  { id: 'brief', label: '📋 Brief' },
  { id: 'serp', label: '🔍 SERP Research' },
  { id: 'distribution', label: '📣 Distribution' },
  { id: 'calendar', label: '📅 Calendar' },
  { id: 'execution', label: '✅ Execution' },
  { id: 'seo', label: '🏷 SEO Metadata' },
  { id: 'geo', label: '🤖 GEO / AI Search' },
]

export default function ContentHeader({ activeTab, onTabChange, generated, apiKey, onApiKeyChange, data, onSaveBrief, onNewBrief }) {
  const handleCopyMarkdown = () => {
    if (!data) return
    const md = `
# Content Brief: ${data.seo?.h1 || ''}

## 📋 Search Intent
- **Intent**: ${data.brief?.intent}
- **Rationale**: ${data.brief?.intent_rationale}
- **Primary Pain**: ${data.brief?.primary_pain}

## 💡 Angle & Hook
- **Recommended Angle**: ${data.brief?.recommended_angle}
- **Unique Hook**: ${data.brief?.unique_hook}

## 🔍 SERP Research
- **Landscape**: ${data.research?.serp_landscape}
- **Our Advantage**: ${data.research?.our_unfair_advantage}
- **Content Gap**: ${data.research?.content_gap}

## 📣 Distribution
- **CTA**: ${data.distribution?.cta_type} - ${data.distribution?.cta_headline}
- **Newsletter Angle**: ${data.distribution?.newsletter_angle}
- **LinkedIn Hook**: ${data.distribution?.linkedin_hook}

## 📅 Calendar
- **Priority**: ${data.calendar?.priority}

## ✅ Execution Timeline (${data.execution?.total_timeline_days} days)
${(data.execution?.tasks || []).map(t => `- [ ] ${t.title} (Owner: ${t.owner}, Day ${t.day_start})`).join('\n')}

## 🏷 SEO Metadata
- **Title**: ${data.seo?.title_tag}
- **Meta Description**: ${data.seo?.meta_description}
- **H1**: ${data.seo?.h1}
- **Slug**: ${data.seo?.url_slug}
    `.trim()
    navigator.clipboard.writeText(md)
    alert('Copied full brief to clipboard!')
  }
  return (
    <div className="content-header">
      <div className="breadcrumb">
        <span>Marketing</span>
        <span>·</span>
        <span className="breadcrumb-seg">Content Intelligence</span>
        <span>·</span>
        <span className="breadcrumb-seg">Brief Generator</span>
      </div>

      <div className="header-title-row">
        <h1 className="header-title">Content Brief Generator</h1>
        <Badge variant="cu">GEMINI API · LIVE</Badge>
        <div className="header-badges" style={{ display: 'flex', gap: 6 }}>
          {generated && <Badge variant="green" dot>Brief Generated</Badge>}
          {generated && (
            <button
              onClick={handleCopyMarkdown}
              style={{
                background: 'var(--purple-faint-bg)',
                color: 'var(--dark-purple)',
                border: '1px solid var(--purple-faint-border)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              📋 Copy Markdown
            </button>
          )}
          {generated && (
            <button
              onClick={onSaveBrief}
              style={{
                background: '#FAF5FF',
                color: '#7B68EE',
                border: '1px solid #E9D5FF',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              💾 Save Brief
            </button>
          )}
          <button
            onClick={onNewBrief}
            style={{
              background: '#FFFFFF',
              color: '#1C1917',
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            ➕ New Brief
          </button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="password"
            value={apiKey}
            onChange={e => onApiKeyChange(e.target.value)}
            placeholder="Gemini API Key"
            style={{
              border: '1px solid #D1D5DB',
              borderRadius: 7,
              padding: '5px 10px',
              fontSize: 12,
              background: '#F7F8FA',
              color: '#1C1917',
              outline: 'none',
              width: 200,
            }}
          />
        </div>
      </div>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
