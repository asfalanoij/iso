/**
 * Telin GRC Suite — Single Source of Truth (SSOT)
 * ISO Programme 2026 · Mock-up
 *
 * This is the ONE entry point for all reference data used across the
 * Telin GRC HTML pages. Loading order on every consumer:
 *
 *   <script src="data/crosswalk.js"></script>   <!-- optional: STD_META, HLS_CLAUSES, ANNEX_CONTROL_CROSSWALK, ISO37001_DELTA -->
 *   <script src="data/raw.js"></script>         <!-- optional: RAW_ISO_DATA -->
 *   <script src="data/iso.js"></script>         <!-- ALWAYS: builds window.ISO_DATA namespace -->
 *
 * After loading, every page can read from `window.ISO_DATA` synchronously.
 * Async fetch of hls_mapping.json is no longer needed — it is inlined here.
 */

(function () {
  'use strict';

  // ── Inlined HS mapping (was hls_mapping.json) ───────────────────────────
  var HLS_MAPPING = {
    "metadata": {
      "title": "Harmonized Structure (HS) clause mapping for the seven ISO management system standards in scope of the Telin GRC Suite mock-up",
      "version": "1.1.0",
      "generated": "2026-04-26",
      "harmonized_structure_canonical_reference": "ISO/IEC Directives Part 1, Consolidated ISO Supplement, Annex SL, Appendix 2 (renamed Harmonized Structure in May 2021; updated 2022; climate-change amendment Feb 2024)",
      "disclaimer": "This file is a structural skeleton reconstructed from secondary authoritative summaries (BSI, DNV, DQS, NQA, SGS, ANSI, Advisera, PECB, Amtivo). It is NOT a substitute for the normative text of the ISO standards, which are copyrighted and must be obtained from ISO Store / ANSI / BSI Knowledge. A formal certification body (e.g. Intertek, BSI, DNV, TUEV, SGS, BV) will validate every clause-to-clause mapping against the purchased normative text during their gap analysis and stage-1/stage-2 audits. Use this file for ideation and brainstorming only.",
      "scope_disclaimer": "Mock-up — Brainstorming simulation. No data from Telin is used. ISO Crosswalk content may vary across iterations."
    },
    "harmonized_structure": {
      "version_in_use_for_skeleton": "2022 HS (with Feb 2024 climate amendment)",
      "clauses": [
        { "id": "1", "title": "Scope" },
        { "id": "2", "title": "Normative references" },
        { "id": "3", "title": "Terms and definitions" },
        {
          "id": "4", "title": "Context of the organization",
          "subclauses": [
            { "id": "4.1", "title": "Understanding the organization and its context", "notes": "Feb 2024 amendment: organization shall determine whether climate change is a relevant issue." },
            { "id": "4.2", "title": "Understanding the needs and expectations of interested parties", "notes": "2022 HS expanded 4.2(c): identify which interested-party requirements will be addressed via the MS. 2024 amendment note: interested parties may have climate-related requirements." },
            { "id": "4.3", "title": "Determining the scope of the XXX management system" },
            { "id": "4.4", "title": "XXX management system" }
          ]
        },
        {
          "id": "5", "title": "Leadership",
          "subclauses": [
            { "id": "5.1", "title": "Leadership and commitment" },
            { "id": "5.2", "title": "Policy" },
            { "id": "5.3", "title": "Organizational roles, responsibilities and authorities" }
          ]
        },
        {
          "id": "6", "title": "Planning",
          "subclauses": [
            { "id": "6.1", "title": "Actions to address risks and opportunities" },
            { "id": "6.2", "title": "XXX objectives and planning to achieve them" },
            { "id": "6.3", "title": "Planning of changes", "notes": "NEW in 2021/2022 HS (was not in 2012 HLS)." }
          ]
        },
        {
          "id": "7", "title": "Support",
          "subclauses": [
            { "id": "7.1", "title": "Resources" },
            { "id": "7.2", "title": "Competence" },
            { "id": "7.3", "title": "Awareness" },
            { "id": "7.4", "title": "Communication" },
            { "id": "7.5", "title": "Documented information", "children": [
              { "id": "7.5.1", "title": "General" },
              { "id": "7.5.2", "title": "Creating and updating" },
              { "id": "7.5.3", "title": "Control of documented information" }
            ]}
          ]
        },
        {
          "id": "8", "title": "Operation",
          "subclauses": [
            { "id": "8.1", "title": "Operational planning and control", "notes": "2022 HS replaced 'outsourced processes' with 'externally provided processes, products, services'." }
          ]
        },
        {
          "id": "9", "title": "Performance evaluation",
          "subclauses": [
            { "id": "9.1", "title": "Monitoring, measurement, analysis and evaluation" },
            { "id": "9.2", "title": "Internal audit", "children": [
              { "id": "9.2.1", "title": "General" },
              { "id": "9.2.2", "title": "Internal audit programme" }
            ]},
            { "id": "9.3", "title": "Management review", "children": [
              { "id": "9.3.1", "title": "General" },
              { "id": "9.3.2", "title": "Management review inputs" },
              { "id": "9.3.3", "title": "Management review results" }
            ]}
          ]
        },
        {
          "id": "10", "title": "Improvement",
          "subclauses": [
            { "id": "10.1", "title": "Continual improvement", "notes": "2022 HS swapped order: continual improvement now precedes nonconformity (was 10.2 in 2012 HLS)." },
            { "id": "10.2", "title": "Nonconformity and corrective action", "notes": "2022 HS swapped order: was 10.1 in 2012 HLS." }
          ]
        }
      ]
    },
    "standards": [
      {
        "id": "iso27001", "code": "ISO/IEC 27001:2022", "name": "Information Security Management Systems (ISMS) — Requirements",
        "publication_date": "2022-10", "annex_sl_aligned": true,
        "hs_revision_followed": "2022 HS (early adopter); Feb 2024 climate amendment incorporated via Amd 1:2024",
        "extensions_beyond_hs": [
          { "ref": "6.1.2", "title": "Information security risk assessment" },
          { "ref": "6.1.3", "title": "Information security risk treatment" },
          { "ref": "8.2", "title": "Information security risk assessment (operational)" },
          { "ref": "8.3", "title": "Information security risk treatment (operational)" }
        ],
        "annex_controls": {
          "annex": "Annex A", "title": "Information security controls reference (normative)",
          "themes": [
            { "id": "A.5", "title": "Organizational controls", "count": 37 },
            { "id": "A.6", "title": "People controls", "count": 8 },
            { "id": "A.7", "title": "Physical controls", "count": 14 },
            { "id": "A.8", "title": "Technological controls", "count": 34 }
          ],
          "total_controls": 93,
          "delta_from_2013_edition": "Restructured from 114 controls / 14 domains; 11 net-new controls; 24 merged; 58 retained"
        },
        "deviation_notes": "10.1/10.2 swapped per 2022 HS. Clause 4.4 explicitly requires process orientation."
      },
      {
        "id": "iso27701", "code": "ISO/IEC 27701:2019", "name": "Privacy Information Management System (PIMS) — Extension to ISO/IEC 27001 and 27002",
        "publication_date": "2019-08", "annex_sl_aligned": "indirect",
        "hs_revision_followed": "Inherits whichever HS revision its base ISO/IEC 27001 edition uses (so as of 2026, the 2022 HS via 27001:2022).",
        "structure_note": "27701 is NOT a standalone management system. It augments 27001 with privacy-specific requirements and adds privacy-specific controls layered onto 27002.",
        "extensions_beyond_hs": [
          { "ref": "5", "title": "PIMS-specific requirements relating to ISO/IEC 27001 (clause-by-clause augmentation of 27001 clauses 4-10)" },
          { "ref": "6", "title": "PIMS-specific guidance relating to ISO/IEC 27002 controls" },
          { "ref": "7", "title": "Additional ISO/IEC 27002 guidance for PII Controllers" },
          { "ref": "8", "title": "Additional ISO/IEC 27002 guidance for PII Processors" }
        ],
        "annex_controls": { "annex_F_note": "Annex F provides the mapping between PIMS controls and ISO/IEC 27001/27002 controls." },
        "deviation_notes": "ISO/IEC 27701:2025 revision is in progress (rebasing on 27001:2022 with restructured annexes). This entry reflects the 2019 edition; verify currency before audit.",
        "follow_up_required": true
      },
      {
        "id": "iso22301", "code": "ISO 22301:2019", "name": "Business Continuity Management Systems (BCMS) — Requirements",
        "publication_date": "2019-10", "annex_sl_aligned": true,
        "hs_revision_followed": "2012 HLS (predates 2021 HS revision)",
        "extensions_beyond_hs": [
          { "ref": "8.2", "title": "Business impact analysis and risk assessment" },
          { "ref": "8.3", "title": "Business continuity strategies and solutions", "notes": "Renamed from 'Business continuity strategy' in 2012 edition." },
          { "ref": "8.4", "title": "Business continuity plans and procedures" },
          { "ref": "8.5", "title": "Exercise programme" },
          { "ref": "8.6", "title": "Evaluation of business continuity documentation and capabilities" }
        ],
        "deviation_notes": "Old 10.1/10.2 order: 10.1 Nonconformity and corrective action, 10.2 Continual improvement. No 6.3 'Planning of changes' subclause. Climate amendment may apply if BSI/Intertek issue corrigenda; verify."
      },
      {
        "id": "iso37001_2016", "code": "ISO 37001:2016", "name": "Anti-bribery Management Systems (ABMS) — Requirements",
        "publication_date": "2016-10", "annex_sl_aligned": true, "hs_revision_followed": "2012 HLS",
        "extensions_beyond_hs": [
          { "ref": "4.5", "title": "Bribery risk assessment", "notes": "HS-extension subclause unique to ABMS." },
          { "ref": "5.1.2", "title": "Governing body" },
          { "ref": "5.3.2", "title": "Anti-bribery compliance function" },
          { "ref": "7.2.2", "title": "Employment process" },
          { "ref": "8.2", "title": "Due diligence" },
          { "ref": "8.3", "title": "Financial controls" },
          { "ref": "8.4", "title": "Non-financial controls" },
          { "ref": "8.5", "title": "Implementation of anti-bribery controls by controlled organizations and by business associates" },
          { "ref": "8.6", "title": "Anti-bribery commitments" },
          { "ref": "8.7", "title": "Gifts, hospitality, donations and similar benefits" },
          { "ref": "8.8", "title": "Managing inadequacy of anti-bribery controls" },
          { "ref": "8.9", "title": "Raising concerns" },
          { "ref": "8.10", "title": "Investigating and dealing with bribery" }
        ],
        "deviation_notes": "Old 10.1/10.2 order. Superseded by ISO 37001:2025 (transition deadline 2027-02-28).",
        "successor": "iso37001_2025"
      },
      {
        "id": "iso37001_2025", "code": "ISO 37001:2025", "name": "Anti-bribery Management Systems (ABMS) — Requirements (revised)",
        "publication_date": "2025-02-03", "annex_sl_aligned": true,
        "hs_revision_followed": "2022 HS (with climate amendment)",
        "transition": { "deadline_for_certified_organizations": "2027-02-28", "source": "DNV / ANSI" },
        "extensions_beyond_hs": [
          { "ref": "4.5", "title": "Bribery risk assessment (retained)" },
          { "ref": "5.1.2", "title": "Governing body" },
          { "ref": "5.1.3", "title": "Anti-bribery culture (NEW emphasis)" },
          { "ref": "5.3.3", "title": "Anti-bribery function (renamed from 'Anti-bribery compliance function')" },
          { "ref": "6.3", "title": "Planning of changes (adopted from 2022 HS)" },
          { "ref": "8.x", "title": "Bribery-specific operational controls (8.2 due diligence, 8.3 financial controls, 8.4 non-financial controls, 8.5 controls by controlled orgs / business associates, 8.6 commitments, 8.7 gifts/hospitality, 8.8 detection of inadequacy, 8.9 raising concerns, 8.10 investigation)" }
        ],
        "deviation_notes": "10.1/10.2 swapped per 2022 HS. Terminology: 'interested parties' replaces 'stakeholders' in line with HS. Expanded conflict-of-interest requirements."
      },
      {
        "id": "iso45001", "code": "ISO 45001:2018", "name": "Occupational Health and Safety Management Systems (OH&S MS) — Requirements with guidance for use",
        "publication_date": "2018-03", "annex_sl_aligned": true, "hs_revision_followed": "2012 HLS",
        "extensions_beyond_hs": [
          { "ref": "5.4", "title": "Consultation and participation of workers", "notes": "Clause 5 retitled 'Leadership and worker participation' (vs HS 'Leadership' alone)." },
          { "ref": "6.1.2", "title": "Hazard identification and assessment of risks and opportunities" },
          { "ref": "6.1.3", "title": "Determination of legal requirements and other requirements" },
          { "ref": "6.1.4", "title": "Planning action" },
          { "ref": "8.1.2", "title": "Eliminating hazards and reducing OH&S risks" },
          { "ref": "8.1.3", "title": "Management of change" },
          { "ref": "8.1.4", "title": "Procurement (including contractors and outsourcing)" },
          { "ref": "8.2", "title": "Emergency preparedness and response" }
        ],
        "deviation_notes": "Clause 10.2 covers 'Incident, nonconformity and corrective action' — incidents added relative to HS. Old 10.1/10.2 order."
      },
      {
        "id": "iso50001", "code": "ISO 50001:2018", "name": "Energy Management Systems (EnMS) — Requirements with guidance for use",
        "publication_date": "2018-08", "annex_sl_aligned": true, "hs_revision_followed": "2012 HLS",
        "extensions_beyond_hs": [
          { "ref": "4.4.4", "title": "Energy data planning" },
          { "ref": "6.3", "title": "Energy review", "notes": "WARNING: 50001's 6.3 'Energy review' is UNRELATED to the 2022 HS's 6.3 'Planning of changes'. Number collision; semantic divergence." },
          { "ref": "6.4", "title": "Energy performance indicators (EnPIs)" },
          { "ref": "6.5", "title": "Energy baseline (EnB)" },
          { "ref": "6.6", "title": "Planning for collection of energy data" },
          { "ref": "8.2", "title": "Design (energy-efficient design of facilities, equipment, systems, processes)" },
          { "ref": "8.3", "title": "Procurement (energy-purchasing)" },
          { "ref": "9.1.1", "title": "Monitoring, measurement, analysis and evaluation of energy performance and the EnMS" }
        ],
        "deviation_notes": "Old 10.1/10.2 order. Numerous clause-6 EnMS extensions create high deviation from baseline HS skeleton."
      },
      {
        "id": "iso20000_1", "code": "ISO/IEC 20000-1:2018", "name": "IT Service Management System (ITSMS) — Service management system requirements",
        "publication_date": "2018-09", "annex_sl_aligned": true,
        "hs_revision_followed": "2012 HLS (Annex SL Appendix 2 of that era)",
        "extensions_beyond_hs": [
          { "ref": "8.2", "title": "Service portfolio", "notes": "ITSMS-specific. Covers 8.2.1 service delivery, 8.2.2 plan the services, 8.2.3 control of parties involved in the service lifecycle, 8.2.4 service catalogue management, 8.2.5 asset management, 8.2.6 configuration management." },
          { "ref": "8.3", "title": "Relationship and agreement", "notes": "Covers 8.3.1 general, 8.3.2 business relationship management, 8.3.3 service level management, 8.3.4 supplier management." },
          { "ref": "8.4", "title": "Supply and demand", "notes": "Covers 8.4.1 budgeting and accounting for services, 8.4.2 demand management, 8.4.3 capacity management." },
          { "ref": "8.5", "title": "Service design, build and transition", "notes": "Covers 8.5.1 change management, 8.5.2 service design and transition, 8.5.3 release and deployment management." },
          { "ref": "8.6", "title": "Resolution and fulfilment", "notes": "Covers 8.6.1 incident management, 8.6.2 service request management, 8.6.3 problem management." },
          { "ref": "8.7", "title": "Service assurance", "notes": "Covers 8.7.1 service availability management, 8.7.2 service continuity management, 8.7.3 information security management." }
        ],
        "deviation_notes": "Old 10.1/10.2 order (10.1 Nonconformity, 10.2 Continual improvement). Heaviest clause-8 extension of all 7 standards — ITSMS replaces the HS single subclause 8.1 'Operational planning and control' with six discipline-specific subclauses (8.2-8.7) covering the full ITIL-aligned service lifecycle. Co-implementable with ISO/IEC 27001 (information security) via 8.7.3.",
        "amendment_status": "ISO/IEC 20000-1:2018/Amd 1:2020 added clarifications. Climate amendment (Feb 2024) applies; verify corrigendum status before audit."
      }
    ],
    "methodology": {
      "intro": "How a certification body (Intertek, BSI, DNV, TUEV, SGS, BV) constructs and validates a multi-standard crosswalk in practice. This file follows the same four-step approach.",
      "steps": [
        { "step": 1, "name": "Anchor on the Harmonized Structure as common spine", "detail": "Load the canonical 10-clause / ~30-subclause HS skeleton (ISO/IEC Directives Part 1 Annex SL Appendix 2) as the master key set. Every target standard maps onto these keys first. This guarantees that clause 7.5 'Documented information' has a single shared definition across all 7 standards in scope." },
        { "step": 2, "name": "Layer standard-specific extensions", "detail": "Append discipline-specific subclauses as child nodes under their parent HS clause. Examples in this file: ISO 22301 §8.2 BIA, ISO 37001 §4.5 bribery risk assessment, ISO 50001 §6.3 energy review (NOTE: collides numerically but not semantically with HS 2022 §6.3), ISO 45001 §5.4 worker participation, ISO 20000-1 §8.2-8.7 ITSMS service lifecycle." },
        { "step": 3, "name": "Flag wording divergence", "detail": "Even where clause numbers match, certification bodies tag clauses where the discipline standard adds qualifiers so auditors do not assume identical intent. Examples: ISO 27001 §4.4 explicitly demands 'process orientation'; ISO 45001 §10.2 covers 'Incident, nonconformity and corrective action'." },
        { "step": 4, "name": "Overlay sector control catalogues", "detail": "For standards with normative annexes (27001 Annex A, 27701 Annex F, 37001 control measures embedded in clause 8) build a separate orthogonal map from main-body clauses to control IDs. This enables cross-framework controls reuse." }
      ],
      "validation_path": "Mock-up structural mapping (this file) -> Pre-audit gap analysis (using purchased normative texts) -> Stage-1 documentation review by accredited certification body (Intertek / BSI / DNV / TUEV / SGS / BV) -> Stage-2 implementation audit -> Certification decision -> Surveillance audits annually."
    },
    "sources": [
      { "id": "iso-directives", "url": "https://www.iso.org/sites/directives/current/consolidated/index.xhtml", "fetched": "2026-04-25", "status": "blocked-403", "use": "canonical HS reference pointer" },
      { "id": "bsi-annex-sl", "url": "https://www.bsigroup.com/en-GB/standards/iso-9001/iso-management-systems-and-annex-sl/", "fetched": "2026-04-25", "status": "navigation-only" },
      { "id": "bsi-hs-explained", "url": "https://www.bsigroup.com/en-GB/insights-and-media/insights/blogs/the-harmonized-structure-explained/", "fetched": "2026-04-25", "status": "navigation-only" },
      { "id": "intertek-annex-sl", "url": "https://www.intertek.com/business-assurance/iso-9001-revision/annex-sl/", "fetched": "2026-04-25", "status": "404" },
      { "id": "dqs-hls", "url": "https://www.dqsglobal.com/en/explore/dqs-knowledge-center/what-is-a-high-level-structure", "fetched": "2026-04-25", "claims": ["6.3 added in 2022 HS", "4.2(c) expansion", "7.5 update"] },
      { "id": "dqs-27001-changes", "url": "https://www.dqsglobal.com/en/explore/blog/new-iso-27001-2022-key-changes", "fetched": "2026-04-25", "claims": ["10.1/10.2 swap rationale", "4.4 process orientation", "6.3 adoption"] },
      { "id": "dqs-37001-2025", "url": "https://www.dqsglobal.com/en/explore/blog/revision-2025-of-iso-37001", "fetched": "2026-04-25", "claims": ["interested parties terminology", "anti-bribery function rename", "6.3 dedicated"] },
      { "id": "dnv-37001-transition", "url": "https://www.dnv.com/assurance/Management-Systems/new-iso/transition/iso-37001-anti-bribery-management-system-revision/", "fetched": "2026-04-25", "claims": ["transition deadline 2027-02-28"] },
      { "id": "ansi-37001-2025", "url": "https://blog.ansi.org/ansi/iso-37001-2025-anti-bribery-standard/", "fetched": "2026-04-25", "claims": ["release date 2025-02-03"] },
      { "id": "amtivo-27001-revisions", "url": "https://amtivo.com/uk/standards/iso-27001/technical/revisions/", "fetched": "2026-04-25", "claims": ["Annex A: 93 controls / 4 themes vs 114 / 14 in 2013 edition"] },
      { "id": "iso-27701", "url": "https://www.iso.org/standard/71670.html", "fetched": "2026-04-25", "claims": ["27701 = extension to 27001"] },
      { "id": "wikipedia-27701", "url": "https://en.wikipedia.org/wiki/ISO/IEC_27701", "fetched": "2026-04-25", "claims": ["clause 5-8 layout", "Annex F mapping"] },
      { "id": "evalian-22301", "url": "https://evalian.co.uk/iso-223012019-vs-iso-223012012/", "fetched": "2026-04-25", "claims": ["8.3 renamed 'strategies and solutions'"] },
      { "id": "advisera-22301", "url": "https://advisera.com/27001academy/blog/2019/12/02/iso-22301-2019-vs-iso-22301-2012-key-changes-infographic/", "fetched": "2026-04-25", "claims": ["22301:2019 still on 2012 HLS"] },
      { "id": "advisera-45001", "url": "https://advisera.com/45001academy/blog/2019/03/08/is-iso-450012018-compliant-with-annex-sl/", "fetched": "2026-04-25", "claims": ["clause 5 retitled", "10.2 incident inclusion"] },
      { "id": "pecb-45001", "url": "https://pecb.com/en/whitepaper/iso-45001-occupational-health-and-safety-management-system-requirements", "fetched": "2026-04-25", "claims": ["5.4 worker participation", "8.1.2/8.1.3/8.1.4 OH&S extensions"] },
      { "id": "nqa-50001", "url": "https://www.nqa.com/en-us/certification/standards/iso-50001", "fetched": "2026-04-25", "claims": ["50001:2018 follows 2012 HLS", "EnPI/EnB extensions"] },
      { "id": "wikipedia-37001", "url": "https://en.wikipedia.org/wiki/ISO_37001", "fetched": "2026-04-25", "claims": ["4.5 bribery risk assessment", "clause 8 sub-structure"] },
      { "id": "iso-20000-1", "url": "https://www.iso.org/standard/70636.html", "fetched": "2026-04-26", "claims": ["ITSMS 2018 publication"] },
      { "id": "bsi-20000-1", "url": "https://www.bsigroup.com/en-GB/iso-iec-20000-it-service-management/", "fetched": "2026-04-26", "claims": ["ITSMS clause 8.2-8.7 service lifecycle"] }
    ],
    "caveats": [
      "ISO standards are copyrighted. Full clause text and exact subclause titles MUST be obtained from purchased standards (ISO Store, ANSI, BSI Knowledge) before publishing or auditing against this file.",
      "The canonical HS skeleton in this file is reconstructed from secondary sources. Verify subclause titles against ISO/IEC Directives Part 1 Annex SL Appendix 2 (current consolidated edition).",
      "The Feb 2024 climate-change amendment applies retroactively to all published HS-based standards. Per-standard amendment status (corrigenda issued by ISO/SC committees) must be confirmed with the accreditation body before mapping is finalised.",
      "ISO/IEC 27701 has a 2025 revision in progress (rebasing on ISO/IEC 27001:2022 with restructured annexes). Confirm current edition before audit.",
      "Do not claim a clause-text quote unless sourced from the paid standard. Mapping at the title-and-structure level is appropriate for ideation and gap planning; verbatim quoting is not.",
      "Number collisions exist across standards (e.g. ISO 50001 §6.3 'Energy review' vs HS 2022 §6.3 'Planning of changes'). Always join on (standard_id, clause_id, semantic_tag), never clause number alone."
    ],
    "validation_authority": "Final validation of any clause-by-clause crosswalk derived from this file is the responsibility of an accredited certification body. Intertek, BSI, DNV, TUEV, SGS, and BV are commonly engaged for this purpose. This file does not constitute audit evidence."
  };

  // ── SSOT namespace ──────────────────────────────────────────────────────
  var ISO_DATA = {
    version: '1.0.0',
    generated: '2026-04-26',

    // HS mapping (single source — was hls_mapping.json)
    hlsMapping:           HLS_MAPPING,
    harmonizedStructure:  HLS_MAPPING.harmonized_structure,
    standardsHsMapping:   HLS_MAPPING.standards,
    methodology:          HLS_MAPPING.methodology,
    sources:              HLS_MAPPING.sources,
    caveats:              HLS_MAPPING.caveats,

    // Legacy crosswalk data (populated only if data/crosswalk.js is loaded first)
    stdMeta:              (typeof window !== 'undefined' && window.STD_META) || null,
    hlsClauses:           (typeof window !== 'undefined' && window.HLS_CLAUSES) || null,
    annexCrosswalk:       (typeof window !== 'undefined' && window.ANNEX_CONTROL_CROSSWALK) || null,
    annexDomains:         (typeof window !== 'undefined' && window.ANNEX_DOMAINS) || null,
    iso37001Delta:        (typeof window !== 'undefined' && window.ISO37001_DELTA) || null,

    // Legacy raw clause/control reference (populated only if data/raw.js is loaded first)
    rawData:              (typeof window !== 'undefined' && window.RAW_ISO_DATA) || null
  };

  // ── Helper accessors ────────────────────────────────────────────────────
  ISO_DATA.findStandardById = function (id) {
    return ISO_DATA.standardsHsMapping.find(function (s) { return s.id === id; }) || null;
  };
  ISO_DATA.standardsByHsRevision = function () {
    var out = { '2022 HS': [], '2012 HLS': [], 'extension': [] };
    ISO_DATA.standardsHsMapping.forEach(function (s) {
      var rev = (s.hs_revision_followed || '').toLowerCase();
      if (rev.indexOf('2022') === 0) out['2022 HS'].push(s);
      else if (rev.indexOf('2012') === 0) out['2012 HLS'].push(s);
      else out['extension'].push(s);
    });
    return out;
  };

  // ── Soft validation (warn-only) ─────────────────────────────────────────
  if (typeof window !== 'undefined') {
    window.ISO_DATA = ISO_DATA;
    if (!ISO_DATA.stdMeta) {
      console.warn('[ISO_DATA] window.STD_META not found — load data/crosswalk.js before data/iso.js if you need crosswalk legacy globals.');
    }
    if (!ISO_DATA.rawData) {
      console.warn('[ISO_DATA] window.RAW_ISO_DATA not found — load data/raw.js before data/iso.js if you need the full clause/control reference.');
    }
  }
})();
