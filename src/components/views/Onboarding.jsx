import React, { useState } from 'react'

function ClickUpLogo({ width = "120", height = "40" }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 10L12 16L20 10L12 4Z" fill="url(#paint0_linear_on)" />
        <path d="M4 14C4 14 7.5 17.5 12 17.5C16.5 17.5 20 14 20 14" stroke="url(#paint1_linear_on)" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="paint0_linear_on" x1="4" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5DE1" />
            <stop offset="1" stopColor="#7B68EE" />
          </linearGradient>
          <linearGradient id="paint1_linear_on" x1="4" y1="15.75" x2="20" y2="15.75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7B68EE" />
            <stop offset="1" stopColor="#36B8F5" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontSize: '42px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
        Click<span style={{ color: '#fff' }}>Up</span>
      </span>
    </div>
  )
}

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0) // 0: Splash, 1-3: Questions
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: 'focus',
      title: 'Strategic Focus',
      q: 'Where is your primary revenue gap today?',
      options: [
        { id: 'discovery', label: 'Discovery & SEO', desc: 'Top-funnel visibility and brand awareness.' },
        { id: 'alignment', label: 'Strategic Alignment', desc: 'Mid-funnel consideration and persona match.' },
        { id: 'conversion', label: 'Revenue Conversion', desc: 'Bottom-funnel decision and sales readiness.' },
      ]
    },
    {
      id: 'speed',
      title: 'Operational Velocity',
      q: 'How fast do you need to orchestrate content?',
      options: [
        { id: 'now', label: 'Real-time Signal', desc: 'Immediate response to behavioral triggers.' },
        { id: 'week', label: 'Weekly Sprint', desc: 'Batch orchestration for mid-term goals.' },
        { id: 'month', label: 'Quarterly Roadmap', desc: 'High-level editorial planning and strategy.' },
      ]
    },
    {
      id: 'threshold',
      title: 'Intent Threshold',
      q: 'What "Ready-to-Buy" score should trigger human outreach?',
      options: [
        { id: 'hot', label: 'Hot Only (90+)', desc: 'High-precision alerts for elite buyers.' },
        { id: 'warm', label: 'Warm & Hot (75+)', desc: 'Aggressive pipeline acceleration.' },
        { id: 'all', label: 'Comprehensive (50+)', desc: 'Nurture everything with strategic intent.' },
      ]
    }
  ]

  const handleAnswer = (questionId, optionId) => {
    const nextAnswers = { ...answers, [questionId]: optionId }
    setAnswers(nextAnswers)
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete(nextAnswers)
    }
  }

  if (step === 0) {
    return (
      <div className="luxury-dark-page" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', padding: '40px' }}>
          <div style={{ marginBottom: '48px' }}>
             <ClickUpLogo />
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Revenue Content <span className="luxury-neon-purple">Orchestrator</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            The executive blueprint for high-velocity marketing. Turn behavioral noise into 
            shared readiness scores and autonomous content action paths.
          </p>
          <button className="luxury-glow-button" onClick={() => setStep(1)}>
            Establish Command
          </button>
        </div>
      </div>
    )
  }

  const currentQ = questions[step - 1]

  return (
    <div className="luxury-dark-page" style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ maxWidth: '1000px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
             Step {step} of 3 · Configuration
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '16px' }}>{currentQ.q}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {currentQ.options.map(opt => (
            <div 
              key={opt.id} 
              className="luxury-question-card"
              onClick={() => handleAnswer(currentQ.id, opt.id)}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>{opt.label}</h3>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.5 }}>{opt.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              style={{ 
                width: '40px', 
                height: '4px', 
                borderRadius: '2px', 
                background: i === step ? '#7c3aed' : 'rgba(255,255,255,0.1)' 
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
