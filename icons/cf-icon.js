/* Gallium · cfIcon()  — render a Carbon icon from the sprite in JS templates.
   cfIcon('add')                          -> decorative 16px icon
   cfIcon('trash-can', {label:'Delete'})  -> meaningful icon with an accessible name
   cfIcon('warning--filled', {size:20, cls:'is-lg'})
   Set window.CF_ICON_SPRITE = 'icons/carbon-icons.svg' to use the external sprite instead of the inline one. */
(function (g) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  g.cfIcon = function (name, o = {}) {
    const size = o.size || 16, src = (g.CF_ICON_SPRITE || '') + '#icon--' + name;
    const a11y = o.label ? `role="img" aria-label="${esc(o.label)}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="cf-icon ${o.cls || ''}" width="${size}" height="${size}" ${a11y}><use href="${esc(src)}"/></svg>`;
  };
})(window);
