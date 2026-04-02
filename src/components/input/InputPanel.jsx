const POD_OPTIONS = ['SEO Blog', 'YouTube', 'Cust. Mktg', 'Demand']

export default function InputPanel({ inputs, onInput, onGenerate, loading, generated }) {
  const handleKeyDown = e => {
    if (e.key === 'Enter' && e.target.name === 'keyword') onGenerate()
  }

  return (
    <div className="input-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p className="input-panel-title" style={{ margin: 0 }}>Brief Inputs</p>
        <button
          onClick={() => {
            onInput('keyword', 'agile project management')
            onInput('contentType', 'Blog Post')
            onInput('persona', 'Team Lead / Project Manager')
            onInput('goal', 'Lead Generation')
            onInput('funnel', 'MOFU — Consideration')
            onInput('pod', 'SEO Blog')
            onInput('wordCount', '1500-2500')
            onInput('urgency', 'High — competitors dominate')
            onInput('context', 'We want to push the newly released Agile Dashboard Templates.')
          }}
          style={{
            fontSize: 12,
            border: '1px solid var(--border)',
            background: '#fff',
            padding: '4px 8px',
            borderRadius: 6,
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          Load Example
        </button>
      </div>

      <div className="field">
        <label className="field-label">Target Keyword<span className="field-required">*</span></label>
        <input
          className="field-input"
          name="keyword"
          value={inputs.keyword}
          onChange={e => onInput('keyword', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. agile sprint planning tool"
        />
      </div>

      <div className="field">
        <label className="field-label">Content Type</label>
        <select className="field-select" value={inputs.contentType} onChange={e => onInput('contentType', e.target.value)}>
          {inputs.pod === 'YouTube' ? (
            <>
              <option>YouTube Script</option>
              <option>YouTube Shorts Plan</option>
            </>
          ) : inputs.pod === 'Cust. Mktg' ? (
            <>
              <option>Customer Story</option>
              <option>Case Study</option>
              <option>Help Center Article</option>
            </>
          ) : inputs.pod === 'Demand' ? (
            <>
              <option>Landing Page</option>
              <option>Comparison Page</option>
              <option>Email Sequence</option>
              <option>Webinar Script</option>
            </>
          ) : (
            <>
              <option>Blog Post</option>
              <option>Template Page</option>
              <option>Glossary Definition</option>
              <option>Listicle</option>
            </>
          )}
        </select>
      </div>

      <div className="field">
        <label className="field-label">Primary Persona</label>
        <select className="field-select" value={inputs.persona} onChange={e => onInput('persona', e.target.value)}>
          <option>Team Lead / Project Manager</option>
          <option>Operations Manager</option>
          <option>Marketing Manager</option>
          <option>Engineering Lead</option>
          <option>VP / C-suite</option>
          <option>Freelancer / IC</option>
          <option>Agency</option>
        </select>
      </div>

      <div className="field">
        <label className="field-label">Business Goal</label>
        <select className="field-select" value={inputs.goal} onChange={e => onInput('goal', e.target.value)}>
          <option>Lead Generation</option>
          <option>Brand Awareness</option>
          <option>Trial Activation</option>
          <option>Feature Adoption</option>
          <option>Retention</option>
        </select>
      </div>

      <div className="field">
        <label className="field-label">Funnel Stage</label>
        <select className="field-select" value={inputs.funnel} onChange={e => onInput('funnel', e.target.value)}>
          <option>TOFU — Awareness</option>
          <option>MOFU — Consideration</option>
          <option>BOFU — Decision</option>
        </select>
      </div>

      <div className="pod-divider-label">Content Pod</div>
      <div className="pod-grid">
        {POD_OPTIONS.map(pod => (
          <button
            key={pod}
            className={`pod-btn${inputs.pod === pod ? ' selected' : ''}`}
            onClick={() => onInput('pod', pod)}
          >
            {pod}
          </button>
        ))}
      </div>

      <div className="field">
        <label className="field-label">Word Count</label>
        <select className="field-select" value={inputs.wordCount} onChange={e => onInput('wordCount', e.target.value)}>
          <option>800–1,200 (Short)</option>
          <option value="1500-2500">1,500–2,500 (Standard)</option>
          <option>3,000–5,000 (Pillar)</option>
          <option>Video: 5–8 min</option>
        </select>
      </div>

      <div className="field">
        <label className="field-label">Competitive Urgency</label>
        <select className="field-select" value={inputs.urgency} onChange={e => onInput('urgency', e.target.value)}>
          <option>Low — we can own this</option>
          <option>Medium — competitive</option>
          <option>High — competitors dominate</option>
        </select>
      </div>

      <div className="field">
        <label className="field-label">Additional Context</label>
        <textarea
          className="field-textarea"
          value={inputs.context}
          onChange={e => onInput('context', e.target.value)}
          placeholder="Any existing assets, angles, or constraints..."
        />
      </div>

      <button
        className="generate-btn"
        onClick={onGenerate}
        disabled={loading || !inputs.keyword.trim()}
      >
        {loading ? (
          <>
            <span className="btn-spinner" />
            Generating...
          </>
        ) : generated ? 'Regenerate Brief' : 'Generate Full Brief'}
      </button>
    </div>
  )
}
