#!/usr/bin/env bash
# Gallium · publish-gh-pages.sh — builds dist/ and pushes it to the gh-pages branch.
# Use this when GitHub Actions is not available (e.g. some GitHub Enterprise orgs);
# then set Settings › Pages › Source = "Deploy from a branch", branch gh-pages, / (root).
# Usage: npm run publish [-- <remote>]   (default remote: origin)
set -euo pipefail
REMOTE="${1:-origin}"
cd "$(dirname "$0")/.."
npm run -s check
URL="$(git remote get-url "$REMOTE")"
[ -d "$URL" ] && URL="$(cd "$URL" && pwd)"   # local path remotes must be absolute
npm run -s build:all
TMP="$(mktemp -d)"
cp -R dist/. "$TMP"/
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-gallium-publish}" -c user.email="${GIT_AUTHOR_EMAIL:-gallium@localhost}" commit -qm "Publish Gallium $(date -u +%Y-%m-%dT%H:%MZ)"
git push -qf "$URL" gh-pages
echo "✓ pushed dist/ to $REMOTE gh-pages"
rm -rf "$TMP"
