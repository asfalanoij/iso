
// ─── ISO CROSSWALK DATA ────────────────────────────────────────────────────
// HLS = High Level Structure (ISO Directives Part 1, Annex SL)
// All 7 standards follow HLS clauses 4–10 with standard-specific additions.

const STD_META = {
  iso27001: { code: 'ISO/IEC 27001:2022', abbr: 'ISMS',   color: '#2563EB', short: '27001' },
  iso27701: { code: 'ISO/IEC 27701:2019', abbr: 'PIMS',   color: '#7C3AED', short: '27701' },
  iso22301: { code: 'ISO 22301:2019',     abbr: 'BCMS',   color: '#B91C1C', short: '22301' },
  iso20000: { code: 'ISO/IEC 20000-1:2018', abbr: 'ITSMS', color: '#059669', short: '20000' },
  iso45001: { code: 'ISO 45001:2018',     abbr: 'OHSMS',  color: '#0891B2', short: '45001' },
  iso37001: { code: 'ISO 37001:2025',     abbr: 'ABMS',   color: '#DC2626', short: '37001' },
  iso50001: { code: 'ISO 50001:2018',     abbr: 'EnMS',   color: '#D97706', short: '50001' },
};

// Coverage types: 'full' | 'partial' | 'extended' | 'na'
// ref: the actual clause ref in that standard (may differ from HLS ref)
const HLS_CLAUSES = [
  {
    section: '4', title: 'Context of the Organization',
    clauses: [
      {
        ref: '4.1', title: 'Understanding the organization and its context',
        mapping: {
          iso22301: { ref: '4.1', coverage: 'full', note: 'Context of the organization for BCMS' },
          iso27001: { ref: '4.1', coverage: 'full', note: 'Internal/external issues relevant to ISMS purpose' },
          iso27701: { ref: '4.1 + 5.2.1', coverage: 'extended', note: 'Extends 27001; adds PII-processing context' },
          iso37001: { ref: '4.1', coverage: 'extended', note: 'Issues relevant to bribery risk + Climate Change impact (2025)' },
          iso20000: { ref: '4.1', coverage: 'full', note: 'Internal/external context for SMS' },
          iso50001: { ref: '4.1', coverage: 'full', note: 'Organizational context for energy management' },
          iso45001: { ref: '4.1', coverage: 'full', note: 'External/internal issues affecting OHS outcomes' },
        }
      },
      {
        ref: '4.2', title: 'Needs & expectations of interested parties',
        mapping: {
          iso22301: { ref: '4.2', coverage: 'full', note: 'Needs and expectations of interested parties for BCMS' },
          iso27001: { ref: '4.2', coverage: 'full', note: 'Interested parties & their requirements' },
          iso27701: { ref: '4.2 + 5.2.2', coverage: 'extended', note: 'Adds PII principals and data protection authorities' },
          iso37001: { ref: '4.2', coverage: 'full', note: 'Includes governing body, employees, business associates' },
          iso20000: { ref: '4.2', coverage: 'full', note: 'Customers, users, regulators' },
          iso50001: { ref: '4.2', coverage: 'full', note: 'Energy-related interested parties' },
          iso45001: { ref: '4.2', coverage: 'full', note: 'Workers, contractors, regulators, communities' },
        }
      },
      {
        ref: '4.3', title: 'Determining the scope',
        mapping: {
          iso22301: { ref: '4.3', coverage: 'full', note: 'Scope of the BCMS' },
          iso27001: { ref: '4.3', coverage: 'full', note: 'ISMS scope: boundaries, applicability' },
          iso27701: { ref: '4.3 + 5.2.3', coverage: 'extended', note: 'PIMS scope extends ISMS; must include PII processing' },
          iso37001: { ref: '4.3', coverage: 'full', note: 'Scope of ABMS; high-risk activities' },
          iso20000: { ref: '4.3', coverage: 'full', note: 'Services within scope of SMS' },
          iso50001: { ref: '4.3', coverage: 'full', note: 'Boundaries & interfaces of EnMS' },
          iso45001: { ref: '4.3', coverage: 'full', note: 'OHS scope: activities, workers, locations' },
        }
      },
      {
        ref: '4.4', title: 'Management system and its processes',
        mapping: {
          iso22301: { ref: '4.4', coverage: 'full', note: 'BCMS and its processes' },
          iso27001: { ref: '4.4', coverage: 'full', note: 'Establish, implement, maintain, improve ISMS' },
          iso27701: { ref: '4.4 + 5.2.4', coverage: 'extended', note: 'PIMS built on ISMS; privacy-specific processes added' },
          iso37001: { ref: '4.4', coverage: 'full', note: 'ABMS processes established per scope' },
          iso20000: { ref: '4.4', coverage: 'full', note: 'SMS processes and interactions defined' },
          iso50001: { ref: '4.4', coverage: 'full', note: 'EnMS and its integration with business processes' },
          iso45001: { ref: '4.4', coverage: 'full', note: 'OH&SMS processes and their interactions' },
        }
      },
    ]
  },
  {
    section: '5', title: 'Leadership',
    clauses: [
      {
        ref: '5.1', title: 'Leadership and commitment',
        mapping: {
          iso22301: { ref: '5.1', coverage: 'full', note: 'Leadership and commitment for BCMS' },
          iso27001: { ref: '5.1', coverage: 'full', note: 'Top management accountable for ISMS effectiveness' },
          iso27701: { ref: '5.1 + 5.3.1', coverage: 'extended', note: 'Privacy leadership; DPO role may apply' },
          iso37001: { ref: '5.1.1 + 5.1.2 + 5.1.3', coverage: 'extended', note: 'Governing body (5.1.2) and NEW Anti-bribery culture (5.1.3)' },
          iso20000: { ref: '5.1', coverage: 'full', note: 'Customer focus; service management commitment' },
          iso50001: { ref: '5.1', coverage: 'full', note: 'Energy performance commitment; resource provision' },
          iso45001: { ref: '5.1', coverage: 'full', note: 'Worker participation; leading by example' },
        }
      },
      {
        ref: '5.2', title: 'Policy',
        mapping: {
          iso22301: { ref: '5.2', coverage: 'full', note: 'Business continuity policy' },
          iso27001: { ref: '5.2', coverage: 'full', note: 'Information Security Policy' },
          iso27701: { ref: '5.2 + 5.3.2', coverage: 'extended', note: 'Privacy/PII Policy as extension or separate' },
          iso37001: { ref: '5.2', coverage: 'full', note: 'Anti-Bribery Policy; zero-tolerance statement' },
          iso20000: { ref: '5.2', coverage: 'full', note: 'Service Management Policy' },
          iso50001: { ref: '5.2', coverage: 'full', note: 'Energy Policy; commitment to energy improvement' },
          iso45001: { ref: '5.2', coverage: 'full', note: 'OH&S Policy; safe work commitment' },
        }
      },
      {
        ref: '5.3', title: 'Organizational roles, responsibilities & authorities',
        mapping: {
          iso22301: { ref: '5.3', coverage: 'full', note: 'Organizational roles, responsibilities and authorities' },
          iso27001: { ref: '5.3', coverage: 'full', note: 'CISO/ISMS Manager roles defined' },
          iso27701: { ref: '5.3 + 5.3.3', coverage: 'extended', note: 'Privacy Officer / DPO; controller vs processor roles' },
          iso37001: { ref: '5.3 + 5.3.3', coverage: 'extended', note: 'Includes Anti-bribery function (5.3.3) with direct Board access' },
          iso20000: { ref: '5.3', coverage: 'full', note: 'Service owner, process owner roles' },
          iso50001: { ref: '5.3', coverage: 'full', note: 'Energy team; management representative' },
          iso45001: { ref: '5.3', coverage: 'full', note: 'OHS roles at all levels; workers\' roles' },
        }
      },
      {
        ref: '5.4', title: 'Consultation and participation of workers',
        mapping: {
          iso22301: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso27001: { ref: '—', coverage: 'na', note: 'Not a separate clause in 27001' },
          iso27701: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso37001: { ref: '—', coverage: 'na', note: 'Covered under 7.3 Awareness' },
          iso20000: { ref: '—', coverage: 'na', note: 'Not a separate clause' },
          iso50001: { ref: '—', coverage: 'na', note: 'Not a separate clause' },
          iso45001: { ref: '5.4', coverage: 'full', note: 'Unique to 45001; mandatory worker consultation mechanisms' },
        }
      },
    ]
  },
  {
    section: '6', title: 'Planning',
    clauses: [
      {
        ref: '6.1', title: 'Actions to address risks and opportunities',
        mapping: {
          iso22301: { ref: '6.1', coverage: 'full', note: 'Actions to address risks and opportunities' },
          iso27001: { ref: '6.1.1–6.1.3', coverage: 'extended', note: 'InfoSec risk assessment & treatment; SoA required' },
          iso27701: { ref: '6.1 + 5.4', coverage: 'extended', note: 'Privacy risk adds to 27001 risk process' },
          iso37001: { ref: '6.1 + 4.5', coverage: 'extended', note: 'Bribery risk assessment (4.5); documented methodology required' },
          iso20000: { ref: '6.1', coverage: 'full', note: 'Risks to service delivery and SMS objectives' },
          iso50001: { ref: '6.1', coverage: 'full', note: 'Risks to EnMS; energy-related risks and opportunities' },
          iso45001: { ref: '6.1.1–6.1.4', coverage: 'extended', note: 'Hazard ID, OHS risk assessment, legal requirements, action planning' },
        }
      },
      {
        ref: '6.2', title: 'Objectives and plans to achieve them',
        mapping: {
          iso22301: { ref: '6.2', coverage: 'full', note: 'Business continuity objectives and planning' },
          iso27001: { ref: '6.2', coverage: 'full', note: 'InfoSec objectives; measurable, monitored' },
          iso27701: { ref: '6.2 + 5.4.2', coverage: 'extended', note: 'Privacy objectives added; KPIs for PII protection' },
          iso37001: { ref: '6.2', coverage: 'full', note: 'ABMS objectives; anti-bribery KPIs' },
          iso20000: { ref: '6.2', coverage: 'full', note: 'Service management objectives aligned to policy' },
          iso50001: { ref: '6.2', coverage: 'full', note: 'Energy objectives & targets; EnPIs baseline' },
          iso45001: { ref: '6.2', coverage: 'full', note: 'OHS objectives; safety performance targets' },
        }
      },
      {
        ref: '6.3', title: 'Planning of changes',
        mapping: {
          iso22301: { ref: '6.3', coverage: 'full', note: 'Planning of changes to the BCMS' },
          iso27001: { ref: '6.3', coverage: 'full', note: 'Managing changes to ISMS systematically' },
          iso27701: { ref: '6.3', coverage: 'full', note: 'Privacy impact of changes considered' },
          iso37001: { ref: '—', coverage: 'na', note: 'Change management implicit in 8.x' },
          iso20000: { ref: '8.5', coverage: 'partial', note: 'Change management is a dedicated service process (8.5)' },
          iso50001: { ref: '6.3', coverage: 'full', note: 'Changes affecting energy performance planned' },
          iso45001: { ref: '8.1.3', coverage: 'partial', note: 'Management of change under 8.1.3' },
        }
      },
      {
        ref: '6.4–6.9', title: 'Energy planning (EnMS-specific)',
        mapping: {
          iso22301: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso27001: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso27701: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso37001: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso20000: { ref: '—', coverage: 'na', note: 'Not applicable' },
          iso50001: { ref: '6.3–6.9', coverage: 'full', note: 'Energy review, EnPIs, baselines, data collection, action plans' },
          iso45001: { ref: '—', coverage: 'na', note: 'Not applicable' },
        }
      },
    ]
  },
  {
    section: '7', title: 'Support',
    clauses: [
      {
        ref: '7.1', title: 'Resources',
        mapping: {
          iso22301: { ref: '7.1', coverage: 'full', note: 'Resources for BCMS' },
          iso27001: { ref: '7.1', coverage: 'full', note: 'Resources for ISMS establishment & maintenance' },
          iso27701: { ref: '7.1', coverage: 'full', note: 'Resources for privacy operations' },
          iso37001: { ref: '7.1', coverage: 'full', note: 'Resources; compliance function adequately resourced (8.2)' },
          iso20000: { ref: '7.1', coverage: 'full', note: 'Resources for SMS; may include tools & infrastructure' },
          iso50001: { ref: '7.1', coverage: 'full', note: 'Human, financial, technology resources for EnMS' },
          iso45001: { ref: '7.1', coverage: 'full', note: 'Resources including first-aid, PPE, competent workers' },
        }
      },
      {
        ref: '7.2', title: 'Competence',
        mapping: {
          iso22301: { ref: '7.2', coverage: 'full', note: 'Competence' },
          iso27001: { ref: '7.2', coverage: 'full', note: 'InfoSec competence; training records' },
          iso27701: { ref: '7.2 + 5.5.2', coverage: 'extended', note: 'Privacy-specific competence (GDPR, data handling)' },
          iso37001: { ref: '7.2 + 7.3', coverage: 'extended', note: 'Anti-bribery competence; governing body training' },
          iso20000: { ref: '7.2', coverage: 'full', note: 'Service management competence; ITIL alignment' },
          iso50001: { ref: '7.2', coverage: 'full', note: 'Energy-related competence; energy team skills' },
          iso45001: { ref: '7.2', coverage: 'full', note: 'OHS competence at all levels including contractors' },
        }
      },
      {
        ref: '7.3', title: 'Awareness',
        mapping: {
          iso22301: { ref: '7.3', coverage: 'full', note: 'Awareness' },
          iso27001: { ref: '7.3', coverage: 'full', note: 'Security awareness program' },
          iso27701: { ref: '7.3 + 5.5.3', coverage: 'extended', note: 'Privacy awareness; data breach notification duties' },
          iso37001: { ref: '7.3 + 8.4', coverage: 'extended', note: 'Anti-bribery awareness; training programme mandatory' },
          iso20000: { ref: '7.3', coverage: 'full', note: 'SMS awareness across service teams' },
          iso50001: { ref: '7.3', coverage: 'full', note: 'Energy awareness; behavioral change programs' },
          iso45001: { ref: '7.3', coverage: 'full', note: 'OHS awareness; hazard, risk, emergency procedures' },
        }
      },
      {
        ref: '7.4', title: 'Communication',
        mapping: {
          iso22301: { ref: '7.4', coverage: 'full', note: 'Communication' },
          iso27001: { ref: '7.4', coverage: 'full', note: 'Internal/external InfoSec communication' },
          iso27701: { ref: '7.4 + 5.5.4', coverage: 'extended', note: 'PII breach communication; privacy notices' },
          iso37001: { ref: '7.4', coverage: 'full', note: 'Communication on anti-bribery matters' },
          iso20000: { ref: '7.4', coverage: 'full', note: 'Service communication plan; incident communications' },
          iso50001: { ref: '7.4', coverage: 'full', note: 'Internal energy communication; external optional' },
          iso45001: { ref: '7.4', coverage: 'full', note: 'OHS communication; incident reporting channels' },
        }
      },
      {
        ref: '7.5', title: 'Documented information',
        mapping: {
          iso22301: { ref: '7.5', coverage: 'full', note: 'Documented information' },
          iso27001: { ref: '7.5', coverage: 'full', note: 'Mandatory docs incl. SoA, risk register, policies' },
          iso27701: { ref: '7.5 + 5.5.5', coverage: 'extended', note: 'Privacy-specific records: PIA, PII processing agreements' },
          iso37001: { ref: '7.5', coverage: 'full', note: 'ABMS records; due diligence, gift/hospitality registers' },
          iso20000: { ref: '7.5', coverage: 'full', note: 'SMS documentation; service catalogue, SLAs, procedures' },
          iso50001: { ref: '7.5', coverage: 'full', note: 'EnMS documents; energy review, EnPI records' },
          iso45001: { ref: '7.5', coverage: 'full', note: 'OHS documents; risk assessments, training records, permits' },
        }
      },
    ]
  },
  {
    section: '8', title: 'Operation',
    clauses: [
      {
        ref: '8.1', title: 'Operational planning and control',
        mapping: {
          iso22301: { ref: '8.1', coverage: 'extended', note: 'Operational planning and control; Business Impact Analysis (8.2)' },
          iso27001: { ref: '8.1', coverage: 'full', note: 'Implementing InfoSec controls; change control' },
          iso27701: { ref: '8.1 + 5.6', coverage: 'extended', note: 'Privacy-by-design; PIA for high-risk processing' },
          iso37001: { ref: '8.1 + 8.2–8.11', coverage: 'extended', note: 'Procedures: due diligence (8.2), CoI (8.7), gifts (8.8), financial controls (8.3)' },
          iso20000: { ref: '8.1–8.8', coverage: 'extended', note: 'Service delivery processes: planning, control, configuration, change, release, incident, problem, service continuity' },
          iso50001: { ref: '8.1–8.3', coverage: 'extended', note: 'Operational controls; energy efficient design; energy procurement' },
          iso45001: { ref: '8.1.1–8.2', coverage: 'extended', note: 'Elimination of hazards; contractor management; emergency preparedness' },
        }
      },
      {
        ref: '8.2', title: 'Risk assessment / specific operational processes',
        mapping: {
          iso22301: { ref: '8.2', coverage: 'extended', note: 'Business Impact Analysis (BIA) and risk assessment' },
          iso27001: { ref: '8.2', coverage: 'full', note: 'Periodic InfoSec risk assessment; documented results' },
          iso27701: { ref: '8.2 + 5.6.2', coverage: 'extended', note: 'Privacy impact assessment; data subject rights processes' },
          iso37001: { ref: '4.5', coverage: 'partial', note: 'Bribery risk assessment moved to clause 4.5 in 2025' },
          iso20000: { ref: '8.2', coverage: 'full', note: 'Design & transition of new/changed services' },
          iso50001: { ref: '8.2', coverage: 'full', note: 'Energy performance in design of facilities/equipment' },
          iso45001: { ref: '8.1.2 + 8.2', coverage: 'extended', note: 'Hierarchy of controls; emergency response plans' },
        }
      },
      {
        ref: '8.3', title: 'Risk treatment / specific controls',
        mapping: {
          iso22301: { ref: '8.3', coverage: 'extended', note: 'Business continuity strategies and solutions' },
          iso27001: { ref: '8.3', coverage: 'full', note: 'InfoSec risk treatment plan; Annex A controls applied' },
          iso27701: { ref: '8.3 + 5.6.3', coverage: 'extended', note: 'PII controller obligations; processor agreements' },
          iso37001: { ref: '8.3–8.11', coverage: 'partial', note: 'Financial controls (8.3); CoI (8.7); Raising concerns (8.10); Investigating bribery (8.11)' },
          iso20000: { ref: '8.3', coverage: 'full', note: 'Asset management; configuration management' },
          iso50001: { ref: '8.3', coverage: 'full', note: 'Procurement of energy services, products, equipment' },
          iso45001: { ref: '8.1.3', coverage: 'partial', note: 'Management of change impacting OHS' },
        }
      },
    ]
  },
  {
    section: '9', title: 'Performance Evaluation',
    clauses: [
      {
        ref: '9.1', title: 'Monitoring, measurement, analysis and evaluation',
        mapping: {
          iso22301: { ref: '9.1', coverage: 'full', note: 'Monitoring, measurement, analysis and evaluation' },
          iso27001: { ref: '9.1', coverage: 'full', note: 'InfoSec performance monitoring; KPIs defined' },
          iso27701: { ref: '9.1 + 5.7.1', coverage: 'extended', note: 'Privacy KPIs; PII breach rates; rights response times' },
          iso37001: { ref: '9.1', coverage: 'full', note: 'ABMS performance; compliance function reporting to top mgt' },
          iso20000: { ref: '9.1', coverage: 'full', note: 'SLA performance; service reporting to customers' },
          iso50001: { ref: '9.1 + 9.1.1', coverage: 'extended', note: 'EnPI monitoring; energy consumption measurement; statutory compliance' },
          iso45001: { ref: '9.1 + 9.1.2', coverage: 'extended', note: 'OHS performance; injury rates; legal compliance evaluation' },
        }
      },
      {
        ref: '9.2', title: 'Internal audit',
        mapping: {
          iso22301: { ref: '9.2', coverage: 'full', note: 'Internal audit' },
          iso27001: { ref: '9.2', coverage: 'full', note: 'ISMS internal audit programme; independent auditors' },
          iso27701: { ref: '9.2 + 5.7.2', coverage: 'extended', note: 'Privacy audit; includes PII handling practices' },
          iso37001: { ref: '9.2', coverage: 'full', note: 'ABMS internal audit; covers bribery risk areas' },
          iso20000: { ref: '9.2', coverage: 'full', note: 'SMS internal audit; service process coverage' },
          iso50001: { ref: '9.2', coverage: 'full', note: 'EnMS internal audit; energy data verification' },
          iso45001: { ref: '9.2', coverage: 'full', note: 'OHS internal audit; workplace inspection integration' },
        }
      },
      {
        ref: '9.3', title: 'Management review',
        mapping: {
          iso22301: { ref: '9.3', coverage: 'full', note: 'Management review' },
          iso27001: { ref: '9.3', coverage: 'full', note: 'Annual ISMS management review; documented outputs' },
          iso27701: { ref: '9.3 + 5.7.3', coverage: 'extended', note: 'Privacy included in management review; DPO report' },
          iso37001: { ref: '9.3', coverage: 'extended', note: 'Governing body review of ABMS in addition to top management' },
          iso20000: { ref: '9.3', coverage: 'full', note: 'SMS management review; service performance reports' },
          iso50001: { ref: '9.3', coverage: 'extended', note: 'EnMS review includes energy performance trends; strategic energy decisions' },
          iso45001: { ref: '9.3', coverage: 'full', note: 'OH&SMS management review; injury/illness trends' },
        }
      },
    ]
  },
  {
    section: '10', title: 'Improvement',
    clauses: [
      {
        ref: '10.1', title: 'Nonconformity and corrective action',
        mapping: {
          iso22301: { ref: '10.1', coverage: 'full', note: 'Nonconformity and corrective action' },
          iso27001: { ref: '10.1', coverage: 'full', note: 'NCR process; root cause analysis; effectiveness check' },
          iso27701: { ref: '10.1 + 5.8.1', coverage: 'extended', note: 'Privacy NCR; breach notification within 72h (GDPR context)' },
          iso37001: { ref: '10.1', coverage: 'full', note: 'Bribery-related NCR; corrective & preventive actions' },
          iso20000: { ref: '10.1', coverage: 'full', note: 'SMS NCR; links to problem management process' },
          iso50001: { ref: '10.1', coverage: 'full', note: 'EnMS NCR; energy performance degradation treated as NC' },
          iso45001: { ref: '10.2', coverage: 'full', note: 'Incident investigation feeds NCR; corrective actions' },
        }
      },
      {
        ref: '10.2', title: 'Continual improvement',
        mapping: {
          iso22301: { ref: '10.2', coverage: 'full', note: 'Continual improvement' },
          iso27001: { ref: '10.2', coverage: 'full', note: 'ISMS continual improvement; objectives-driven' },
          iso27701: { ref: '10.2 + 5.8.2', coverage: 'extended', note: 'Privacy programme improvement; technology privacy advances' },
          iso37001: { ref: '10.2', coverage: 'full', note: 'ABMS improvement; lessons from investigations' },
          iso20000: { ref: '10.2', coverage: 'full', note: 'SMS improvement; CSI aligned with ITIL' },
          iso50001: { ref: '10.2', coverage: 'full', note: 'Continual energy performance improvement; verified savings' },
          iso45001: { ref: '10.3', coverage: 'full', note: 'OHS continual improvement; proactive safety culture' },
        }
      },
    ]
  }
];

