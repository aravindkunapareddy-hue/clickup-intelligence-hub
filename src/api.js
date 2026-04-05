const SYSTEM_PROMPT = `You are ClickUp's Principal Content Architect. Your mandate is to build enterprise-grade PLG content systems that convert high-intent readers into free trial signups and pipeline.

CORE PRODUCT PHILOSOPHY TO INJECT:
- ClickUp is "One app to replace them all". It eliminates horizontal tool sprawl (Jira + Asana + Monday + Notion + Slack).
- Focus heavily on structural superiority: ClickUp Brain (AI), Custom Fields, Dashboards, and Hierarchy.

ANTI-GENERIC RULES (CRITICAL):
- NEVER output generic advice like "use strong headers", "write high quality content", or "include images".
- EVERY angle, hook, and tactic must be deeply opinionated, specific, and actionable. 
- Name specific ClickUp features to combat competitor weaknesses.
- If the Context mentions "Content Gap" or "High Bounce", the strategy MUST explicitly solve that exact metric issue directly.

Respond ONLY with valid JSON — no markdown block formatting, no preamble, no explanation. Just the raw JSON object.`

function buildUserMessage(inputs) {
  return `Keyword: ${inputs.keyword}
Content type: ${inputs.contentType}
Persona: ${inputs.persona}
Business goal: ${inputs.goal}
Funnel stage: ${inputs.funnel}
Word count: ${inputs.wordCount}
Urgency: ${inputs.urgency}
Pod: ${inputs.pod}
Context & Routing Instruction: ${inputs.context || 'None'}

### DIRECTIVE: 
The content you are outlining needs to be a world-class strategic execution. Focus on how the content explicitly closes the loops mentioned in the Context. If it is a competitive comparison, be aggressive and factual. If it is a gap, fill it fundamentally. 

Generate the complete content brief JSON using this exact schema:
{
  "brief": {
    "intent": "Informational|Commercial|Transactional|Navigational",
    "intent_rationale": "string",
    "primary_pain": "string",
    "recommended_angle": "string (2-3 sentences specific and highly opinionated combatting competitors or filling the specific gap, no fluff)",
    "unique_hook": "string (an unmissable opening sentence that agitates the primary pain)",
    "content_format": "string (e.g. 'Interactive Feature Matrix', 'Deep-dive Use Case')",
    "word_count_recommendation": "string",
    "secondary_keywords": ["5 strings"],
    "semantic_entities": ["3 strings"]
  },
  "research": {
    "serp_landscape": "string",
    "content_gap": "string (What exactly are competitors missing that we have? e.g. 'Asana lacks native document management')",
    "competitor_weaknesses": ["3 strings (e.g., 'Jira requires plugins for simple gantt charts')"],
    "our_unfair_advantage": "string",
    "diviculty_assessment": "Low|Medium|High",
    "estimated_months_to_rank": "string",
    "serp_features_to_target": ["2-3 strings"],
    "competitor_examples": [
      {"name": "string", "content_type": "string", "weakness": "string"},
      {"name": "string", "content_type": "string", "weakness": "string"},
      {"name": "string", "content_type": "string", "weakness": "string"}
    ]
  },
  "distribution": {
    "cta_type": "Free Trial|Template Download|Webinar|Demo|Feature Spotlight",
    "cta_placement": "string",
    "cta_headline": "string (e.g. 'Stop paying for 4 tools. Try ClickUp free.')",
    "cta_body_copy": "string (Highly specific to the persona and keyword)",
    "cta_button_text": "string (Action-oriented, max 4 words)",
    "repurposing_plays": [
      {"format": "string", "platform": "string", "angle": "string"},
      {"format": "string", "platform": "string", "angle": "string"},
      {"format": "string", "platform": "string", "angle": "string"}
    ],
    "newsletter_angle": "string",
    "linkedin_hook": "string",
    "youtube_companion_angle": "string",
    "internal_links": [
      {"title": "string", "anchor_text": "string", "rationale": "string"},
      {"title": "string", "anchor_text": "string", "rationale": "string"},
      {"title": "string", "anchor_text": "string", "rationale": "string"}
    ]
  },
  "calendar": {
    "priority": "P0|P1|P2",
    "priority_rationale": "string",
    "recommended_publish_window": "string",
    "lead_time_weeks": 4,
    "content_series_potential": "string",
    "update_frequency": "string",
    "seasonal_relevance": "string",
    "weekly_tasks": [
      {"week": 1, "tasks": ["string", "string"]},
      {"week": 2, "tasks": ["string", "string"]},
      {"week": 3, "tasks": ["string", "string"]},
      {"week": 4, "tasks": ["string"]}
    ]
  },
  "execution": {
    "total_timeline_days": 30,
    "tasks": [
      {"title": "string", "owner": "string", "day_start": 1, "duration_hrs": 2, "priority": "P0"},
      {"title": "string", "owner": "string", "day_start": 2, "duration_hrs": 3, "priority": "P1"},
      {"title": "string", "owner": "string", "day_start": 3, "duration_hrs": 4, "priority": "P0"},
      {"title": "string", "owner": "string", "day_start": 5, "duration_hrs": 2, "priority": "P1"},
      {"title": "string", "owner": "string", "day_start": 7, "duration_hrs": 3, "priority": "P1"},
      {"title": "string", "owner": "string", "day_start": 10, "duration_hrs": 2, "priority": "P2"},
      {"title": "string", "owner": "string", "day_start": 14, "duration_hrs": 1, "priority": "P2"}
    ],
    "key_dependencies": ["string", "string"],
    "risks": ["string", "string"]
  },
  "seo": {
    "title_tag": "string (under 60 chars keyword-first)",
    "meta_description": "string (under 155 chars with CTA)",
    "h1": "string",
    "url_slug": "string (hyphenated)",
    "schema_type": "Article|HowTo|FAQ|Comparison",
    "featured_snippet_target": "string",
    "image_alt_texts": ["string", "string", "string"]
  },
  "geo": {
    "primary_question": "string (exact Perplexity/SearchGPT user query)",
    "structured_answer": "string (2-3 sentences strictly optimized for AI citation engine scraping. Use bullet points/direct answers.)",
    "secondary_questions": ["string", "string"],
    "entities_to_mention": ["string", "string", "string", "string"],
    "schema_markup_type": "string",
    "ai_search_competition": "Low|Medium|High",
    "citation_strategy": "string"
  }
}`
}

