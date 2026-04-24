# Evidence Strategy for ISO Project Management & Data Lifecycle

## Telin IT GRC — Audit Artefact Architecture

**Standards in scope**: ISO 27001, 27701, 37001, 20000-1, 50001, 45001, 22301
**Target**: Multi-standard certification 2026

---

## 1. Pain Points This System Solves

### 1.1 Coarse-Grained Evidence Mapping (SOLVED)

**Before**: Evidence items referenced clause groups like `Annex A.8` — auditors couldn't see which specific controls were covered.
**After**: Each evidence item maps to specific Annex A controls (e.g. `A.5.15, A.5.16, A.8.2, A.8.3`) AND HLS clauses (e.g. `8.1`).

- 93 individual Annex A controls tracked
- SoA (Statement of Applicability) marked with `'SoA'` token — automatically covers all 93 controls
- Sub-clauses included (6.1.1-6.1.3, 7.5.1-7.5.3, 9.2.1-9.2.2, 9.3.1-9.3.3)

### 1.2 Gap Blindness (SOLVED)

**Before**: No way to see which controls had zero evidence.
**After**: Two-level gap analysis:
- **HLS Heatmap** — clauses (4.1-10.2) vs standards, showing GAP/coverage
- **Annex A Heatmap** — all 93 controls with collapsible categories, showing evidence count and best status per control

### 1.3 Collection Bottlenecks (SOLVED)

**Before**: Evidence sat with owners for weeks without visibility.
**After**: Collection Tracker shows per-owner stats:
- Overdue count, follow-up history
- Status progression: Draft -> Pending Review -> Pending Approval -> Approved
- Quick "Chase" action sends follow-up and increments counter

### 1.4 Cross-Standard Duplication (SOLVED)

**Before**: Same policy uploaded separately for each standard.
**After**: Each evidence item maps to multiple `standardIds` — one policy can satisfy ISO 27001 clause 5.2, ISO 37001 clause 5.2, ISO 45001 clause 5.2, etc. The crosswalk shows which evidence serves multiple standards.

### 1.5 ISO 37001:2025 Transition Uncertainty (SOLVED)

**Before**: No visibility into what changed from 2016 to 2025.
**After**: Delta view with 10 change items (4 new, 1 moved, 2 enhanced, 1 renamed, 1 modified) with impact ratings and required actions. Certification strategy documented.

---

## 2. Evidence Data Model

```
Evidence Item {
  id:           string     // E-001 through E-035 (seed), auto-increment after
  name:         string     // Human-readable document name
  type:         enum       // Policy | Procedure | Record | Report | Register | Plan | Training | Interview | Observation | Certificate | Contract | Other
  standardIds:  string[]   // Which standards this evidence serves
  clauseRefs:   string[]   // HLS clauses + Annex A controls (e.g. ['5.2', 'A.5.1', 'A.5.31'])
  status:       enum       // draft | not-started | requested | pending-review | pending-approval | approved | rejected | expired
  owner:        string     // Responsible party
  due:          date       // Deadline
  requestedDate: date      // When evidence was requested
  collectedDate: date      // When evidence was received
  followUps:    number     // How many chase reminders sent
  notes:        string     // Free-text audit notes
}
```

### 2.1 Status Lifecycle

```
                          ┌─ Chase (follow-up) ─┐
                          v                      |
  Draft/Not-Started -> Requested -> Pending Review -> Pending Approval -> Approved
                                                                       -> Rejected -> Draft (reopen)
```

Each transition is logged in the audit trail with timestamp, actor, and action.

### 2.2 Special ClauseRef Tokens

| Token | Meaning |
|-------|---------|
| `SoA` | Statement of Applicability — maps ALL 93 Annex A controls |
| `4.5` | ISO 37001:2025 clause (bribery risk assessment, moved from 8.x) |
| `8.x (ABMS)` | ABMS-specific operational clauses |
| `8.x (ITSMS)` | ITSMS-specific service management clauses |
| `6.x (EnMS)` | EnMS-specific energy planning clauses |
| `8.x (OHS)` | OHS-specific hazard elimination clauses |

---

## 3. Evidence-to-Control Mapping Strategy

### 3.1 Mapping Principles

1. **One-to-Many**: A single evidence item can cover multiple controls (e.g. E-033 Access Control Policy covers A.5.15-A.5.18, A.8.2, A.8.3, A.8.5)
2. **Many-to-One**: A single control can be covered by multiple evidence items (e.g. A.5.24 is covered by E-031 Emergency Response AND E-032 Incident Management)
3. **SoA Override**: E-015 Statement of Applicability implicitly covers all 93 controls — but SoA alone is insufficient; auditors expect operational evidence per control
4. **HLS + Annex**: Evidence should map to both HLS clause (for cross-standard use) AND specific Annex A control (for 27001 audit)

