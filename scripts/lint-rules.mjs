// Gallium · lint-rules.mjs — checks HTML and CSS against rules/gallium.rules.json.
// Usage: node scripts/lint-rules.mjs [files…]   (default: gallium.css + *.html in the root and examples/)
// Exit 1 on any error. Agents run this on generated output before handing it back.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { lintText, summary } from './lib/lint.mjs';

const args = process.argv.slice(2);
const files = args.length ? args : ['gallium.css', ...readdirSync('.').filter((f) => f.endsWith('.html')),
  ...(existsSync('examples') ? readdirSync('examples').filter((f) => f.endsWith('.html')).map((f) => 'examples/' + f) : [])];
const all = files.flatMap((f) => lintText(f, readFileSync(f, 'utf8')));
for (const i of all) console.log(`${i.level === 'error' ? '✖' : '⚠'} ${i.file}:${i.line}  [${i.rule}]  ${i.msg}`);
const { errors, warnings } = summary(all);
console.log(`\n${errors} error(s), ${warnings} warning(s) in ${files.length} file(s)`);
process.exit(errors ? 1 : 0);
