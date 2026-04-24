# Telin GRC Suite - Code Architecture

This document describes the technical architecture and data governance structure for Telin's MVP Integrated Management System tooling. It is built as a zero-dependency, local-first HTML/JS framework designed to streamline readiness mapping for 7 ISO programs leading up to Q3 2026.

## 1. Zero-Dependency Philosophy
The frontend stack relies **only** on unbundled libraries delivered via CDN `<script>` tags (`React`, `Babel-Standalone`, `Chart.js`). No build steps (Webpack/Vite) or package managers (`npm`) are required to run the tool. An auditor or compliance manager simply opens the `.html` file locally in any modern browser.

All data persistence operates strictly through `window.localStorage`.

## 2. Global State Engine (`store.js`)
At the heart of the MVP sits the `GRCStore` singleton, managing the schema definition, the referential integrity mapping across models, the access constraints, and providing a clean API wrapping `localStorage`.

### 2.1 Referential Integrity (Event Bus)
To enforce a Single Source of Truth (SSoT), we implemented a basic pub-sub bus system `GRCStore.on('change', callback)`.

*   Whenever a file calls `upsertEvidence` or `deleteRisk`, the backend updates `localStorage` and triggers a global `change` event.
*   React hooks `useEffect` subscribe to this `change` pipeline, triggering an immediate UI state re-hydration, ensuring that data is never completely stuck in memory.

### 2.2 Data Tables
The mock database initializes a 5-tier schema mapping to DAMA-DMBOK data governance principles:
1.  **Reference Catalogs:** `standards`, `jurisdictions`, `matrix`
2.  **User Ecosystem:** `users` (Roles: `Super Admin`, `C-Level`, `VP`, `Admin`, `User`)
3.  **Audit Logs:** `auditLogs` mapping immutable transactions across the entire tool UI
4.  **Transaction Collections:** `evidence`, `risks`, `ncrs`, `legalReqs`

## 3. Evidence Lifecycle State Machine
The `Evidence Register` introduces a rigorous state machine for data assurance.

### State Transitions
1.  **Draft**: Raw files gathered by the operational teams or initial consultants.
2.  **Pending Review**: Documents submitted via the system to Admin verification paths.
3.  **Pending Approval**: Final verification step blocked by technical VP sign-off queues.
4.  **Approved**: Green "Sign & Approve" status signaling audit-readiness.
5.  **Rejected**: Kicks evidence tracking back into iteration states.

### Auditing Implementation
While the frontend allows test-driven workflow interactions (decoupled from strict persona walls to enhance process-flow UX testing speed in the MVP phase), the backend captures all modifications identically via the **Audit Log Table**.

Whenever an item transition occurs (`onSave` execution parameter in the Evidence Modal), an internal metadata capture passes standard entity context (`user/role`, `module id`, `transition`) straight to `auditLogs`. It guarantees a resilient chain-of-custody.

## 4. UI Design Aesthetic
We adhere heavily towards "Vibe-coding" elements blended strictly with minimalist "bento-box" executive templates designed closely relative to a Notion workspace, heavily styled through generic inline CSS utilizing global CSS variables on `:root`.

*   Typography: `Plus Jakarta Sans`, `Inter`, `DM Mono`.
*   Standard Dashboards utilizing `.css` grids, ensuring responsive matrix charts and KPI metrics are digestible at a quick glance on the C-suite Dashboard.
