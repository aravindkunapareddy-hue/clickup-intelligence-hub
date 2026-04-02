const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
const ANTHROPIC_VERSION = '2023-06-01';

const TOOL_SCHEMA = {
  name: 'emit_strategy',
  description: 'Return a content revenue strategy with scoring, next best action, experiments, handoff, and analytics.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      meta: {
        type: 'object',
        additionalProperties: false,
        properties: {
          asset_label: { type: 'string' },
          content_mode: { type: 'string' },
          asset_type: { type: 'string' },
          pod: { type: 'string' },
          target_event: { type: 'string' },
          score_basis: { type: 'string' }
        },
        required: ['asset_label', 'content_mode', 'asset_type', 'pod', 'target_event', 'score_basis']
      },
      opportunity_score: {
        type: 'object',
        additionalProperties: false,
        properties: {
          total: { type: 'number' },
          tier: { type: 'string' },
          biggest_gap: { type: 'string' },
          why_now: { type: 'string' },
          subscores: {
            type: 'array',
            minItems: 6,
            maxItems: 6,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                name: { type: 'string' },
                score: { type: 'number' },
                weight: { type: 'number' },
                diagnosis: { type: 'string' },
                recommendation: { type: 'string' }
              },
              required: ['name', 'score', 'weight', 'diagnosis', 'recommendation']
            }
          }
        },
        required: ['total', 'tier', 'biggest_gap', 'why_now', 'subscores']
      },
      next_best_action: {
        type: 'object',
        additionalProperties: false,
        properties: {
          action_type: { type: 'string' },
          reason: { type: 'string' },
          primary_owner: { type: 'string' },
          supporting_pods: {
            type: 'array',
            items: { type: 'string' }
          },
          expected_lift: { type: 'string' },
          success_metric: { type: 'string' },
          cta: {
            type: 'object',
            additionalProperties: false,
            properties: {
              type: { type: 'string' },
              placement: { type: 'string' },
              headline: { type: 'string' },
              body_copy: { type: 'string' },
              button_text: { type: 'string' },
              form_strategy: { type: 'string' }
            },
            required: ['type', 'placement', 'headline', 'body_copy', 'button_text', 'form_strategy']
          },
          proof_blocks: {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            items: { type: 'string' }
          },
          distribution_routes: {
            type: 'array',
            minItems: 3,
            maxItems: 4,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                channel: { type: 'string' },
                format: { type: 'string' },
                goal: { type: 'string' }
              },
              required: ['channel', 'format', 'goal']
            }
          }
        },
        required: ['action_type', 'reason', 'primary_owner', 'supporting_pods', 'expected_lift', 'success_metric', 'cta', 'proof_blocks', 'distribution_routes']
      },
      experiments: {
        type: 'array',
        minItems: 3,
        maxItems: 5,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string' },
            priority: { type: 'string' },
            hypothesis: { type: 'string' },
            variant_a: { type: 'string' },
            variant_b: { type: 'string' },
            primary_metric: { type: 'string' },
            secondary_metric: { type: 'string' },
            duration_days: { type: 'number' },
            owner: { type: 'string' }
          },
          required: ['name', 'priority', 'hypothesis', 'variant_a', 'variant_b', 'primary_metric', 'secondary_metric', 'duration_days', 'owner']
        }
      },
      execution: {
        type: 'object',
        additionalProperties: false,
        properties: {
          week_1: { type: 'array', minItems: 3, maxItems: 5, items: { type: 'string' } },
          day_30: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string' } },
          day_60: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string' } },
          day_90: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string' } },
          clickup_tasks: {
            type: 'array',
            minItems: 3,
            maxItems: 6,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                title: { type: 'string' },
                owner: { type: 'string' },
                priority: { type: 'string' },
                eta_days: { type: 'number' },
                checklist: {
                  type: 'array',
                  minItems: 3,
                  maxItems: 5,
                  items: { type: 'string' }
                }
              },
              required: ['title', 'owner', 'priority', 'eta_days', 'checklist']
            }
          }
        },
        required: ['week_1', 'day_30', 'day_60', 'day_90', 'clickup_tasks']
      },
      analytics: {
        type: 'object',
        additionalProperties: false,
        properties: {
          north_star_metric: { type: 'string' },
          attribution_model: { type: 'string' },
          events: {
            type: 'array',
            minItems: 5,
            maxItems: 6,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                event: { type: 'string' },
                source: { type: 'string' },
                purpose: { type: 'string' }
              },
              required: ['event', 'source', 'purpose']
            }
          },
          dashboard_sections: {
            type: 'array',
            minItems: 3,
            maxItems: 4,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                title: { type: 'string' },
                widgets: {
                  type: 'array',
                  minItems: 3,
                  maxItems: 5,
                  items: { type: 'string' }
                }
              },
              required: ['title', 'widgets']
            }
          },
          executive_narrative: { type: 'string' }
        },
        required: ['north_star_metric', 'attribution_model', 'events', 'dashboard_sections', 'executive_narrative']
      }
    },
    required: ['meta', 'opportunity_score', 'next_best_action', 'experiments', 'execution', 'analytics']
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '--';
  return new Intl.NumberFormat('en-US').format(num);
}

