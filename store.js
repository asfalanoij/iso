/**
 * GRC STORE — Single Source of Truth
 * Telin ISO Certification Programme 2026
 *
 * Architecture:
 *   - One localStorage key:  telin_grc_v1
 *   - Entity types with typed IDs and FK references
 *   - Referential integrity on every write
 *   - ON DELETE CASCADE / SET NULL rules enforced
 *   - Data quality scoring (completeness, consistency, timeliness)
 *   - Event bus for cross-tool reactivity
 *   - Schema versioning + auto-migration stubs
 *
 * Entity hierarchy (DAMA-DMBOK 3: Reference → Master → Transactional):
 *
 *   REFERENCE (immutable seeds — code-defined)
 *     standards        id PK
 *     jurisdictions    id PK
 *
 *   MASTER DATA (managed by stewards)
 *     clauses          id PK, standardId FK→standards
 *     milestones       id PK, standardId FK→standards
 *     documents        id PK, standardId FK→standards
 *
 *   OPERATIONAL DATA (updated by audit team daily)
 *     evidence         id PK, standardIds[] FK→standards, clauseRefs[]
 *     risks            id PK, standardIds[] FK→standards
 *     ncrs             id PK, standardId FK→standards, riskIds[] FK→risks, evidenceIds[] FK→evidence
 *     legalReqs        id PK, jurisdiction FK→jurisdictions, standardIds[] FK→standards
 *     checklistResp    id PK, standardId FK→standards
 *
 *   CASCADE RULES:
 *     DELETE standard  → cascade milestones, documents, checklistResp
 *                      → pull from evidence.standardIds[], risks.standardIds[], legalReqs.standardIds[], ncrs (if last std)
 *     DELETE evidence  → pull evidenceId from ncrs.evidenceIds[]
 *     DELETE risk      → pull riskId from ncrs.riskIds[]
 *     DELETE ncr       → pull ncrId from risks.ncrIds[]
 *     DELETE legalReq  → no dependents
 */

'use strict';

