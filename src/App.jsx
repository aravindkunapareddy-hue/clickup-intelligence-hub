import { useState, useEffect } from 'react'
import Topbar from './components/layout/Topbar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import ContentHeader from './components/layout/ContentHeader.jsx'
import InputPanel from './components/input/InputPanel.jsx'
import TabBrief from './components/tabs/TabBrief.jsx'
import TabSerp from './components/tabs/TabSerp.jsx'
import TabDistribution from './components/tabs/TabDistribution.jsx'
import TabCalendar from './components/tabs/TabCalendar.jsx'
import TabExecution from './components/tabs/TabExecution.jsx'
import TabSeoMetadata from './components/tabs/TabSeoMetadata.jsx'
import TabGeo from './components/tabs/TabGeo.jsx'
import WelcomeScreen from './components/ui/WelcomeScreen.jsx'
import { generateBrief } from './api.js'

const DEFAULT_INPUTS = {
  keyword: '',
  contentType: 'Blog Post',
  persona: 'Team Lead / Project Manager',
  goal: 'Lead Generation',
  funnel: 'TOFU — Awareness',
  pod: 'SEO Blog',
  wordCount: '1500-2500',
  urgency: 'Medium — competitive',
  context: '',
}

const TAB_ORDER = ['brief', 'serp', 'distribution', 'calendar', 'execution', 'seo', 'geo']

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('clickup_gemini_key') || '')
  const [savedBriefs, setSavedBriefs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('clickup_saved_briefs')) || [] } catch { return [] }
  })
  const [activeBriefId, setActiveBriefId] = useState(null)
  
  useEffect(() => {
    localStorage.setItem('clickup_gemini_key', apiKey)
  }, [apiKey])

  useEffect(() => {
    localStorage.setItem('clickup_saved_briefs', JSON.stringify(savedBriefs))
  }, [savedBriefs])
  
  const [activeTab, setActiveTab] = useState('brief')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleInput = (key, value) => {
    setInputs(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'pod') {
        if (value === 'YouTube') next.contentType = 'YouTube Script'
        else if (value === 'Cust. Mktg') next.contentType = 'Customer Story'
        else if (value === 'Demand') next.contentType = 'Landing Page'
        else next.contentType = 'Blog Post'
      }
      return next
    })
  }

  const handleGenerate = async () => {
    if (!inputs.keyword.trim()) return
    setLoading(true)
    setError(null)
    setActiveTab('brief')

    try {
      const result = await generateBrief(inputs, apiKey)
      setData(result)
      setActiveBriefId(null) // Unsaved new generated brief
    } catch (err) {
      setError(err.message || 'Something went wrong. Check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBrief = () => {
    if (!data) return
    const defaultName = inputs.keyword || 'Untitled Brief'
    const name = window.prompt("Name this brief for your workspace:", defaultName)
    if (!name) return

    // If already saved under this active ID, update it
    let newId = activeBriefId
    if (!newId) {
      newId = Date.now().toString()
    }
    
    const newBrief = {
      id: newId,
      name,
      inputs,
      data,
      timestamp: Date.now()
    }
    
    setSavedBriefs(prev => {
      const filtered = prev.filter(x => x.id !== newId)
      return [newBrief, ...filtered]
    })
    setActiveBriefId(newId)
  }

  const handleLoadBrief = (id) => {
    const b = savedBriefs.find(x => x.id === id)
    if (b) {
      setInputs(b.inputs)
      setData(b.data)
      setActiveBriefId(b.id)
      setActiveTab('brief')
    }
  }

  const handleNewBrief = () => {
    setInputs(DEFAULT_INPUTS)
    setData(null)
    setActiveBriefId(null)
    setActiveTab('brief')
    setError(null)
  }

  const handleNextTab = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab)
    if (currentIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[currentIndex + 1])
    }
  }

  const loadExample = () => {
    setInputs({
      keyword: 'Project management tools for marketing',
      contentType: 'Blog Post',
      persona: 'Marketing Director',
      goal: 'Trial Signups',
      funnel: 'MOFU — Consideration',
      pod: 'SEO Blog',
      wordCount: '2500-3500',
      urgency: 'High — competitors dominate',
      context: 'Focus on replacing disjointed tools.',
    })
  }

  const tabProps = { data, loading, error, inputs, onNext: handleNextTab }

  const renderContentBody = () => {
    if (!data && !loading && !error) {
      return (
        <div style={{ flex: 1, padding: 20 }}>
          <WelcomeScreen onExampleClick={loadExample} />
        </div>
      )
    }

    return (
      <div className="output-area" style={{ position: 'relative' }}>
        {activeTab === 'brief' && <TabBrief {...tabProps} />}
        {activeTab === 'serp' && <TabSerp {...tabProps} />}
        {activeTab === 'distribution' && <TabDistribution {...tabProps} />}
        {activeTab === 'calendar' && <TabCalendar {...tabProps} />}
        {activeTab === 'execution' && <TabExecution {...tabProps} />}
        {activeTab === 'seo' && <TabSeoMetadata {...tabProps} />}
        {activeTab === 'geo' && <TabGeo {...tabProps} />}
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Topbar />
      <div className="app-body">
        <Sidebar savedBriefs={savedBriefs} activeBriefId={activeBriefId} onLoadBrief={handleLoadBrief} />
        <div className="content-area">
          <ContentHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            generated={!!data && !loading}
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            data={data}
            onSaveBrief={handleSaveBrief}
            onNewBrief={handleNewBrief}
          />
          <div className="content-body">
            <InputPanel
              inputs={inputs}
              onInput={handleInput}
              onGenerate={handleGenerate}
              loading={loading}
              generated={!!data}
            />
            {renderContentBody()}
          </div>
        </div>
      </div>
    </div>
  )
}
