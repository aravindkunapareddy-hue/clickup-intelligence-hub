# ClickUp Content Revenue Orchestrator

This is a production-oriented prototype for the take-home assignment.

What it does:
- accepts an existing asset or new content idea
- scores opportunity across traffic, CTA fit, conversion gap, freshness, and AI search readiness
- recommends one next best action
- drafts experiments and pod routing
- outputs ClickUp handoff tasks
- defines the analytics and attribution layer needed to connect content to revenue

## Files

- `index.html` - frontend app
- `api/content-revenue-orchestrator.js` - backend endpoint for Vercel-style deployments

## Why this version is safer

The frontend no longer calls Anthropic directly from the browser.
It posts to `/api/content-revenue-orchestrator`, so the API key stays in server-side environment variables.

If `ANTHROPIC_API_KEY` is missing, the backend returns a deterministic demo response so the app still works for screenshots and a live walkthrough.

## Deploy on Vercel

1. Create a new project and upload this folder.
2. Add environment variable:
   - `ANTHROPIC_API_KEY`
3. Optional:
   - `ANTHROPIC_MODEL=claude-sonnet-4-6`
4. Deploy.

## Local quick test

Because the frontend is static and the backend is a serverless function, the simplest local test is to run it in a platform that supports the `api/` route pattern.

If you only need a walkthrough or screenshots, open `index.html` and use the built-in sample asset. The app will still render a deterministic strategy even without the backend.

## Suggested demo flow for the assignment

1. Load the sample asset.
2. Generate the strategy.
3. Show the opportunity score and explain why the system prioritized conversion over new content volume.
4. Show the next best action and CTA recommendation.
5. Show the experiment plan.
6. Finish on revenue tracking to tie the work back to pipeline.
