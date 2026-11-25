export default {
  title: 'Components/Feedback',
  parameters: {
    docs: {
      description: {
        component:
          'One inline notification (neutral, info, success, warning, error) and one toast, both square like Carbon with a 3px status edge. Only the toast\'s right corners get a 2px radius.',
      },
    },
  },
};

export const Inline = {
  render: () => `
    <div class="cf-stack">
      <div class="cf-inline is-warning"><svg><use href="#icon--warning--filled"/></svg><div class="cf-inline-body"><b>Sample data.</b> Start blank to build your own case.</div><button type="button" class="cf-btn is-ghost"><span>Start blank</span></button></div>
      <div class="cf-inline is-success"><svg><use href="#icon--checkmark--filled"/></svg><div class="cf-inline-body"><b>Every figure is client-confirmed.</b> The remaining risk is adoption.</div></div>
      <div class="cf-inline is-error"><svg><use href="#icon--warning--filled"/></svg><div class="cf-inline-body"><b>Could not read JSON.</b> Line 4: unexpected token.</div></div>
      <div class="cf-inline is-info"><svg><use href="#icon--information--filled"/></svg><div class="cf-inline-body"><b>Nothing leaves your browser.</b> The prompt is copied to your clipboard only.</div></div>
      <div class="cf-inline"><svg><use href="#icon--information--filled"/></svg><div class="cf-inline-body">This input counts as zero, so its driver adds no value yet.</div></div>
    </div>`,
};

const toast = (cls, icon, title, sub = '', cap = '') => `
  <div class="cf-toast ${cls} sb-static" role="${cls === 'is-error' ? 'alert' : 'status'}"><svg aria-hidden="true"><use href="#icon--${icon}"/></svg>
    <div class="cf-toast-body"><span class="cf-toast-t">${title}</span>${sub ? `<span class="cf-toast-s">${sub}</span>` : ''}${cap ? `<span class="cf-toast-c">${cap}</span>` : ''}</div>
    <button type="button" class="cf-btn is-ghost is-icon" aria-label="Close"><svg><use href="#icon--close"/></svg></button></div>`;

export const Toast = {
  parameters: { docs: { description: { story: 'Inverse layer, 3px status edge, 20px icon, title + subtitle + caption, 48px flush close.' } } },
  render: () => `
    <div class="cf-row" style="align-items:flex-start;gap:var(--cf-sp-05)">
      ${toast('', 'checkmark--filled', 'Version saved', 'v3 · After CFO review', 'Just now')}
      ${toast('is-error', 'warning--filled', 'Could not read JSON', 'Line 4: unexpected token.')}
      ${toast('is-warning', 'warning--filled', '2 inputs unconfirmed')}
      ${toast('is-info', 'information--filled', 'Copied to clipboard')}
    </div>`,
};

export const Skeleton = {
  render: () => `<div class="cf-card" style="max-width:420px"><div class="cf-content cf-stack"><span class="cf-skel" style="width:60%"></span><span class="cf-skel" style="width:90%"></span><span class="cf-skel" style="width:40%"></span></div></div>`,
};