(function (global) {

  // ─── SCHEMA VERSION ────────────────────────────────────────────────────────────
  const SCHEMA_VERSION = 2;
  const STORE_KEY = 'telin_grc_v2';

  // ─── ID GENERATORS (cached — avoids full-store scan on every call) ────────────
  const _idCounters = {};
  let _countersInitialized = false;
  function _initCounters(store) {
    const all = [
      ...(store.evidence || []),
      ...(store.ncrs || []),
      ...(store.risks || []),
      ...(store.legalReqs || []),
    ];
    ['E', 'NCR', 'R', 'LR'].forEach(function(p) {
      const nums = all.map(function(e) { return e.id; })
        .filter(function(id) { return id && id.startsWith(p + '-'); })
        .map(function(id) { return parseInt(id.split('-')[1], 10); })
        .filter(function(n) { return !isNaN(n); });
      _idCounters[p] = nums.length ? Math.max.apply(null, nums) : 0;
    });
    _countersInitialized = true;
  }
  function nextId(prefix) {
    if (!_countersInitialized) _initCounters(_getStore());
    _idCounters[prefix] = (_idCounters[prefix] || 0) + 1;
    return prefix + '-' + String(_idCounters[prefix]).padStart(3, '0');
  }

  // ─── REFERENCE DATA (code-defined, immutable at runtime) ──────────────────────
  const REF_STANDARDS = [
    { id: 'iso27001', code: 'ISO/IEC 27001:2022', abbr: 'ISMS', name: 'Information Security Management', certType: 'Surveillance 1', color: '#2563EB' },
    { id: 'iso27701', code: 'ISO/IEC 27701:2019', abbr: 'PIMS', name: 'Privacy Information Management', certType: 'Surveillance 1', color: '#7C3AED' },
    { id: 'iso20000', code: 'ISO/IEC 20000-1:2018', abbr: 'ITSMS', name: 'IT Service Management', certType: 'Surveillance 2', color: '#059669' },
    { id: 'iso22301', code: 'ISO 22301:2019', abbr: 'BCMS', name: 'Business Continuity Management', certType: 'Surveillance 2', color: '#B91C1C' },
    { id: 'iso45001', code: 'ISO 45001:2018', abbr: 'OHSMS', name: 'Occupational Health & Safety', certType: 'Surveillance 2', color: '#0891B2' },
    { id: 'iso37001', code: 'ISO 37001:2016', abbr: 'ABMS', name: 'Anti-Bribery Management', certType: 'New Certification', color: '#DC2626' },
    { id: 'iso50001', code: 'ISO 50001:2018', abbr: 'EnMS', name: 'Energy Management', certType: 'Readiness / Initial Certification', color: '#D97706' },
  ];

  const REF_JURISDICTIONS = {
    ID: { code: 'ID', label: 'Indonesia', flag: '🇮🇩', color: '#DC2626' },
    SG: { code: 'SG', label: 'Singapore', flag: '🇸🇬', color: '#DC2626' },
    HK: { code: 'HK', label: 'Hong Kong SAR', flag: '🇭🇰', color: '#DC2626' },
    TW: { code: 'TW', label: 'Taiwan', flag: '🇹🇼', color: '#1D4ED8' },
    TL: { code: 'TL', label: 'Timor-Leste', flag: '🇹🇱', color: '#16A34A' },
    AU: { code: 'AU', label: 'Australia', flag: '🇦🇺', color: '#1D4ED8' },
    US: { code: 'US', label: 'United States', flag: '🇺🇸', color: '#1D4ED8' },
    MULTI: { code: 'MULTI', label: 'Multi-jurisdiction', flag: '🌏', color: '#7C3AED' },
  };

  // ─── ENTITY SCHEMAS (validation rules per entity type) ────────────────────────
  const SCHEMAS = {
    evidence: {
      required: ['name', 'type', 'standardIds', 'status', 'owner'],
      fields: {
        id:            { type: 'string' },
        name:          { type: 'string', maxLen: 200 },
        type:          { type: 'enum', values: ['Policy','Procedure','Record','Report','Register','Plan','Training','Certificate','Log'] },
        standardIds:   { type: 'fk[]', ref: 'standards', minLen: 1 },
        clauseRefs:    { type: 'string[]' },
        status:        { type: 'enum', values: ['draft','pending-review','pending-approval','approved','rejected','expired'] },
        owner:         { type: 'string', maxLen: 100 },
        due:           { type: 'date' },
        notes:         { type: 'string', maxLen: 2000 },
        requestedDate: { type: 'date' },
        collectedDate: { type: 'date' },
        followUps:     { type: 'object[]' },
        collaborators: { type: 'fk[]', ref: 'users' },
      }
    },
    users: {
      required: ['name', 'role', 'isoScope', 'department'],
      fields: {
        id:         { type: 'string' },
        name:       { type: 'string', maxLen: 100 },
        role:       { type: 'enum', values: ['Super Admin', 'C-Level', 'VP', 'Admin', 'User'] },
        isoScope:   { type: 'string', maxLen: 100 },
        department: { type: 'string', maxLen: 100 },
      }
    },
    auditLogs: {
      required: ['userId', 'action', 'entityId', 'timestamp'],
      fields: {
        id:        { type: 'string' },
        userId:    { type: 'fk', ref: 'users' },
        userRole:  { type: 'string', maxLen: 50 },
        action:    { type: 'string', maxLen: 50 },
        entityId:  { type: 'string', maxLen: 100 },
        timestamp: { type: 'date' },
        details:   { type: 'string', maxLen: 2000 },
      }
    },
    ncrs: {
      required: ['standardId', 'clauseRef', 'severity', 'finding', 'status'],
      fields: {
        id:               { type: 'string' },
        standardId:       { type: 'fk', ref: 'standards' },
        clauseRef:        { type: 'string', maxLen: 20 },
        phase:            { type: 'string', maxLen: 100 },
        severity:         { type: 'enum', values: ['minor','major','critical','observation'] },
        auditor:          { type: 'string', maxLen: 100 },
        date:             { type: 'date' },
        finding:          { type: 'string', maxLen: 2000 },
        containment:      { type: 'string', maxLen: 2000 },
        rootCause:        { type: 'string', maxLen: 2000 },
        method:           { type: 'string', maxLen: 100 },
        correctiveAction: { type: 'string', maxLen: 2000 },
        caOwner:          { type: 'string', maxLen: 100 },
        caDue:            { type: 'date' },
        verification:     { type: 'string', maxLen: 2000 },
        verifier:         { type: 'string', maxLen: 100 },
        verDate:          { type: 'date' },
        status:           { type: 'enum', values: ['open','in-progress','closed','verified'] },
        notes:            { type: 'string', maxLen: 2000 },
        riskIds:          { type: 'fk[]', ref: 'risks' },
        evidenceIds:      { type: 'fk[]', ref: 'evidence' },
      }
    },
    risks: {
      required: ['title', 'standardIds', 'likelihood', 'impact', 'treatment', 'owner'],
      fields: {
        id:            { type: 'string' },
        standardIds:   { type: 'fk[]', ref: 'standards', minLen: 1 },
        category:      { type: 'string', maxLen: 100 },
        title:         { type: 'string', maxLen: 300 },
        description:   { type: 'string', maxLen: 2000 },
        clauseRef:     { type: 'string', maxLen: 20 },
        likelihood:    { type: 'int', min: 1, max: 5 },
        impact:        { type: 'int', min: 1, max: 5 },
        controls:      { type: 'string', maxLen: 2000 },
        residualL:     { type: 'int', min: 1, max: 5 },
        residualI:     { type: 'int', min: 1, max: 5 },
        treatment:     { type: 'enum', values: ['treat','transfer','tolerate','terminate'] },
        status:        { type: 'enum', values: ['open','mitigating','closed','accepted'] },
        owner:         { type: 'string', maxLen: 100 },
        reviewDate:    { type: 'date' },
        treatmentPlan: { type: 'string', maxLen: 2000 },
        notes:         { type: 'string', maxLen: 2000 },
        ncrIds:        { type: 'fk[]', ref: 'ncrs' },
      }
    },
    legalReqs: {
      required: ['name', 'jurisdiction', 'standardIds', 'status', 'owner'],
      fields: {
        id:           { type: 'string' },
        jurisdiction: { type: 'fk', ref: 'jurisdictions' },
        name:         { type: 'string', maxLen: 300 },
        type:         { type: 'enum', values: ['mandatory','voluntary','contractual'] },
        priority:     { type: 'enum', values: ['critical','high','medium','low'] },
        standardIds:  { type: 'fk[]', ref: 'standards', minLen: 1 },
        clause:       { type: 'string', maxLen: 100 },
        status:       { type: 'enum', values: ['compliant','partial','not-assessed','non-compliant','monitoring'] },
        owner:        { type: 'string', maxLen: 100 },
        lastReview:   { type: 'date' },
        nextReview:   { type: 'date' },
        frequency:    { type: 'string', maxLen: 50 },
        evidence:     { type: 'string', maxLen: 2000 },
        action:       { type: 'string', maxLen: 2000 },
        notes:        { type: 'string', maxLen: 2000 },
      }
    }
  };

  // ─── VALIDATION ENGINE ────────────────────────────────────────────────────────
  function _sanitize(item) {
    const clean = {};
    for (const [k, v] of Object.entries(item)) {
      if (typeof v === 'string') {
        clean[k] = v.replace(/<[^>]*>/g, '').trim();
      } else {
        clean[k] = v;
      }
    }
    return clean;
  }

  function _validateFK(ref, val, field, errors) {
    if (ref === 'standards') {
      if (!REF_STANDARDS.find(s => s.id === val))
        errors.push(field + ': standard \'' + val + '\' not found');
    } else if (ref === 'jurisdictions') {
      if (!REF_JURISDICTIONS[val])
        errors.push(field + ': jurisdiction \'' + val + '\' not found');
    } else if (ref === 'risks' || ref === 'evidence' || ref === 'ncrs') {
      var store = _getStore();
      var collection = store[ref] || [];
      if (!collection.find(function(i) { return i.id === val; }))
        errors.push(field + ': ' + ref + ' \'' + val + '\' not found');
    }
  }

  function _validate(entityType, item, isUpdate) {
    var schema = SCHEMAS[entityType];
    if (!schema) return; // no schema defined, skip
    var errors = [];

    // On create, enforce required fields
    if (!isUpdate) {
      schema.required.forEach(function(f) {
        var v = item[f];
        if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0))
          errors.push(entityType + '.' + f + ' is required');
      });
    }

    // Type-check every provided field
    Object.keys(item).forEach(function(key) {
      if (key === 'id') return;
      var spec = schema.fields[key];
      if (!spec) return; // allow unknown fields for forward-compat
      var val = item[key];
      if (val === undefined || val === null || val === '') return;

      switch (spec.type) {
        case 'string':
          if (typeof val !== 'string') errors.push(key + ' must be string');
          else if (spec.maxLen && val.length > spec.maxLen) errors.push(key + ' exceeds ' + spec.maxLen + ' chars');
          break;
        case 'enum':
          if (!spec.values.includes(val)) errors.push(key + ': invalid value \'' + val + '\'. Allowed: ' + spec.values.join(','));
          break;
        case 'fk':
          _validateFK(spec.ref, val, key, errors);
          break;
        case 'fk[]':
          if (!Array.isArray(val)) { errors.push(key + ' must be array'); break; }
          val.forEach(function(v) { _validateFK(spec.ref, v, key, errors); });
          if (spec.minLen && val.length < spec.minLen) errors.push(key + ' requires at least ' + spec.minLen + ' item(s)');
          break;
        case 'date':
          if (typeof val !== 'string' || isNaN(Date.parse(val))) errors.push(key + ': invalid date');
          break;
        case 'int':
          if (!Number.isInteger(val) || (spec.min != null && val < spec.min) || (spec.max != null && val > spec.max))
            errors.push(key + ': must be integer ' + spec.min + '-' + spec.max);
          break;
        case 'string[]':
          if (!Array.isArray(val)) errors.push(key + ' must be array');
          break;
        case 'object[]':
          if (!Array.isArray(val)) errors.push(key + ' must be array');
          break;
      }
    });

    if (errors.length > 0) {
      throw new Error('[GRCStore] Validation failed for ' + entityType + ': ' + errors.join('; '));
    }
  }

  // ─── DEFAULT STORE (seed data — canonical single source) ──────────────────────
  function buildDefaultStore() {
    // Generate 54 users for RBAC
    const genUsers = [];
    genUsers.push({ id: 'U-001', name: 'Super Admin', role: 'Super Admin', isoScope: 'all', department: 'IT GRC' });
    const cLevel = ['CTO', 'CFRMO', 'CCO', 'CEO'];
    cLevel.forEach((c, i) => genUsers.push({ id: 'U-00' + (i+2), name: c, role: 'C-Level', isoScope: 'all', department: 'Executive' }));
    
    const isos = ['iso27001', 'iso27701', 'iso20000', 'iso22301', 'iso45001', 'iso37001', 'iso50001'];
    let uid = 6;
    isos.forEach(iso => {
      let uIso = iso.replace('iso', '');
      genUsers.push({ id: `U-${String(uid++).padStart(3, '0')}`, name: `VP ISO ${uIso}`, role: 'VP', isoScope: iso, department: 'Management Rep' });
      genUsers.push({ id: `U-${String(uid++).padStart(3, '0')}`, name: `Admin ISO ${uIso}`, role: 'Admin', isoScope: iso, department: 'Compliance' });
      for(let i=1; i<=5; i++) {
        genUsers.push({ id: `U-${String(uid++).padStart(3, '0')}`, name: `User ${i} ISO ${uIso}`, role: 'User', isoScope: iso, department: 'Operations' });
      }
    });

    return {
      _version: SCHEMA_VERSION,
      _created: new Date().toISOString(),
      _lastModified: new Date().toISOString(),
      
      users: genUsers,
      auditLogs: [],

      // ── MASTER: milestones (keyed by standardId for quick lookup) ──
      milestones: {
        iso27001: [
          { id: 'M-27001-01', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, ownerGroup: 'Konsultan 1', status: 'done' },
          { id: 'M-27001-02', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, ownerGroup: 'Konsultan 1', status: 'in-progress' },
          { id: 'M-27001-03', name: 'Internal Audit', phase: 1, startWeek: 17.4, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-27001-04', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-27001-05', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-27001-06', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
        iso27701: [
          { id: 'M-27701-01', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, ownerGroup: 'Konsultan 1', status: 'done' },
          { id: 'M-27701-02', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, ownerGroup: 'Konsultan 1', status: 'in-progress' },
          { id: 'M-27701-03', name: 'Internal Audit', phase: 1, startWeek: 18, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-27701-04', name: 'Management Review', phase: 1, startWeek: 22, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-27701-05', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-27701-06', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
        iso20000: [
          { id: 'M-20000-01', name: 'Gap Analysis', phase: 1, startWeek: 9, durationWeeks: 3, ownerGroup: 'Konsultan 2', status: 'done' },
          { id: 'M-20000-02', name: 'Document Review & Update', phase: 1, startWeek: 12, durationWeeks: 5, ownerGroup: 'Konsultan 2', status: 'in-progress' },
          { id: 'M-20000-03', name: 'Internal Audit', phase: 1, startWeek: 17.4, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-20000-04', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-20000-05', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-20000-06', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
        iso22301: [
          { id: 'M-22301-01', name: 'Scope & Business Impact Analysis (BIA)', phase: 1, startWeek: 8.7, durationWeeks: 4, ownerGroup: 'Konsultan 1', status: 'done' },
          { id: 'M-22301-02', name: 'Business Continuity Strategy Definition', phase: 1, startWeek: 12.7, durationWeeks: 3, ownerGroup: 'Top Management', status: 'in-progress' },
          { id: 'M-22301-03', name: 'BCP Formulation & Procedures Update', phase: 1, startWeek: 15.7, durationWeeks: 4, ownerGroup: 'Konsultan 1', status: 'not-started' },
          { id: 'M-22301-04', name: 'Submarine/TOCC Continuity Exercise', phase: 2, startWeek: 20, durationWeeks: 2, ownerGroup: 'IT Security', status: 'not-started' },
          { id: 'M-22301-05', name: 'Internal Audit', phase: 2, startWeek: 22, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-22301-06', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 25, durationWeeks: 1, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-22301-07', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
        ],
        iso45001: [
          { id: 'M-45001-01', name: 'Gap Analysis', phase: 1, startWeek: 9.7, durationWeeks: 2, ownerGroup: 'Konsultan 2', status: 'done' },
          { id: 'M-45001-02', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, ownerGroup: 'Konsultan 2', status: 'in-progress' },
          { id: 'M-45001-03', name: 'Internal Audit', phase: 1, startWeek: 17.7, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-45001-04', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-45001-05', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-45001-06', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
        iso37001: [
          { id: 'M-37001-01', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 2, ownerGroup: 'Konsultan 2', status: 'done' },
          { id: 'M-37001-02', name: 'Document Review & Update', phase: 1, startWeek: 10.7, durationWeeks: 6, ownerGroup: 'Konsultan 2', status: 'in-progress' },
          { id: 'M-37001-03', name: 'Internal Audit', phase: 1, startWeek: 17, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-37001-04', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-37001-05', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 23, durationWeeks: 1, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-37001-06', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-37001-07', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
        iso50001: [
          { id: 'M-50001-01', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, ownerGroup: 'Konsultan 1', status: 'in-progress' },
          { id: 'M-50001-02', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 7, ownerGroup: 'Konsultan 1', status: 'not-started' },
          { id: 'M-50001-03', name: 'Internal Audit', phase: 1, startWeek: 18.7, durationWeeks: 3, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-50001-04', name: 'Management Review', phase: 1, startWeek: 22, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
          { id: 'M-50001-05', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 24, durationWeeks: 1, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-50001-06', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, ownerGroup: 'CB', status: 'not-started' },
          { id: 'M-50001-07', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, ownerGroup: 'Internal Audit', status: 'not-started' },
        ],
      },

      // ── MASTER: documents (per standard) ──────────────────────────────────────
      documents: {
        iso27001: [
          { id: 'D-27001-01', name: 'Information Security Policy', status: 'approved' },
          { id: 'D-27001-02', name: 'Risk Assessment Report', status: 'in-review' },
          { id: 'D-27001-03', name: 'Statement of Applicability', status: 'in-review' },
          { id: 'D-27001-04', name: 'Internal Audit Report', status: 'not-started' },
        ],
        iso27701: [
          { id: 'D-27701-01', name: 'Privacy Policy', status: 'approved' },
          { id: 'D-27701-02', name: 'PII Processing Records', status: 'in-review' },
          { id: 'D-27701-03', name: 'Data Subject Rights Procedure', status: 'draft' },
          { id: 'D-27701-04', name: 'Internal Audit Report', status: 'not-started' },
        ],
        iso20000: [
          { id: 'D-20000-01', name: 'Service Management Policy', status: 'approved' },
          { id: 'D-20000-02', name: 'Service Level Agreements', status: 'in-review' },
          { id: 'D-20000-03', name: 'Incident Management Procedure', status: 'approved' },
          { id: 'D-20000-04', name: 'Internal Audit Report', status: 'not-started' },
        ],
        iso22301: [
          { id: 'D-22301-01', name: 'Business Continuity Policy', status: 'in-review' },
          { id: 'D-22301-02', name: 'Business Impact Analysis (SLA/Voice)', status: 'draft' },
          { id: 'D-22301-03', name: 'Business Continuity Plans (BCP)', status: 'not-started' },
          { id: 'D-22301-04', name: 'Exercise & Testing Reports', status: 'not-started' },
        ],
        iso45001: [
          { id: 'D-45001-01', name: 'OH&S Policy', status: 'approved' },
          { id: 'D-45001-02', name: 'HIRA Register', status: 'in-review' },
          { id: 'D-45001-03', name: 'Emergency Response Plan', status: 'approved' },
          { id: 'D-45001-04', name: 'Internal Audit Report', status: 'not-started' },
        ],
        iso37001: [
          { id: 'D-37001-01', name: 'Anti-Bribery Policy', status: 'approved' },
          { id: 'D-37001-02', name: 'ABMS Procedure', status: 'in-review' },
          { id: 'D-37001-03', name: 'Due Diligence Records', status: 'draft' },
          { id: 'D-37001-04', name: 'Management Review Minutes', status: 'not-started' },
        ],
        iso50001: [
          { id: 'D-50001-01', name: 'Energy Policy', status: 'draft' },
          { id: 'D-50001-02', name: 'Energy Review & Baseline', status: 'draft' },
          { id: 'D-50001-03', name: 'Energy Objectives & Targets', status: 'not-started' },
          { id: 'D-50001-04', name: 'EnPIs & Measurement Plan', status: 'not-started' },
          { id: 'D-50001-05', name: 'Internal Audit Report', status: 'not-started' },
        ],
      },

      // ── OPERATIONAL: evidence (M:M to standards, clauseRefs, and Annex A controls) ──
      evidence: [
        { id: 'E-001', name: 'Information Security Policy', type: 'Policy', standardIds: ['iso27001', 'iso27701'], clauseRefs: ['5.2', 'A.5.1', 'A.5.31', 'A.5.36', 'A.5.37'], status: 'approved', owner: 'IT Security', due: '2026-04-30', notes: 'Master policy; references privacy annex.' },
        { id: 'E-002', name: 'Privacy / PII Policy', type: 'Policy', standardIds: ['iso27701'], clauseRefs: ['5.2', '4.2', 'A.5.34'], status: 'approved', owner: 'Legal', due: '2026-04-30', notes: '' },
        { id: 'E-003', name: 'Anti-Bribery Policy', type: 'Policy', standardIds: ['iso37001'], clauseRefs: ['5.2', '8.1'], status: 'approved', owner: 'Legal', due: '2026-04-30', notes: 'Zero-tolerance statement signed by CEO.' },
        { id: 'E-004', name: 'Service Management Policy', type: 'Policy', standardIds: ['iso20000'], clauseRefs: ['5.2'], status: 'approved', owner: 'IT Security', due: '2026-04-30', notes: '' },
        { id: 'E-005', name: 'Energy Policy', type: 'Policy', standardIds: ['iso50001'], clauseRefs: ['5.2'], status: 'draft', owner: 'Facility Mgmt', due: '2026-05-15', notes: 'New cert; first-time policy.' },
        { id: 'E-006', name: 'OH&S Policy', type: 'Policy', standardIds: ['iso45001'], clauseRefs: ['5.2'], status: 'approved', owner: 'HR', due: '2026-04-30', notes: '' },
        { id: 'E-007', name: 'Scope Document (ISMS / PIMS)', type: 'Record', standardIds: ['iso27001', 'iso27701'], clauseRefs: ['4.3'], status: 'approved', owner: 'IT Security', due: '2026-04-30', notes: 'Shared scope.' },
        { id: 'E-008', name: 'Scope Document (ABMS)', type: 'Record', standardIds: ['iso37001'], clauseRefs: ['4.3'], status: 'approved', owner: 'Legal', due: '2026-04-30', notes: '' },
        { id: 'E-009', name: 'Scope Document (EnMS)', type: 'Record', standardIds: ['iso50001'], clauseRefs: ['4.3'], status: 'draft', owner: 'Facility Mgmt', due: '2026-05-15', notes: 'New cert.' },
        { id: 'E-010', name: 'Scope Document (OHS / ITSMS)', type: 'Record', standardIds: ['iso20000', 'iso45001'], clauseRefs: ['4.3'], status: 'approved', owner: 'HR', due: '2026-04-30', notes: 'Shared.' },
        { id: 'E-011', name: 'Risk Assessment & Treatment (ISMS)', type: 'Report', standardIds: ['iso27001', 'iso27701'], clauseRefs: ['6.1', '8.2', '8.3', 'A.5.29', 'A.5.30', 'A.8.8'], status: 'in-review', owner: 'IT Security', due: '2026-05-31', notes: '' },
        { id: 'E-012', name: 'Bribery Risk Assessment', type: 'Report', standardIds: ['iso37001'], clauseRefs: ['4.5', '6.1', '8.2'], status: 'in-review', owner: 'Legal', due: '2026-05-31', notes: 'Must extend to USA (FCPA) and HK (ICAC).' },
        { id: 'E-013', name: 'OHS HIRA', type: 'Report', standardIds: ['iso45001'], clauseRefs: ['6.1', '6.1.2', '8.1'], status: 'in-review', owner: 'HR', due: '2026-05-31', notes: 'Must include marine/offshore operations.' },
        { id: 'E-014', name: 'Energy Review & Baseline (EnPI)', type: 'Report', standardIds: ['iso50001'], clauseRefs: ['6.1', '6.3', '6.4', '6.5', '6.6'], status: 'draft', owner: 'Facility Mgmt', due: '2026-05-31', notes: 'CRITICAL — CB Stage 1 blocker.' },
        { id: 'E-015', name: 'Statement of Applicability (SoA)', type: 'Record', standardIds: ['iso27001'], clauseRefs: ['6.1.3', '8.3', 'SoA'], status: 'in-review', owner: 'IT Security', due: '2026-05-31', notes: 'Maps all 93 Annex A controls.' },
        { id: 'E-016', name: 'Privacy Impact Assessment (PIA)', type: 'Report', standardIds: ['iso27701'], clauseRefs: ['6.1', '7.2.5', '8.2', 'A.5.34'], status: 'draft', owner: 'Legal', due: '2026-06-15', notes: '' },
        { id: 'E-017', name: 'Due Diligence Register (BA)', type: 'Register', standardIds: ['iso37001'], clauseRefs: ['8.2', '7.5', 'A.5.19', 'A.5.20'], status: 'in-review', owner: 'Legal', due: '2026-05-31', notes: '' },
        { id: 'E-018', name: 'Gift & Hospitality Register', type: 'Register', standardIds: ['iso37001'], clauseRefs: ['8.8'], status: 'in-review', owner: 'Legal', due: '2026-05-31', notes: '' },
        { id: 'E-019', name: 'Service Catalogue & SLAs', type: 'Record', standardIds: ['iso20000'], clauseRefs: ['8.2.4', '8.3.3', '7.5'], status: 'approved', owner: 'IT Security', due: '2026-05-15', notes: '' },
        { id: 'E-020', name: 'Energy Objectives & Action Plans', type: 'Plan', standardIds: ['iso50001'], clauseRefs: ['6.2', '6.3'], status: 'not-started', owner: 'Facility Mgmt', due: '2026-06-15', notes: '' },
        { id: 'E-021', name: 'Org Chart & Roles Matrix', type: 'Record', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso45001', 'iso37001', 'iso50001'], clauseRefs: ['5.3', 'A.5.2', 'A.5.3'], status: 'approved', owner: 'HR', due: '2026-04-30', notes: 'SSoT for all standards.' },
        { id: 'E-022', name: 'Competence Matrix & Training Records', type: 'Training', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso45001', 'iso37001', 'iso50001'], clauseRefs: ['7.2', '7.3', 'A.6.1', 'A.6.2', 'A.6.3'], status: 'in-review', owner: 'HR', due: '2026-05-31', notes: '' },
        { id: 'E-023', name: 'Anti-Bribery Training Records', type: 'Training', standardIds: ['iso37001'], clauseRefs: ['7.2', '7.3', 'A.6.3'], status: 'in-review', owner: 'HR', due: '2026-05-31', notes: '' },
        { id: 'E-024', name: 'Internal Audit Programme & Schedule', type: 'Plan', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso45001', 'iso37001', 'iso50001'], clauseRefs: ['9.2', 'A.5.35'], status: 'in-review', owner: 'Internal Audit', due: '2026-05-31', notes: '' },
        { id: 'E-025', name: 'Internal Audit Reports (ISMS/PIMS)', type: 'Report', standardIds: ['iso27001', 'iso27701'], clauseRefs: ['9.2', '10.1', 'A.5.35', 'A.5.36'], status: 'not-started', owner: 'Internal Audit', due: '2026-07-15', notes: '' },
        { id: 'E-026', name: 'Internal Audit Report (ABMS)', type: 'Report', standardIds: ['iso37001'], clauseRefs: ['9.2', '10.1'], status: 'not-started', owner: 'Internal Audit', due: '2026-07-15', notes: '' },
        { id: 'E-027', name: 'Internal Audit Reports (ITSMS/OHS)', type: 'Report', standardIds: ['iso20000', 'iso45001'], clauseRefs: ['9.2', '10.1'], status: 'not-started', owner: 'Internal Audit', due: '2026-07-15', notes: '' },
        { id: 'E-028', name: 'Internal Audit Report (EnMS)', type: 'Report', standardIds: ['iso50001'], clauseRefs: ['9.2', '10.1'], status: 'not-started', owner: 'Internal Audit', due: '2026-07-15', notes: '' },
        { id: 'E-029', name: 'Management Review Minutes (All)', type: 'Record', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso45001', 'iso37001', 'iso50001'], clauseRefs: ['9.3'], status: 'not-started', owner: 'Top Management', due: '2026-07-31', notes: '' },
        { id: 'E-030', name: 'NCR Log & Corrective Action Records', type: 'Register', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso45001', 'iso37001', 'iso50001'], clauseRefs: ['10.1', '10.2', 'A.5.27', 'A.5.28'], status: 'not-started', owner: 'Internal Audit', due: '2026-09-30', notes: '' },
        { id: 'E-031', name: 'Emergency Response Procedures', type: 'Procedure', standardIds: ['iso45001'], clauseRefs: ['8.2', 'A.5.24', 'A.5.26', 'A.5.29', 'A.7.4'], status: 'approved', owner: 'HR', due: '2026-04-30', notes: '' },
        { id: 'E-032', name: 'Incident Management Procedure', type: 'Procedure', standardIds: ['iso27001', 'iso20000'], clauseRefs: ['8.1', 'A.5.24', 'A.5.25', 'A.5.26', 'A.5.27', 'A.5.28', 'A.6.8', 'A.8.15', 'A.8.16'], status: 'approved', owner: 'IT Security', due: '2026-04-30', notes: '' },
        { id: 'E-033', name: 'Access Control & User Management', type: 'Procedure', standardIds: ['iso27001', 'iso27701'], clauseRefs: ['8.1', 'A.5.15', 'A.5.16', 'A.5.17', 'A.5.18', 'A.8.2', 'A.8.3', 'A.8.5'], status: 'in-review', owner: 'IT Security', due: '2026-05-31', notes: '' },
        { id: 'E-034', name: 'Procurement Procedure (ABMS)', type: 'Procedure', standardIds: ['iso37001'], clauseRefs: ['8.1', '8.3', 'A.5.19', 'A.5.20', 'A.5.21'], status: 'in-review', owner: 'Legal', due: '2026-05-31', notes: '' },
        { id: 'E-035', name: 'Legal & Regulatory Requirements Register', type: 'Register', standardIds: ['iso27001', 'iso45001', 'iso50001'], clauseRefs: ['4.2', '6.1', 'A.5.31', 'A.5.32', 'A.5.33'], status: 'in-review', owner: 'Legal', due: '2026-05-31', notes: 'Covers UU ITE, PP PSTE, K3, energy regs.' },
      ],

      // ── OPERATIONAL: NCRs ────────────────────────────────────────────────────
      ncrs: [
        {
          id: 'NCR-001', standardId: 'iso27001', clauseRef: '6.1.2', phase: 'Internal Audit', severity: 'major', auditor: 'Internal Audit', date: '2026-06-15',
          finding: 'Risk assessment does not cover Batam PoP assets. Excluded without justification.',
          containment: 'Scope expanded. Interim review conducted.',
          rootCause: 'Risk assessment procedure lacked asset inventory reconciliation step.',
          method: '5-Why', correctiveAction: 'Update risk assessment procedure. Conduct complete risk assessment incl. Batam PoP.',
          caOwner: 'IT Security', caDue: '2026-07-10', verification: '', verifier: '', verDate: '', status: 'in-progress', notes: '',
          riskIds: ['R-001'], evidenceIds: ['E-011', 'E-015']
        },
        {
          id: 'NCR-002', standardId: 'iso27701', clauseRef: '7.2.1', phase: 'Internal Audit', severity: 'minor', auditor: 'Internal Audit', date: '2026-06-15',
          finding: 'PII processing records do not include cross-border transfer activities to SG and AU subsidiaries.',
          containment: 'Cross-border transfer register created as interim measure.',
          rootCause: 'Privacy procedure predates UU PDP enforcement (Oct 2024).',
          method: '5-Why', correctiveAction: 'Revise PII processing records. Document all cross-border PII flows.',
          caOwner: 'Legal', caDue: '2026-07-15', verification: '', verifier: '', verDate: '', status: 'in-progress', notes: '',
          riskIds: ['R-004'], evidenceIds: ['E-016']
        },
        {
          id: 'NCR-003', standardId: 'iso37001', clauseRef: '8.7', phase: 'Internal Audit', severity: 'major', auditor: 'Internal Audit', date: '2026-06-20',
          finding: 'Bribery risk assessment does not cover Telin USA. FCPA exposure not evaluated.',
          containment: 'USA flagged as high-priority scope extension. Legal notified.',
          rootCause: 'ABMS scope excluded international subsidiaries without risk-based justification.',
          method: '5-Why', correctiveAction: 'Extend ABMS scope to Telin USA and HK. Conduct bribery risk assessment for both. Notify CB of scope change.',
          caOwner: 'Legal', caDue: '2026-07-05', verification: '', verifier: '', verDate: '', status: 'open', notes: 'CRITICAL — CB must be notified.',
          riskIds: ['R-005'], evidenceIds: ['E-012']
        },
        {
          id: 'NCR-004', standardId: 'iso20000', clauseRef: '8.3.3', phase: 'Internal Audit', severity: 'minor', auditor: 'Internal Audit', date: '2026-06-22',
          finding: 'Configuration management records for 3 network devices at Singapore PoP are outdated.',
          containment: 'Configuration audit of Singapore PoP initiated.',
          rootCause: 'No automated config compliance check existed.',
          method: '5-Why', correctiveAction: 'Implement automated config audit schedule in ITSM tool.',
          caOwner: 'IT Security', caDue: '2026-07-20', verification: '', verifier: '', verDate: '', status: 'in-progress', notes: '',
          riskIds: ['R-008'], evidenceIds: ['E-019']
        },
        {
          id: 'NCR-005', standardId: 'iso50001', clauseRef: '6.3', phase: 'Internal Audit', severity: 'major', auditor: 'Internal Audit', date: '2026-06-25',
          finding: 'Energy baseline not established. EnPIs not defined. Foundational EnMS elements missing.',
          containment: 'Energy data collection from facilities management initiated.',
          rootCause: 'Programme timeline underestimated complexity. No EMR appointed.',
          method: 'Fishbone (Ishikawa)', correctiveAction: 'Appoint EMR. Conduct energy review. Establish baseline from 12-month historical data. Define EnPIs.',
          caOwner: 'Facility Mgmt', caDue: '2026-07-01', verification: '', verifier: '', verDate: '', status: 'open', notes: 'CRITICAL for new cert.',
          riskIds: ['R-009'], evidenceIds: ['E-014', 'E-020']
        },
        {
          id: 'NCR-006', standardId: 'iso45001', clauseRef: '6.1.2', phase: 'Internal Audit', severity: 'minor', auditor: 'Internal Audit', date: '2026-06-22',
          finding: 'HIRA does not include diving operations and working-at-height on cable ships.',
          containment: 'Interim JSA prepared for upcoming cable maintenance.',
          rootCause: 'HIRA scoped to office/land activities only.',
          method: '5-Why', correctiveAction: 'Expand HIRA to include marine/offshore operations. Engage specialist OHS consultant.',
          caOwner: 'HR', caDue: '2026-07-15', verification: '', verifier: '', verDate: '', status: 'in-progress', notes: '',
          riskIds: ['R-011'], evidenceIds: ['E-013']
        },
      ],

      // ── OPERATIONAL: risks ───────────────────────────────────────────────────
      risks: [
        { id: 'R-001', standardIds: ['iso27001', 'iso27701'], category: 'Information Security', title: 'Ransomware attack on TOCC network', description: 'Ransomware targeting TOCC could disrupt 24/7 network surveillance across 65 PoPs.', clauseRef: '6.1.2', likelihood: 3, impact: 5, controls: 'EDR/XDR deployed; network segmentation; backup; IR plan.', residualL: 2, residualI: 4, treatment: 'treat', owner: 'IT Security', reviewDate: '2026-09-30', treatmentPlan: 'Deploy zero-trust network architecture. Complete TOCC network segmentation Q3 2026.', status: 'mitigating', notes: '', ncrIds: ['NCR-001'] },
        { id: 'R-002', standardIds: ['iso27001', 'iso27701'], category: 'Privacy / PII', title: 'UU PDP non-compliance — PII breach notification failure', description: 'Failure to notify within 14 days. IDR 60B fine per violation.', clauseRef: '6.1.2', likelihood: 3, impact: 5, controls: 'Incident response procedure; basic breach log.', residualL: 2, residualI: 5, treatment: 'treat', owner: 'Legal', reviewDate: '2026-06-30', treatmentPlan: 'Implement automated breach detection. Appoint DPO. Run breach simulation.', status: 'open', notes: 'UU PDP enforcement started Oct 2024.', ncrIds: [] },
        { id: 'R-003', standardIds: ['iso27001'], category: 'Third-Party / Supply Chain', title: 'Submarine cable equipment supplier compromise', description: 'Supply chain attack via network equipment from submarine cable suppliers.', clauseRef: '6.1.2', likelihood: 2, impact: 5, controls: 'Vendor assessment; equipment inspection; network monitoring.', residualL: 2, residualI: 4, treatment: 'treat', owner: 'IT Security', reviewDate: '2026-09-30', treatmentPlan: 'Implement NIST CSF 2.0 supply chain controls. Technical audit of key equipment suppliers.', status: 'mitigating', notes: '', ncrIds: [] },
        { id: 'R-004', standardIds: ['iso27701'], category: 'Privacy / PII', title: 'Cross-border PII transfer without adequate safeguards', description: 'PII transferred ID→SG→HK→AU→USA without documented transfer mechanisms.', clauseRef: '7.2.1', likelihood: 3, impact: 4, controls: 'Data mapping in progress. Some transfer agreements exist.', residualL: 2, residualI: 4, treatment: 'treat', owner: 'Legal', reviewDate: '2026-07-15', treatmentPlan: 'Complete cross-border data mapping. Implement SCCs for each jurisdiction pair.', status: 'open', notes: 'Linked to NCR-002.', ncrIds: ['NCR-002'] },
        { id: 'R-005', standardIds: ['iso37001'], category: 'Bribery & Corruption', title: 'FCPA violation by Telin USA — DOJ enforcement', description: 'Criminal liability risk. DOJ actively investigates SOE subsidiaries.', clauseRef: '8.7', likelihood: 2, impact: 5, controls: 'Anti-bribery policy. Gift register at HQ level.', residualL: 1, residualI: 5, treatment: 'treat', owner: 'Legal', reviewDate: '2026-06-15', treatmentPlan: 'Extend ABMS scope to USA. FCPA risk assessment. Engage US counsel. FCPA training.', status: 'open', notes: 'CRITICAL. Linked to NCR-003.', ncrIds: ['NCR-003'] },
        { id: 'R-006', standardIds: ['iso37001'], category: 'Bribery & Corruption', title: 'Procurement bribery in network infrastructure contracts', description: 'Large-value procurement contracts create significant bribery risk in high-risk jurisdictions.', clauseRef: '8.7', likelihood: 3, impact: 4, controls: 'Procurement policy. Tender committee.', residualL: 2, residualI: 3, treatment: 'treat', owner: 'Legal', reviewDate: '2026-07-30', treatmentPlan: 'Mandatory ABMS due diligence for all procurement >IDR 1B. Anti-bribery clauses in all contracts.', status: 'mitigating', notes: '', ncrIds: [] },
        { id: 'R-007', standardIds: ['iso20000'], category: 'IT Service Continuity', title: 'SLA breach for hyperscaler transit services', description: 'Service disruption could breach SLA with hyperscaler clients (AWS, Google, Microsoft).', clauseRef: '8.1', likelihood: 2, impact: 4, controls: 'Redundant cable routes; TOCC 24/7 monitoring; incident management.', residualL: 1, residualI: 4, treatment: 'treat', owner: 'IT Security', reviewDate: '2026-09-30', treatmentPlan: 'Implement ISO 22301 BCMS (2027). Quarterly cable route failover tests.', status: 'mitigating', notes: 'ISO 22301 strongly recommended.', ncrIds: [] },
        { id: 'R-008', standardIds: ['iso20000'], category: 'IT Service Continuity', title: 'Change management failure causing service outage', description: 'Inadequately managed changes across 65 PoPs risk unplanned outages.', clauseRef: '8.5', likelihood: 3, impact: 3, controls: 'Change management procedure; CAB process.', residualL: 2, residualI: 3, treatment: 'treat', owner: 'IT Security', reviewDate: '2026-07-30', treatmentPlan: 'Automated change validation in ITSM tool. Enforce emergency change protocol.', status: 'mitigating', notes: '', ncrIds: ['NCR-004'] },
        { id: 'R-009', standardIds: ['iso50001'], category: 'Energy Performance', title: 'Energy baseline not established — EnMS new cert failure', description: 'No baseline/EnPIs before Stage 1 audit = Major NC = certification failure.', clauseRef: '6.3', likelihood: 4, impact: 5, controls: 'Energy data collection initiated.', residualL: 2, residualI: 5, treatment: 'treat', owner: 'Facility Mgmt', reviewDate: '2026-07-01', treatmentPlan: 'Appoint EMR. Collect 12-month energy data. Establish baseline and EnPIs by June 30.', status: 'open', notes: 'CRITICAL. Linked to NCR-005.', ncrIds: ['NCR-005'] },
        { id: 'R-010', standardIds: ['iso50001'], category: 'Legal & Regulatory', title: 'Regulatory non-compliance — energy conservation mandate', description: 'PP ESDM requires EnMS for organizations >6,000 toe/year. Telin data centers likely exceed threshold.', clauseRef: '4.2', likelihood: 3, impact: 4, controls: 'EnMS programme initiated.', residualL: 1, residualI: 4, treatment: 'treat', owner: 'Facility Mgmt', reviewDate: '2026-08-30', treatmentPlan: 'Confirm energy figures vs. threshold. File statutory energy conservation report with Kementerian ESDM.', status: 'mitigating', notes: '', ncrIds: [] },
        { id: 'R-011', standardIds: ['iso45001'], category: 'Occupational Health & Safety', title: 'Submarine cable maintenance — diving fatality', description: 'Commercial diving: high consequence, low probability. Criminal liability if fatality.', clauseRef: '6.1.2', likelihood: 1, impact: 5, controls: 'Diving contractor OHS assessment; basic JSA.', residualL: 1, residualI: 5, treatment: 'treat', owner: 'HR', reviewDate: '2026-07-15', treatmentPlan: 'Expand HIRA to marine ops. Pre-qualify diving contractors on ISO 45001 criteria.', status: 'open', notes: 'Linked to NCR-006.', ncrIds: ['NCR-006'] },
        { id: 'R-012', standardIds: ['iso45001'], category: 'Legal & Regulatory', title: 'SMK3 audit failure — Indonesia statutory requirement', description: 'PP 50/2012 mandatory government OHS audit every 3 years — separate from ISO 45001.', clauseRef: '9.1.2', likelihood: 2, impact: 4, controls: 'ISO 45001 programme in place. SMK3 cross-mapping initiated.', residualL: 1, residualI: 3, treatment: 'treat', owner: 'HR', reviewDate: '2026-09-30', treatmentPlan: 'Map ISO 45001 to PP 50/2012 SMK3. Schedule Kemnaker audit separately.', status: 'mitigating', notes: 'SMK3 is a SEPARATE government audit.', ncrIds: [] },
        { id: 'R-016', standardIds: ['iso20000', 'iso22301'], category: 'IT Service Continuity', title: 'Hyperscaler SLA breach due to dual submarine cable cut', description: 'Concurrent cuts traversing Pacific routes causing wholesale transit degradation. Loss exceeds 15m RTO leading to SLA penalty offsets.', clauseRef: '8.2.2', likelihood: 2, impact: 5, controls: 'BGP multi-homing; diverse core rings.', residualL: 2, residualI: 4, treatment: 'treat', owner: 'Operations', reviewDate: '2026-06-30', treatmentPlan: 'Engage partner IRU swaps. Validate automated NeuTrafiX platform rerouting. ISO 22301 BIA integration.', status: 'mitigating', notes: 'Commercial integration required.', ncrIds: [] },
        // Cross-cutting
        { id: 'R-013', standardIds: ['iso27001', 'iso27701', 'iso20000', 'iso22301', 'iso45001', 'iso37001', 'iso50001'], category: 'Reputational', title: 'CB audit Major NC — certificate suspension', description: 'Unresolved Major NCs → certificate suspension → hyperscaler contract breach, PSE regulatory impact.', clauseRef: '10.1', likelihood: 2, impact: 5, controls: 'Internal audit programme. NCR tracker. Consultant engagement.', residualL: 1, residualI: 4, treatment: 'treat', owner: 'Internal Audit', reviewDate: '2026-10-31', treatmentPlan: 'Resolve all Tier 1 NCRs before Stage 1. Build Audit Readiness Self-Assessment. Mock CB audit June 2026.', status: 'mitigating', notes: 'Master risk — all other risks feed into this.', ncrIds: [] },
        { id: 'R-014', standardIds: ['iso27001', 'iso37001'], category: 'Legal & Regulatory', title: 'CFIUS/Team Telecom action against Telin USA', description: 'US gov could revoke FCC Section 214 authority. Precedent: China Telecom USA 2021.', clauseRef: '4.2', likelihood: 2, impact: 5, controls: 'FCC licence maintained. Legal counsel engaged.', residualL: 1, residualI: 5, treatment: 'treat', owner: 'Legal', reviewDate: '2026-07-30', treatmentPlan: 'Engage US telecom regulatory counsel. Maintain FCPA/ABMS programme. Prepare network security agreement.', status: 'open', notes: 'CRITICAL risk unique to Telin as SOE in USA.', ncrIds: [] },
        { id: 'R-015', standardIds: ['iso27001'], category: 'Legal & Regulatory', title: 'SOCI Act (Australia) — CIRMP non-compliance', description: 'CIRMP obligation as Australian carrier. Civil penalties AUD 250,000+.', clauseRef: '4.2', likelihood: 3, impact: 4, controls: 'ISO 27001 programme. SOCI CIRMP status unclear.', residualL: 2, residualI: 4, treatment: 'treat', owner: 'Legal', reviewDate: '2026-06-30', treatmentPlan: 'Confirm Telin Australia CIRMP obligation. Map ISO 27001 controls to CIRMP. File CIRMP with Australian Gov.', status: 'open', notes: 'Separate statutory obligation from ISO 27001.', ncrIds: [] },
      ],

      // ── OPERATIONAL: legal requirements ──────────────────────────────────────
      legalReqs: [
        { id: 'LR-001', jurisdiction: 'ID', name: 'UU No. 27/2022 — Perlindungan Data Pribadi (PDP)', type: 'mandatory', priority: 'critical', standardIds: ['iso27001', 'iso27701'], clause: '4.2,9.1.2', status: 'partial', owner: 'Legal', lastReview: '2026-03-01', nextReview: '2026-06-01', frequency: 'Quarterly', evidence: 'Gap assessment in progress. DPO not yet appointed.', action: 'Complete gap assessment. Appoint DPO. Implement 14-day breach SOP.', notes: 'Fine up to IDR 60B per violation.' },
        { id: 'LR-002', jurisdiction: 'ID', name: 'UU No. 11/2008 jo. 19/2016 — ITE', type: 'mandatory', priority: 'high', standardIds: ['iso27001', 'iso27701'], clause: '4.2', status: 'compliant', owner: 'Legal', lastReview: '2026-01-15', nextReview: '2026-07-15', frequency: 'Semi-annual', evidence: 'Legal review completed. ITE compliance embedded in ISMS policy.', action: '', notes: '' },
        { id: 'LR-003', jurisdiction: 'ID', name: 'PP No. 71/2019 — PSTE', type: 'mandatory', priority: 'critical', standardIds: ['iso27001', 'iso27701'], clause: '4.2,9.1.2', status: 'compliant', owner: 'IT Security', lastReview: '2026-02-01', nextReview: '2026-08-01', frequency: 'Semi-annual', evidence: 'PSE registration active. Annual security assessment submitted.', action: 'Maintain PSE registration.', notes: '' },
        { id: 'LR-004', jurisdiction: 'ID', name: 'UU No. 36/1999 — Telekomunikasi', type: 'mandatory', priority: 'high', standardIds: ['iso20000'], clause: '4.2', status: 'compliant', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-07-01', frequency: 'Semi-annual', evidence: 'TNOL and TSOL licences active.', action: '', notes: '' },
        { id: 'LR-005', jurisdiction: 'ID', name: 'PP No. 50/2012 — SMK3', type: 'mandatory', priority: 'critical', standardIds: ['iso45001'], clause: '4.2,9.1.2', status: 'partial', owner: 'HR', lastReview: '2026-02-01', nextReview: '2026-05-01', frequency: 'Quarterly', evidence: 'ISO 45001 in progress. SMK3 cross-mapping incomplete.', action: 'Map ISO 45001 to SMK3. Schedule Kemnaker audit separately.', notes: 'SEPARATE government audit — not replaced by ISO 45001 CB.' },
        { id: 'LR-006', jurisdiction: 'ID', name: 'PP ESDM — Energy Conservation (>6,000 toe/year)', type: 'mandatory', priority: 'high', standardIds: ['iso50001'], clause: '4.2,9.1.2', status: 'not-assessed', owner: 'Facility Mgmt', lastReview: '', nextReview: '2026-06-01', frequency: 'Annual', evidence: 'Energy consumption data not yet compiled.', action: 'Confirm consumption vs. threshold. File statutory report if applicable.', notes: '' },
        { id: 'LR-007', jurisdiction: 'ID', name: 'UU No. 31/1999 jo. 20/2001 — Tipikor + KPK', type: 'mandatory', priority: 'critical', standardIds: ['iso37001'], clause: '4.2,6.1', status: 'partial', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-07-01', frequency: 'Semi-annual', evidence: 'Anti-bribery policy exists. ABMS recertification in progress.', action: 'Strengthen Tipikor controls aligned with ISO 37001. Functional whistleblower channel.', notes: 'BUMN under heightened KPK scrutiny.' },
        { id: 'LR-008', jurisdiction: 'ID', name: 'Kementerian BUMN GCG Guidelines (PER-09/MBU/2012)', type: 'mandatory', priority: 'high', standardIds: ['iso27001', 'iso37001'], clause: '5.1,5.3', status: 'compliant', owner: 'Top Management', lastReview: '2026-01-01', nextReview: '2026-07-01', frequency: 'Annual', evidence: 'Annual GCG self-assessment submitted.', action: '', notes: '' },
        { id: 'LR-009', jurisdiction: 'SG', name: 'PDPA 2012 amended 2020 (Singapore)', type: 'mandatory', priority: 'critical', standardIds: ['iso27701'], clause: '4.2,8.2', status: 'partial', owner: 'Legal', lastReview: '2026-02-01', nextReview: '2026-05-01', frequency: 'Quarterly', evidence: 'ISO 27701 in progress. 3-day PDPC breach notification not formally documented.', action: 'Implement 3-day breach SOP. Register with PDPC.', notes: 'PDPC recognizes ISO 27701 as PDPA accountability evidence.' },
        { id: 'LR-010', jurisdiction: 'SG', name: 'Cybersecurity Act 2018 — CII (Telecom)', type: 'mandatory', priority: 'critical', standardIds: ['iso27001'], clause: '4.2,9.1.2', status: 'partial', owner: 'IT Security', lastReview: '2026-02-01', nextReview: '2026-05-01', frequency: 'Quarterly', evidence: 'ISO 27001 in progress. CII designation status needs confirmation.', action: 'Confirm CII designation with CSA. Map controls to CII CoP. Ensure 2-hour incident reporting.', notes: '' },
        { id: 'LR-011', jurisdiction: 'HK', name: 'PDPO Cap. 486 amended 2021 (Hong Kong)', type: 'mandatory', priority: 'critical', standardIds: ['iso27701'], clause: '4.2,8.2', status: 'partial', owner: 'Legal', lastReview: '2026-02-01', nextReview: '2026-05-01', frequency: 'Quarterly', evidence: 'ISO 27701 in progress. Cross-border transfer HK→ID needs Section 33 review.', action: 'Conduct PDPO Section 33 cross-border transfer assessment. Implement DPA with HQ.', notes: '' },
        { id: 'LR-012', jurisdiction: 'HK', name: 'Prevention of Bribery Ordinance (ICAC) Cap. 201', type: 'mandatory', priority: 'critical', standardIds: ['iso37001'], clause: '4.2,8.7', status: 'partial', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-06-01', frequency: 'Semi-annual', evidence: 'ISO 37001 ABMS in progress. HK-specific bribery risk not yet assessed.', action: 'Include HK in bribery risk assessment. Train HK staff on ICAC.', notes: '' },
        { id: 'LR-013', jurisdiction: 'TW', name: 'PDPA Taiwan 2010 amended 2023', type: 'mandatory', priority: 'high', standardIds: ['iso27701'], clause: '4.2,8.2', status: 'monitoring', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-07-01', frequency: 'Semi-annual', evidence: 'ISO 27701 addresses most PDPA-TW requirements.', action: 'Conduct Taiwan PDPA-specific review for Telin TW.', notes: '' },
        { id: 'LR-014', jurisdiction: 'AU', name: 'SOCI Act 2018 amended 2022 (Australia)', type: 'mandatory', priority: 'critical', standardIds: ['iso27001'], clause: '4.2,6.1,8.1', status: 'not-assessed', owner: 'Legal', lastReview: '', nextReview: '2026-05-31', frequency: 'Annual', evidence: 'ISO 27001 in progress. CIRMP obligation not confirmed.', action: 'URGENT: Confirm CIRMP obligation with AU legal counsel. Register assets with AU Government. Develop CIRMP.', notes: 'Civil penalties AUD 250,000+. 12-hour serious incident notification.' },
        { id: 'LR-015', jurisdiction: 'AU', name: 'Privacy Act 1988 (Cth) — APPs', type: 'mandatory', priority: 'critical', standardIds: ['iso27701'], clause: '4.2,8.2', status: 'partial', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-06-01', frequency: 'Quarterly', evidence: 'ISO 27701 provides framework. NDB SOP not formally documented.', action: 'Implement NDB scheme SOP (30-day window). Conduct APP compliance review.', notes: 'OAIC fines up to AUD 50M.' },
        { id: 'LR-016', jurisdiction: 'AU', name: 'WHS Act 2011 (Australia)', type: 'mandatory', priority: 'high', standardIds: ['iso45001'], clause: '4.2,8.1', status: 'partial', owner: 'HR', lastReview: '2026-01-01', nextReview: '2026-06-01', frequency: 'Semi-annual', evidence: 'ISO 45001 in progress.', action: 'WHS compliance gap assessment for Telin AU staff and contractors.', notes: '' },
        { id: 'LR-017', jurisdiction: 'US', name: 'Foreign Corrupt Practices Act (FCPA)', type: 'mandatory', priority: 'critical', standardIds: ['iso37001'], clause: '4.2,8.7', status: 'partial', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-05-31', frequency: 'Quarterly', evidence: 'ISO 37001 in progress. USA NOT yet in ABMS scope document.', action: 'URGENT: Extend ABMS scope to Telin USA. FCPA-specific risk assessment. Engage US FCPA counsel. FCPA training for all USA staff.', notes: 'DOJ prosecutes SOE subsidiaries. Criminal conviction risk. NO statute of limitations for willful violations.' },
        { id: 'LR-018', jurisdiction: 'US', name: 'FCC Section 214 + CPNI Rules (47 CFR §64)', type: 'mandatory', priority: 'critical', standardIds: ['iso27001', 'iso27701'], clause: '4.2,9.1.2', status: 'partial', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-05-31', frequency: 'Annual', evidence: 'FCC Section 214 active. Annual CPNI certification status needs confirmation.', action: 'Confirm CPNI annual certification (Feb deadline). Implement CPNI-compliant data handling.', notes: 'Annual CPNI certification mandatory. Failure = enforcement action.' },
        { id: 'LR-019', jurisdiction: 'US', name: 'CFIUS / Team Telecom Review (FCC-DOJ-DHS-DoD)', type: 'mandatory', priority: 'critical', standardIds: ['iso27001', 'iso37001'], clause: '4.2', status: 'monitoring', owner: 'Legal', lastReview: '2026-01-01', nextReview: '2026-07-01', frequency: 'Semi-annual', evidence: 'No active CFIUS review. Monitoring.', action: 'Engage US telecom regulatory counsel. Monitor Team Telecom proceeding.', notes: 'SOE ownership = elevated CFIUS risk. China Telecom USA revoked 2021.' },
      ],

      // ── OPERATIONAL: checklist responses ──────────────────────────────────────
      checklistResponses: {},  // {`${standardId}-${idx}`: {finding, evidenceSampled, notes, auditor, auditDate}}
    };
  }

  // ─── STORE PERSISTENCE ─────────────────────────────────────────────────────────
  function _getStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return buildDefaultStore();
      const parsed = JSON.parse(raw);
      if (parsed._version !== SCHEMA_VERSION) return _migrate(parsed);
      return parsed;
    } catch (e) {
      console.error('[GRCStore] Parse error, returning default:', e);
      return buildDefaultStore();
    }
  }

  // ─── BIDIRECTIONAL LINK SYNC ──────────────────────────────────────────────────
  function _syncBidirectionalLinks(store) {
    // Ensure ncr.riskIds ↔ risk.ncrIds are always mirrored
    var ncrRiskMap = {};  // riskId → [ncrId, ...]
    (store.ncrs || []).forEach(function(ncr) {
      (ncr.riskIds || []).forEach(function(rid) {
        if (!ncrRiskMap[rid]) ncrRiskMap[rid] = [];
        if (ncrRiskMap[rid].indexOf(ncr.id) === -1) ncrRiskMap[rid].push(ncr.id);
      });
    });
    store.risks = (store.risks || []).map(function(r) {
      return Object.assign({}, r, { ncrIds: ncrRiskMap[r.id] || [] });
    });
  }

  function _saveStore(store) {
    _syncBidirectionalLinks(store);
    var violations = validateIntegrity(store);
    if (violations.length > 0) {
      console.warn('[GRCStore] Integrity warnings on save:', violations);
    }
    store._lastModified = new Date().toISOString();
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
      _emit('change', store);
    } catch (e) {
      console.error('[GRCStore] Save error:', e);
      throw new Error('GRCStore: localStorage write failed. Check available space.');
    }
  }

  function _migrate(old) {
    console.warn('[GRCStore] Schema version mismatch. Returning default store (migration stub).');
    return buildDefaultStore();
  }

  // ─── EVENT BUS ─────────────────────────────────────────────────────────────────
  const _listeners = {};
  function _emit(event, data) {
    (_listeners[event] || []).forEach(fn => { try { fn(data); } catch (e) { } });
  }

  // ─── INTEGRITY ENGINE ──────────────────────────────────────────────────────────
  /**
   * Validate all FK references in the store.
   * Returns array of integrity violations.
   */
  function validateIntegrity(store) {
    const violations = [];
    const stdIds = new Set(REF_STANDARDS.map(s => s.id));
    const jurIds = new Set(Object.keys(REF_JURISDICTIONS));
    const evidenceIds = new Set((store.evidence || []).map(e => e.id));
    const riskIds = new Set((store.risks || []).map(r => r.id));
    const ncrIds = new Set((store.ncrs || []).map(n => n.id));

    // evidence → standards
    (store.evidence || []).forEach(ev => {
      (ev.standardIds || []).forEach(sid => {
        if (!stdIds.has(sid)) violations.push({ entity: 'evidence', id: ev.id, field: 'standardIds', value: sid, msg: `FK violation: standard '${sid}' not found` });
      });
    });

    // ncrs → standard
    (store.ncrs || []).forEach(ncr => {
      if (!stdIds.has(ncr.standardId)) violations.push({ entity: 'ncrs', id: ncr.id, field: 'standardId', value: ncr.standardId, msg: `FK violation: standard '${ncr.standardId}' not found` });
      (ncr.riskIds || []).forEach(rid => {
        if (!riskIds.has(rid)) violations.push({ entity: 'ncrs', id: ncr.id, field: 'riskIds', value: rid, msg: `FK violation: risk '${rid}' not found` });
      });
      (ncr.evidenceIds || []).forEach(eid => {
        if (!evidenceIds.has(eid)) violations.push({ entity: 'ncrs', id: ncr.id, field: 'evidenceIds', value: eid, msg: `FK violation: evidence '${eid}' not found` });
      });
    });

    // risks → standards
    (store.risks || []).forEach(r => {
      (r.standardIds || []).forEach(sid => {
        if (!stdIds.has(sid)) violations.push({ entity: 'risks', id: r.id, field: 'standardIds', value: sid, msg: `FK violation: standard '${sid}' not found` });
      });
      (r.ncrIds || []).forEach(nid => {
        if (!ncrIds.has(nid)) violations.push({ entity: 'risks', id: r.id, field: 'ncrIds', value: nid, msg: `Dangling FK: NCR '${nid}' not found` });
      });
    });

    // legalReqs → jurisdictions + standards
    (store.legalReqs || []).forEach(lr => {
      if (!jurIds.has(lr.jurisdiction)) violations.push({ entity: 'legalReqs', id: lr.id, field: 'jurisdiction', value: lr.jurisdiction, msg: `FK violation: jurisdiction '${lr.jurisdiction}' not found` });
      (lr.standardIds || []).forEach(sid => {
        if (!stdIds.has(sid)) violations.push({ entity: 'legalReqs', id: lr.id, field: 'standardIds', value: sid, msg: `FK violation: standard '${sid}' not found` });
      });
    });

    return violations;
  }

  // ─── CASCADE DELETE HELPERS ────────────────────────────────────────────────────
  function _cascadeOnDeleteEvidence(store, evidenceId) {
    // Pull evidenceId from all ncrs.evidenceIds[]
    store.ncrs = (store.ncrs || []).map(ncr => ({
      ...ncr,
      evidenceIds: (ncr.evidenceIds || []).filter(eid => eid !== evidenceId)
    }));
  }

  function _cascadeOnDeleteRisk(store, riskId) {
    // Pull riskId from all ncrs.riskIds[]
    store.ncrs = (store.ncrs || []).map(ncr => ({
      ...ncr,
      riskIds: (ncr.riskIds || []).filter(rid => rid !== riskId)
    }));
  }

  function _cascadeOnDeleteNCR(store, ncrId) {
    // Pull ncrId from all risks.ncrIds[]
    store.risks = (store.risks || []).map(r => ({
      ...r,
      ncrIds: (r.ncrIds || []).filter(nid => nid !== ncrId)
    }));
  }

  // ─── DATA QUALITY ENGINE ───────────────────────────────────────────────────────
  function calcDataQuality(store) {
    const results = {};

    const checkCompleteness = (items, requiredFields) => {
      if (!items || items.length === 0) return { score: 0, total: 0, complete: 0 };
      let complete = 0;
      items.forEach(item => {
        const allPresent = requiredFields.every(f => {
          const v = item[f];
          return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
        });
        if (allPresent) complete++;
      });
      return { score: Math.round(complete / items.length * 100), total: items.length, complete };
    };

    results.evidence = checkCompleteness(store.evidence, ['name', 'type', 'standardIds', 'clauseRefs', 'status', 'owner', 'due']);
    results.ncrs = checkCompleteness(store.ncrs, ['standardId', 'clauseRef', 'severity', 'finding', 'rootCause', 'correctiveAction', 'caOwner', 'caDue']);
    results.risks = checkCompleteness(store.risks, ['title', 'standardIds', 'likelihood', 'impact', 'controls', 'residualL', 'residualI', 'treatment', 'owner', 'treatmentPlan']);
    results.legalReqs = checkCompleteness(store.legalReqs, ['name', 'jurisdiction', 'standardIds', 'status', 'owner', 'nextReview']);

    // Timeliness: % of items with nextReview/due in the future or no date
    const today = new Date();
    const timeliness = (items, dateField) => {
      if (!items || items.length === 0) return 100;
      const overdue = items.filter(i => i[dateField] && new Date(i[dateField]) < today && i.status !== 'approved' && i.status !== 'closed' && i.status !== 'compliant').length;
      return Math.round((1 - overdue / items.length) * 100);
    };
    results.timeliness = {
      evidence: timeliness(store.evidence, 'due'),
      ncrs: timeliness(store.ncrs, 'caDue'),
      legalReqs: timeliness(store.legalReqs, 'nextReview'),
    };

    // Consistency: check for orphaned NCR-Risk links (bidirectional)
    const riskMap = {};
    (store.risks || []).forEach(r => { riskMap[r.id] = r; });
    let consistent = 0, inconsistent = 0;
    (store.ncrs || []).forEach(ncr => {
      (ncr.riskIds || []).forEach(rid => {
        const risk = riskMap[rid];
        if (risk && (risk.ncrIds || []).includes(ncr.id)) consistent++;
        else inconsistent++;
      });
    });
    results.consistency = inconsistent === 0 ? 100 : Math.round(consistent / (consistent + inconsistent) * 100);

    return results;
  }

  // ─── PUBLIC API ────────────────────────────────────────────────────────────────
  const GRCStore = {

    // Reference data (immutable)
    STANDARDS: REF_STANDARDS,
    JURISDICTIONS: REF_JURISDICTIONS,
    SCHEMAS: SCHEMAS,

    // Audit Logging Engine
    logAction(userId, role, action, entityId, details) {
      const store = _getStore();
      const log = {
        id: 'L-' + Date.now() + '-' + Math.floor(Math.random()*1000),
        userId: userId,
        userRole: role,
        action: action,
        entityId: entityId,
        timestamp: new Date().toISOString(),
        details: details || ''
      };
      store.auditLogs = store.auditLogs || [];
      store.auditLogs.unshift(log); // newest first
      if (store.auditLogs.length > 500) {
        store.auditLogs = store.auditLogs.slice(0, 500);
      }
      // Force direct save without integrity check to avoid recursion logic loops
      store._lastModified = new Date().toISOString();
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
      _emit('change', store);
    },

    // ── Read ──────────────────────────────────────────────────────────────────
    get() { return _getStore(); },
    getUsers() { return _getStore().users || []; },
    getAuditLogs() { return _getStore().auditLogs || []; },

    getStandard(id) { return REF_STANDARDS.find(s => s.id === id); },

    // ── Milestones ────────────────────────────────────────────────────────────
    getMilestones(standardId) {
      const store = _getStore();
      return (store.milestones || {})[standardId] || [];
    },
    updateMilestone(standardId, milestoneId, patch) {
      const store = _getStore();
      if (!store.milestones[standardId]) throw new Error(`Standard '${standardId}' not found`);
      store.milestones[standardId] = store.milestones[standardId].map(m =>
        m.id === milestoneId ? { ...m, ...patch } : m
      );
      _saveStore(store);
    },

    // ── Documents ─────────────────────────────────────────────────────────────
    getDocuments(standardId) {
      const store = _getStore();
      return (store.documents || {})[standardId] || [];
    },

    // ── Evidence ──────────────────────────────────────────────────────────────
    getEvidence(filter = {}) {
      const store = _getStore();
      let items = store.evidence || [];
      if (filter.standardId) items = items.filter(e => (e.standardIds || []).includes(filter.standardId));
      if (filter.status) items = items.filter(e => e.status === filter.status);
      return items;
    },
    upsertEvidence(item) {
      const store = _getStore();
      const sanitized = _sanitize(item);
      const idx = (store.evidence || []).findIndex(e => e.id === sanitized.id);
      const isUpdate = idx >= 0;
      _validate('evidence', sanitized, isUpdate);
      if (isUpdate) { store.evidence[idx] = { ...store.evidence[idx], ...sanitized }; }
      else { store.evidence = [...(store.evidence || []), { id: nextId('E'), ...sanitized }]; }
      _saveStore(store);
    },
    deleteEvidence(evidenceId) {
      const store = _getStore();
      store.evidence = (store.evidence || []).filter(e => e.id !== evidenceId);
      _cascadeOnDeleteEvidence(store, evidenceId);
      _saveStore(store);
    },

    // ── NCRs ──────────────────────────────────────────────────────────────────
    getNCRs(filter = {}) {
      const store = _getStore();
      let items = store.ncrs || [];
      if (filter.standardId) items = items.filter(n => n.standardId === filter.standardId);
      if (filter.status) items = items.filter(n => n.status === filter.status);
      return items;
    },
    upsertNCR(item) {
      const store = _getStore();
      const sanitized = _sanitize(item);
      const idx = (store.ncrs || []).findIndex(n => n.id === sanitized.id);
      const isUpdate = idx >= 0;
      _validate('ncrs', sanitized, isUpdate);
      if (isUpdate) { store.ncrs[idx] = { ...store.ncrs[idx], ...sanitized }; }
      else { store.ncrs = [...(store.ncrs || []), { id: nextId('NCR'), riskIds: [], evidenceIds: [], ...sanitized }]; }
      _saveStore(store);
    },
    deleteNCR(ncrId) {
      const store = _getStore();
      store.ncrs = (store.ncrs || []).filter(n => n.id !== ncrId);
      _cascadeOnDeleteNCR(store, ncrId);
      _saveStore(store);
    },

    // ── Risks ─────────────────────────────────────────────────────────────────
    getRisks(filter = {}) {
      const store = _getStore();
      let items = store.risks || [];
      if (filter.standardId) items = items.filter(r => (r.standardIds || []).includes(filter.standardId));
      return items;
    },
    upsertRisk(item) {
      const store = _getStore();
      const sanitized = _sanitize(item);
      const idx = (store.risks || []).findIndex(r => r.id === sanitized.id);
      const isUpdate = idx >= 0;
      _validate('risks', sanitized, isUpdate);
      if (isUpdate) { store.risks[idx] = { ...store.risks[idx], ...sanitized }; }
      else { store.risks = [...(store.risks || []), { id: nextId('R'), ncrIds: [], ...sanitized }]; }
      _saveStore(store);
    },
    deleteRisk(riskId) {
      const store = _getStore();
      store.risks = (store.risks || []).filter(r => r.id !== riskId);
      _cascadeOnDeleteRisk(store, riskId);
      _saveStore(store);
    },

    // ── Legal Requirements ────────────────────────────────────────────────────
    getLegalReqs(filter = {}) {
      const store = _getStore();
      let items = store.legalReqs || [];
      if (filter.jurisdiction) items = items.filter(l => l.jurisdiction === filter.jurisdiction);
      if (filter.standardId) items = items.filter(l => (l.standardIds || []).includes(filter.standardId));
      return items;
    },
    upsertLegalReq(item) {
      const store = _getStore();
      const sanitized = _sanitize(item);
      const idx = (store.legalReqs || []).findIndex(l => l.id === sanitized.id);
      const isUpdate = idx >= 0;
      _validate('legalReqs', sanitized, isUpdate);
      if (isUpdate) { store.legalReqs[idx] = { ...store.legalReqs[idx], ...sanitized }; }
      else { store.legalReqs = [...(store.legalReqs || []), { id: nextId('LR'), ...sanitized }]; }
      _saveStore(store);
    },
    deleteLegalReq(id) {
      const store = _getStore();
      store.legalReqs = (store.legalReqs || []).filter(l => l.id !== id);
      _saveStore(store);
    },

    // ── Checklist Responses ───────────────────────────────────────────────────
    getChecklistResponse(standardId, idx) {
      const store = _getStore();
      return (store.checklistResponses || {})[`${standardId}-${idx}`] || { finding: 'not-checked', evidenceSampled: '', notes: '' };
    },
    setChecklistResponse(standardId, idx, resp) {
      const store = _getStore();
      if (!store.checklistResponses) store.checklistResponses = {};
      store.checklistResponses[`${standardId}-${idx}`] = resp;
      _saveStore(store);
    },

    // ── Integrity & Quality ───────────────────────────────────────────────────
    validateIntegrity() { return validateIntegrity(_getStore()); },
    calcDataQuality() { return calcDataQuality(_getStore()); },
    getDataStats() {
      const store = _getStore();
      return {
        evidence: (store.evidence || []).length,
        ncrs: (store.ncrs || []).length,
        risks: (store.risks || []).length,
        legalReqs: (store.legalReqs || []).length,
        milestones: Object.values(store.milestones || {}).reduce((a, v) => a + v.length, 0),
        documents: Object.values(store.documents || {}).reduce((a, v) => a + v.length, 0),
      };
    },

    // ── Event Bus ─────────────────────────────────────────────────────────────
    on(event, fn) { _listeners[event] = [...(_listeners[event] || []), fn]; },
    off(event, fn) { _listeners[event] = (_listeners[event] || []).filter(f => f !== fn); },

    // ── Danger Zone ───────────────────────────────────────────────────────────
    reset() {
      localStorage.removeItem(STORE_KEY);
      console.info('[GRCStore] Store reset to defaults.');
      _emit('change', buildDefaultStore());
    },
    exportJSON() { return JSON.stringify(_getStore(), null, 2); },
    importJSON(json) {
      const parsed = JSON.parse(json);
      if (parsed._version !== SCHEMA_VERSION) throw new Error('Import rejected: schema version mismatch (expected ' + SCHEMA_VERSION + ', got ' + parsed._version + ')');
      // Validate all entities against schemas
      ['evidence', 'ncrs', 'risks', 'legalReqs'].forEach(function(entity) {
        (parsed[entity] || []).forEach(function(item) { _validate(entity, item, false); });
      });
      const violations = validateIntegrity(parsed);
      if (violations.length > 0) throw new Error('Import rejected: ' + violations.length + ' integrity violation(s). Fix before importing.');
      _saveStore(parsed);
    },
  };

  // Expose globally
  global.GRCStore = GRCStore;

})(typeof window !== 'undefined' ? window : this);
