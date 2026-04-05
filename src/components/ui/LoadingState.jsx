import { useState, useEffect } from 'react'

const STEPS = [
  'Classifying search intent...',
  'Mapping SERP landscape...',
  'Identifying content gaps...',
  'Building distribution plan...',
  'Generating execution tasks...',
  'Writing SEO metadata + GEO strategy...',
]

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-state" style={{ background: '#0F1115', color: '#fff' }}>
      <div className="loading-spinner" style={{ borderLeftColor: '#4f46e5' }} />
      <div className="loading-title" style={{ color: '#fff' }}>Building your content brief...</div>
      <div className="loading-subtitle" style={{ color: '#64748B' }}>Gemini is analyzing your inputs</div>
      <div className="loading-steps">
        {STEPS.map((step, i) => (
          <div key={step} className={`loading-step${i === activeStep ? ' active' : ''}`} style={{ color: i === activeStep ? '#4f46e5' : '#64748B' }}>
            <span className="step-dot" style={{ background: i === activeStep ? '#4f46e5' : 'rgba(255,255,255,0.1)' }} />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
