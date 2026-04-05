import { DATA_SUITE } from './generator.js';

// GTM OPERATING SYSTEM: THE SCALE ENGINE
// NARRATIVE ANCHOR: $1.4M Enterprise Revenue Leak (Engineered Deterministically)

export const DEMO_INSIGHTS = [
  { id: 'leak', label: 'CRITICAL LEAK', title: '$1.4M Enterprise Revenue at Risk', detail: 'Missing "Security & SSO" proof on Comparison-stage assets is causing a 22% drop-off in high-value NAMER leads.', action: 'GO TO LEAK' },
  { id: 'intent', label: 'INTENT PEAK', title: 'VP Product Signals: Notion & Vercel', detail: 'Surge in engagement (4.2x) from high-proximity accounts on "Scale" content; 95% precision score.', action: 'SCORE LEADS' },
  { id: 'velocity', label: 'VELOCITY GAIN', title: 'YouTube: Agile Governance Resonance', detail: 'IT Director retention peaked at 68% for the new Agile guide. $0.6M pipeline influenced this week.', action: 'DEPLOY CTA' },
];

export const GLOBAL_FILTERS = {
  dateRanges: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'],
  personas: ['VP Product', 'IT Director', 'Marketing Ops', 'Founder', 'Engineering Lead', 'Project Manager'],
  industries: ['SaaS', 'Fintech', 'Ecommerce', 'Healthcare Tech', 'Professional Services', 'Agencies', 'Tech-Enabled Ops'],
  segments: ['Enterprise', 'Mid-Market', 'SMB'],
  funnelStages: ['Discovery', 'Engagement', 'Comparison', 'Decision'],
  assetTypes: ['Blog Post', 'Pillar Page', 'Comparison Page', 'Template Page', 'Use-Case Page', 'FAQ Page', 'Customer Story', 'Landing Page'],
  ctaTypes: ['Trial', 'Demo', 'Download', 'Newsletter'],
  ownerPods: ['SEO Pod A', 'SEO Pod B', 'YouTube Pod', 'Lifecycle'],
  regions: ['North America', 'EMEA', 'APAC'],
};

// DERIVED KPI STRIP (Calculated from 10k Records)
const totalSourced = DATA_SUITE.seoAssets.reduce((sum, a) => sum + (a.sourced_pipeline || 0), 0);
const totalLeads = DATA_SUITE.contacts.length;

export const EXECUTIVE_KPIs = {
  leads: { val: totalLeads.toLocaleString(), delta: '+12%', trend: 'up', source: 'CRM: LEAD_GEN' },
  mqls: { val: Math.round(totalLeads * 0.2).toLocaleString(), delta: '+8%', trend: 'up', source: 'CRM: CONV_ENGINE' },
  sqls: { val: Math.round(totalLeads * 0.05).toLocaleString(), delta: '+15%', trend: 'up', source: 'CRM: SALES_OPS' },
  sourcedPipe: { val: `$${(totalSourced / 1000000).toFixed(1)}M`, delta: '+12%', trend: 'up', source: 'CRM: SOURCED' },
  influencedPipe: { val: `$${((totalSourced * 1.8) / 1000000).toFixed(1)}M`, delta: '+22%', trend: 'up', source: 'CRM: INFLUENCED' },
  demoRequests: { val: '1,240', delta: '+4%', trend: 'up', source: 'GA4: EVENT_DEMO' },
  signupStarts: { val: '4,850', delta: '+6%', trend: 'up', source: 'GA4: EVENT_SIGNUP' },
  pipePerAsset: { val: `$${(totalSourced / DATA_SUITE.seoAssets.length / 1000).toFixed(0)}k`, delta: '+6%', trend: 'up', source: 'MODELED: PIPE_ATTRIB' },
  leadsPer1k: { val: '24.2', delta: '-1.4', trend: 'down', source: 'GA4: SESS_EFFICIENCY' },
};

// TOP PERFORMERS (Derived from Scale Engine)
export const EXECUTIVE_WINS = DATA_SUITE.seoAssets
  .filter(a => a.sourced_pipeline > 400000)
  .slice(0, 3)
  .map(a => ({
    item: a.title,
    impact: `+$${(a.sourced_pipeline / 1000000).toFixed(1)}M Pipeline`,
    delta: `+${(Math.random() * 20 + 10).toFixed(0)}% CTR`,
    reason: `Breakout winner in ${a.persona} segment; high resonance.`
  }));

