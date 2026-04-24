
const STANDARDS_DATA = [
  {
    id: 'iso27001',
    code: 'ISO/IEC 27001:2022',
    name: 'Information Security Management',
    abbr: 'ISMS',
    certType: 'Surveillance 1',
    color: '#2563EB',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, owner: 'Konsultan 1', status: 'done' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, owner: 'Konsultan 1', status: 'in-progress' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 17.4, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'ISMS Policy', status: 'approved' },
      { name: 'Risk Assessment', status: 'in-review' },
      { name: 'Statement of Applicability', status: 'in-review' },
      { name: 'Internal Audit Report', status: 'not-started' },
    ]
  },
  {
    id: 'iso27701',
    code: 'ISO/IEC 27701:2019',
    name: 'Privacy Information Management',
    abbr: 'PIMS',
    certType: 'Surveillance 1',
    color: '#7C3AED',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, owner: 'Konsultan 1', status: 'done' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, owner: 'Konsultan 1', status: 'in-progress' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 18, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 22, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'Privacy Policy', status: 'approved' },
      { name: 'PII Processing Records', status: 'in-review' },
      { name: 'Data Subject Rights Procedure', status: 'draft' },
      { name: 'Internal Audit Report', status: 'not-started' },
    ]
  },
  {
    id: 'iso37001',
    code: 'ISO 37001:2016',
    name: 'Anti-Bribery Management',
    abbr: 'ABMS',
    certType: 'New Certification',
    color: '#DC2626',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 2, owner: 'Konsultan 2', status: 'done' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 10.7, durationWeeks: 6, owner: 'Konsultan 2', status: 'in-progress' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 17, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 23, durationWeeks: 1, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm7', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'Anti-Bribery Policy', status: 'approved' },
      { name: 'ABMS Procedure', status: 'in-review' },
      { name: 'Due Diligence Records', status: 'draft' },
      { name: 'Management Review Minutes', status: 'not-started' },
    ]
  },
  {
    id: 'iso20000',
    code: 'ISO/IEC 20000-1:2018',
    name: 'IT Service Management',
    abbr: 'ITSMS',
    certType: 'Surveillance 2',
    color: '#059669',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 9, durationWeeks: 3, owner: 'Konsultan 2', status: 'done' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 12, durationWeeks: 5, owner: 'Konsultan 2', status: 'in-progress' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 17.4, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'Service Management Policy', status: 'approved' },
      { name: 'Service Level Agreements', status: 'in-review' },
      { name: 'Incident Management Procedure', status: 'approved' },
      { name: 'Internal Audit Report', status: 'not-started' },
    ]
  },
  {
    id: 'iso50001',
    code: 'ISO 50001:2018',
    name: 'Energy Management',
    abbr: 'EnMS',
    certType: 'Readiness / Initial Certification',
    color: '#D97706',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 8.7, durationWeeks: 3, owner: 'Konsultan 1', status: 'in-progress' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 7, owner: 'Konsultan 1', status: 'not-started' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 18.7, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 22, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 24, durationWeeks: 1, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm7', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'Energy Policy', status: 'draft' },
      { name: 'Energy Review & Baseline', status: 'draft' },
      { name: 'Energy Objectives & Targets', status: 'not-started' },
      { name: 'EnPIs & Measurement Plan', status: 'not-started' },
      { name: 'Internal Audit Report', status: 'not-started' },
    ]
  },
  {
    id: 'iso45001',
    code: 'ISO 45001:2018',
    name: 'Occupational Health & Safety',
    abbr: 'OHSMS',
    certType: 'Surveillance 2',
    color: '#0891B2',
    milestones: [
      { id: 'm1', name: 'Gap Analysis', phase: 1, startWeek: 9.7, durationWeeks: 2, owner: 'Konsultan 2', status: 'done' },
      { id: 'm2', name: 'Document Review & Update', phase: 1, startWeek: 11.7, durationWeeks: 5, owner: 'Konsultan 2', status: 'in-progress' },
      { id: 'm3', name: 'Internal Audit', phase: 1, startWeek: 17.7, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm4', name: 'Management Review', phase: 1, startWeek: 21, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm5', name: 'Surveillance Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
      { id: 'm6', name: 'Closing NCR/Findings', phase: 2, startWeek: 29, durationWeeks: 1, owner: 'Internal Audit', status: 'not-started' },
    ],
    documents: [
      { name: 'OH&S Policy', status: 'approved' },
      { name: 'Hazard Identification & Risk Assessment', status: 'in-review' },
      { name: 'Emergency Response Plan', status: 'approved' },
      { name: 'Internal Audit Report', status: 'not-started' },
    ]
  },
  {
    id: 'iso22301',
    code: 'ISO 22301:2019',
    name: 'Business Continuity Management',
    abbr: 'BCMS',
    certType: 'Surveillance 2',
    color: '#B91C1C',
    milestones: [
      { id: 'm1', name: 'Scope & Business Impact Analysis (BIA)', phase: 1, startWeek: 8.7, durationWeeks: 4, owner: 'Konsultan 1', status: 'done' },
      { id: 'm2', name: 'Business Continuity Strategy Definition', phase: 1, startWeek: 12.7, durationWeeks: 3, owner: 'Top Management', status: 'in-progress' },
      { id: 'm3', name: 'BCP Formulation & Procedures Update', phase: 1, startWeek: 15.7, durationWeeks: 4, owner: 'Konsultan 1', status: 'not-started' },
      { id: 'm4', name: 'Submarine/TOCC Continuity Exercise', phase: 2, startWeek: 20, durationWeeks: 2, owner: 'IT Security', status: 'not-started' },
      { id: 'm5', name: 'Internal Audit', phase: 2, startWeek: 22, durationWeeks: 3, owner: 'Internal Audit', status: 'not-started' },
      { id: 'm6', name: 'Stage 1 Audit (CB)', phase: 2, startWeek: 25, durationWeeks: 1, owner: 'CB', status: 'not-started' },
      { id: 'm7', name: 'Stage 2 Audit (CB)', phase: 2, startWeek: 26, durationWeeks: 3, owner: 'CB', status: 'not-started' },
    ],
    documents: [
      { name: 'Business Continuity Policy', status: 'in-review' },
      { name: 'Business Impact Analysis (Submarine & Wholesale)', status: 'draft' },
      { name: 'Business Continuity Plans (BCP)', status: 'not-started' },
      { name: 'Exercise & Testing Reports', status: 'not-started' },
    ]
  },
];

// Project timeline: Apr 1 = week 0, Oct 31 = week ~30
// Phase 1: Week 0-17 (Apr 1 - Jul 31)
// Phase 2: Week 18-30 (Aug 1 - Oct 31)
// Current: April 19 = week ~2.7

const PROJECT_META = {
  org: 'Telin',
  projectName: 'Multi-Standard ISO Certification Programme 2026',
  phase1: { label: 'Phase 1 — Jasa Konsultan', start: 'Apr 2026', end: 'Jul 2026', startWeek: 0, endWeek: 17 },
  phase2: { label: 'Phase 2 — Certification Body Audit', start: 'Aug 2026', end: 'Oct 2026', startWeek: 18, endWeek: 30 },
  currentWeek: 2.7,
  totalWeeks: 30,
  consultants: ['Konsultan 1', 'Konsultan 2'],
  internalAudit: 'Internal Audit Team',
  cb: 'Certification Body'
};
