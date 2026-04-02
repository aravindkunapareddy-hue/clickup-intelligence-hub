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
    <div className="loading-state">
      <div className="loading-spinner" />
      <div className="loading-title">Building your full content brief...</div>
      <div className="loading-subtitle">Claude is analyzing your inputs</div>
      <div className="loading-steps">
        {STEPS.map((step, i) => (
          <div key={step} className={`loading-step${i === activeStep ? ' active' : ''}`}>
            <span className="step-dot" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