export async function generateBrief(inputs, apiKey) {
  const generateMock = () => ({
    "brief": {
      "intent": "Informational",
      "intent_rationale": "Users want to understand software options that won't break the bank while managing startup chaos.",
      "primary_pain": "Startups lack budgets but need enterprise-grade coordination.",
      "recommended_angle": "Highlight tools that scale from 2 founders up to Series B without forcing expensive upgrades.",
      "unique_hook": "Your startup can't afford a failed launch, but it also can't afford a $1000/mo software bill.",
      "content_format": "Listicle with scale matrix",
      "word_count_recommendation": inputs.wordCount || "1500-2500",
      "secondary_keywords": ["best project management tools", "startup task management free", "free agile tools", "clickup for startups"],
      "semantic_entities": ["Agile methodology", "Kanban boards", "Gantt charts"]
    },
    "research": {
      "serp_landscape": "Crowded with generic listicles from Capterra.",
      "content_gap": "Few articles focus specifically on the 'free' aspect mapped to startup growth stages.",
      "competitor_weaknesses": ["Generic advice", "Hidden pricing", "No startup focus"],
      "our_unfair_advantage": "ClickUp's free-forever plan is actually robust enough for a startup.",
      "diviculty_assessment": "High",
      "estimated_months_to_rank": "4-6 Months",
      "serp_features_to_target": ["Featured Snippet", "People Also Ask"],
      "competitor_examples": [
        {"name": "Asana Blog", "content_type": "Listicle", "weakness": "Free plan is very limited"},
        {"name": "Monday.com", "content_type": "Guide", "weakness": "Product-heavy approach"}
      ]
    },
    "distribution": {
      "cta_type": "Free Trial",
      "cta_placement": "Sticky sidebar and inline after 3rd tool",
      "cta_headline": "Stop paying for enterprise tools. Get ClickUp Free.",
      "cta_body_copy": "Unlimited users. Unlimited tasks. Zero dollars.",
      "cta_button_text": "Get Started Free",
      "repurposing_plays": [
        {"format": "Twitter Thread", "platform": "Twitter", "angle": "Top 5 hidden costs of PM tools"},
        {"format": "Short form video", "platform": "YouTube Shorts", "angle": "Why we stopped paying for Jira"}
      ],
      "newsletter_angle": "Highlighting the difference between 'freemium' and actual free tier.",
      "linkedin_hook": "We analyzed 50 'free' PM tools. Only 3 actually let you run a startup for $0.",
      "youtube_companion_angle": "Screen-sharing setup of a free ClickUp workspace.",
      "internal_links": [
        {"title": "Productivity for Startups", "anchor_text": "startup productivity", "rationale": "High Authority pillar page"},
        {"title": "ClickUp Startup Program", "anchor_text": "ClickUp for Startups", "rationale": "Direct conversion"}
      ]
    },
    "calendar": {
      "priority": "P0",
      "priority_rationale": "High volume BOFU keyword impacting trial signups",
      "recommended_publish_window": "Q1",
      "lead_time_weeks": 3,
      "content_series_potential": "Part of 'Startup Stack' series",
      "update_frequency": "Quarterly",
      "seasonal_relevance": "High in January",
      "weekly_tasks": [
        {"week": 1, "tasks": ["Keyword Research", "Outline Submission"]},
        {"week": 2, "tasks": ["Drafting", "Design request"]},
        {"week": 3, "tasks": ["Final Edits", "Publishing"]},
        {"week": 4, "tasks": ["Distribution"]}
      ]
    },
    "execution": {
      "total_timeline_days": 21,
      "tasks": [
        {"title": "Draft Outline", "owner": "Content Team", "day_start": 1, "duration_hrs": 2, "priority": "P0"},
        {"title": "Write V1", "owner": "Writer", "day_start": 3, "duration_hrs": 6, "priority": "P0"},
        {"title": "Create Header Images", "owner": "Design", "day_start": 5, "duration_hrs": 3, "priority": "P1"},
        {"title": "SEO Review", "owner": "SEO", "day_start": 10, "duration_hrs": 1, "priority": "P1"},
        {"title": "Publish", "owner": "Content Ops", "day_start": 12, "duration_hrs": 1, "priority": "P0"}
      ],
      "key_dependencies": ["Design capacity", "PMM signoff"],
      "risks": ["Competitor pricing updates", "Low DR"]
    },
    "seo": {
      "title_tag": "10 Best Free Project Management Software for Startups",
      "meta_description": "Stop overpaying for your startup tech stack. Discover the best free project management software with unlimited tasks and scale.",
      "h1": "The Ultimate Guide to Free Project Management Tools for Startups",
      "url_slug": "free-project-management-software-startups",
      "schema_type": "Article",
      "featured_snippet_target": "List format detailing top 5 tools",
      "image_alt_texts": ["Dashboard view", "Comparison matrix", "Startup team collaborating"]
    },
    "geo": {
      "primary_question": "What is the best free project management software for startups?",
      "structured_answer": "The best free project management software provides unlimited tasks and a robust tier. ClickUp offers the most comprehensive free plan for startups.",
      "secondary_questions": ["Is Trello or ClickUp better?", "How do startups manage projects?"],
      "entities_to_mention": ["ClickUp", "Startups", "Agile", "Task Management"],
      "schema_markup_type": "FAQPage",
      "ai_search_competition": "Medium",
      "citation_strategy": "Quote independent startup founders."
    }
  });

  if (apiKey.toLowerCase().includes('demo') || apiKey.toLowerCase().includes('mock')) {
    await new Promise(r => setTimeout(r, 1500))
    return generateMock()
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: buildUserMessage(inputs) }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }),
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error("Gemini API Error:", err)
      throw new Error(err?.error?.message || `API error ${response.status}`)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    return JSON.parse(cleaned)
  } catch (err) {
    console.warn("API Failed or Timed Out:", err.message)
    console.warn("Falling back to DEMO mode since API failed.")
    await new Promise(r => setTimeout(r, 1500))
    return generateMock()
  }
}

