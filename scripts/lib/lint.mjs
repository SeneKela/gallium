// Gallium · lib/lint.mjs — rule checks shared by the CLI (scripts/lint-rules.mjs) and the MCP server.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const rules = JSON.parse(readFileSync(join(ROOT, 'rules/gallium.rules.json'), 'utf8'));
const css = readFileSync(join(ROOT, 'gallium.css'), 'utf8');
const PRIMS = /--cf-(white|gray|blue|red|green|yellow|purple|cyan|teal|magenta)(-\d+)?(-hover)?\b/;
const defined = new Set([...css.matchAll(/\.(cf-[\w-]+)/g)].map((m) => m[1]));
const spritePath = join(ROOT, 'icons/carbon-icons.svg');
const external = existsSync(spritePath) ? spriteIds(readFileSync(spritePath, 'utf8')) : new Set();
// a fragment without its own sprite is checked against the starter's sprite
const starterSprite = spriteIds(readFileSync(join(ROOT, 'starter.html'), 'utf8'));
let issues = [];
const add = (file, line, level, rule, msg) => issues.push({ file, line, level, rule, msg });
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
// sprite: icons available in the page (inline) or in icons/carbon-icons.svg
function spriteIds(text) { return new Set([...text.matchAll(/<symbol id="icon--([\w-]+)"/g)].map((m) => m[1])); }

