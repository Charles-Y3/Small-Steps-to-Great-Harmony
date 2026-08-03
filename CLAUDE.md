# Small Steps to Great Harmony — repo notes

Suite portal for the six Great Harmony apps. Each app's card shows a
`version` from `src/data/apps.ts` that must match that app's own
`package.json` version.

## Portal version sync (incoming)

Sibling apps bump their `package.json` on ship and update the matching
entry here, then commit and push this repo. See
`.cursor/rules/portal-version-sync.mdc` for the id map
(`atlas` / `journey` / `words` / `stories` / `compass` / `cayce`).
