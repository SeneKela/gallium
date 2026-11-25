export default {
  title: 'Components/Overlays',
  parameters: {
    docs: {
      description: {
        component:
          'Menus, popovers and tooltips are the only surfaces with elev-2; the modal uses elev-3. Items follow the nested-radius rule. Specimens are rendered in place (`sb-static` disables the entrance animation).',
      },
    },
  },
};

export const Menu = {
  render: () => `
    <div class="cf-menu sb-static" role="group" aria-label="Business case menu (specimen)" style="width:240px">
      <div class="cf-menu-group" role="presentation">Business case</div>
      <button type="button" class="cf-menu-item"><svg><use href="#icon--add"/></svg>New business case</button>
      <button type="button" class="cf-menu-item"><svg><use href="#icon--grid"/></svg>Load sample data</button>
      <button type="button" class="cf-menu-item"><svg><use href="#icon--time"/></svg>Version history<kbd>⌘S</kbd></button>
      <button type="button" class="cf-menu-item" disabled><svg><use href="#icon--document"/></svg>Import PowerPoint</button>
      <div class="cf-menu-sep" aria-hidden="true"></div>
      <button type="button" class="cf-menu-item is-danger"><svg><use href="#icon--trash-can"/></svg>Delete case</button>
    </div>`,
};

export const MenuButton = {
  render: () => `
    <div style="min-height:160px"><div class="sb-menu-host">
      <button class="cf-btn is-split" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="sbMenu" id="sbMenuBtn"><span>Add driver</span><svg class="cf-chev"><use href="#icon--chevron--down"/></svg></button>
      <div class="cf-menu" id="sbMenu" role="menu" aria-labelledby="sbMenuBtn" hidden>
        <button type="button" class="cf-menu-item" role="menuitem"><svg><use href="#icon--add"/></svg>Value driver</button>
        <button type="button" class="cf-menu-item" role="menuitem"><svg><use href="#icon--currency"/></svg>Cost line</button>
      </div>
    </div></div>`,
};

export const Popover = {
  render: () => `
    <div class="cf-popover sb-static" role="group" aria-label="Version history popover (specimen)">
      <div class="cf-head is-bar"><h3 class="cf-head-t">Version history</h3><span class="cf-helper">2 saved · unsaved changes</span>
        <form class="cf-row is-nowrap" onsubmit="return false"><input class="cf-input" placeholder="Name this version" aria-label="Version name"><button class="cf-btn" type="submit"><span>Save</span></button></form></div>
      <div class="cf-scroll">
        <div class="cf-list-item"><span class="cf-dot is-value"></span><div style="min-width:0"><div class="cf-list-item-t">v2 · After CFO review</div><div class="cf-helper">today 10:42 · current</div></div><div class="cf-acts"><button type="button" class="cf-btn is-xs is-ghost"><span>Restore</span></button></div></div>
        <div class="cf-list-item"><span class="cf-dot"></span><div style="min-width:0"><div class="cf-list-item-t">v1 · First draft</div><div class="cf-helper">2026-06-10 09:12</div></div><div class="cf-acts"><button type="button" class="cf-btn is-xs is-ghost"><span>Restore</span></button></div></div>
      </div>
      <div class="cf-foot">⌘/Ctrl + S saves a version.</div>
    </div>`,
};

export const Tooltip = {
  render: () => `<span class="cf-tooltip">Client safe mode hides costs, payback and ROI.</span>`,
};

export const Modal = {
  parameters: { docs: { story: { height: '360px' }, description: { story: 'Region anatomy on an 8px container: `.cf-head.is-lg`, `.cf-content`, `.cf-foot.is-actions`.' } } },
  render: () => `
    <div class="sb-scrim">
      <div class="cf-modal" role="group" aria-labelledby="sbMt">
        <div class="cf-head is-lg"><div class="cf-head-text"><span class="cf-head-e">Business case</span><h3 class="cf-head-t" id="sbMt">Load sample data?</h3></div><button type="button" class="cf-btn is-ghost is-icon" aria-label="Close"><svg><use href="#icon--close"/></svg></button></div>
        <div class="cf-content">This replaces the current business case. Save a version first if you want to keep it.</div>
        <div class="cf-foot is-actions"><button type="button" class="cf-btn is-secondary"><span>Cancel</span></button><button type="button" class="cf-btn"><span>Load sample</span></button></div>
      </div>
    </div>`,
};