// ─── ANNEX A CONTROL-LEVEL CROSSWALK (all 93 controls) ────────────────────────
// Each control maps to equivalent requirements across all 7 standards.
// applicableStandards: which standards this control is relevant to
// crossRef: equivalent clause in other standards
const ANNEX_CONTROL_CROSSWALK = [
  {
    category: 'A.5', title: 'Organizational controls', count: 37,
    controls: [
      { id: 'A.5.1', title: 'Policies for information security', applicableStandards: ['iso27001','iso27701','iso37001','iso22301','iso20000','iso45001','iso50001'], crossRef: { iso27701: '6.2.1.1', iso37001: '5.2', iso22301: '5.2', iso20000: '5.2', iso45001: '5.2', iso50001: '5.2' }, note: 'Every MS requires a policy; single integrated policy document can satisfy all' },
      { id: 'A.5.2', title: 'Information security roles and responsibilities', applicableStandards: ['iso27001','iso27701','iso37001','iso20000','iso45001','iso50001'], crossRef: { iso27701: '5.3.3', iso37001: '5.3', iso20000: '5.3', iso45001: '5.3', iso50001: '5.3' }, note: 'Roles matrix shared across all standards' },
      { id: 'A.5.3', title: 'Segregation of duties', applicableStandards: ['iso27001','iso27701','iso37001'], crossRef: { iso37001: '8.3' }, note: 'Financial controls require SoD; ABMS financial controls (8.3) parallel' },
      { id: 'A.5.4', title: 'Management responsibilities', applicableStandards: ['iso27001','iso27701','iso37001','iso20000','iso45001','iso50001'], crossRef: { iso37001: '5.1.1', iso45001: '5.1' }, note: 'Leadership commitment clause in every standard' },
      { id: 'A.5.5', title: 'Contact with authorities', applicableStandards: ['iso27001','iso27701','iso45001'], crossRef: { iso45001: '6.1.3' }, note: 'Regulatory liaison; OHS legal requirements; PDPC/OAIC notification' },
      { id: 'A.5.6', title: 'Contact with special interest groups', applicableStandards: ['iso27001'], crossRef: {}, note: 'ISMS-specific: threat intelligence communities, ISACs' },
      { id: 'A.5.7', title: 'Threat intelligence', applicableStandards: ['iso27001'], crossRef: {}, note: 'New in 2022; ISMS-specific cyber threat intelligence' },
      { id: 'A.5.8', title: 'Information security in project management', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '5.4.1' }, note: 'Privacy-by-design for PIMS projects' },
      { id: 'A.5.9', title: 'Inventory of information and other associated assets', applicableStandards: ['iso27001','iso27701','iso20000'], crossRef: { iso20000: '8.2.5' }, note: 'ITSMS asset management (8.2.5) parallel' },
      { id: 'A.5.10', title: 'Acceptable use of information and other associated assets', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'AUP; extends to PII handling for PIMS' },
      { id: 'A.5.11', title: 'Return of assets', applicableStandards: ['iso27001'], crossRef: {}, note: 'Offboarding process' },
      { id: 'A.5.12', title: 'Classification of information', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '6.5' }, note: 'PII classification as special category' },
      { id: 'A.5.13', title: 'Labelling of information', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'PII labelling for PIMS' },
      { id: 'A.5.14', title: 'Information transfer', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.5' }, note: 'Cross-border PII transfer for PIMS (7.5)' },
      { id: 'A.5.15', title: 'Access control', applicableStandards: ['iso27001','iso27701','iso20000'], crossRef: { iso27701: '6.6', iso20000: '8.7.3' }, note: 'ITSMS InfoSec management (8.7.3)' },
      { id: 'A.5.16', title: 'Identity management', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'User lifecycle management' },
      { id: 'A.5.17', title: 'Authentication information', applicableStandards: ['iso27001'], crossRef: {}, note: 'Password/credential management' },
      { id: 'A.5.18', title: 'Access rights', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'RBAC; PII access restriction for PIMS' },
      { id: 'A.5.19', title: 'Information security in supplier relationships', applicableStandards: ['iso27001','iso27701','iso37001','iso20000'], crossRef: { iso37001: '8.5', iso20000: '8.3.4' }, note: 'ABMS business associate controls (8.5); ITSMS supplier management (8.3.4)' },
      { id: 'A.5.20', title: 'Addressing information security within supplier agreements', applicableStandards: ['iso27001','iso27701','iso37001'], crossRef: { iso37001: '8.6' }, note: 'ABMS anti-bribery commitments in contracts (8.6)' },
      { id: 'A.5.21', title: 'Managing information security in the ICT supply chain', applicableStandards: ['iso27001'], crossRef: {}, note: 'Submarine cable equipment supplier security' },
      { id: 'A.5.22', title: 'Monitoring, review and change management of supplier services', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '8.3.4' }, note: 'ITSMS supplier management' },
      { id: 'A.5.23', title: 'Information security for use of cloud services', applicableStandards: ['iso27001'], crossRef: {}, note: 'New in 2022; cloud security posture management' },
      { id: 'A.5.24', title: 'Information security incident management planning and preparation', applicableStandards: ['iso27001','iso27701','iso20000','iso22301'], crossRef: { iso20000: '8.6.1', iso22301: '8.4' }, note: 'ITSMS incident management (8.6.1); BCMS response (8.4)' },
      { id: 'A.5.25', title: 'Assessment and decision on information security events', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'Triage; PII breach assessment for PIMS' },
      { id: 'A.5.26', title: 'Response to information security incidents', applicableStandards: ['iso27001','iso27701','iso20000','iso22301'], crossRef: { iso20000: '8.6.1', iso22301: '8.4.2' }, note: 'Coordinated response across ITSMS and BCMS' },
      { id: 'A.5.27', title: 'Learning from information security incidents', applicableStandards: ['iso27001','iso27701','iso20000'], crossRef: { iso20000: '8.6.3' }, note: 'Problem management (8.6.3) for root cause' },
      { id: 'A.5.28', title: 'Collection of evidence', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'Forensic evidence preservation' },
      { id: 'A.5.29', title: 'Information security during disruption', applicableStandards: ['iso27001','iso22301'], crossRef: { iso22301: '8.3' }, note: 'BCMS strategies and solutions (8.3)' },
      { id: 'A.5.30', title: 'ICT readiness for business continuity', applicableStandards: ['iso27001','iso22301','iso20000'], crossRef: { iso22301: '8.3', iso20000: '8.7.2' }, note: 'New in 2022; BCMS integration; ITSMS service continuity (8.7.2)' },
      { id: 'A.5.31', title: 'Legal, statutory, regulatory and contractual requirements', applicableStandards: ['iso27001','iso27701','iso37001','iso45001','iso50001'], crossRef: { iso45001: '6.1.3', iso37001: '4.2' }, note: 'OHS legal requirements (6.1.3); ABMS stakeholder requirements (4.2)' },
      { id: 'A.5.32', title: 'Intellectual property rights', applicableStandards: ['iso27001'], crossRef: {}, note: 'Software licensing; IP protection' },
      { id: 'A.5.33', title: 'Protection of records', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.4.7' }, note: 'PIMS retention (7.4.7); records management' },
      { id: 'A.5.34', title: 'Privacy and protection of PII', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.2' }, note: 'Primary PIMS control; UU PDP compliance' },
      { id: 'A.5.35', title: 'Independent review of information security', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'Internal audit independence' },
      { id: 'A.5.36', title: 'Compliance with policies, rules and standards for information security', applicableStandards: ['iso27001','iso27701','iso37001'], crossRef: { iso37001: '9.1' }, note: 'ABMS compliance monitoring (9.1)' },
      { id: 'A.5.37', title: 'Documented operating procedures', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '7.5.4' }, note: 'ITSMS documented information (7.5.4)' },
    ]
  },
  {
    category: 'A.6', title: 'People controls', count: 8,
    controls: [
      { id: 'A.6.1', title: 'Screening', applicableStandards: ['iso27001','iso27701','iso37001'], crossRef: { iso37001: '7.2' }, note: 'ABMS competence includes screening for bribery risk roles' },
      { id: 'A.6.2', title: 'Terms and conditions of employment', applicableStandards: ['iso27001','iso27701','iso37001','iso45001'], crossRef: { iso37001: '8.6', iso45001: '7.2' }, note: 'ABMS anti-bribery commitments (8.6); OHS worker competence' },
      { id: 'A.6.3', title: 'Information security awareness, education and training', applicableStandards: ['iso27001','iso27701','iso37001','iso20000','iso45001','iso50001'], crossRef: { iso37001: '7.3', iso45001: '7.3', iso50001: '7.3' }, note: 'Shared awareness programme across all standards' },
      { id: 'A.6.4', title: 'Disciplinary process', applicableStandards: ['iso27001','iso37001'], crossRef: { iso37001: '8.11' }, note: 'ABMS investigating and dealing with bribery (8.11)' },
      { id: 'A.6.5', title: 'Responsibilities after termination or change of employment', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'NDA enforcement; PII access revocation' },
      { id: 'A.6.6', title: 'Confidentiality or non-disclosure agreements', applicableStandards: ['iso27001','iso27701','iso37001'], crossRef: { iso37001: '8.6' }, note: 'ABMS anti-bribery commitments include NDA provisions' },
      { id: 'A.6.7', title: 'Remote working', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'Remote access security; PII handling off-site' },
      { id: 'A.6.8', title: 'Information security event reporting', applicableStandards: ['iso27001','iso27701','iso37001','iso45001'], crossRef: { iso37001: '8.10', iso45001: '10.2' }, note: 'ABMS raising concerns/whistleblowing (8.10); OHS incident reporting (10.2)' },
    ]
  },
  {
    category: 'A.7', title: 'Physical controls', count: 14,
    controls: [
      { id: 'A.7.1', title: 'Physical security perimeters', applicableStandards: ['iso27001','iso45001'], crossRef: { iso45001: '8.1.1' }, note: 'Data center perimeters; OHS workplace boundaries' },
      { id: 'A.7.2', title: 'Physical entry', applicableStandards: ['iso27001','iso45001'], crossRef: { iso45001: '8.1.1' }, note: 'Badge access; visitor management' },
      { id: 'A.7.3', title: 'Securing offices, rooms and facilities', applicableStandards: ['iso27001'], crossRef: {}, note: 'Server rooms, comms rooms, TOCC' },
      { id: 'A.7.4', title: 'Physical security monitoring', applicableStandards: ['iso27001','iso45001'], crossRef: { iso45001: '9.1.1' }, note: 'CCTV; OHS workplace monitoring' },
      { id: 'A.7.5', title: 'Protecting against physical and environmental threats', applicableStandards: ['iso27001','iso45001','iso22301'], crossRef: { iso45001: '8.2', iso22301: '8.2.3' }, note: 'OHS emergency preparedness; BCMS risk assessment' },
      { id: 'A.7.6', title: 'Working in secure areas', applicableStandards: ['iso27001'], crossRef: {}, note: 'Data center operational procedures' },
      { id: 'A.7.7', title: 'Clear desk and clear screen', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'PII protection on desktops' },
      { id: 'A.7.8', title: 'Equipment siting and protection', applicableStandards: ['iso27001','iso45001'], crossRef: { iso45001: '8.1.2' }, note: 'PoP equipment protection; OHS hazard elimination' },
      { id: 'A.7.9', title: 'Security of assets off-premises', applicableStandards: ['iso27001'], crossRef: {}, note: 'Mobile devices; off-site storage' },
      { id: 'A.7.10', title: 'Storage media', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.4.8' }, note: 'PIMS disposal (7.4.8); media sanitization' },
      { id: 'A.7.11', title: 'Supporting utilities', applicableStandards: ['iso27001','iso50001','iso22301'], crossRef: { iso50001: '8.1', iso22301: '8.3.3' }, note: 'Power/cooling; EnMS operational controls; BCMS resource requirements' },
      { id: 'A.7.12', title: 'Cabling security', applicableStandards: ['iso27001'], crossRef: {}, note: 'Critical for Telin submarine cable infrastructure' },
      { id: 'A.7.13', title: 'Equipment maintenance', applicableStandards: ['iso27001','iso45001','iso50001'], crossRef: { iso45001: '8.1.1', iso50001: '8.1' }, note: 'OHS maintenance safety; EnMS energy-efficient maintenance' },
      { id: 'A.7.14', title: 'Secure disposal or re-use of equipment', applicableStandards: ['iso27001','iso27701','iso50001'], crossRef: { iso27701: '7.4.8' }, note: 'PIMS PII disposal; EnMS equipment lifecycle' },
    ]
  },
  {
    category: 'A.8', title: 'Technological controls', count: 34,
    controls: [
      { id: 'A.8.1', title: 'User endpoint devices', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'MDM; PII protection on endpoints' },
      { id: 'A.8.2', title: 'Privileged access rights', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'PAM; PII system admin access' },
      { id: 'A.8.3', title: 'Information access restriction', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '6.6' }, note: 'PIMS access control (6.6)' },
      { id: 'A.8.4', title: 'Access to source code', applicableStandards: ['iso27001'], crossRef: {}, note: 'Source code repository controls' },
      { id: 'A.8.5', title: 'Secure authentication', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'MFA; PII system authentication' },
      { id: 'A.8.6', title: 'Capacity management', applicableStandards: ['iso27001','iso20000','iso50001'], crossRef: { iso20000: '8.4.3', iso50001: '8.2' }, note: 'ITSMS capacity management; EnMS design efficiency' },
      { id: 'A.8.7', title: 'Protection against malware', applicableStandards: ['iso27001'], crossRef: {}, note: 'EDR/XDR; anti-malware for TOCC' },
      { id: 'A.8.8', title: 'Management of technical vulnerabilities', applicableStandards: ['iso27001'], crossRef: {}, note: 'Vulnerability scanning; patch management' },
      { id: 'A.8.9', title: 'Configuration management', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '8.2.6' }, note: 'ITSMS configuration management (8.2.6)' },
      { id: 'A.8.10', title: 'Information deletion', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.4.5' }, note: 'PIMS PII de-identification/deletion (7.4.5)' },
      { id: 'A.8.11', title: 'Data masking', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.4.4' }, note: 'New in 2022; PIMS PII minimization (7.4.4)' },
      { id: 'A.8.12', title: 'Data leakage prevention', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '7.4.9' }, note: 'New in 2022; PIMS PII transmission controls (7.4.9)' },
      { id: 'A.8.13', title: 'Information backup', applicableStandards: ['iso27001','iso22301'], crossRef: { iso22301: '8.3' }, note: 'BCMS recovery strategies' },
      { id: 'A.8.14', title: 'Redundancy of information processing facilities', applicableStandards: ['iso27001','iso22301','iso20000'], crossRef: { iso22301: '8.3.3', iso20000: '8.7.1' }, note: 'BCMS resource requirements; ITSMS service availability' },
      { id: 'A.8.15', title: 'Logging', applicableStandards: ['iso27001','iso27701','iso20000'], crossRef: { iso20000: '9.1' }, note: 'Audit trails; ITSMS monitoring; PII access logging' },
      { id: 'A.8.16', title: 'Monitoring activities', applicableStandards: ['iso27001','iso27701','iso20000'], crossRef: { iso20000: '9.1' }, note: 'SIEM; TOCC network monitoring; ITSMS performance evaluation' },
      { id: 'A.8.17', title: 'Clock synchronization', applicableStandards: ['iso27001'], crossRef: {}, note: 'NTP for forensic correlation' },
      { id: 'A.8.18', title: 'Use of privileged utility programs', applicableStandards: ['iso27001'], crossRef: {}, note: 'System utility access controls' },
      { id: 'A.8.19', title: 'Installation of software on operational systems', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '8.5.3' }, note: 'ITSMS release and deployment (8.5.3)' },
      { id: 'A.8.20', title: 'Networks security', applicableStandards: ['iso27001'], crossRef: {}, note: 'Network segmentation; TOCC perimeter' },
      { id: 'A.8.21', title: 'Security of network services', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '8.7.3' }, note: 'ITSMS information security management' },
      { id: 'A.8.22', title: 'Segregation of networks', applicableStandards: ['iso27001'], crossRef: {}, note: 'VLAN segmentation; OT/IT separation' },
      { id: 'A.8.23', title: 'Web filtering', applicableStandards: ['iso27001'], crossRef: {}, note: 'New in 2022; URL filtering' },
      { id: 'A.8.24', title: 'Use of cryptography', applicableStandards: ['iso27001','iso27701'], crossRef: { iso27701: '6.7' }, note: 'PIMS cryptography (6.7); PII encryption' },
      { id: 'A.8.25', title: 'Secure development life cycle', applicableStandards: ['iso27001'], crossRef: {}, note: 'SDLC security; DevSecOps' },
      { id: 'A.8.26', title: 'Application security requirements', applicableStandards: ['iso27001'], crossRef: {}, note: 'Security requirements in development' },
      { id: 'A.8.27', title: 'Secure system architecture and engineering principles', applicableStandards: ['iso27001'], crossRef: {}, note: 'Security architecture; zero-trust design' },
      { id: 'A.8.28', title: 'Secure coding', applicableStandards: ['iso27001'], crossRef: {}, note: 'New in 2022; secure coding practices' },
      { id: 'A.8.29', title: 'Security testing in development and acceptance', applicableStandards: ['iso27001'], crossRef: {}, note: 'Penetration testing; security UAT' },
      { id: 'A.8.30', title: 'Outsourced development', applicableStandards: ['iso27001'], crossRef: {}, note: 'Vendor development security' },
      { id: 'A.8.31', title: 'Separation of development, test and production environments', applicableStandards: ['iso27001'], crossRef: {}, note: 'Environment isolation' },
      { id: 'A.8.32', title: 'Change management', applicableStandards: ['iso27001','iso20000'], crossRef: { iso20000: '8.5.1' }, note: 'ITSMS change management (8.5.1)' },
      { id: 'A.8.33', title: 'Test information', applicableStandards: ['iso27001','iso27701'], crossRef: {}, note: 'Test data protection; PII in test environments' },
      { id: 'A.8.34', title: 'Protection of information systems during audit testing', applicableStandards: ['iso27001'], crossRef: {}, note: 'Audit tool access controls' },
    ]
  }
];

