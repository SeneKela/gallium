import starter from '../starter.html?raw';

export default {
  title: 'Foundations/Tokens',
  parameters: {
    docs: { description: { component: 'Semantic tokens only (`var(--cf-*)`). Never use primitives (`--cf-gray-*`, `--cf-blue-*`) in app CSS. Use the Theme switcher in the toolbar to see every value change between White and G100.' } },
  },
};

const GROUPS = {
  Surfaces: ['canvas', 'layer-01', 'layer-02', 'layer-float', 'field', 'hover', 'pressed', 'selected', 'selected-bg', 'inverse', 'overlay'],
  Text: ['text-primary', 'text-secondary', 'text-helper', 'text-disabled', 'text-on-color', 'text-inverse', 'link', 'link-hover'],
  Borders: ['border-subtle', 'border-control', 'border-strong', 'border-inverse', 'focus'],
  Buttons: ['primary', 'primary-hover', 'secondary', 'tertiary', 'danger', 'danger-hover', 'disabled'],
  Status: ['success', 'success-soft', 'warning', 'warning-soft', 'error', 'error-soft', 'info', 'info-soft'],
  Trust: ['trust-confirmed', 'trust-estimate', 'trust-unknown'],
  Visualisation: ['viz-value', 'viz-cost', 'viz-1', 'viz-2', 'viz-3', 'viz-4'],
};

export const Colour = {
  render: () => `
    <div class="cf-stack" style="gap:var(--cf-sp-07)">
      ${Object.entries(GROUPS).map(([g, names]) => `
        <section class="cf-stack"><h3 class="cf-h4">${g}</h3>
          <div class="sb-swatches">${names.map((n) => `<div class="sb-sw"><span class="sb-chip" style="background:var(--cf-${n})"></span><div><b>--cf-${n}</b></div></div>`).join('')}</div>
        </section>`).join('')}
    </div>`,
};

export const Typography = {
  render: () => `
    <div class="sb-panel">
      <div class="sb-type"><span class="sb-cap">heading-05 · 300 · 28–36 fluid</span><span class="cf-display cf-num">€2.1M · 312%</span></div>
      <div class="sb-type"><span class="sb-cap">heading-04 · 300 · 22–28 fluid</span><span class="cf-h1">AI Support Automation</span></div>
      <div class="sb-type"><span class="sb-cap">heading-03 · 400 · 20/28</span><span class="cf-h2">Load sample data?</span></div>
      <div class="sb-type"><span class="sb-cap">heading-02 · 600 · 16/22</span><span class="cf-h3">Value drivers</span></div>
      <div class="sb-type"><span class="sb-cap">heading-01 · 600 · 14/18</span><span class="cf-h4">Key figures</span></div>
      <div class="sb-type"><span class="sb-cap">control · 500 · 14/18</span><span style="font:var(--cf-type-control)">Add driver · Build · Restore</span></div>
      <div class="sb-type"><span class="sb-cap">body · 400 · 14/20</span><span>Each driver multiplies its inputs. Unknown inputs count as zero until a client person confirms them.</span></div>
      <div class="sb-type"><span class="sb-cap">label · 400 · 12/16</span><span class="cf-label">3-year net value</span></div>
      <div class="sb-type"><span class="sb-cap">numbers · Plex Sans tabular</span><span class="cf-num">€1,234,567 · 312% · 7 months</span></div>
      <div class="sb-type"><span class="sb-cap">code · Plex Mono 12/16</span><span class="cf-code">People × Hours saved ÷ 100 = €420k/yr</span></div>
    </div>`,
};

export const Shape = {
  parameters: { docs: { description: { story: 'Controls 4, containers 8, pill for tags and chips. Feedback is Carbon-square. Nested radius = outer − padding.' } } },
  render: () => `
    <div class="sb-panel cf-row" style="gap:var(--cf-sp-06);align-items:flex-end">
      <div class="sb-cell"><div class="sb-rad" style="border-radius:var(--cf-r-xs)"></div><span class="sb-cap">2 · xs · track, check</span></div>
      <div class="sb-cell"><div class="sb-rad" style="border-radius:var(--cf-r-control)"></div><span class="sb-cap">4 · control</span></div>
      <div class="sb-cell"><div class="sb-rad" style="border-radius:var(--cf-r-container)"></div><span class="sb-cap">8 · container</span></div>
      <div class="sb-cell"><div class="sb-rad" style="border-radius:var(--cf-r-pill)"></div><span class="sb-cap">pill · tag, chip, toggle</span></div>
    </div>`,
};

export const Elevation = {
  parameters: { docs: { description: { story: 'flat: cards, panels · elev-1: segmented thumb · elev-2: menu, popover, toast · elev-3: modal.' } } },
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-05);padding:var(--cf-sp-05);background:var(--cf-canvas)">
      <div class="sb-elev" style="border:1px solid var(--cf-border-subtle);background:var(--cf-layer-01)">flat</div>
      <div class="sb-elev" style="box-shadow:var(--cf-elev-1)">elev-1</div>
      <div class="sb-elev" style="box-shadow:var(--cf-elev-2)">elev-2</div>
      <div class="sb-elev" style="box-shadow:var(--cf-elev-3)">elev-3</div>
    </div>`,
};

export const Spacing = {
  render: () => `
    <div class="sb-panel cf-stack" style="gap:var(--cf-sp-03)">
      ${['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((n) => `<div class="sb-space"><span class="sb-cap" style="width:80px">--cf-sp-${n}</span><i style="width:var(--cf-sp-${n})"></i></div>`).join('')}
    </div>`,
};

const ICONS = [...starter.matchAll(/<symbol id="icon--([^"]+)"/g)].map((m) => m[1]);

export const Icons = {
  name: 'Icons',
  parameters: { docs: { description: { story: `The official IBM Carbon set via the inline sprite (${ICONS.length} icons in this build). Use \`<svg><use href="#icon--name"/></svg>\`; icon-only buttons need \`aria-label\`. Missing an icon? Run \`npm run icons\` — never draw your own.` } } },
  render: () => `
    <div class="cf-stack" style="gap:var(--cf-sp-06)">
      <div class="sb-panel cf-row" style="gap:var(--cf-sp-06);align-items:flex-end">
        <div class="sb-cell"><svg class="cf-icon" aria-hidden="true"><use href="#icon--ai-agent-detached"/></svg><span class="sb-cap">16 · default</span></div>
        <div class="sb-cell"><svg class="cf-icon is-lg" aria-hidden="true"><use href="#icon--ai-agent-detached"/></svg><span class="sb-cap">20 · is-lg</span></div>
      </div>
      <div class="sb-icons">${ICONS.map((n) => `<div class="sb-icon" title="icon--${n}"><svg class="cf-icon is-lg" aria-hidden="true"><use href="#icon--${n}"/></svg><span>${n}</span></div>`).join('')}</div>
    </div>`,
};