function calculateFallbackScore(payload) {
  const traffic = Number(payload.monthlyTraffic) || 0;
  const clicks = Number(payload.ctaClicks) || 0;
  const conversions = Number(payload.conversions) || 0;
  const ctr = traffic > 0 ? clicks / traffic : 0;
  const cvr = clicks > 0 ? conversions / clicks : 0;
  const ageDays = payload.lastUpdated ? Math.max(0, Math.round((Date.now() - new Date(payload.lastUpdated).getTime()) / 86400000)) : 240;

  const trafficScore = clamp(Math.round((Math.min(traffic, 50000) / 50000) * 100), 10, 100);
  const ctaMismatchScore = clamp(Math.round((1 - Math.min(ctr, 0.08) / 0.08) * 100), 15, 98);
  const conversionGapScore = clamp(Math.round((1 - Math.min(cvr, 0.3) / 0.3) * 100), 18, 99);
  const freshnessScore = clamp(Math.round((Math.min(ageDays, 365) / 365) * 100), 12, 96);
  const businessValueScore = String(payload.goal || '').toLowerCase().includes('trial') || String(payload.targetEvent || '').toLowerCase().includes('workspace') ? 88 : 74;
  const aiGapScore = payload.assetType === 'Template page' || payload.assetType === 'Blog post' ? 78 : 64;

  const total = Math.round(
    (businessValueScore * 25 + trafficScore * 20 + ctaMismatchScore * 20 + conversionGapScore * 15 + freshnessScore * 10 + aiGapScore * 10) / 100
  );

  return {
    total,
    tier: total >= 75 ? 'High-priority opportunity' : total >= 55 ? 'Medium-priority opportunity' : 'Lower-priority opportunity',
    businessValueScore,
    trafficScore,
    ctaMismatchScore,
    conversionGapScore,
    freshnessScore,
    aiGapScore,
    cvr,
    ageDays
  };
}