### 3.2 Key Evidence Mappings (35 Seed Items)

| ID | Evidence | HLS | Key Annex A Controls |
|----|----------|-----|---------------------|
| E-001 | Info Security Policy | 5.2 | A.5.1, A.5.31, A.5.36, A.5.37 |
| E-002 | Privacy / PII Policy | 5.2, 4.2 | A.5.34 |
| E-011 | Risk Assessment Report | 6.1, 8.2, 8.3 | A.5.29, A.5.30, A.8.8 |
| E-015 | Statement of Applicability | 6.1.3, 8.3 | SoA (all 93) |
| E-022 | Competence Matrix | 7.2, 7.3 | A.6.1, A.6.2, A.6.3 |
| E-031 | Emergency Response Plan | 8.1, 8.2 | A.5.24, A.5.26, A.5.29, A.7.4 |
| E-032 | Incident Management Proc | 8.1 | A.5.24-A.5.28, A.6.8, A.8.15, A.8.16 |
| E-033 | Access Control Policy | 8.1 | A.5.15-A.5.18, A.8.2, A.8.3, A.8.5 |
| E-035 | Legal Register | 4.2, 6.1 | A.5.31, A.5.32, A.5.33 |

### 3.3 Gap Detection

Controls with zero evidence are flagged as "GAP" in:
- The **Annex A Heatmap** (red cells in the Evidence Register)
- The **Evidence Coverage Tab** (in ISO Crosswalk)

Gaps require action: either map existing evidence or create new evidence items.

---

## 4. Data Lifecycle

### 4.1 Storage

All data persisted in browser `localStorage` via `GRCStore` (IIFE pattern):
- `grc_evidence` — evidence items array
- `grc_audit_logs` — immutable audit trail
- `grc_users` — user/persona data
- `grc_ncrs`, `grc_risks`, etc. — other registers

### 4.2 Seed Data Flow

```
raw_iso_data.js     →  ISO clause/control reference data (read-only)
crosswalk-data.js   →  Cross-standard mapping + delta data (read-only)
store.js            →  GRCStore with 35 seed evidence items (mutable via UI)
```

On first load, `GRCStore.init()` seeds localStorage if empty. Users can modify via Evidence Register UI. `GRCStore.reset()` restores seed data.

### 4.3 Integrity

`GRCStore.validateIntegrity()` checks:
- All evidence IDs unique
- All required fields present
- Status values valid
- `standardIds` reference valid standard keys
- No orphaned audit log entries

---

## 5. Audit Readiness Checklist

### 5.1 Per Evidence Item

- [ ] Name clearly describes the document/artefact
- [ ] Type correctly categorized (Policy vs Procedure vs Record)
- [ ] All applicable standards assigned
- [ ] Specific HLS clauses mapped (not just top-level)
- [ ] Specific Annex A controls mapped (if applicable to 27001)
- [ ] Status reflects current reality
- [ ] Owner assigned and accountable
- [ ] Due date set (before audit date)
- [ ] Document actually exists and is current

### 5.2 Per Annex A Category

- [ ] A.5 Organizational (37 controls): policies, roles, screening, asset management, access, supplier, incident, legal, review
- [ ] A.6 People (8 controls): screening, terms, awareness, training, disciplinary, termination, remote, reporting
- [ ] A.7 Physical (14 controls): perimeter, entry, securing, monitoring, environmental, equipment, disposal, clear desk
- [ ] A.8 Technological (34 controls): endpoints, access, auth, source code, malware, backup, logging, monitoring, crypto, SDLC, supplier dev, testing

### 5.3 Cross-Standard Coverage

For each HLS clause (4-10), verify at least one evidence item exists per standard in scope. The HLS Gap Heatmap shows this at a glance.

---

## 6. File Reference

| File | Purpose |
|------|---------|
| `raw_iso_data.js` | Complete ISO clause data for all 7 standards + 93 Annex A controls |
| `crosswalk-data.js` | Cross-standard clause mapping + ANNEX_CONTROL_CROSSWALK (93 controls) + ISO37001_DELTA |
| `store.js` | GRCStore with validation, event bus, audit logging; 35 seed evidence items with granular clauseRefs |
| `Evidence Register.html` | Full evidence CRUD, collection tracker, HLS gap heatmap, Annex A heatmap, matrix view |
| `ISO Crosswalk.html` | 6-tab crosswalk: HLS, Annex A (93), Evidence Coverage, 37001 Delta, Raw Source, Dependency Graph |
| `rules/audit_artefacts.md` | This file — evidence strategy documentation |
