import '../gallium.css';
import '../stories/stories.css';
import '../cf-resize.js';
import '../icons/cf-icon.js';
import starter from '../starter.html?raw';

/* Inline Carbon sprite, taken from starter.html (single source of truth for icons). */
const sprite = (starter.match(/<!-- carbon-icons:start -->([\s\S]*?)<!-- carbon-icons:end -->/) || [])[1] || '';
if (sprite && !document.getElementById('sb-icon-sprite')) {
  const host = document.createElement('div');
  host.id = 'sb-icon-sprite';
  host.innerHTML = sprite;
  document.body.prepend(host);
}

/* Small behaviours the specimens rely on (the components themselves ship no JS besides cf-resize). */
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-toggle]');
  if (toggle) toggle.setAttribute('aria-pressed', String(toggle.getAttribute('aria-pressed') !== 'true'));

  const seg = e.target.closest('.cf-seg > button');
  if (seg) {
    const attr = ['aria-checked', 'aria-pressed', 'aria-selected'].find((a) => seg.hasAttribute(a));
    if (attr) seg.parentElement.querySelectorAll(':scope > button').forEach((b) => b.setAttribute(attr, String(b === seg)));
  }

  const step = e.target.closest('.cf-stepper button[data-d]');
  if (step) {
    const input = step.parentElement.querySelector('input');
    const v = Math.min(Number(input.max || Infinity), Math.max(Number(input.min || -Infinity), Number(input.value || 0) + Number(step.dataset.d)));
    input.value = v;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const menuBtn = e.target.closest('[aria-haspopup="menu"]');
  document.querySelectorAll('[aria-haspopup="menu"][aria-expanded="true"]').forEach((b) => {
    if (b === menuBtn) return;
    b.setAttribute('aria-expanded', 'false');
    const m = document.getElementById(b.getAttribute('aria-controls'));
    if (m) m.hidden = true;
  });
  if (menuBtn) {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    const m = document.getElementById(menuBtn.getAttribute('aria-controls'));
    if (m) m.hidden = !open;
  }

  const busy = e.target.closest('[data-busy-demo]');
  if (busy) {
    busy.setAttribute('aria-busy', 'true');
    setTimeout(() => busy.removeAttribute('aria-busy'), 1600);
  }
});

document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.matches && el.matches('.cf-slider')) el.style.setProperty('--_p', `${((el.value - el.min) / (el.max - el.min)) * 100}%`);
});

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  tags: ['autodocs'],
  initialGlobals: { theme: 'white' },
  globalTypes: {
    theme: {
      description: 'Gallium theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'white', title: 'White' },
          { value: 'g100', title: 'G100' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'white';
      const wrap = document.createElement('div');
      wrap.className = 'cf sb-stage';
      wrap.dataset.cfTheme = theme;
      if (context.viewMode === 'story') {
        document.body.classList.add('cf');
        document.body.dataset.cfTheme = theme;
      }
      const out = story();
      if (typeof out === 'string') wrap.innerHTML = out;
      else wrap.appendChild(out);
      return wrap;
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