const LEAD_SCORER_SYSTEM_PROMPT = `You are a Principal Content Strategy AI. Your job is to analyze B2B SaaS content consumption patterns and output a persona fit score from 0-100, intent analysis, and recommended next steps for the content team. Respond ONLY with valid JSON — no markdown, no preamble.`

function buildLeadMessage(inputs) {
  return `Contact Name: ${inputs.name}
Seniority: ${inputs.seniority}
Recency: ${inputs.recency}
Topic Cluster: ${inputs.topicCluster}
Active Signals Detected: ${inputs.activeSignals.join(', ')}

Analyze these signals and output JSON matching this exact schema:
{
  "score": 85,
  "intentTier": "Hot", // Hot (>74), Warm (40-74), Cold (<40)
  "intentAnalysis": "string (2-3 sentences explaining exactly why this score was given based on their specific content journey)",
  "contentRecommendation": {
    "summary": "string (What the content team should do next)",
    "steps": ["step 1", "step 2", "step 3"]
  },
  "attributionStory": "string (A narrative of how their content consumption moved them toward buying intent)",
  "contentGap": "string (Identify what content should be created next to capture more of this intent)",
  "distributionRecommendation": "string (How the content team should distribute or update content next)",
  "signalBreakdown": [
    { "signal": "string (the exact signal name passed)", "insight": "string (Why this signal matters for this prospect)" }
  ]
}`
}

