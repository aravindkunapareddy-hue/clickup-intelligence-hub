import React from 'react'

const PODS = ['SEO Blog', 'YouTube', 'Podcast', 'Lifecycle', 'Social', 'Content Ops']
const FUNNELS = ['TOFU — Awareness', 'MOFU — Consideration', 'BOFU — Decision', 'Retention']
const GOALS = ['Lead Generation', 'Thought Leadership', 'Trial Signups', 'Expansion', 'Product Awareness']

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

export default function InputPanel({ inputs, onInput, onGenerate, loading, generated }) {
  return (
    <aside className="input-panel">
      <div className="input-panel-scroll">
        <div className="input-panel-section">
          <div className="input-panel-heading">Core brief</div>

          <Field label="Primary keyword">
            <input
              value={inputs.keyword}
              onChange={(event) => onInput('keyword', event.target.value)}
              placeholder="Project management tools for marketing"
            />
          </Field>

          <div className="field-grid">
            <Field label="Content pod">
              <select value={inputs.pod} onChange={(event) => onInput('pod', event.target.value)}>
                {PODS.map((pod) => (
                  <option key={pod} value={pod}>
                    {pod}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Funnel stage">
              <select value={inputs.funnel} onChange={(event) => onInput('funnel', event.target.value)}>
                {FUNNELS.map((funnel) => (
                  <option key={funnel} value={funnel}>
                    {funnel}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="field-grid">
            <Field label="Business goal">
              <select value={inputs.goal} onChange={(event) => onInput('goal', event.target.value)}>
                {GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Content type">
              <input value={inputs.contentType} onChange={(event) => onInput('contentType', event.target.value)} />
            </Field>
          </div>
        </div>

        <div className="input-panel-section">
          <div className="input-panel-heading">Audience and context</div>

          <Field label="Persona">
            <input value={inputs.persona} onChange={(event) => onInput('persona', event.target.value)} />
          </Field>

          <div className="field-grid">
            <Field label="Word count">
              <input value={inputs.wordCount} onChange={(event) => onInput('wordCount', event.target.value)} />
            </Field>

            <Field label="Urgency">
              <input value={inputs.urgency} onChange={(event) => onInput('urgency', event.target.value)} />
            </Field>
          </div>

          <Field label="Additional context">
            <textarea
              value={inputs.context}
              onChange={(event) => onInput('context', event.target.value)}
              placeholder="Competitors, product priorities, campaign notes, or specific gaps to address."
            />
          </Field>
        </div>
      </div>

      <div className="input-panel-footer">
        <button
          className="primary-button primary-button--full primary-button--large"
          disabled={loading || !inputs.keyword.trim()}
          onClick={onGenerate}
          type="button"
        >
          {loading ? 'Generating brief…' : generated ? 'Regenerate brief' : 'Generate brief'}
        </button>
      </div>
    </aside>
  )
}
