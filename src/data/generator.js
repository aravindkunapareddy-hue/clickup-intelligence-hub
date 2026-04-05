import { createSeededDataUtils } from '../utils/seedRandom.js';

/**
 * GTM OPERATING SYSTEM: THE SCALE ENGINE
 * Deterministic, large-scale synthetic data layer.
 */

const SEED = 20240405; // Standard GTM Seed
const { randomInt, pick, pickWeighted, next } = createSeededDataUtils(SEED);

// 1. BASE ENTITY DEFINITIONS
const PERSONAS = ['VP Product', 'IT Director', 'Marketing Ops', 'Founder', 'Engineering Lead', 'Project Manager'];
const INDUSTRIES = ['SaaS', 'Fintech', 'Ecommerce', 'Healthcare Tech', 'Professional Services', 'Agencies', 'Tech-Enabled Ops'];
const REGIONS = ['North America', 'EMEA', 'APAC'];
const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise'];
const ACCOUNT_TIERS = ['Tier 1', 'Tier 2', 'Tier 3'];
const ASSET_TYPES = ['Blog Post', 'Pillar Page', 'Comparison Page', 'Template Page', 'Use-Case Page', 'FAQ Page', 'Customer Story', 'Landing Page'];
const FUNNEL_STAGES = ['Discovery', 'Engagement', 'Comparison', 'Decision'];
const KEYWORD_CLUSTERS = ['Agile Workflow', 'Security Architecture', 'Marketing Automation', 'Scaling Teams', 'Resource Management', 'DevOps Metrics', 'Productivity Frameworks'];
const CTA_TYPES = ['Demo', 'Free Trial', 'Template', 'Webinar', 'Ebook', 'Newsletter', 'Customer Story', 'Feature Page'];
const CTA_FORMATS = ['Hero', 'In-Line Card', 'Sticky Bar', 'Popup', 'Sidebar', 'Text Link'];
const OPPORTUNITY_BUCKETS = ['high-traffic-low-conv', 'refresh-needed', 'cta-rewrite', 'intent-mismatch', 'proof-gap', 'cluster-expansion', 'decay-watchlist'];

// 2. HELPER: GENERATE MONTHLY TRENDS
const generateTrends = (months = 12, baseValue = 50, volatility = 0.1) => {
  let current = baseValue;
  return Array.from({ length: months }, (_, i) => {
    current = current * (1 + (next() * volatility * 2 - volatility));
    return { month: `M${i + 1}`, value: Math.round(current) };
  });
};