function buildDemoResponse(payload) {
  const score = calculateFallbackScore(payload);
  const actionType = payload.assetType === 'Customer story'
    ? 'Add proof-to-demo conversion path'
    : payload.assetType === 'YouTube video'
      ? 'Add mid-roll CTA and retargeting route'
      : 'Refresh CTA and add progressive capture module';

  const ctaType = payload.goal === 'Demo booked' ? 'Book a tailored demo' : payload.assetType === 'Template page' ? 'Start with template + workspace' : 'Try ClickUp free';

  return {
    meta: {
      asset_label: payload.assetTitle || payload.topic || 'Untitled asset',
      content_mode: payload.mode === 'existing' ? 'Existing asset' : 'New content idea',
      asset_type: payload.assetType,
      pod: payload.pod,
      target_event: payload.targetEvent,
      score_basis: 'Weighted score based on business value, traffic, CTA mismatch, conversion gap, refresh decay, and AI search gap.'
    },
    opportunity_score: {
      total: score.total,
      tier: score.tier,
      biggest_gap: score.ctaMismatchScore > score.conversionGapScore ? 'High traffic but CTA fit is weak.' : 'The click-to-conversion path is leaking value.',
      why_now: payload.monthlyTraffic > 0
        ? `This asset already earns ${formatNumber(payload.monthlyTraffic)} sessions or views a month, so fixing the conversion path compounds faster than publishing another net-new asset.`
        : 'This asset should ship with a measurable conversion path from day one instead of relying on a generic CTA later.',
      subscores: [
        {
          name: 'Business value',
          score: score.businessValueScore,
          weight: 25,
          diagnosis: `The target event is ${String(payload.targetEvent || '').toLowerCase()}, which is close enough to product value that better conversion quality should show up in pipeline reporting.`,
          recommendation: 'Treat this asset as a revenue lever, not only a traffic asset.'
        },
        {
          name: 'Traffic or audience reach',
          score: score.trafficScore,
          weight: 20,
          diagnosis: payload.monthlyTraffic > 0 ? `Current reach is ${formatNumber(payload.monthlyTraffic)} sessions or views a month.` : 'No baseline reach entered yet, so the model assumes moderate upside once distributed.',
          recommendation: 'Fix conversion before increasing distribution pressure.'
        },
        {
          name: 'CTA mismatch',
          score: score.ctaMismatchScore,
          weight: 20,
          diagnosis: payload.currentCta ? `Current CTA is "${payload.currentCta}" and appears to underserve user intent.` : 'No clear CTA is defined yet, which is usually where conversion quality falls apart.',
          recommendation: 'Use an intent-matched CTA earlier in the asset and pair it with proof.'
        },
        {
          name: 'Conversion gap',
          score: score.conversionGapScore,
          weight: 15,
          diagnosis: payload.ctaClicks > 0 ? `Click-to-conversion rate is about ${(score.cvr * 100).toFixed(1)}%.` : 'The asset lacks enough click data to evaluate the handoff quality.',
          recommendation: 'Reduce friction between click and start with progressive capture and cleaner next-step copy.'
        },
        {
          name: 'Refresh decay',
          score: score.freshnessScore,
          weight: 10,
          diagnosis: payload.lastUpdated ? `Asset age is about ${score.ageDays} days.` : 'No last-updated date supplied, so a refresh review is justified.',
          recommendation: 'Use the refresh to improve proof, CTA fit, and tracking, not only copy.'
        },
        {
          name: 'AI search gap',
          score: score.aiGapScore,
          weight: 10,
          diagnosis: `${payload.assetType} assets can influence AI retrieval when they answer workflow questions clearly and package proof well.`,
          recommendation: 'Add structured answers and workflow specificity so the asset can earn retrieval citations.'
        }
      ]
    },
    next_best_action: {
      action_type: actionType,
      reason: 'The fastest route to more leads and pipeline is to optimize the asset that already has audience flow rather than add more undifferentiated content volume.',
      primary_owner: payload.pod,
      supporting_pods: Array.from(new Set([payload.pod, 'Demand', 'Customer Marketing'])).filter(Boolean),
      expected_lift: payload.monthlyTraffic > 0 ? 'Increase target-event conversion by 20-35% within one test cycle.' : 'Launch with a stronger baseline conversion path and a clean benchmark.',
      success_metric: `${payload.targetEvent} rate per asset session or view`,
      cta: {
        type: ctaType,
        placement: payload.assetType === 'YouTube video' ? 'Description, pinned comment, and spoken mid-roll' : 'First third of the asset, sticky in-body module, and final CTA block',
        headline: payload.assetType === 'Template page' ? 'Start with the template, then launch your workspace in minutes' : 'Turn this workflow into a live ClickUp setup',
        body_copy: 'Match the CTA to the reader intent, reduce form friction, and make the next step feel like progress instead of a generic handoff.',
        button_text: payload.goal === 'Demo booked' ? 'Book your demo' : payload.assetType === 'Template page' ? 'Use this template free' : 'Start free in ClickUp',
        form_strategy: payload.goal === 'Lead generation' ? 'Short capture form with role and team size only' : 'Progressive capture or direct product start with asset context passed through'
      },
      proof_blocks: [
        'Add one role-specific customer proof block with a clear outcome metric.',
        'Insert a short objection-handling section directly above the main CTA.',
        'Show the exact next step after the click so the handoff feels concrete.'
      ],
      distribution_routes: [
        {
          channel: 'Demand',
          format: 'Retargeting audience built from high-intent asset visitors',
          goal: `Re-engage users who did not complete ${String(payload.targetEvent || '').toLowerCase()}.`
        },
        {
          channel: 'Customer Marketing',
          format: 'Short proof excerpt mapped to the same use case',
          goal: 'Increase credibility at the CTA moment.'
        },
        {
          channel: payload.assetType === 'YouTube video' ? 'SEO / Blog' : 'YouTube',
          format: payload.assetType === 'YouTube video' ? 'Companion page or transcript-driven article' : 'Companion explainer clip or walkthrough',
          goal: 'Extend the winning message into another pod with one shared conversion goal.'
        }
      ]
    },
    experiments: [
      {
        name: 'CTA fit test',
        priority: 'P0',
        hypothesis: 'A CTA aligned to the asset intent and target event will outperform the current generic CTA.',
        variant_a: `Keep current CTA: ${payload.currentCta || 'generic CTA'}`,
        variant_b: 'Swap in a role-aware CTA with stronger outcome framing and a lower-friction next step.',
        primary_metric: `${payload.targetEvent} rate`,
        secondary_metric: 'CTA click-through rate',
        duration_days: 14,
        owner: payload.pod
      },
      {
        name: 'Proof block test',
        priority: 'P1',
        hypothesis: 'Adding proof near the CTA will improve conversion quality and reduce hesitation.',
        variant_a: 'Current experience without proof block near CTA.',
        variant_b: 'Insert customer proof and use-case match above CTA.',
        primary_metric: 'Click-to-conversion rate',
        secondary_metric: 'Opportunity influence rate',
        duration_days: 21,
        owner: 'Customer Marketing'
      },
      {
        name: 'Progressive capture test',
        priority: 'P1',
        hypothesis: 'Reducing friction after the CTA click will increase starts without hurting lead quality.',
        variant_a: 'Current form or redirect path.',
        variant_b: 'Progressive capture after the first high-intent action.',
        primary_metric: 'Start rate',
        secondary_metric: 'Lead-to-opportunity conversion',
        duration_days: 21,
        owner: 'Demand'
      },
      {
        name: 'Cross-pod amplification test',
        priority: 'P2',
        hypothesis: 'One coordinated placement in another pod will raise assisted conversions.',
        variant_a: 'Asset stays isolated in its current channel.',
        variant_b: 'Asset gets one companion placement in another pod with the same CTA target.',
        primary_metric: 'Assisted conversion volume',
        secondary_metric: 'Return visitor rate',
        duration_days: 28,
        owner: payload.assetType === 'YouTube video' ? 'SEO / Blog' : 'YouTube'
      }
    ],
    execution: {
      week_1: [
        'Audit the current CTA path, event coverage, and proof gaps.',
        'Ship the main CTA test and confirm the target event flows into analytics and CRM.',
        'Create one ClickUp task bundle for copy, design, web, and analytics owners.'
      ],
      day_30: [
        'Read out experiment performance and roll the winning CTA into adjacent assets.',
        'Package reusable proof blocks for the same intent cluster.',
        'Create a retargeting or nurture route for clickers who do not convert.'
      ],
      day_60: [
        'Cluster the next ten assets by opportunity score and refresh the best candidates.',
        'Standardize CTA and tracking templates across the four pods.'
      ],
      day_90: [
        'Report influenced pipeline from refreshed assets versus untouched control assets.',
        'Automate the weekly digest of stale high-traffic assets and experiment winners.'
      ],
      clickup_tasks: [
        {
          title: `Audit ${payload.assetTitle || payload.topic || 'asset'} conversion path`,
          owner: payload.pod,
          priority: 'P0',
          eta_days: 2,
          checklist: ['Confirm CTA placement and copy.', 'Map the click path to the target event.', 'List missing proof and friction points.']
        },
        {
          title: 'Launch CTA and proof experiment',
          owner: 'Demand',
          priority: 'P0',
          eta_days: 5,
          checklist: ['Build A/B variants.', 'QA event tracking and hidden asset context.', 'Publish test and confirm data flow.']
        },
        {
          title: 'Publish attribution dashboard slice',
          owner: 'Demand',
          priority: 'P1',
          eta_days: 6,
          checklist: ['Add asset-level dimensions to key events.', 'Join user and opportunity records in CRM.', 'Share readout with senior revenue stakeholders.']
        }
      ]
    },
    analytics: {
      north_star_metric: `${payload.targetEvent} per 1,000 asset sessions or views`,
      attribution_model: 'Use a hybrid model: source-of-entry for origin stories, plus content-assisted influence using person-level touches and opportunity dates. This is a better fit for content-led PLG than pure first-touch alone.',
      events: [
        {
          event: 'content_asset_viewed',
          source: 'GA4 or product analytics',
          purpose: 'Stores asset metadata such as URL, asset type, pod, topic, and CTA variant.'
        },
        {
          event: 'content_cta_clicked',
          source: 'GA4 or warehouse',
          purpose: 'Measures CTA fit and isolates copy and placement impact.'
        },
        {
          event: 'signup_or_trial_started',
          source: 'Product analytics',
          purpose: 'Connects content-assisted traffic to account creation and trial starts.'
        },
        {
          event: 'workspace_created',
          source: 'Product analytics',
          purpose: 'Separates low-intent leads from meaningful product activation.'
        },
        {
          event: 'opportunity_created_or_influenced',
          source: 'CRM',
          purpose: 'Shows whether the asset contributes to pipeline, not just traffic or leads.'
        }
      ],
      dashboard_sections: [
        {
          title: 'Content influence dashboard',
          widgets: ['Assisted opportunities by first-touch asset group', 'Workspace creation rate by content type', 'Top assets by pipeline influence in the last 90 days']
        },
        {
          title: 'Experiment performance dashboard',
          widgets: ['CTA click-through rate before and after test', 'Trial start rate by asset and CTA variant', 'Lead quality by experiment cohort']
        },
        {
          title: 'Executive rollup',
          widgets: ['Influenced ARR from organic and content-assisted motion', 'Time-to-trial and time-to-opportunity by entry asset', 'Net new leads and pipeline created from refreshed assets']
        }
      ],
      executive_narrative: 'Organic and content do not need credit for every closed deal to deserve revenue attention. The job is to prove which assets create qualified starts, accelerate activation, and influence opportunities over time.'
    }
  };
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8') || '{}';
  return JSON.parse(raw);
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Body must be a JSON object.';
  if (!payload.assetTitle && !payload.topic) return 'Provide either assetTitle or topic.';
  if (payload.mode === 'existing' && !payload.assetUrl) return 'Existing asset mode requires assetUrl.';
  return '';
}