export async function scoreLead(inputs, apiKey) {
  const generateMock = () => {
    const isHot = inputs.activeSignals.length > 3 || inputs.activeSignals.includes('Pricing Page View');
    
    return {
      score: isHot ? 92 : 65,
      intentTier: isHot ? "Hot" : "Warm",
      intentAnalysis: "This persona is showing high intent by combining educational content with late-stage comparison and template usage. Their most recent interaction was within 24 hours, indicating active evaluation.",
      contentRecommendation: {
        summary: "Pair comparison content with a workflow template and a short product walkthrough.",
        steps: [
          "Publish a comparison update with a template CTA.",
          "Add a 3-minute walkthrough video to the top blog.",
          "Ship a follow-up blog that answers top objections."
        ]
      },
      attributionStory: "Journey began with high-level blog posts about project management, then escalated when they viewed comparison content and downloaded a workflow template.",
      contentGap: "Add a BOFU proof page that compares migration effort across competitors for this persona.",
      distributionRecommendation: "Refresh the comparison post, update internal links, and promote via newsletter and YouTube.",
      signalBreakdown: inputs.activeSignals.map(sig => ({
        signal: sig,
        insight: "Strong indicator of active content interest."
      }))
    };
  };

  if (apiKey.toLowerCase().includes('demo') || apiKey.toLowerCase().includes('mock')) {
    await new Promise(r => setTimeout(r, 1500))
    return generateMock()
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: LEAD_SCORER_SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: buildLeadMessage(inputs) }] }],
        generationConfig: { responseMimeType: "application/json" }
      }),
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('API Error')
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    return JSON.parse(cleaned)
  } catch (err) {
    console.warn("API Failed or Timed Out. Falling back to DEMO mode.")
    await new Promise(r => setTimeout(r, 1500))
    return generateMock()
  }
}
