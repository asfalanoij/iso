# Lessons Learned — Telin ISO 2026 GRC Prototype

**Project:** ISO Certification Management Tool (7 standards: 27001, 27701, 20000-1, 22301, 45001, 37001, 50001)
**Team:** IA Division, Telin
**Duration:** April – May 2026
**Status:** Prototype complete · Deployed at [asfalanoij.github.io/iso](https://asfalanoij.github.io/iso/Dashboard.html)

---

## 1. Zero-build-step is the right call for internal prototypes

**What we did:** No Node.js, no npm, no bundler. React 18 and Babel loaded from CDN. The entire app is plain `.html` files that open in a browser or deploy to GitHub Pages with a single `git push`.

**Why it worked:** The prototype was shareable instantly — no `npm install`, no environment setup, no Docker. Stakeholders could open it in a browser tab the day it was built. That frictionlessness enabled rapid iteration and feedback loops that would have taken days in a traditional pipeline.

**The real cost:** Babel's in-browser transpilation adds ~3–5 s cold-start on first page load. Acceptable for a stakeholder demo; unacceptable for daily-use production software.

**Takeaway:** For a ≤3-month internal prototype aimed at getting alignment, zero-build wins. Anything that moves to production needs Vite or Next.js with a proper build pipeline.

---

## 2. Dual sidebar architecture creates drift — decide early

**What happened:** The app ended up with two separate sidebar implementations:
- A **React component** inside `Dashboard.html` for SPA views (Dashboard, Timeline, Standards, Documents, Analytics, Project Charter).
- A **vanilla JS component** (`components/app-sidebar.js`) injected into 7 standalone module pages.

Keeping them in sync required touching two files and holding two mental models every time a nav item changed. A "TOOLS" section label appeared in one place but not the other, creating a visible inconsistency that had to be resolved in Sprint 5.

**Root cause:** The split happened organically — the SPA came first, then standalone pages were added without a firm decision on a shared component strategy.

**Takeaway:** Commit to one rendering model before shipping the second module. Either make every page a view inside the React SPA, or make every page a static HTML file that shares a single sidebar script. Mixing the two models has compounding maintenance cost.

---

## 3. Print CSS is a separate discipline — test it from day one

**Issues encountered:**
- `position: absolute` footers worked perfectly on screen but floated up mid-page when printed — browsers don't guarantee absolute positioning inside paged content.
- `page-break-inside: avoid` was missing from table rows, causing rows to split across printed pages.
- `@page { margin: 0 }` is necessary to prevent the browser adding its own margins on top of CSS padding, which caused double-margin clipping.

**Fix that worked:** Make `.doc-page` a flex column with `height: 297mm` in `@media print`. The footer gets `margin-top: auto`, which flexbox pushes to the bottom of each page regardless of content length. This is reliable across Chrome, Safari, and Firefox.

**Takeaway:** Print CSS requires a dedicated test pass with an actual PDF export — not a visual screen check. The flexbox `margin-top: auto` pattern is the most reliable cross-browser way to pin a footer to the bottom of a print page.

---

## 4. localStorage as a state layer is viable — with a clear ceiling

**What worked:** The pub/sub event bus in `store.js` propagated state changes across React components and vanilla JS pages without any API. Registers (NCR, Risk, Evidence) stayed in sync across page navigations.

**The hard limits:**
- ~5 MB cap per origin — workable for a 7-standard, 56-clause prototype; tight for real evidence attachments.
- No server sync — two users on different machines see completely different data. Fine for a solo demo, a blocker for team use.
- No audit log — localStorage writes are untracked, which is itself a compliance gap for a compliance tool.

**Takeaway:** Design the store interface to be storage-agnostic from day one (`GRCStore.get`, `GRCStore.set`). The migration path to Supabase/PostgreSQL then becomes a store-layer swap with zero component changes.

---

## 5. GRC domain complexity front-loads the data modeling effort

Mapping 7 ISO/IEC management system standards across 56 Harmonized Structure clauses is not primarily a UI problem — it is a data modeling problem. The decisions made in `data/crosswalk.js` and `data/iso.js` determined what every visualization, filter, and export could show.

The **HLS-first approach** (clauses §4–10 as the spine, standards as columns) was correct. Standard-first approaches produce 7 siloed views; HLS-first produces one unified crosswalk that reveals alignment gaps immediately.

**Takeaway:** In GRC tooling, invest 30–40% of Sprint 1 in data schema design. The shape of the data is the product. UI is secondary.

---

## 6. Navigation UX decisions fossilise early

**The problem:** Grouping module links under a "TOOLS" section label seemed harmless in Sprint 2. By Sprint 5 it was a two-file change requiring knowledge of two sidebar architectures, two styling models, and careful cross-page consistency testing.

**The broader pattern:** Every navigation decision — grouping, labels, hierarchy — gets baked into user muscle memory and the codebase simultaneously. Changing it later costs more than getting it right initially.

**Takeaway:** Spend one proper session on information architecture before coding the sidebar. A flat, unlabelled nav list is almost always better than labelled groups in a tool with fewer than 15 pages.

---

## 7. GitHub Pages is excellent — until branch protection conflicts with solo workflow

Branch protection rules on `main` (configured from a team template) caused every `git push` to produce `remote: Bypassed rule violations` warnings. The push succeeded, but the noise was distracting and would fail in a stricter configuration.

**Takeaway:** For a solo prototype repo, disable branch protection or configure it to allow direct pushes by the owner. For a team repo, set up a proper PR workflow from the start — the friction is intentional and correct.

---

## 8. AI-assisted development requires explicit guardrails to be safe

**What we used:** Claude Code (claude-sonnet-4-6) as the primary development assistant throughout all 5 sprints. A GateGuard hook required stating factual pre-conditions before every file edit — which files would be affected, what functions would change, what the user's instruction was verbatim.

**What it prevented:** Accidental cascade edits, blind search-and-replace across multiple files, and edits made without understanding downstream component impact.

**What it enabled:** Parallel research (codebase exploration + GitHub PR status simultaneously), precise surgical edits, and structured commit messages that narrate each change accurately.

**Takeaway:** AI-assisted development is most effective when the human owns the architecture and the AI executes specific, well-scoped changes. Stating facts before editing is not bureaucratic overhead — it is the difference between a thoughtful change and a silent regression.

---

## 9. The prototype-to-production gap must be stated explicitly at kickoff

| Item | Current (Prototype) | Required (Production) |
|---|---|---|
| Bundling | In-browser Babel (CDN) | Vite / Next.js |
| Auth | None | SSO / LDAP |
| Data store | localStorage | PostgreSQL via Supabase |
| Security scan | None | OWASP ZAP + SAST |
| E2E tests | None | Playwright suite |
| Multi-user | No | Role-based access control |
| Audit log | No | Immutable event log |
| Offline support | Yes (native) | PWA (optional) |

**Takeaway:** Write this table at kickoff, not at the end. It clarifies scope, sets stakeholder expectations, and gives the engineering team a concrete definition of "done" for each phase.

---

## 10. Ship early, deploy publicly, iterate in public

The prototype was on GitHub Pages from Sprint 1. Every improvement was immediately visible at the public URL. Stakeholders could open the link in a tab and interact with the actual tool — not a Figma mockup.

This changed the quality of feedback dramatically. *"The sidebar has two sections"* is an observation that gets fixed in 30 minutes. *"The navigation feels cluttered"* in a Figma review generates three alignment meetings.

**Takeaway:** Static-site hosting is free and instant. There is no reason to keep a prototype local. Deploy on day one, share the URL, and let real usage surface what actually matters.

---

*Authored May 2026 · IA Division, Telin*
