import React from 'react'

const CHECKLIST = [
  'Enter a keyword and a short context.',
  'Choose the pod, funnel stage, and goal.',
  'Generate a structured brief across strategy, research, execution, SEO, and GEO.',
]

export default function WelcomeScreen({ onExampleClick }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <div className="welcome-badge">Minimal planning workspace</div>
        <h2>Generate a clean, structured content brief without the dashboard noise.</h2>
        <p>
          This workspace is designed to feel closer to ClickUp: direct, legible, and task-oriented. Start with an
          example or enter a live brief on the left.
        </p>

        <div className="welcome-actions">
          <button className="primary-button" onClick={onExampleClick} type="button">
            Load example brief
          </button>
        </div>
      </div>

      <div className="welcome-grid">
        <div className="welcome-card">
          <div className="welcome-card-title">What you get</div>
          <ul className="welcome-list">
            {CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="welcome-card">
          <div className="welcome-card-title">Best practice</div>
          <p className="welcome-card-copy">
            Add concrete competitors, product angles, campaign goals, or funnel context. The richer the brief, the
            sharper the output becomes.
          </p>
        </div>
      </div>
    </div>
  )
}
