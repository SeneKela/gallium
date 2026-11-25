# Gallium · instructions for coding agents

Gallium is the UI system for this repository. It uses IBM Carbon colour, type and icons with Figma's density. Build UI only from Gallium.

## Read first
- If your client supports MCP, use the `gallium` server (`node scripts/mcp-server.mjs`). It exposes all of the files below and `gallium_lint`.
- `components.json` lists every component with its purpose, modifiers and an example. Its `decisionTable` tells you which component fits each job.
- `rules/gallium.rules.json` holds the rules that `npm run lint` enforces.
- `tokens/` holds DTCG tokens. In CSS, use them as `var(--cf-*)`.
- `starter.html` is the app shell. Start every new tool from it.

## Setup
```html
<link rel="stylesheet" href="gallium.css">
<script src="cf-resize.js" defer></script>      <!-- only if you use .cf-resize -->
<body class="cf" data-cf-theme="white">           <!-- or g100 -->
```
Copy the inline icon sprite (`<!-- carbon-icons:start … end -->`) from `starter.html`.

## Rules
1. **Reuse first.** Use an existing `cf-` component. Never invent a `cf-` class. Never write a second version of something that already exists, such as a different card, header, key/value list or resize handle.
2. **Tokens only.** No hex, `rgb()` or px radius in app CSS. Use semantic tokens, never primitives (`--cf-gray-*`, `--cf-blue-*`).
3. **One height.** Controls on one row are 32px (`--cf-h-sm`) unless every control uses the same size modifier.
4. **Radius.** Use 4 for controls, 8 for containers and pill for tags and chips. Inline notifications and feedback cards are square. Toasts are square on the left with a 2px radius on the right only.
5. **Buttons.** The kinds are primary, `is-secondary`, `is-tertiary` and `is-ghost`, plus `is-danger`. Allow one primary per group. Use verbs in sentence case and put the label in `<span>`. Every `<button>` needs `type`.
6. **Split button.** `.cf-btn.is-split` hugs its content. Never set its width.
7. **Action vs navigation.** Use `<button>` for actions and `<a href>` for navigation.
8. **Icons.** Use only `@carbon/icons` through the sprite: `<svg><use href="#icon--name"/></svg>`. Icon-only buttons need `aria-label`. If an icon is missing from the sprite, run `npm run icons`. Do not draw your own icon.
9. **State.** Express state with ARIA or native attributes (`aria-pressed`, `aria-expanded`, `aria-busy`, `disabled`), never with classes.
10. **Focus.** Never restyle focus.
11. **Numbers.** Add `.cf-num` / `.is-num` for tabular figures. Right-align numbers in table columns and left-align them in property lists.

## Done when
```bash
npm run lint -- path/to/your.html   # must report 0 errors (or the MCP tool gallium_lint)
npm run smoke                       # if you added a page under examples/: no JS errors, names, icons, shapes
```
Report any remaining warnings to the user. Do not silence them.