async function callAnthropic(payload) {
  const system = [
    'You are a senior growth marketing manager building a ClickUp content revenue operating system.',
    'Your job is to score the asset, choose the single next best action, design experiments, propose cross-pod execution, and define a defensible attribution framework.',
    'Be concrete, operator-like, and practical. Do not write fluff. Use the input metrics if present. Be skeptical of generic CTA advice. Optimize for lead quality, pipeline influence, and funnel velocity, not only traffic.',
    'Assume the pods are SEO/Blog, YouTube, Customer Marketing, and Demand.',
    'Return the full response by calling the emit_strategy tool exactly once.'
  ].join(' ');

  const userPrompt = JSON.stringify(payload, null, 2);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': ANTHROPIC_VERSION,
      'x-api-key': process.env.ANTHROPIC_API_KEY
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      max_tokens: 3000,
      temperature: 0.3,
      system,
      tools: [TOOL_SCHEMA],
      tool_choice: {
        type: 'tool',
        name: TOOL_SCHEMA.name,
        disable_parallel_tool_use: true
      },
      messages: [
        {
          role: 'user',
          content: `Generate a structured content revenue strategy for this intake:\n${userPrompt}`
        }
      ]
    })
  });

  const json = await response.json();
  if (!response.ok) {
    const message = json && json.error && json.error.message ? json.error.message : 'Anthropic API request failed.';
    throw new Error(message);
  }

  const toolUse = Array.isArray(json.content)
    ? json.content.find((block) => block.type === 'tool_use' && block.name === TOOL_SCHEMA.name)
    : null;

  if (!toolUse || !toolUse.input) {
    throw new Error('Anthropic did not return the structured tool payload.');
  }

  return toolUse.input;
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  const method = req.method || 'GET';

  if (method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      demo: !process.env.ANTHROPIC_API_KEY,
      model: DEFAULT_MODEL
    });
  }

  if (method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  try {
    const payload = await readJson(req);
    const validationError = validatePayload(payload);
    if (validationError) {
      return sendJson(res, 400, { ok: false, error: validationError });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return sendJson(res, 200, {
        ok: true,
        demo: true,
        result: buildDemoResponse(payload)
      });
    }

    const result = await callAnthropic(payload);
    return sendJson(res, 200, {
      ok: true,
      demo: false,
      model: DEFAULT_MODEL,
      result
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: error.message || 'Unexpected server error.'
    });
  }
};