export const EXECUTIVE_LOSSES = [
  { item: 'Ent. Security Whitepaper', impact: '-$0.6M Risk', delta: '-22% Conversion', reason: 'Critical BOFU Proof-Gap detected on Security nodes.' },
  { item: 'Blog / Pricing Page', impact: '-$0.5M Risk', delta: '-14% Conversion', reason: 'CTA Mismatch (Founders trial shown to Enterprise leads).' },
  { item: 'Demo Form / SMB', impact: '-$0.3M Risk', delta: '-12% Start Rate', reason: 'High friction on secondary conversion paths.' }
];

export const AI_WEEKLY_SUMMARY = `Overall revenue velocity is up 12% MoM, anchored by a $${(totalSourced / 1000000).toFixed(1)}M sourced pipeline from the organic layer. High-fidelity signals from the scale-engine detected ${DATA_SUITE.opportunities.length} tactical opportunities. We are tracking a critical $1.4M leakage due to a 22% drop-off in the Comparison stage for high-value Enterprise leads on the Security Whitepaper asset. Recommend inserting SOC2 social proof across the Agile and Security clusters immediately.`;

export const OPPORTUNITY_QUEUE = DATA_SUITE.opportunities;

export const FUNNEL_LEAKS = [
  { area: 'Blog-to-Demo', loss: '22%', impact: '$1.4M', rationale: 'High-intent search traffic dropping off due to missing specific "Security" social proof.' },
  { area: 'Trial-to-MQL', loss: '14%', impact: '$0.8M', rationale: 'Onboarding friction on high-value enterprise accounts.' }
];

export const EXECUTIVE_NBA = [
  { action: 'Audit Security Social Proof', priority: 'CRITICAL', goal: 'Recover $1.4M Pipe', impact: '↑ 1.2pt Conv', rationale: 'Addresses the #1 leakage point identified in Blog-to-Demo transition.', type: 'LEAK' },
  { action: 'Refresh Agile Governance Brief', priority: 'HIGH', goal: 'Stop $0.8M Decay', impact: '↑ 14 Pos Recovery', rationale: 'Counter-acts competitor template updates and restores Top 3 position.', details: { asset: 'Cluster: Agile Velocity', brief: 'Update Top 3 competitor comparison table with latest SoC2 Type II audit results.' } },
  { action: 'Activate VIP Lead Outreach', priority: 'MEDIUM', goal: 'Capture $2.2M Opp', impact: '↑ 12% SQL volume', rationale: 'Marcus Aurelius (Vercel) and other high-intent entities are ripe for direct sales.' }
];

export const LEAD_LIBRARY = DATA_SUITE.contacts;

export const POD_EXECUTIVE_STATS = {
  pipeVelocity: [
    { month: 'Jan', value: 2.1 }, { month: 'Feb', value: 2.8 }, { month: 'Mar', value: 3.5 },
    { month: 'Apr', value: 4.2 }, { month: 'May', value: 5.1 }, { month: 'Jun', value: 6.4 },
  ]
};

export const SEO_ASSETS = DATA_SUITE.seoAssets;

export const YOUTUBE_ASSETS = [
  { title: 'The Future of Agile Governance', views: '12k', retention: '68%', ctr: '0.4%', pipeline: '$0.3M', flags: ['CTA-GAP'] },
  { title: 'Scaling Enterprise Security', views: '8.4k', retention: '52%', ctr: '1.2%', pipeline: '$0.8M', flags: ['RESONANCE'] }
];

export const CTA_LIBRARY = DATA_SUITE.ctaLibrary;

export const CTA_ANOMALIES = [
  { 
    type: 'Mismatch', 
    asset: 'Enterprise Security Whitepaper', 
    impact: '-$1.4M Pipe', 
    severity: 'CRITICAL',
    issue: 'High-intent "VP Product" leads are seeing the "Founder" Trial CTA, causing a 22% drop-off in the Comparison stage.'
  }
];

export const CTA_AI_STRATEGY = {
  winning: "Dynamic Persona-to-Asset matching in the NAMER Enterprise segment is yielding a 12% higher CTR than the baseline.",
  leaking: "The $1.4M revenue leak is driven by a 22% drop-off in the Comparison stage due to missing 'Security & SSO' proof.",
  testNext: "A/B Test: Swap 'Start Trial' for 'Request Demo' on all Enterprise-firmographic sessions."
};

export const PERSONA_SIGNALS = [
  { persona: 'VP Product', heat: 95, assets: 142, pipeline: '$8.4M', repeat: 12 },
  { persona: 'IT Director', heat: 88, assets: 24, pipeline: '$4.2M', repeat: 9 },
  { persona: 'Marketing Ops', heat: 82, assets: 86, pipeline: '$2.8M', repeat: 4 },
  { persona: 'Founder', heat: 74, assets: 14, pipeline: '$1.2M', repeat: 2 },
];
