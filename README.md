# GRC Suite — ISO Certification Programme 2026
Simulation - no real data included in this prototype

A zero-dependency, local-first HTML/JS toolkit for managing readiness across **7 ISO programs** in the run-up to Q3 2026. Open any `.html` file in a modern browser — no build, no install, no backend.

[![CodeQL](https://github.com/asfalanoij/iso/actions/workflows/codeql.yml/badge.svg)](https://github.com/asfalanoij/iso/actions/workflows/codeql.yml)
[![Gitleaks](https://github.com/asfalanoij/iso/actions/workflows/gitleaks.yml/badge.svg)](https://github.com/asfalanoij/iso/actions/workflows/gitleaks.yml)
[![Trivy](https://github.com/asfalanoij/iso/actions/workflows/trivy.yml/badge.svg)](https://github.com/asfalanoij/iso/actions/workflows/trivy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Modules
<img width="941" height="824" alt="Screenshot 2026-04-25 at 14 54 27" src="https://github.com/user-attachments/assets/c8543b87-af3d-4295-a2fc-5862ed9716b5" />
<img width="1710" height="879" alt="Screenshot 2026-04-25 at 14 54 08" src="https://github.com/user-attachments/assets/5697644c-7125-42ae-b22e-14fd2605dbab" />

| Page | Purpose |
|------|---------|
| `Dashboard.html` | C-suite KPI overview (Chart.js) |
| `ISO Crosswalk.html` | Multi-standard control mapping (Highcharts dependency-wheel + sankey) |
| `Audit Checklist.html` | Walk-through audit prompts |
| `Evidence Register.html` | 5-state evidence lifecycle (Draft → Pending Review → Pending Approval → Approved / Rejected) |
| `NCR Tracker.html` | Non-conformity register |
| `Risk Register.html` | Risk catalogue + treatment |
| `Legal Register.html` | Statutory & regulatory obligations |
| `Data Governance.html` | DAMA-DMBOK aligned governance view |

State + persistence: `store.js` (a `GRCStore` singleton over `window.localStorage` with a pub-sub change bus). Schema in `ERD_schema.json`. Reference data in `iso_raw_data.json` / `crosswalk-data.js` / `raw_iso_data.js`.

See **[Architecture.md](Architecture.md)** for the full design.

## Quick start

```bash
git clone https://github.com/asfalanoij/iso.git
cd iso
open Dashboard.html       # or double-click any *.html
```

No `npm install`. No bundler. CDN-loaded React 18, Babel-Standalone 7, Chart.js 4, Highcharts 11 — all pinned and **hashed with Subresource Integrity**.

## Tech stack

- **UI:** React 18 (UMD, in-browser Babel for JSX)
- **Charts:** Chart.js 4, Highcharts 11 (sankey, dependency-wheel)
- **Persistence:** `localStorage` only — fully client-side
- **Fonts:** Plus Jakarta Sans, Inter, DM Mono
- **Styling:** inline CSS with `:root` custom-property design tokens

## Data model

5-tier schema (DAMA-DMBOK aligned):
1. **Reference catalogs** — `standards`, `jurisdictions`, `matrix`
2. **User ecosystem** — `users` (roles: Super Admin / C-Level / VP / Admin / User)
3. **Audit logs** — immutable `auditLogs` of every UI transition
4. **Transactions** — `evidence`, `risks`, `ncrs`, `legalReqs`
5. **Crosswalk** — control mappings across the 7 ISO standards

Every mutation goes through `GRCStore.upsert*` / `delete*`, emits a `change` event, and writes to `auditLogs` for chain-of-custody.

## Security

DevSecOps baseline shipped (see [SECURITY.md](SECURITY.md)):

- **CodeQL** static analysis on every push + weekly
- **Gitleaks** secret-history scan
- **Trivy** filesystem CVE scan → SARIF → GitHub Security tab
- **Dependabot** for GitHub Actions updates + auto security fixes
- **Secret scanning** + push protection (GitHub native)
- **Subresource Integrity** (sha384) on all CDN scripts
- **Content Security Policy** + `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` meta tags
- **Branch protection** on `main`: 1-review PRs, no force-push, no delete, conversation resolution required

Report vulnerabilities privately via [GitHub Security Advisories](https://github.com/asfalanoij/iso/security/advisories/new) — see [SECURITY.md](SECURITY.md).

## Roadmap

- [ ] GitHub Pages live deploy
- [ ] Migrate from in-browser Babel to a build step (Vite) for production
- [ ] Pluggable persistence adapter (IndexedDB → optional cloud sync)
- [ ] Role-based UI gating (currently decoupled for UX testing speed)
- [ ] ISO 37001:2025 delta — see [`iso_37001_2025_delta_strategy.md`](iso_37001_2025_delta_strategy.md)

## Contributing

PRs require 1 approving review and clean status checks. Branch protection is enforced.

## License

[MIT](LICENSE) © asfalanoij
