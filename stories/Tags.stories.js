export default {
  title: 'Components/Tags, chips and trust',
  parameters: {
    docs: { description: { component: 'Tags are read-only status. Chips are inline-editable fields. Dots always sit next to a label, never alone.' } },
  },
};

export const Tags = {
  render: () => `
    <div class="cf-row">
      <span class="cf-tag">Neutral</span><span class="cf-tag is-success">Confirmed</span><span class="cf-tag is-warning">Estimate</span><span class="cf-tag is-error">Critical</span><span class="cf-tag is-info">New</span><span class="cf-tag is-mono">v2</span>
    </div>`,
};

export const Chips = {
  render: () => `
    <div class="cf-row">
      <span class="cf-chip">Client <input value="Acme Corp" aria-label="Client"></span>
      <span class="cf-chip">Sponsor <input placeholder="Add sponsor" aria-label="Sponsor"></span>
    </div>`,
};

export const TrustLegend = {
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-05)">
      <span class="cf-legend"><span class="cf-dot is-confirmed"></span>Confirmed</span>
      <span class="cf-legend"><span class="cf-dot is-estimate"></span>Estimate</span>
      <span class="cf-legend"><span class="cf-dot is-unknown"></span>Unknown</span>
      <span class="cf-legend"><span class="cf-dot is-value"></span>Business case</span>
    </div>`,
};

export const Meter = {
  render: () => `
    <div style="max-width:420px"><div class="cf-meter" role="img" aria-label="50% confirmed, 30% estimate, 20% unknown"><i class="is-confirmed" style="width:50%"></i><i class="is-estimate" style="width:30%"></i><i class="is-unknown" style="width:20%"></i></div></div>`,
};
