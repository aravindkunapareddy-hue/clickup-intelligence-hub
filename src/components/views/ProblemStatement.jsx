import React from 'react'

const PAINS = [
  {
    title: 'Content impact is hard to see',
    body: 'A VP who consumed six blog posts and three YouTube videos looks the same as a one-page bounce. The signal depth never survives the handoff.',
  },
  {
    title: 'Pods operate on the wrong cadence',
    body: 'Content distribution is one-size-fits-all. High-intent readers get the same follow-up as low-intent readers.',
  },
  {
    title: 'Content impact is invisible',
    body: 'SEO optimises for traffic, not pipeline. No one can trace which pieces actually moved a buyer from curiosity to evaluation.',
  },
]

const PILLARS = [
  'Score every content-touched contact from 0 to 100.',
  'Label intent as Hot, Warm, or Cold based on signal mix and recency.',
  'Give sales a next action with real attribution context.',
  'Surface the content gap the SEO pod should write next.',
]

const POD_LOOP = [
  {
    pod: 'SEO Pod',
    outcome: 'Sees which topics and formats create downstream buying intent, not just sessions.',
  },
  {
    pod: 'Lifecycle Pod',
    outcome: 'Routes warm audiences into topic-matched distribution instead of one-size-fits-all sequences.',
  },
  {
    pod: 'Content Ops',
    outcome: 'Gets high-intent personas with the content story attached, so content decisions start with context.',
  },
]

export default function ProblemStatement({ onNavigate }) {
  return (
    <div className="view-frame">
      <section className="hero-panel">
        <div className="hero-badge">Problem statement first</div>
        <h1 className="hero-title">
          Connect the pods, surface content-led pipeline, and make content intelligence visible in the same system.
        </h1>
        <p className="hero-copy">
          ClickUp publishes 200+ pieces each month, but the handoff between content, demand gen, and sales breaks the
          signal chain. This product turns content consumption into shared operational context.
        </p>

        <div className="hero-stat-row">
          <div className="hero-stat-card">
            <div className="hero-stat-value">200+</div>
            <div className="hero-stat-label">monthly content assets</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-value">0</div>
            <div className="hero-stat-label">shared view of buyer intent today</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-value">3</div>
            <div className="hero-stat-label">pods that need one operating picture</div>
          </div>
        </div>
      </section>

      <section className="section-grid section-grid--three">
        {PAINS.map((item) => (
          <article key={item.title} className="info-card">
            <div className="info-card-kicker">Pain point</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="split-panel">
        <article className="feature-panel">
          <div className="section-label">What the app does</div>
          <h2>One scoring layer that translates content behaviour into pipeline-ready action.</h2>
          <p>
            The app ingests pages visited, content types, topics, recency, and depth, then returns a content-qualified
            persona score, intent tier, recommended content action, and the attribution story behind the score.
          </p>
          <div className="bullet-stack">
            {PILLARS.map((item) => (
              <div key={item} className="bullet-row">
                <span className="bullet-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="feature-panel feature-panel--accent">
          <div className="section-label">Why it matters</div>
          <h2>Content intelligence becomes the connective tissue between pods.</h2>
          <p>
            Instead of reporting traffic in one place and pipeline in another, the product creates a shared operating
            picture. Everyone sees what content influenced the contact, how close that person is to converting, and what
            the next team should do.
          </p>
          <button className="primary-button" onClick={() => onNavigate('dashboard')} type="button">
            Open the dashboard
          </button>
        </article>
      </section>

      <section className="pod-loop-panel">
        <div className="section-label">Connected workflow</div>
        <div className="pod-loop-list">
          {POD_LOOP.map((item, index) => (
            <div key={item.pod} className="pod-loop-card">
              <div className="pod-loop-index">0{index + 1}</div>
              <div>
                <h3>{item.pod}</h3>
                <p>{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
