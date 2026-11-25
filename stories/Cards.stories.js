export default {
  title: 'Components/Cards and regions',
  parameters: {
    docs: {
      description: {
        component:
          'Panels, sections, cards, popovers, modals and the page header share one anatomy: `.cf-head` · `.cf-content` / `.cf-scroll` · `.cf-foot`. Only the title size and the bar change.',
      },
    },
  },
};

export const HeadSizes = {
  render: () => `
    <div class="sb-panel">
      <div class="sb-type"><span class="sb-cap">.cf-head.is-xl · page</span><div class="cf-head is-xl" style="width:100%"><div class="cf-head-text"><h3 class="cf-head-t">AI Support Automation</h3><p class="cf-head-s">Acme Corp · sponsor Jane Doe</p></div><button type="button" class="cf-btn"><span>Share</span></button></div></div>
      <div class="sb-type"><span class="sb-cap">.cf-head.is-lg · modal</span><div class="cf-head is-lg"><div class="cf-head-text"><span class="cf-head-e">Business case</span><h3 class="cf-head-t">Load sample data?</h3></div></div></div>
      <div class="sb-type"><span class="sb-cap">.cf-head.is-md · card</span><div class="cf-head is-md"><div class="cf-head-text"><h3 class="cf-head-t">Value drivers</h3><p class="cf-head-s">Each driver multiplies its inputs.</p></div></div></div>
      <div class="sb-type"><span class="sb-cap">.cf-head · panel, section, popover</span><div class="cf-head"><h4 class="cf-head-t">Properties</h4><button type="button" class="cf-btn is-ghost is-xs"><span>Reset</span></button></div></div>
      <div class="sb-type"><span class="sb-cap">.cf-head-e · eyebrow</span><span class="cf-head-e">Driver</span></div>
    </div>`,
};

export const Card = {
  render: () => `
    <div class="cf-card" style="max-width:520px">
      <div class="cf-head is-md is-bar"><div class="cf-head-text"><h3 class="cf-head-t">Value drivers</h3><p class="cf-head-s">Header: ghost icons, one primary</p></div>
        <div class="cf-row" style="gap:var(--cf-sp-02)"><button class="cf-btn is-ghost is-icon" type="button" aria-label="More"><svg><use href="#icon--overflow-menu--horizontal"/></svg></button><button class="cf-btn" type="button"><svg><use href="#icon--add"/></svg><span>Driver</span></button></div></div>
      <div class="cf-content"><span class="cf-skel" style="width:70%"></span></div>
    </div>`,
};

export const CardVariants = {
  render: () => `
    <div class="cf-grid">
      <div class="cf-col-12"><div class="cf-card is-sm"><div class="cf-content"><span class="cf-label">.cf-card.is-sm</span></div></div></div>
      <div class="cf-col-12"><div class="cf-card is-interactive"><div class="cf-content"><span class="cf-label">.cf-card.is-interactive</span></div></div></div>
      <div class="cf-col-12"><div class="cf-card is-interactive is-selected"><div class="cf-content"><span class="cf-label">.cf-card.is-interactive.is-selected</span></div></div></div>
      <div class="cf-col-12"><div class="cf-card is-dashed"><div class="cf-empty"><span class="cf-h4" style="color:var(--cf-text-primary)">Costs hidden</span><span>Client safe mode is on. Turn it off to edit costs.</span></div></div></div>
    </div>`,
};

export const Kpis = {
  render: () => `
    <div class="cf-grid">
      <div class="cf-col-12"><div class="cf-card"><div class="cf-kpis is-row">
        <div class="cf-kpi"><div class="cf-kpi-l">3-year net</div><div class="cf-kpi-v">€2.1M</div><div class="cf-kpi-s">After costs</div></div>
        <div class="cf-kpi"><div class="cf-kpi-l">Payback</div><div class="cf-kpi-v">7 mo</div><div class="cf-kpi-s">Cumulative</div></div>
        <div class="cf-kpi"><div class="cf-kpi-l">ROI</div><div class="cf-kpi-v">312%</div><div class="cf-kpi-s">36 months</div></div>
        <div class="cf-kpi"><div class="cf-kpi-l">Confirmed</div><div class="cf-kpi-v">62%</div><div class="cf-kpi-s">of value</div></div>
      </div></div></div>
      <div class="cf-col-12" style="max-width:320px"><div class="cf-card"><div class="cf-head is-bar"><h3 class="cf-head-t">Key figures</h3></div><div class="cf-kpis">
        <div class="cf-kpi"><div class="cf-kpi-l">3-year net value</div><div class="cf-kpi-v">€2.1M</div><div class="cf-kpi-s">Value minus costs</div></div>
        <div class="cf-kpi"><div class="cf-kpi-l">Client-confirmed</div><div class="cf-kpi-v">62%</div><div class="cf-meter"><i class="is-confirmed" style="width:62%"></i></div></div>
      </div></div></div>
    </div>`,
};

export const ResizeHandle = {
  parameters: { docs: { description: { story: 'One component, `.cf-resize`, in three positions: a visible corner grip (`is-se`, focusable) and two invisible edge zones (`is-e`, `is-s`). The host\'s `data-cf-resizable` sets the axis. `cf-resize.js` handles pointer, keyboard (Arrow = 8px, Shift+Arrow = 1px), snapping and the live W × H readout.' } } },
  render: () => `
    <div class="cf-row" style="align-items:flex-start;gap:var(--cf-sp-06);min-height:320px">
      <div class="cf-card" data-cf-resizable="both" data-min-w="200" data-min-h="96" data-max-w="560" data-max-h="280" style="width:320px;height:176px">
        <div class="cf-head is-md is-bar"><div class="cf-head-text"><h3 class="cf-head-t">Both axes</h3><p class="cf-head-s">Corner + right and bottom edges</p></div></div>
        <div class="cf-content"><span class="cf-helper">Drag the corner or an edge · snaps to 8px</span></div>
        <span class="cf-resize is-e" aria-hidden="true"></span><span class="cf-resize is-s" aria-hidden="true"></span><button type="button" class="cf-resize is-se" aria-label="Resize card"></button>
      </div>
      <div class="cf-card is-sm is-interactive" data-cf-resizable="y" data-min-h="72" data-max-h="260" style="width:280px">
        <textarea class="cf-edit" aria-label="Notes" data-cf-resize-target style="min-height:96px">Vertical only: the same corner grip, with an ns-resize cursor. The text area still grows with its content.</textarea>
        <button type="button" class="cf-resize is-se" aria-label="Resize notes"></button>
      </div>
    </div>`,
};
