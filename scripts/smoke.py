"""Gallium · smoke.py — opens every page in Chromium (white + g100) and checks what a linter can't:
no JS errors, no missing local files, every control has an accessible name, every <use> icon resolves,
and the computed shape rules (square feedback, toast radius right-only, split button hugs its content).
Writes screenshots to screenshots/.  Usage: python3 scripts/smoke.py   (needs: pip install playwright && playwright install chromium)
"""
import os, sys, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['design-system.html', 'starter.html'] + sorted(f'examples/{p.name}' for p in (ROOT / 'examples').glob('*.html'))
OUT = ROOT / 'screenshots'; OUT.mkdir(exist_ok=True)
fails, notes = [], []

CHECKS = r"""() => {
  const out = [], vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
  const name = (el) => (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') && document.getElementById(el.getAttribute('aria-labelledby'))?.textContent
     || (el.labels && [...el.labels].map(l => l.textContent).join(' ')) || el.closest('label')?.textContent || el.textContent || el.getAttribute('title') || el.getAttribute('placeholder') || '').trim();
  for (const el of document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [role=switch], [role=radio]'))
    if (vis(el) && !name(el)) out.push('no accessible name: ' + el.outerHTML.slice(0, 120));
  for (const u of document.querySelectorAll('use')) { const h = u.getAttribute('href') || ''; if (h.startsWith('#') && !document.getElementById(h.slice(1))) out.push('missing icon ' + h); }
  const r = (el) => { const s = getComputedStyle(el); return [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius]; };
  for (const el of document.querySelectorAll('.cf-inline')) if (r(el).some(v => v !== '0px')) out.push('inline notification not square: ' + r(el));
  for (const el of document.querySelectorAll('.cf-toast')) { const [tl, tr, br, bl] = r(el); if (tl !== '0px' || bl !== '0px' || tr !== '2px' || br !== '2px') out.push(`toast radius ${tl} ${tr} ${br} ${bl} (want 0 2 2 0)`); }
  for (const el of document.querySelectorAll('.cf-btn.is-split')) { if (!vis(el)) continue; const kids = [...el.children].reduce((w, c) => w + c.getBoundingClientRect().width, 0);
    const s = getComputedStyle(el), pad = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight) + parseFloat(s.columnGap || 0) * (el.children.length - 1);
    if (el.getBoundingClientRect().width - (kids + pad) > 1.5) out.push('split button wider than its content'); }
  const heights = [...document.querySelectorAll('.cf-btn:not(.is-xs):not(.is-md):not(.is-lg), .cf-input:not(.is-md):not(.is-lg), .cf-select, .cf-seg:not(.is-xs), .cf-stepper')]
    .filter(el => vis(el) && !el.style.height && !el.closest('.cf-toast, .cf-header, .ds-matrix')).map(el => Math.round(el.getBoundingClientRect().height));
  const off = heights.filter(h => h !== 32); if (off.length) out.push('controls not 32px: ' + [...new Set(off)].join(','));
  return out;
}"""

with sync_playwright() as p:
    exe = os.environ.get('CHROME') or ('/opt/pw-browsers/chromium-1228/chrome-linux64/chrome' if os.path.exists('/opt/pw-browsers/chromium-1228/chrome-linux64/chrome') else None)
    browser = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    for page_path in PAGES:
        for theme in ['white', 'g100']:
            page = browser.new_page(viewport={'width': 1280, 'height': 900})
            errs, missing = [], []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: m.type == 'error' and not m.text.startswith('Failed to load resource') and errs.append(m.text))
            page.on('response', lambda r: r.status >= 400 and 'fonts.g' not in r.url and missing.append(f'{r.url} ({r.status})'))
            page.on('requestfailed', lambda r: r.url.startswith('file:') and missing.append(r.url.split('/')[-1]))
            page.goto((ROOT / page_path).as_uri()); page.wait_for_load_state('load')
            page.evaluate(f"document.body.setAttribute('data-cf-theme','{theme}')")
            if page_path == 'design-system.html':      # exercise live components
                page.click('[data-toast="is-error"]'); page.click('#ddDemo'); page.keyboard.press('Escape')
            if page_path.endswith('settings.html'):
                page.fill('#real', '140'); page.click('button[type=submit]')
                if page.get_attribute('#real', 'aria-invalid') != 'true': fails.append(f'{page_path}: validation did not flag 140')
                page.fill('#real', '75'); page.click('button[type=submit]')
            page.wait_for_timeout(250)
            problems = page.evaluate(CHECKS)
            for e in errs: fails.append(f'{page_path} [{theme}] JS error: {e}')
            for m in sorted(set(missing)): fails.append(f'{page_path} [{theme}] missing file: {m}')
            for pr in problems: (notes if pr.startswith('controls not 32px') else fails).append(f'{page_path} [{theme}] {pr}')
            page.screenshot(path=str(OUT / f"{page_path.replace('/', '-')[:-5]}-{theme}.png"), full_page=True)
            page.close()
    browser.close()

for n in notes: print('⚠', n)
for f in fails: print('✖', f)
print(f'\n{len(PAGES)} pages × 2 themes · {len(fails)} failure(s), {len(notes)} note(s) · screenshots in screenshots/')
sys.exit(1 if fails else 0)
