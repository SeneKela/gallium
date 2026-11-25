#!/usr/bin/env node
// Gallium · mcp-server.mjs — a zero-dependency MCP server (stdio, JSON-RPC 2.0, newline-delimited).
// Gives coding agents direct access to Gallium: catalogue, component docs, rules, tokens, starter shell
// and the same linter CI runs.  Run: node scripts/mcp-server.mjs   (see README › MCP for client config)
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { lintText, summary, ROOT } from './lib/lint.mjs';

const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const json = (f) => JSON.parse(read(f));
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const VERSION = json('package.json').version;

const text = (t) => ({ content: [{ type: 'text', text: typeof t === 'string' ? t : JSON.stringify(t, null, 2) }] });
const catalogue = () => json('components.json');
const find = (name) => {
  const n = String(name || '').toLowerCase().replace(/^\./, '');
  return catalogue().components.find((c) => c.name === n || c.class === n || c.class === 'cf-' + n);
};

const TOOLS = [
  { name: 'gallium_guide', description: 'Read first. Agent instructions (AGENTS.md): setup, rules and how to verify output.',
    inputSchema: { type: 'object', properties: {} }, run: () => text(read('AGENTS.md')) },
  { name: 'gallium_list_components', description: 'List every Gallium component (name, class, purpose) and the "which component for which job" decision table.',
    inputSchema: { type: 'object', properties: {} },
    run: () => { const c = catalogue(); return text({ components: c.components.map(({ name, class: cls, purpose }) => ({ name, class: cls, purpose })), decisionTable: c.decisionTable, utilities: c.utilities }); } },
  { name: 'gallium_get_component', description: 'Full definition of one component: modifiers, anatomy, states, rules and HTML examples. Accepts a name ("toast") or class ("cf-toast").',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'Component name or class' } }, required: ['name'] },
    run: ({ name }) => { const c = find(name); if (!c) return { ...text(`Unknown component "${name}". Call gallium_list_components.`), isError: true }; return text(c); } },
  { name: 'gallium_get_rules', description: 'The machine-checkable Gallium rules (rules/gallium.rules.json).',
    inputSchema: { type: 'object', properties: {} }, run: () => text(json('rules/gallium.rules.json')) },
  { name: 'gallium_get_tokens', description: 'Design tokens (DTCG 2025.10). group: "primitive" | "scale" | "white" | "g100". CSS name is --cf-<name>; use semantic tokens in app code.',
    inputSchema: { type: 'object', properties: { group: { type: 'string', enum: ['primitive', 'scale', 'white', 'g100'] } }, required: ['group'] },
    run: ({ group }) => text(json({ primitive: 'tokens/primitive.tokens.json', scale: 'tokens/scale.tokens.json', white: 'tokens/themes/white.tokens.json', g100: 'tokens/themes/g100.tokens.json' }[group] || 'tokens/scale.tokens.json')) },
  { name: 'gallium_list_icons', description: 'Carbon icon names available in the sprite. Use as <svg><use href="#icon--NAME"/></svg>. Optional filter substring.',
    inputSchema: { type: 'object', properties: { filter: { type: 'string' } } },
    run: ({ filter = '' } = {}) => text([...read('starter.html').matchAll(/<symbol id="icon--([\w-]+)"/g)].map((m) => m[1]).filter((n) => n.includes(filter.toLowerCase()))) },
  { name: 'gallium_get_starter', description: 'starter.html: the complete app shell (header, panels, canvas, inspector) with the inline icon sprite. Start every new page from it. Set include_sprite=false to omit the ~60 KB sprite.',
    inputSchema: { type: 'object', properties: { include_sprite: { type: 'boolean', default: false } } },
    run: ({ include_sprite = false } = {}) => { const s = read('starter.html'); return text(include_sprite ? s : s.replace(/<!-- carbon-icons:start -->[\s\S]*?<!-- carbon-icons:end -->/, '<!-- carbon-icons:start --> … copy the sprite from starter.html … <!-- carbon-icons:end -->')); } },
  { name: 'gallium_lint', description: 'Lint HTML or CSS against the Gallium rules (the same checks as CI). Output is done when errors = 0.',
    inputSchema: { type: 'object', properties: { code: { type: 'string' }, kind: { type: 'string', enum: ['html', 'css'], default: 'html' }, filename: { type: 'string' } }, required: ['code'] },
    run: ({ code, kind = 'html', filename }) => { const f = filename || (kind === 'css' ? 'input.css' : 'input.html'); const issues = lintText(f, code, kind); return text({ ...summary(issues), issues }); } },
];

function handle(msg) {
  const { id, method, params = {} } = msg;
  switch (method) {
    case 'initialize':
      return { protocolVersion: PROTOCOLS.includes(params.protocolVersion) ? params.protocolVersion : PROTOCOLS[0],
        capabilities: { tools: {} }, serverInfo: { name: 'gallium', version: VERSION },
        instructions: 'Gallium design system (IBM Carbon x Figma). Call gallium_guide first, pick components with gallium_list_components / gallium_get_component, start from gallium_get_starter, and finish only when gallium_lint reports 0 errors.' };
    case 'ping': return {};
    case 'tools/list': return { tools: TOOLS.map(({ run, ...t }) => t) };
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params.name);
      if (!tool) throw Object.assign(new Error(`Unknown tool: ${params.name}`), { code: -32602 });
      try { return tool.run(params.arguments || {}); } catch (e) { return { ...text(String(e.message || e)), isError: true }; }
    }
    default:
      if (id === undefined) return undefined;   // notification (e.g. notifications/initialized)
      throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
  }
}

const send = (o) => process.stdout.write(JSON.stringify(o) + '\n');
createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  let msg; try { msg = JSON.parse(line); } catch { return send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); }
  try { const result = handle(msg); if (msg.id !== undefined && result !== undefined) send({ jsonrpc: '2.0', id: msg.id, result }); }
  catch (e) { if (msg.id !== undefined) send({ jsonrpc: '2.0', id: msg.id, error: { code: e.code || -32603, message: e.message } }); }
});
