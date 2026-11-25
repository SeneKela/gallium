/* Gallium · cf-resize.js — the only resize controller.
   Markup
     <div class="cf-card" data-cf-resizable="both" data-min-w="240" data-min-h="120" data-snap="8">
       …
       <span class="cf-resize is-e" aria-hidden="true"></span>
       <span class="cf-resize is-s" aria-hidden="true"></span>
       <button type="button" class="cf-resize is-se" aria-label="Resize"></button>
     </div>
   Text area (vertical only, sizes the textarea, keeps auto-grow):
     <div class="cf-resizable" data-cf-resizable="y" data-min-h="80">
       <textarea class="cf-textarea" data-cf-resize-target></textarea>
       <button type="button" class="cf-resize is-se" aria-label="Resize text area"></button>
     </div>
   Pointer: drag. Keyboard on the corner: Arrow = snap step, Shift+Arrow = 1px.
   Events on the host: "cf-resize" (live) and "cf-resizeend", detail {width, height}.
   Custom layouts (e.g. a column grid) can listen and call event.preventDefault()
   to apply their own sizing from detail. */
(function (g) {
  const CURSOR = { se: 'nwse-resize', e: 'ew-resize', s: 'ns-resize' };
  const num = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };

  function setup(handle) {
    const host = handle.closest('[data-cf-resizable]'); if (!host) return null;
    const hostAxis = host.dataset.cfResizable || 'both';
    const dir = handle.classList.contains('is-e') ? 'e' : handle.classList.contains('is-s') ? 's' : 'se';
    const wantX = dir !== 's' && hostAxis !== 'y', wantY = dir !== 'e' && hostAxis !== 'x';
    const target = host.querySelector(':scope > [data-cf-resize-target]') || host;
    const isText = target.tagName === 'TEXTAREA';
    return {
      host, target, isText, wantX, wantY,
      cursor: wantX && wantY ? CURSOR.se : wantX ? CURSOR.e : CURSOR.s,
      minW: num(host.dataset.minW, 120), maxW: num(host.dataset.maxW, Infinity),
      minH: num(host.dataset.minH, 40), maxH: num(host.dataset.maxH, Infinity),
      snap: Math.max(1, num(host.dataset.snap, 8))
    };
  }
  function apply(c, w, h, live, src) {
    const r = c.target.getBoundingClientRect();
    w = c.wantX ? Math.round(Math.min(c.maxW, Math.max(c.minW, w))) : r.width;
    h = c.wantY ? Math.round(Math.min(c.maxH, Math.max(c.minH, h))) : r.height;
    const ev = new CustomEvent(live ? 'cf-resize' : 'cf-resizeend', { bubbles: true, cancelable: true, detail: { width: w, height: h, handle: src } });
    if (c.host.dispatchEvent(ev)) {
      if (c.wantX) c.target.style.width = w + 'px';
      if (c.wantY) c.target.style[c.isText ? 'minHeight' : 'height'] = h + 'px';
    }
    readout(c, live ? `${c.wantX ? w : Math.round(r.width)} × ${h}` : null);
  }
  function readout(c, text) {
    let el = c.host.querySelector(':scope > .cf-resize-readout');
    if (!text) { el && el.remove(); return; }
    if (!el) { el = document.createElement('span'); el.className = 'cf-tooltip cf-resize-readout'; el.setAttribute('aria-hidden', 'true'); c.host.appendChild(el); }
    el.textContent = text;
  }

  document.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('.cf-resize'); if (!handle || e.button !== 0) return;
    const c = setup(handle); if (!c) return;
    e.preventDefault();
    const r = c.target.getBoundingClientRect(), x0 = e.clientX, y0 = e.clientY;
    const snap = (v) => (e.shiftKey ? v : Math.round(v / c.snap) * c.snap);
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('is-active'); c.host.classList.add('is-resizing');
    document.documentElement.classList.add('cf-is-resizing');
    document.documentElement.style.setProperty('--cf-resize-cursor', c.cursor);
    const move = (m) => apply(c, snap(r.width + m.clientX - x0), snap(r.height + m.clientY - y0), true, handle);
    const up = () => {
      handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up);
      handle.classList.remove('is-active'); c.host.classList.remove('is-resizing');
      document.documentElement.classList.remove('cf-is-resizing');
      const f = c.target.getBoundingClientRect(); apply(c, f.width, f.height, false, handle);
    };
    handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
  });

  document.addEventListener('keydown', (e) => {
    const handle = e.target.closest && e.target.closest('.cf-resize.is-se'); if (!handle) return;
    const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key]; if (!k) return;
    const c = setup(handle); if (!c || (!c.wantX && k[0]) || (!c.wantY && k[1])) return;
    e.preventDefault();
    const step = e.shiftKey ? 1 : c.snap, r = c.target.getBoundingClientRect();
    apply(c, r.width + k[0] * step, r.height + k[1] * step, true, handle);
    clearTimeout(handle._cfT); handle._cfT = setTimeout(() => { const f = c.target.getBoundingClientRect(); apply(c, f.width, f.height, false, handle); }, 600);
  });

  g.cfResize = { version: '1.0' };
})(window);