function lintCssText(file, text, offset = 0, { isSystem = false } = {}) {
  // component part of gallium.css starts at section 4; tokens above are allowed to hold literals
  const start = isSystem ? text.indexOf('4. BASE') : 0;
  const body = text.slice(start);
  const base = offset + (isSystem ? lineOf(text, start) - 1 : 0);
  const forbidden = isSystem ? /#[0-9a-f]{3,8}\b|(?<![\w-])(rgba?|hsla?)\(/gi : /#[0-9a-f]{3,8}\b(?![^{]*\{)|(?<![\w-])(rgba?|hsla?)\(/gi;
  for (const m of body.matchAll(forbidden)) {
    const ln = base + lineOf(body, m.index);
    const lineText = body.split('\n')[lineOf(body, m.index) - 1];
    if (/@media\s*\(forced-colors/.test(lineText)) continue;
    const chrome = /^\s*\.ds-/.test(lineText);   // specimen chrome in design-system.html, not part of the system
    add(file, ln, chrome ? 'warn' : 'error', 'carbon-colour', `literal colour "${m[0]}" — use a semantic --cf- token`);
  }
  for (const m of body.matchAll(/var\((--cf-[\w-]+)\)/g)) {
    if (PRIMS.test(m[1]) && !(isSystem && /:where\(\.cf\)|^\s*--/.test(body.split('\n')[lineOf(body, m.index) - 1])))
      add(file, base + lineOf(body, m.index), 'warn', 'carbon-colour', `primitive ${m[1]} used outside tokens — map it to a semantic token`);
  }
  for (const m of body.matchAll(/border(?:-[a-z-]+)?-radius\s*:\s*([^;}]+)/g)) {
    const vals = m[1].trim().replace(/calc\(var\(--cf-r-[^)]*\)[^)]*\)/g, 'var(--cf-r-calc)').split(/\s+/);
    const bad = vals.filter((v) => !rules.allowedRadii.includes(v) && !/^var\(--cf-r-/.test(v) && !/^calc\(var\(--cf-r-/.test(v) && v !== '0');
    if (bad.length) add(file, base + lineOf(body, m.index), 'error', 'radius', `radius "${m[1].trim()}" — use --cf-r-* tokens`);
  }
  for (const m of body.matchAll(/:focus(-visible)?[^{]*\{[^}]*outline\s*:\s*(?!none)[^;]+/g)) {
    if (!isSystem) add(file, offset + lineOf(body, m.index), 'error', 'one-focus-ring', 'focus is restyled — remove; the base layer draws it');
  }
}

function lintHtml(file, html) {
  const local = spriteIds(html);
  const sprite = new Set([...(local.size ? local : starterSprite), ...external]);

  // exempt "don't" specimens
  const exempt = [];
  for (const m of html.matchAll(/<div class="[^"]*\bds-dont\b[^"]*"[\s\S]*?<span class="ds-cap">/g)) exempt.push([m.index, m.index + m[0].length]);
  const isExempt = (i) => exempt.some(([a, b]) => i >= a && i <= b);

  // <style> blocks and style="" attributes
  for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) lintCssText(file, m[1], lineOf(html, m.index) - 1);
  for (const m of html.matchAll(/style="([^"]*)"/g)) {
    const ln = lineOf(html, m.index);
    if (/#[0-9a-f]{3,8}\b|(?<![\w-])(rgba?|hsla?)\(/i.test(m[1]) && !isExempt(m.index)) add(file, ln, 'error', 'carbon-colour', `inline colour in style="${m[1]}"`);
    if (/border-radius\s*:\s*(?!var\(--cf-r-)/.test(m[1])) add(file, ln, 'error', 'radius', `inline radius in style="${m[1]}"`);
  }

  // elements
  for (const m of html.matchAll(/<(button|a|div|span|input|select|textarea|svg|label|table|aside|header|section|p|h\d|i|td|th)\b([^>]*)>/g)) {
    const attrs = m[2], idx = m.index, ln = lineOf(html, idx);
    if (isExempt(idx)) continue;
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
    const list = cls.split(/\s+/).filter(Boolean);
    for (const c of list) if (c.startsWith('cf-') && !defined.has(c) && !c.startsWith('cf-is-'))
      add(file, ln, 'error', 'one-job-one-component', `class .${c} is not defined in gallium.css`);
    if (list.includes('cf-btn') && list.includes('is-split') && /style="[^"]*\b(min-|max-)?width\s*:/.test(attrs))
      add(file, ln, 'error', 'split-button-hugs', 'width set on .cf-btn.is-split — remove it; the button hugs its content');
    if (m[1] === 'button' && list.includes('is-icon') && !/aria-label=/.test(attrs))
      add(file, ln, 'error', 'icon-a11y', 'icon-only button without aria-label');
    if (m[1] === 'a' && list.includes('cf-btn') && !/href=/.test(attrs))
      add(file, ln, 'error', 'action-vs-navigation', '<a class="cf-btn"> without href — use <button>');
    if (m[1] === 'button' && list.includes('cf-btn') && !/type=/.test(attrs))
      add(file, ln, 'warn', 'button-hierarchy', '<button> without type — add type="button" (or "submit")');
  }

  // one primary per button set
  for (const m of html.matchAll(/<div class="cf-btn-set[^"]*">([\s\S]*?)<\/div>/g)) {
    if (isExempt(m.index)) continue;
    const primaries = [...m[1].matchAll(/class="cf-btn(?: is-(?:xs|md|lg|block))*"/g)].length;
    if (primaries > 1) add(file, lineOf(html, m.index), 'error', 'button-hierarchy', `${primaries} primary buttons in one .cf-btn-set`);
  }

  // icons must exist
  if (sprite.size) for (const m of html.matchAll(/href="(?:[\w./-]*)#icon--([\w-]+)"/g))
    if (!sprite.has(m[1])) add(file, lineOf(html, m.index), 'error', 'carbon-icons-only', `icon--${m[1]} is not in the sprite — run npm run icons`);

  // inlined copies of system scripts must stay identical to the shipped files (one controller, no forks)
  for (const [marker, end, src] of [['/* Gallium · cf-resize.js', "g.cfResize = { version: '1.0' };\n})(window);", 'cf-resize.js'], ['/* Gallium · cfIcon()', '})(window);', 'icons/cf-icon.js']]) {
    const i = html.indexOf(marker); if (i < 0) continue;
    const j = html.indexOf(end, i) + end.length, norm = (t) => t.replace(/\r/g, '').trim();
    const ref = existsSync(join(ROOT, src)) ? readFileSync(join(ROOT, src), 'utf8') : '';
    if (norm(html.slice(i, j)) !== norm(ref)) add(file, lineOf(html, i), 'error', 'one-job-one-component', `inline copy of ${src} differs from the shipped file — copy it again or load it with <script src>`);
  }
}


/** Lint one file's text. kind: 'css' | 'html'. Returns [{file,line,level,rule,msg}]. */
export function lintText(file, text, kind = file.endsWith('.css') ? 'css' : 'html') {
  issues = [];
  if (kind === 'css') lintCssText(file, text, 0, { isSystem: file.endsWith('gallium.css') });
  else lintHtml(file, text);
  return issues.sort((a, b) => a.line - b.line);
}
export const summary = (list) => ({ errors: list.filter((i) => i.level === 'error').length, warnings: list.filter((i) => i.level !== 'error').length });
