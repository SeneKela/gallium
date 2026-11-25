const KINDS = { primary: '', secondary: 'is-secondary', tertiary: 'is-tertiary', ghost: 'is-ghost' };
const SIZES = { xs: 'is-xs', sm: '', md: 'is-md', lg: 'is-lg' };

const button = ({ kind = 'primary', size = 'sm', danger = false, label = 'Add driver', icon = 'none', disabled = false, busy = false }) => {
  const cls = ['cf-btn', KINDS[kind], SIZES[size], danger ? 'is-danger' : ''].filter(Boolean).join(' ');
  const svg = icon !== 'none' ? `<svg><use href="#icon--${icon.replace(/^(lead|trail):/, '')}"/></svg>` : '';
  const lead = icon.startsWith('lead:') ? svg : '';
  const trail = icon.startsWith('trail:') ? svg : '';
  return `<button type="button" class="${cls}"${disabled ? ' disabled' : ''}${busy ? ' aria-busy="true"' : ''}>${lead}<span>${label}</span>${trail}</button>`;
};

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component:
          'One class, `.cf-btn`. Kind, size and shape are independent modifiers. State comes from the browser or ARIA, never from a class. Label goes in a `<span>`; every button needs `type`.',
      },
    },
  },
  argTypes: {
    kind: { control: 'inline-radio', options: Object.keys(KINDS) },
    size: { control: 'inline-radio', options: Object.keys(SIZES) },
    danger: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'select', options: ['none', 'lead:add', 'trail:arrow--right', 'lead:copy', 'trail:chevron--down'] },
    disabled: { control: 'boolean' },
    busy: { control: 'boolean' },
  },
  args: { kind: 'primary', size: 'sm', danger: false, label: 'Add driver', icon: 'none', disabled: false, busy: false },
  render: (args) => button(args),
};

export const Playground = {};

export const Kinds = {
  parameters: { controls: { disable: true } },
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-05)">
      ${['primary', 'secondary', 'tertiary', 'ghost'].map((k) => `<div class="sb-cell">${button({ kind: k, label: k[0].toUpperCase() + k.slice(1) })}<span class="sb-cap">${k}</span></div>`).join('')}
    </div>`,
};

export const Danger = {
  parameters: { controls: { disable: true } },
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-05)">
      <div class="sb-cell">${button({ danger: true, label: 'Delete' })}<span class="sb-cap">primary danger</span></div>
      <div class="sb-cell">${button({ kind: 'tertiary', danger: true, label: 'Delete' })}<span class="sb-cap">tertiary danger</span></div>
      <div class="sb-cell">${button({ kind: 'ghost', danger: true, label: 'Delete' })}<span class="sb-cap">ghost danger</span></div>
    </div>`,
};

