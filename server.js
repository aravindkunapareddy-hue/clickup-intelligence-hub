#!/usr/bin/env node
/**
 * Local dev server for ClickUp Content Revenue Orchestrator.
 * Serves index.html and routes /api/content-revenue-orchestrator
 * to the Vercel-style handler — no Vercel account needed.
 *
 * Usage: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load .env.local if it exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
  console.log('✅ Loaded .env.local');
}

const handler = require('./api/content-revenue-orchestrator');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Route API requests to the serverless handler
  if (pathname === '/api/content-revenue-orchestrator') {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('Handler error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
    return;
  }

  // Serve static files (index.html, assets, etc.)
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Fallback to index.html for any unknown routes
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log('');
  console.log('🚀 ClickUp Content Revenue Orchestrator');
  console.log('─────────────────────────────────────────');
  console.log(`   Local:  http://localhost:${PORT}`);
  console.log(`   Mode:   ${apiKey ? '✅ Live (Anthropic API connected)' : '🔵 Demo (no API key — deterministic responses)'}`);
  console.log('─────────────────────────────────────────');
  console.log('   Press Ctrl+C to stop');
  console.log('');
});
