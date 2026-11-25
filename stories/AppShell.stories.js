export default {
  title: 'Patterns/App shell',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built only from `cf-` classes: header, left panel, canvas, right inspector. `starter.html` contains this shell as a standalone file; start every new tool from it.',
      },
    },
  },
};

export const Shell = {
  parameters: { docs: { story: { inline: false, height: '700px' } } },
  render: () => `
    <div class="sb-frame">
      <div class="cf-app">
        <header class="cf-header">
          <div class="cf-header-start">
            <button type="button" class="cf-btn is-ghost is-icon" aria-label="Key figures panel" title="Key figures panel"><svg><use href="#icon--side-panel--close"/></svg></button>
            <span class="cf-brand">IBM <span>Value Model Builder</span></span><span class="cf-vsep" aria-hidden="true"></span>
            <button type="button" class="cf-btn is-ghost"><span>AI Support Automation</span><span class="cf-tag is-mono">v2</span><svg><use href="#icon--chevron--down"/></svg></button>
            <button type="button" class="cf-btn is-ghost is-icon" aria-label="Menu" title="Menu"><svg><use href="#icon--overflow-menu--horizontal"/></svg></button>
          </div>
          <div class="cf-header-center"><div class="cf-seg" role="group" aria-label="Screens"><button type="button" aria-pressed="true">Build</button><button type="button" aria-pressed="false">Results</button><button type="button" aria-pressed="false">Share</button></div></div>
          <div class="cf-header-end"><button type="button" class="cf-btn is-ghost" title="Generate with agent"><span>Generate with agent</span><svg><use href="#icon--ai-agent-detached"/></svg></button></div>
        </header>
        <div class="cf-body">
          <aside class="cf-panel is-left" aria-label="Key figures">
            <div class="cf-head is-bar"><h2 class="cf-head-t">Key figures</h2></div>
            <div class="cf-scroll cf-kpis">
              <div class="cf-kpi"><div class="cf-kpi-l">3-year net value</div><div class="cf-kpi-v">€2.1M</div><div class="cf-kpi-s">Value minus costs</div></div>
              <div class="cf-kpi"><div class="cf-kpi-l">Payback</div><div class="cf-kpi-v">7 months</div></div>
              <div class="cf-kpi"><div class="cf-kpi-l">Client-confirmed</div><div class="cf-kpi-v">70%</div><div class="cf-meter" role="img" aria-label="70% confirmed, 30% estimate"><i class="is-confirmed" style="width:70%"></i><i class="is-estimate" style="width:30%"></i></div></div>
            </div>
            <div class="cf-foot"><label class="cf-toggle is-between"><span>Client safe mode</span><input type="checkbox" role="switch"></label></div>
          </aside>
          <div class="cf-canvas"><div class="cf-canvas-inner cf-stack" style="gap:var(--cf-sp-05)">
            <div class="cf-head is-xl"><div class="cf-head-text"><input class="cf-edit is-title" value="AI Support Automation" aria-label="Business case title"><div class="cf-row" style="gap:var(--cf-sp-03)"><span class="cf-chip">Client <input value="Acme Corp" aria-label="Client"></span><span class="cf-chip">Sponsor <input value="Jane Doe" aria-label="Sponsor"></span></div></div>
              <button type="button" class="cf-btn is-split" aria-expanded="false"><span>Add driver</span><svg class="cf-chev"><use href="#icon--chevron--down"/></svg></button></div>
            <div class="cf-inline is-warning"><svg><use href="#icon--warning--filled"/></svg><div class="cf-inline-body"><b>Sample data.</b> Start blank to build your own case.</div><button type="button" class="cf-btn is-ghost"><span>Start blank</span></button></div>
            <div class="cf-grid">
              <div class="cf-col-12"><div class="cf-card is-canvas is-selected"><div class="cf-head is-md is-bar"><div class="cf-head-text"><h3 class="cf-head-t">Value drivers</h3><p class="cf-head-s">Each driver multiplies its inputs.</p></div></div>
                <div class="cf-table-wrap"><table class="cf-table"><thead><tr><th>Driver</th><th>Inputs</th><th class="is-num">Value / yr</th></tr></thead><tbody><tr style="background:var(--cf-selected)"><td>Time saved</td><td><span class="cf-tag is-success">3 confirmed</span></td><td class="is-num">€420,000</td></tr><tr><td>Error reduction</td><td><span class="cf-tag is-warning">1 estimate</span></td><td class="is-num">€180,000</td></tr></tbody></table></div></div></div>
            </div>
          </div></div>
          <aside class="cf-panel is-right" aria-label="Inspector">
            <div class="cf-head is-bar"><h2 class="cf-head-t">Driver</h2><button type="button" class="cf-btn is-ghost is-icon" aria-label="Close inspector"><svg><use href="#icon--close"/></svg></button></div>
            <div class="cf-scroll">
              <div class="cf-section cf-stack"><input class="cf-edit is-title-sm" value="Time saved" aria-label="Driver name"><span class="cf-code">People × Hours saved × Loaded cost</span>
                <div class="cf-kpi"><div class="cf-kpi-l">Value per year</div><div class="cf-kpi-v">€420,000</div><div class="cf-kpi-s">All inputs confirmed</div></div></div>
              <div class="cf-section"><div class="cf-head"><h3 class="cf-head-t">Inputs</h3><span class="cf-helper">read-only</span></div><div class="cf-props">
                <div class="cf-prop"><span class="cf-prop-l"><span class="cf-dot is-confirmed"></span><span>People</span></span><span class="cf-prop-o cf-num">120</span></div>
                <div class="cf-prop"><span class="cf-prop-l"><span class="cf-dot is-confirmed"></span><span>Hours saved</span></span><span class="cf-prop-o cf-num">4 h / week</span></div>
              </div></div>
            </div>
          </aside>
        </div>
      </div>
    </div>`,
};
