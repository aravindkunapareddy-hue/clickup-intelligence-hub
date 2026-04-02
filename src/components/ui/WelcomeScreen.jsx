import React from 'react'

export default function WelcomeScreen({ onExampleClick }) {
  return (
    <div className="welcome-screen" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '40px',
      textAlign: 'center',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        width: 64,
        height: 64,
        background: 'rgba(123, 104, 238, 0.1)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      
      <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1C1917', marginBottom: 12 }}>
        Welcome to Content Intelligence
      </h2>
      
      <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 450, lineHeight: 1.6, marginBottom: 32 }}>
        This tool uses your selected LLM to generate highly structured, ClickUp-ready content briefs. 
        It integrates SEO research, distribution strategies, operations timelines, and metadata formatting automatically.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 16,
        width: '100%',
        maxWidth: 700,
        marginBottom: 40,
        textAlign: 'left'
      }}>
        <div style={{ padding: 20, background: '#F7F8FA', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#1C1917', marginBottom: 8 }}>1. Select Pod</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Choose your marketing channel (e.g. SEO, YouTube) to tailor the response schema.</div>
        </div>
        <div style={{ padding: 20, background: '#F7F8FA', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#1C1917', marginBottom: 8 }}>2. Define Goal</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Lock in the keyword, funnel stage, and primary persona to align strategy.</div>
        </div>
        <div style={{ padding: 20, background: '#F7F8FA', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#1C1917', marginBottom: 8 }}>3. Generate</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Get a 7-tab operational brief ready to be copied into a ClickUp Doc.</div>
        </div>
      </div>

      <button 
        onClick={onExampleClick}
        style={{
          background: '#7B68EE',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: 14,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(123, 104, 238, 0.2)'
        }}
      >
        Try an Example
      </button>
    </div>
  )
}
