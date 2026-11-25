# Gallium · plan status (gallium-kit 3.1.0)

| Phase | Status | Notes |
|---|---|---|
| 0. Consolidate | Done | One `.cf-props`, one `.cf-resize` and one `cfIcon`. Lint fails if a page's inline copy of a script drifts from the shipped file. |
| 1. Tokens | Done | tokens/*.json are the source; `npm run tokens` generates the token block in gallium.css. This uses a zero-dependency builder instead of Style Dictionary, which was removed from package.json. The result is verified identical: same custom properties, pixel-identical screenshots. |
| 2. Components and docs | Done | 33 components in components.json generate components/*.md. |
| 3. Agent layer and hosting | Done | AGENTS.md, rules, lint, llms.txt, llms-full.txt, an MCP server (8 tools), an Actions workflow and a gh-pages publish script. Not yet pushed: this needs your repo and credentials. |
| 4. Adoption | In progress | examples/settings.html and examples/dashboard.html were built from llms-full.txt alone: 0 lint errors, and the smoke test passes in both themes. Success-story-fde-builder-carbon.html still needs `npm run lint` and `npm run smoke`. |
| 5. React and MCP | MCP done, React skipped | A native MCP server gives agents the component lookup and self-check without moving Gallium to React or Storybook. |

## Validation
| Check | Result |
|---|---|
| `npm run check` (tokens, lint, inline copies) | Pass. 5 files, 0 errors, 0 warnings. |
| `npm run smoke` (Chromium, white + g100) | Pass. 4 pages × 2 themes: no JS errors or missing files, every control is named, every icon resolves, notifications are square, the toast radius is 0 2 2 0, the split button hugs its content, and controls are 32px. |
| MCP server | initialize, tools/list, tools/call (component, lint, icons) and an unknown-method error were all tested over stdio. |
| Publish script | Tested against a local bare repository; dist/ landed on gh-pages. |
| Not covered | axe-core contrast audit, tests in real MCP clients, Google Fonts (blocked in the test sandbox, so a fallback font was used). |
