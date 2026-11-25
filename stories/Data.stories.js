export default {
  title: 'Components/Data',
  parameters: {
    docs: {
      description: {
        component:
          'Every piece of data has one component. Tables live inside a card (32px header, 40px rows, numbers right-aligned in tabular Plex Sans). Property lists use `.cf-props › .cf-prop`; editable values are `.cf-edit` everywhere.',
      },
    },
  },
};

export const Table = {
  render: () => `
    <div class="cf-card"><div class="cf-table-wrap"><table class="cf-table">
      <thead><tr><th>Driver</th><th>Trust</th><th class="is-num">Value / yr</th></tr></thead>
      <tbody>
        <tr><td>Time saved</td><td><span class="cf-tag is-success">Confirmed</span></td><td class="is-num">€420,000</td></tr>
        <tr><td>Error reduction</td><td><span class="cf-tag is-warning">Estimate</span></td><td class="is-num">€180,000</td></tr>
        <tr><td>Churn avoided</td><td><span class="cf-tag">Unknown</span></td><td class="is-num">—</td></tr>
      </tbody></table></div></div>`,
};

export const TableCompact = {
  render: () => `
    <div class="cf-card"><div class="cf-table-wrap"><table class="cf-table is-compact">
      <thead><tr><th>Driver</th><th class="is-num">Value / yr</th></tr></thead>
      <tbody><tr><td>Time saved</td><td class="is-num">€420,000</td></tr><tr><td>Error reduction</td><td class="is-num">€180,000</td></tr></tbody></table></div></div>`,
};

export const TableEditable = {
  render: () => `
    <div class="cf-card"><div class="cf-table-wrap"><table class="cf-table is-editable">
      <thead><tr><th>Cost line</th><th style="width:120px">Type</th><th class="is-num" style="width:120px">Amount</th><th style="width:44px"><span class="cf-sr">Actions</span></th></tr></thead>
      <tbody>
        <tr><td><input class="cf-edit" aria-label="Cost name" value="Licences"></td><td><select class="cf-edit" aria-label="Type"><option>Per year</option><option>One-time</option></select></td><td><input class="cf-edit is-num" aria-label="Amount" value="120000"></td><td><button type="button" class="cf-btn is-ghost is-icon is-danger" aria-label="Delete row"><svg><use href="#icon--trash-can"/></svg></button></td></tr>
        <tr><td><input class="cf-edit" aria-label="Cost name" value="Enablement"></td><td><select class="cf-edit" aria-label="Type"><option>One-time</option><option>Per year</option></select></td><td><input class="cf-edit is-num" aria-label="Amount" value="40000"></td><td><button type="button" class="cf-btn is-ghost is-icon is-danger" aria-label="Delete row"><svg><use href="#icon--trash-can"/></svg></button></td></tr>
      </tbody></table></div></div>`,
};

export const Properties = {
  render: () => `
    <aside class="cf-panel is-right" style="max-width:360px;border:1px solid var(--cf-border-subtle)" aria-label="Inspector example">
      <div class="cf-head is-bar"><h3 class="cf-head-t">Driver</h3><button type="button" class="cf-btn is-ghost is-icon" aria-label="Close inspector"><svg><use href="#icon--close"/></svg></button></div>
      <div class="cf-section cf-stack">
        <input class="cf-edit is-title-sm" value="Time saved" aria-label="Driver name">
        <span class="cf-code">People × Hours saved × Loaded cost</span>
        <div class="cf-kpi"><div class="cf-kpi-l">Value per year</div><div class="cf-kpi-v">€420,000</div><div class="cf-kpi-s">All inputs confirmed</div></div>
      </div>
      <div class="cf-section"><div class="cf-head"><h4 class="cf-head-t">Properties</h4></div><div class="cf-props">
        <div class="cf-prop"><label class="cf-prop-l" for="dp1"><svg class="cf-icon"><use href="#icon--time"/></svg><span>Ramp-up</span></label><input class="cf-edit is-num" id="dp1" value="6 months"></div>
        <div class="cf-prop"><label class="cf-prop-l" for="dp2"><svg class="cf-icon"><use href="#icon--user--avatar"/></svg><span>Owner</span></label><input class="cf-edit" id="dp2" value="CFO"></div>
        <div class="cf-prop"><label class="cf-prop-l" for="dp3"><svg class="cf-icon"><use href="#icon--document"/></svg><span>Source</span></label><select class="cf-edit" id="dp3"><option>Client interview</option><option>Benchmark</option></select></div>
        <div class="cf-prop is-stacked cf-resizable" data-cf-resizable="y" data-min-h="64"><label class="cf-prop-l" for="dp4"><span>Notes</span></label><textarea class="cf-edit" id="dp4" data-cf-resize-target>Confirmed with the support lead on 12 Nov.</textarea><button type="button" class="cf-resize is-se" aria-label="Resize notes"></button></div>
      </div></div>
      <div class="cf-section"><div class="cf-head"><h4 class="cf-head-t">Inputs</h4><span class="cf-helper">read-only</span></div><div class="cf-props">
        <div class="cf-prop"><span class="cf-prop-l"><span class="cf-dot is-confirmed"></span><span>People</span></span><span class="cf-prop-o cf-num">120</span></div>
        <div class="cf-prop"><span class="cf-prop-l"><span class="cf-dot is-confirmed"></span><span>Hours saved per person</span></span><span class="cf-prop-o cf-num">4 h / week</span></div>
        <div class="cf-prop"><span class="cf-prop-l"><span class="cf-dot is-confirmed"></span><span>Loaded cost</span></span><span class="cf-prop-o cf-num">€62 / h</span></div>
      </div></div>
    </aside>`,
};