// 3. ENTITY GENERATORS
export const generateGTMSyntheticData = () => {
  
  // A. ACCOUNTS (1,200)
  const accounts = Array.from({ length: 1200 }, (_, i) => {
    const segment = pickWeighted([{ value: 'Enterprise', weight: 10 }, { value: 'Mid-Market', weight: 40 }, { value: 'SMB', weight: 50 }]);
    const tier = pickWeighted([{ value: 'Tier 1', weight: 15 }, { value: 'Tier 2', weight: 35 }, { value: 'Tier 3', weight: 50 }]);
    return {
      account_id: `ACC-${i}`,
      company_name: `${pick(['Acme', 'Starlight', 'Hyper', 'Cloud', 'Nova', 'Vertex', 'Echo', 'Sync'])}${pick(['Systems', 'Logic', 'Labs', 'Flow', 'Ops', 'Solutions'])}`,
      industry: pick(INDUSTRIES),
      segment,
      region: pick(REGIONS),
      account_tier: tier,
      employee_band: segment === 'Enterprise' ? '1000+' : segment === 'Mid-Market' ? '200-1000' : '1-200',
      active_contacts_count: randomInt(1, 12),
      total_content_touches: randomInt(5, 100),
      account_heat_score: randomInt(10, 98),
      buying_stage_estimate: pick(FUNNEL_STAGES),
      influenced_pipeline: randomInt(10000, 500000),
      sourced_pipeline: randomInt(0, 200000),
      open_opportunity_flag: next() > 0.8
    };
  });

  // B. CONTACTS (8,000)
  const contacts = Array.from({ length: 8000 }, (_, i) => {
    const account = pick(accounts);
    const fit = randomInt(40, 99);
    const intent = randomInt(10, 95);
    const total_score = Math.round((fit * 0.4) + (intent * 0.6));
    return {
      contact_id: `CON-${i}`,
      account_id: account.account_id,
      name: `${pick(['John', 'Sarah', 'Marcus', 'Elena', 'David', 'Sophia'])} ${pick(['Chen', 'Aurelius', 'Muller', 'Soto', 'Arkwright', 'Vance'])}`,
      role: pick(PERSONAS),
      seniority: pick(['Manager', 'Director', 'VP', 'C-Level', 'Individual Contributor']),
      region: account.region,
      industry: account.industry,
      fit_score: fit,
      intent_score: intent,
      total_score,
      score_band: total_score > 85 ? 'CRITICAL' : total_score > 60 ? 'HIGH' : 'LOW',
      lastActive: `${randomInt(1, 59)}m ago`
    };
  });

  // C. CTAs (150)
  const ctaLibrary = Array.from({ length: 150 }, (_, i) => ({
    cta_id: `CTA-${i}`,
    copy: pick(['Talk to Sales', 'Start Free Trial', 'Download Framework', 'Join Webinar', 'See Pricing']),
    type: pick(CTA_TYPES),
    format: pick(CTA_FORMATS),
    ctr: (next() * 0.08).toFixed(2),
    pipePerClick: randomInt(100, 5000),
    status: pick(['STABLE', 'STABLE', 'CRITICAL', 'WINNER']), // Bias towards stable
    history: generateTrends(5, 5, 0.2).map(t => t.value / 100)
  }));

  // D. SEO ASSETS (400)
  const seoAssets = Array.from({ length: 400 }, (_, i) => {
    const sessions = randomInt(500, 50000);
    const ctr = (next() * 0.05 + 0.01);
    const clicks = Math.round(sessions * ctr);
    const id = `SEO-${i}`;
    
    // Inject Deterministic "Security Leak" ($1.4M narrative)
    if (i === 0) {
      return {
        asset_id: id,
        title: 'Enterprise Security Whitepaper',
        asset_type: 'Whitepaper',
        sessions: 14200,
        cta_ctr: 0.012, // Low
        sourced_pipeline: 1400000,
        status: 'CRITICAL',
        issue: 'CTA Mismatch',
        bucket_assignment: 'proof-gap'
      };
    }

    return {
      asset_id: id,
      title: `${pick(KEYWORD_CLUSTERS)}: ${pick(['Mastering', 'Strategy', 'Performance', 'Scale', 'Governance'])}`,
      asset_type: pick(ASSET_TYPES),
      persona: pick(PERSONAS),
      funnel_stage: pick(FUNNEL_STAGES),
      keyword_cluster: pick(KEYWORD_CLUSTERS),
      sessions,
      clicks,
      cta_ctr: (next() * 0.06).toFixed(3),
      sourced_pipeline: randomInt(0, 500000),
      refresh_priority_score: randomInt(10, 100)
    };
  });

  // E. OPPORTUNITIES (200)
  const opportunities = seoAssets.slice(0, 200).map((asset, i) => ({
    asset: asset.title,
    asset_id: asset.asset_id,
    issue: asset.issue || pick(['Low CTR', 'Stale Content', 'Intent Mismatch', 'Missing Social Proof']),
    score: randomInt(60, 98),
    confidence: `${randomInt(80, 99)}%`,
    pod: pick(['SEO Pod A', 'SEO Pod B', 'YouTube Pod', 'Lifecycle']),
    action: asset.asset_type === 'Whitepaper' ? 'Insert SSO Soc Proof' : pick(['Refresh Content', 'Swap CTA', 'Repurpose to YouTube']),
    lift: `↑ ${randomInt(2, 30)}% Pipe Yield`,
    priority: asset.status === 'CRITICAL' ? 'CRITICAL' : pick(['HIGH', 'MEDIUM']),
    status: 'Todo',
    tags: [pick(OPPORTUNITY_BUCKETS)],
    sourceSignal: 'MODELED: ANOMALY_DETECTION',
    details: {
      persona: asset.persona || 'VP Product',
      segment: 'Enterprise',
      why: 'Behavioral decay detected across high-intent clusters.',
      metrics: `Sessions: ${asset.sessions} | Conv: ${(asset.cta_ctr * 100).toFixed(1)}%`,
      kpi: 'Pipeline Proximity Score'
    }
  }));

  return {
    accounts,
    contacts,
    ctaLibrary,
    seoAssets,
    opportunities
  };
};

// INITIALIZE THE SCALE ENGINE
export const DATA_SUITE = generateGTMSyntheticData();
