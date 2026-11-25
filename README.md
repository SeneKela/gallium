## Gallium kit

IBM Carbon colour, type and icons with Figma density. It is one CSS file (prefix `cf-`) plus a Carbon icon sprite, with no framework. It is built for people and coding agents.

### Files
| File | Purpose |
|---|---|
| gallium.css | The design system. Its token block is **generated** from tokens/. Edit the component CSS by hand. |
| tokens/*.tokens.json | **Source of truth** for tokens (DTCG 2025.10): primitive, scale, white, g100 |
| design-system.html | Live reference (self-contained) |
| starter.html | App shell to start a new tool |
| examples/*.html | Pages an agent built from llms-full.txt alone (the agent test) |
| cf-resize.js | The single resize controller for .cf-resize handles |
| icons/cf-icon.js | cfIcon(name, {size, label, cls}) for JS-rendered UI |
| icons/build-icons.mjs, icons/icons.config.json, icons/carbon-icons.svg | Sprite builder from @carbon/icons (keep your existing files) |
| AGENTS.md | Rules for coding agents and how to verify their output |
| components.json | Component catalogue and decision table; the docs are generated from it |
| rules/gallium.rules.json | Rules that can be checked by machine |
| scripts/ | build-tokens, lint-rules, build-site, smoke.py, mcp-server, publish-gh-pages.sh |

### Commands
```bash
npm run tokens     # tokens/*.json → gallium.css token block
npm run check      # tokens in sync + lint + inline script copies (what CI runs first)
npm run lint -- path/to/page.html
npm run smoke      # Chromium, white + g100: JS errors, accessible names, icons, shape rules, screenshots
npm run build      # dist/ = site + llms.txt, llms-full.txt, components/*.md, tokens.json
npm run publish    # build and push dist/ to the gh-pages branch (when Actions isn't available)
npm run mcp        # MCP server on stdio
```
`npm run smoke` needs `pip install playwright && python -m playwright install chromium`. Everything else needs Node 18 or later and has no dependencies.

### Changing a token
Edit `tokens/…json`, run `npm run tokens`, then commit both files. CI fails if gallium.css is out of date.

### Publishing
- **GitHub Actions available:** push to `main`. Then go to Settings › Pages › Source and select **GitHub Actions**. The workflow checks every PR and deploys `dist/` from `main`.
- **No Actions (some GitHub Enterprise orgs):** run `npm run publish`. Then go to Settings › Pages › Source, select **Deploy from a branch**, and choose `gh-pages` with the `/ (root)` folder.

The site serves `/llms.txt`, `/llms-full.txt`, `/components/*.md`, `/components.json`, `/tokens.json`, `/AGENTS.md` and `/rules/`.

### Using it with agents
- **Any agent:** prompt it with *"Build this with the Gallium design system at <site>/llms.txt. Follow AGENTS.md. Done when `npm run lint` reports 0 errors."*
- **MCP-capable agents** (VS Code Copilot, Claude, Bob, Cursor…): clone the repo. `.vscode/mcp.json` already registers the server. For other clients, register it as:
  ```json
  { "mcpServers": { "gallium": { "command": "node", "args": ["/path/to/gallium/scripts/mcp-server.mjs"] } } }
  ```
  Its tools are: `gallium_guide`, `gallium_list_components`, `gallium_get_component`, `gallium_get_rules`, `gallium_get_tokens`, `gallium_list_icons`, `gallium_get_starter` and `gallium_lint`.

### Adopting Gallium in another tool
1. Link `gallium.css` and add `class="cf" data-cf-theme="white"` to `<body>`. Copy the sprite from starter.html.
2. Delete the tool's own styles and map each element with the decision table in components.json.
3. Run `npm run lint -- ../tool/page.html` until it reports 0 errors. Then add the page to `scripts/smoke.py` (any `examples/*.html` is picked up automatically).

Carbon icons are © IBM, Apache-2.0.
