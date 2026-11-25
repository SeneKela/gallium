// Gallium · build-site.mjs — assembles dist/ for GitHub Pages:
// human site (index.html = design-system.html) + agent layer (llms.txt, llms-full.txt,
// components/*.md, components.json, tokens.json, rules, AGENTS.md).
// `--check` only verifies (inline cf-resize copy identical, tokens in sync) without writing.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';

const CHECK = process.argv.includes('--check');
const BASE = process.env.GALLIUM_URL || '.';
const read = (f) => readFileSync(f, 'utf8');
const cat = JSON.parse(read('components.json'));
const rules = JSON.parse(read('rules/gallium.rules.json'));
let failed = 0;

// 1. inline copies of cf-resize.js / cf-icon.js in the pages must match the shipped files
for (const f of ['design-system.html', 'starter.html']) {
  const { lintText } = await import('./lib/lint.mjs');
  const bad = lintText(f, read(f)).filter((i) => /inline copy/.test(i.msg));
  for (const i of bad) { console.error(`✖ ${f}:${i.line} ${i.msg}`); failed++; }
}
if (!failed) console.log('✓ inline script copies match cf-resize.js and icons/cf-icon.js');
if (CHECK) process.exit(failed ? 1 : 0);

// 2. component pages
const md = (c) => {
  const L = [`# ${c.name} · \`.${c.class}\``, '', c.purpose, ''];
  if (c.use) L.push(`**Use for:** ${c.use.join(', ')}.`, '');
  if (c.avoid) L.push('**Use something else for:**', ...Object.entries(c.avoid).map(([k, v]) => `- ${k} → \`${v}\``), '');
  if (c.modifiers) L.push('**Modifiers:**', ...Object.entries(c.modifiers).map(([k, v]) => `- ${k}: ${v.map((x) => '`' + x + '`').join(' · ')}`), '');
  if (c.children) L.push('**Anatomy:**', ...c.children.map((x) => `- \`${x}\``), '');
  if (c.states) L.push(`**States:** ${c.states.map((x) => '`' + x + '`').join(', ')}`, '');
  if (c.host) L.push(`**Host:** ${c.host}`, '');
  if (c.events) L.push(`**Events:** ${c.events.map((x) => '`' + x + '`').join(', ')}`, '');
  if (c.group) L.push(`**Group:** \`.${c.group.class}\` (${c.group.modifiers.join(', ')})`, '');
  if (c.rules) L.push('**Rules:**', ...c.rules.map((id) => `- ${rules.rules.find((r) => r.id === id)?.text || id}`), '');
  if (c.example) L.push('```html', c.example, '```', '');
  if (c.examples) for (const [k, v] of Object.entries(c.examples)) L.push(`*${k}*`, '```html', v, '```', '');
  return L.join('\n');
};

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/components', { recursive: true });
for (const c of cat.components) writeFileSync(`dist/components/${c.name}.md`, md(c));

// 3. merged tokens (resolved per theme is the consumer's job; we ship DTCG as-is)
const tokens = {
  primitive: JSON.parse(read('tokens/primitive.tokens.json')),
  scale: JSON.parse(read('tokens/scale.tokens.json')),
  themes: { white: JSON.parse(read('tokens/themes/white.tokens.json')), g100: JSON.parse(read('tokens/themes/g100.tokens.json')) },
};
writeFileSync('dist/tokens.json', JSON.stringify(tokens, null, 2));

// 4. llms.txt + llms-full.txt
const agents = read('AGENTS.md');
const rulesMd = rules.rules.map((r) => `- **${r.id}** (${r.level}): ${r.text}`).join('\n');
const decision = cat.decisionTable.map(([need, comp]) => `| ${need} | ${comp} |`).join('\n');
const llms = `# Gallium

> IBM Carbon colour, type and icons with Figma density. One CSS file (gallium.css, prefix cf-), Carbon icon sprite, no framework. Built for humans and coding agents.

Load: <link rel="stylesheet" href="${BASE}/gallium.css"> and <body class="cf" data-cf-theme="white|g100">.

## Start here
- [Agent instructions](${BASE}/AGENTS.md): rules to follow and how to verify
- [Component catalogue](${BASE}/components.json): every component, modifiers, examples, decision table
- [Rules](${BASE}/rules/gallium.rules.json): machine-checkable constraints
- [Tokens](${BASE}/tokens.json): DTCG 2025.10, white and g100
- [Starter app shell](${BASE}/starter.html)
- [Live reference](${BASE}/index.html)
- [Example pages built by an agent from this file](${BASE}/examples/dashboard.html), [settings](${BASE}/examples/settings.html)
- MCP server: clone the repo and run \`node scripts/mcp-server.mjs\` (stdio). Tools: gallium_guide, gallium_list_components, gallium_get_component, gallium_get_rules, gallium_get_tokens, gallium_list_icons, gallium_get_starter, gallium_lint

## Components
${cat.components.map((c) => `- [${c.name}](${BASE}/components/${c.name}.md): ${c.purpose}`).join('\n')}

## Optional
- [Everything in one file](${BASE}/llms-full.txt)
`;
const full = [
  '# Gallium — full reference for agents', '',
  agents, '',
  '## Which component?', '', '| Need | Component |', '|---|---|', decision, '',
  '## Rules', '', rulesMd, '',
  '## Components', '', ...cat.components.map(md),
  '## Utilities', '', cat.utilities.map((u) => '`.' + u + '`').join(' · '), '',
].join('\n');
writeFileSync('dist/llms.txt', llms);
writeFileSync('dist/llms-full.txt', full);

// 5. static files
const copy = [['design-system.html', 'index.html'], ['design-system.html', 'design-system.html'], ['starter.html', 'starter.html'], ['gallium.css', 'gallium.css'],
  ['cf-resize.js', 'cf-resize.js'], ['components.json', 'components.json'], ['AGENTS.md', 'AGENTS.md'], ['rules', 'rules'], ['tokens', 'tokens'], ['icons', 'icons'], ['examples', 'examples']];
for (const [from, to] of copy) if (existsSync(from)) cpSync(from, `dist/${to}`, { recursive: true });
writeFileSync('dist/.nojekyll', '');

console.log(`✓ dist/: ${cat.components.length} component pages, llms.txt, llms-full.txt (${Math.round(full.length / 1024)} KB), tokens.json`);
process.exit(failed ? 1 : 0);