export const Sizes = {
  parameters: { controls: { disable: true } },
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-06);align-items:flex-end">
      ${[['xs', 'Extra small', 24], ['sm', 'Small', 32], ['md', 'Medium', 40], ['lg', 'Large', 48]].map(([s, l, h]) => `<div class="sb-cell">${button({ size: s, label: l })}<span class="sb-cap">${s === 'sm' ? 'default' : 'is-' + s} · ${h}</span></div>`).join('')}
    </div>`,
};

export const States = {
  parameters: { controls: { disable: true }, docs: { description: { story: 'Hover, active and focus are forced with `data-cf-state` so the real rules render. Pressed, disabled and busy use ARIA / native attributes.' } } },
  render: () => {
    const states = [['Default', ''], ['Hover', 'data-cf-state="hover"'], ['Active', 'data-cf-state="active"'], ['Focus', 'data-cf-state="focus"'], ['Pressed', 'aria-pressed="true"'], ['Disabled', 'disabled'], ['Busy', 'aria-busy="true"']];
    const kinds = [['Primary', ''], ['Secondary', 'is-secondary'], ['Tertiary', 'is-tertiary'], ['Ghost', 'is-ghost'], ['Danger', 'is-danger']];
    return `<table style="border-collapse:separate;border-spacing:0">
      <thead><tr><th></th>${states.map(([s]) => `<th class="cf-label" style="text-align:left;padding:0 var(--cf-sp-04) var(--cf-sp-04) 0">${s}</th>`).join('')}</tr></thead>
      <tbody>${kinds.map(([k, c]) => `<tr><td class="sb-cap" style="padding-right:var(--cf-sp-04)">${k}</td>${states.map(([, a]) => `<td style="padding:var(--cf-sp-03) var(--cf-sp-04) var(--cf-sp-03) 0"><button type="button" class="cf-btn ${c}" ${a}><span>${k}</span></button></td>`).join('')}</tr>`).join('')}</tbody>
    </table>`;
  },
};

export const WithIcons = {
  parameters: { controls: { disable: true } },
  render: () => `
    <div class="cf-row" style="gap:var(--cf-sp-06);align-items:flex-end">
      <div class="sb-cell">${button({ kind: 'tertiary', label: 'Cost line', icon: 'lead:add' })}<span class="sb-cap">leading icon: create</span></div>
      <div class="sb-cell">${button({ label: 'Continue', icon: 'trail:arrow--right' })}<span class="sb-cap">trailing icon: go</span></div>
      <div class="sb-cell">
        <div class="cf-row" style="gap:var(--cf-sp-01)">
          <button class="cf-btn is-ghost is-icon" type="button" aria-label="Copy" title="Copy"><svg><use href="#icon--copy"/></svg></button>
          <button class="cf-btn is-ghost is-icon" type="button" aria-label="Grid" title="Grid" aria-pressed="true" data-toggle><svg><use href="#icon--grid"/></svg></button>
          <button class="cf-btn is-ghost is-icon" type="button" aria-label="Show values" title="Show values" aria-pressed="false" data-toggle><svg><use href="#icon--view"/></svg></button>
          <button class="cf-btn is-ghost is-icon is-danger" type="button" aria-label="Delete" title="Delete"><svg><use href="#icon--trash-can"/></svg></button>
        </div>
        <span class="sb-cap">is-icon · toolbar with aria-pressed</span>
      </div>
    </div>`,
};

export const Split = {
  parameters: { controls: { disable: true }, docs: { description: { story: '`.cf-btn.is-split` hugs its content: never set its width.' } } },
  render: () => `
    <div style="min-height:160px">
      <div class="sb-menu-host">
        <button class="cf-btn is-split" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="sbSplitMenu" id="sbSplit"><span>Add driver</span><svg class="cf-chev"><use href="#icon--chevron--down"/></svg></button>
        <div class="cf-menu" id="sbSplitMenu" role="menu" aria-labelledby="sbSplit" hidden>
          <button type="button" class="cf-menu-item" role="menuitem"><svg><use href="#icon--add"/></svg>Value driver</button>
          <button type="button" class="cf-menu-item" role="menuitem"><svg><use href="#icon--currency"/></svg>Cost line</button>
        </div>
      </div>
    </div>`,
};

export const Busy = {
  parameters: { controls: { disable: true } },
  render: () => `<button class="cf-btn" type="button" data-busy-demo><span>Save version</span></button>`,
};

export const Usage = {
  parameters: { controls: { disable: true } },
  render: () => `
    <div class="sb-2">
      <div class="cf-card is-sm sb-do"><div class="cf-content cf-stack"><div class="cf-btn-set">${button({ kind: 'secondary', label: 'Export' })}${button({ label: 'Share case' })}</div><span class="sb-cap">one primary, verbs, sentence case</span></div></div>
      <div class="cf-card is-sm sb-dont"><div class="cf-content cf-stack"><div class="cf-btn-set">${button({ label: 'Export' })}${button({ label: 'SHARE CASE' })}</div><span class="sb-cap">two primaries, all caps</span></div></div>
      <div class="cf-card is-sm sb-do"><div class="cf-content cf-stack"><div class="cf-row"><input class="cf-input" placeholder="Version name" aria-label="Version name" style="flex:1">${button({ label: 'Save' })}</div><span class="sb-cap">input and button share 32px</span></div></div>
      <div class="cf-card is-sm sb-dont"><div class="cf-content cf-stack"><div class="cf-row"><input class="cf-input is-md" placeholder="Version name" aria-label="Version name" style="flex:1">${button({ size: 'xs', label: 'Save' })}</div><span class="sb-cap">mixed heights on one row</span></div></div>
    </div>`,
};