// Legacy alias for backward compatibility
const ANNEX_DOMAINS = ANNEX_CONTROL_CROSSWALK;

// ─── ISO 37001:2025 DELTA FROM 2016 ──────────────────────────────────────────
const ISO37001_DELTA = {
  summary: { newClauses: 4, modifiedClauses: 1, movedClauses: 1, enhanced: 2, renamed: 1, total: 9 },
  strategy: {
    certificationPath: 'New Certification (transition from ISO 37001:2016)',
    keyActions: [
      'Conduct gap assessment: 2016 controls vs 2025 requirements',
      'Establish anti-bribery culture programme with measurable indicators (5.1.3)',
      'Restructure bribery risk assessment under Clause 4.5 (moved from 8.x)',
      'Implement non-financial controls framework (8.4)',
      'Establish governing body formal review process (9.5)',
      'Appoint anti-bribery function with direct Board access (5.3.3)',
      'Document conflict of interest register (8.7 enhanced)',
      'Implement anti-bribery function periodic review cycle (9.4)',
    ],
    timeline: 'Complete transition before CB Stage 2 audit (Week 26-29)',
    telinContext: 'As BUMN subsidiary with operations in 7 jurisdictions (ID, SG, HK, TW, TL, AU, US), Telin faces elevated bribery risk. FCPA (US), ICAC (HK), and Tipikor (ID) create multi-jurisdictional compliance obligations that the 2025 version better addresses.'
  },
  items: [
    { clause2025: '4.1', clause2016: '4.1', type: 'modified', title: 'Context of the organization', summary: 'Added climate change consideration per Harmonized Structure', impact: 'Low', action: 'Add climate change to context analysis document; minimal effort' },
    { clause2025: '4.5', clause2016: '8.2 (partial)', type: 'moved', title: 'Bribery risk assessment', summary: 'Elevated from operational clause to strategic planning; now dedicated clause', impact: 'High', action: 'Restructure bribery risk assessment as standalone strategic document; link to E-012' },
    { clause2025: '5.1.2', clause2016: '5.1.2', type: 'enhanced', title: 'Governing body', summary: 'Enhanced requirements for active ABMS oversight by governing body', impact: 'Medium', action: 'Document Board ABMS oversight responsibilities; include in Board charter' },
    { clause2025: '5.1.3', clause2016: null, type: 'new', title: 'Anti-bribery culture', summary: 'NEW clause requiring formalized ethical culture programme with measurable indicators', impact: 'High', action: 'Design culture programme: ethics surveys, tone-from-the-top metrics, annual culture assessment' },
    { clause2025: '5.3.3', clause2016: '5.3.2', type: 'renamed', title: 'Anti-bribery function', summary: 'Renamed from "anti-bribery compliance function"; independence and Board access strengthened', impact: 'Medium', action: 'Update role description; ensure direct reporting line to Board; review independence' },
    { clause2025: '6.3', clause2016: null, type: 'new', title: 'Planning of changes', summary: 'NEW clause per Harmonized Structure; systematic change management for ABMS', impact: 'Low', action: 'Integrate with existing change management process; document ABMS change procedure' },
    { clause2025: '8.4', clause2016: null, type: 'new', title: 'Non-financial controls', summary: 'NEW clause addressing non-financial anti-bribery controls beyond monetary transactions', impact: 'Medium', action: 'Identify non-financial bribery vectors (favours, preferential treatment); document controls' },
    { clause2025: '8.7', clause2016: '8.7', type: 'enhanced', title: 'Conflicts of interest', summary: 'Expanded scope: personal, financial, and organizational conflicts; documented register required', impact: 'Medium', action: 'Establish CoI register for all staff in high-risk roles; annual disclosure cycle' },
    { clause2025: '9.4', clause2016: null, type: 'new', title: 'Review by anti-bribery function', summary: 'NEW clause; formal periodic review with documented output to governing body', impact: 'Medium', action: 'Design quarterly review template; establish reporting cadence to Board' },
    { clause2025: '9.5', clause2016: null, type: 'new', title: 'Review by governing body', summary: 'NEW clause; Board must formally review ABMS effectiveness at planned intervals', impact: 'High', action: 'Add ABMS effectiveness review to Board agenda; document review outputs' },
  ]
};
