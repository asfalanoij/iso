/**
 * RAW ISO DATA — Complete Clause & Control Reference
 * Telin ISO Certification Programme 2026
 *
 * 100% accurate clause structures from official ISO standard documentation.
 * All 93 Annex A controls for ISO/IEC 27001:2022.
 * ISO 37001:2025 with delta metadata from 2016 version.
 */

const RAW_ISO_DATA = {
  "standards": [

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO/IEC 27001:2022 — Information Security Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso27001",
      "code": "ISO/IEC 27001:2022",
      "name": "Information Security Management System",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context"},
          {"id": "4.2", "title": "Understanding the needs and expectations of interested parties"},
          {"id": "4.3", "title": "Determining the scope of the information security management system"},
          {"id": "4.4", "title": "Information security management system"}
        ]},
        {"id": "5", "title": "Leadership", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment"},
          {"id": "5.2", "title": "Policy"},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities"}
        ]},
        {"id": "6", "title": "Planning", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities", "subclauses": [
            {"id": "6.1.1", "title": "General"},
            {"id": "6.1.2", "title": "Information security risk assessment"},
            {"id": "6.1.3", "title": "Information security risk treatment"}
          ]},
          {"id": "6.2", "title": "Information security objectives and planning to achieve them"},
          {"id": "6.3", "title": "Planning of changes"}
        ]},
        {"id": "7", "title": "Support", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness"},
          {"id": "7.4", "title": "Communication"},
          {"id": "7.5", "title": "Documented information", "subclauses": [
            {"id": "7.5.1", "title": "General"},
            {"id": "7.5.2", "title": "Creating and updating"},
            {"id": "7.5.3", "title": "Control of documented information"}
          ]}
        ]},
        {"id": "8", "title": "Operation", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control"},
          {"id": "8.2", "title": "Information security risk assessment"},
          {"id": "8.3", "title": "Information security risk treatment"}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and evaluation"},
          {"id": "9.2", "title": "Internal audit", "subclauses": [
            {"id": "9.2.1", "title": "General"},
            {"id": "9.2.2", "title": "Internal audit programme"}
          ]},
          {"id": "9.3", "title": "Management review", "subclauses": [
            {"id": "9.3.1", "title": "General"},
            {"id": "9.3.2", "title": "Management review inputs"},
            {"id": "9.3.3", "title": "Management review results"}
          ]}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "Continual improvement"},
          {"id": "10.2", "title": "Nonconformity and corrective action"}
        ]}
      ],
      "annexes": [
        {
          "id": "Annex A",
          "title": "Information security controls reference",
          "totalControls": 93,
          "categories": [
            {
              "id": "A.5", "title": "Organizational controls", "count": 37,
              "controls": [
                {"id": "A.5.1", "title": "Policies for information security"},
                {"id": "A.5.2", "title": "Information security roles and responsibilities"},
                {"id": "A.5.3", "title": "Segregation of duties"},
                {"id": "A.5.4", "title": "Management responsibilities"},
                {"id": "A.5.5", "title": "Contact with authorities"},
                {"id": "A.5.6", "title": "Contact with special interest groups"},
                {"id": "A.5.7", "title": "Threat intelligence"},
                {"id": "A.5.8", "title": "Information security in project management"},
                {"id": "A.5.9", "title": "Inventory of information and other associated assets"},
                {"id": "A.5.10", "title": "Acceptable use of information and other associated assets"},
                {"id": "A.5.11", "title": "Return of assets"},
                {"id": "A.5.12", "title": "Classification of information"},
                {"id": "A.5.13", "title": "Labelling of information"},
                {"id": "A.5.14", "title": "Information transfer"},
                {"id": "A.5.15", "title": "Access control"},
                {"id": "A.5.16", "title": "Identity management"},
                {"id": "A.5.17", "title": "Authentication information"},
                {"id": "A.5.18", "title": "Access rights"},
                {"id": "A.5.19", "title": "Information security in supplier relationships"},
                {"id": "A.5.20", "title": "Addressing information security within supplier agreements"},
                {"id": "A.5.21", "title": "Managing information security in the ICT supply chain"},
                {"id": "A.5.22", "title": "Monitoring, review and change management of supplier services"},
                {"id": "A.5.23", "title": "Information security for use of cloud services"},
                {"id": "A.5.24", "title": "Information security incident management planning and preparation"},
                {"id": "A.5.25", "title": "Assessment and decision on information security events"},
                {"id": "A.5.26", "title": "Response to information security incidents"},
                {"id": "A.5.27", "title": "Learning from information security incidents"},
                {"id": "A.5.28", "title": "Collection of evidence"},
                {"id": "A.5.29", "title": "Information security during disruption"},
                {"id": "A.5.30", "title": "ICT readiness for business continuity"},
                {"id": "A.5.31", "title": "Legal, statutory, regulatory and contractual requirements"},
                {"id": "A.5.32", "title": "Intellectual property rights"},
                {"id": "A.5.33", "title": "Protection of records"},
                {"id": "A.5.34", "title": "Privacy and protection of PII"},
                {"id": "A.5.35", "title": "Independent review of information security"},
                {"id": "A.5.36", "title": "Compliance with policies, rules and standards for information security"},
                {"id": "A.5.37", "title": "Documented operating procedures"}
              ]
            },
            {
              "id": "A.6", "title": "People controls", "count": 8,
              "controls": [
                {"id": "A.6.1", "title": "Screening"},
                {"id": "A.6.2", "title": "Terms and conditions of employment"},
                {"id": "A.6.3", "title": "Information security awareness, education and training"},
                {"id": "A.6.4", "title": "Disciplinary process"},
                {"id": "A.6.5", "title": "Responsibilities after termination or change of employment"},
                {"id": "A.6.6", "title": "Confidentiality or non-disclosure agreements"},
                {"id": "A.6.7", "title": "Remote working"},
                {"id": "A.6.8", "title": "Information security event reporting"}
              ]
            },
            {
              "id": "A.7", "title": "Physical controls", "count": 14,
              "controls": [
                {"id": "A.7.1", "title": "Physical security perimeters"},
                {"id": "A.7.2", "title": "Physical entry"},
                {"id": "A.7.3", "title": "Securing offices, rooms and facilities"},
                {"id": "A.7.4", "title": "Physical security monitoring"},
                {"id": "A.7.5", "title": "Protecting against physical and environmental threats"},
                {"id": "A.7.6", "title": "Working in secure areas"},
                {"id": "A.7.7", "title": "Clear desk and clear screen"},
                {"id": "A.7.8", "title": "Equipment siting and protection"},
                {"id": "A.7.9", "title": "Security of assets off-premises"},
                {"id": "A.7.10", "title": "Storage media"},
                {"id": "A.7.11", "title": "Supporting utilities"},
                {"id": "A.7.12", "title": "Cabling security"},
                {"id": "A.7.13", "title": "Equipment maintenance"},
                {"id": "A.7.14", "title": "Secure disposal or re-use of equipment"}
              ]
            },
            {
              "id": "A.8", "title": "Technological controls", "count": 34,
              "controls": [
                {"id": "A.8.1", "title": "User endpoint devices"},
                {"id": "A.8.2", "title": "Privileged access rights"},
                {"id": "A.8.3", "title": "Information access restriction"},
                {"id": "A.8.4", "title": "Access to source code"},
                {"id": "A.8.5", "title": "Secure authentication"},
                {"id": "A.8.6", "title": "Capacity management"},
                {"id": "A.8.7", "title": "Protection against malware"},
                {"id": "A.8.8", "title": "Management of technical vulnerabilities"},
                {"id": "A.8.9", "title": "Configuration management"},
                {"id": "A.8.10", "title": "Information deletion"},
                {"id": "A.8.11", "title": "Data masking"},
                {"id": "A.8.12", "title": "Data leakage prevention"},
                {"id": "A.8.13", "title": "Information backup"},
                {"id": "A.8.14", "title": "Redundancy of information processing facilities"},
                {"id": "A.8.15", "title": "Logging"},
                {"id": "A.8.16", "title": "Monitoring activities"},
                {"id": "A.8.17", "title": "Clock synchronization"},
                {"id": "A.8.18", "title": "Use of privileged utility programs"},
                {"id": "A.8.19", "title": "Installation of software on operational systems"},
                {"id": "A.8.20", "title": "Networks security"},
                {"id": "A.8.21", "title": "Security of network services"},
                {"id": "A.8.22", "title": "Segregation of networks"},
                {"id": "A.8.23", "title": "Web filtering"},
                {"id": "A.8.24", "title": "Use of cryptography"},
                {"id": "A.8.25", "title": "Secure development life cycle"},
                {"id": "A.8.26", "title": "Application security requirements"},
                {"id": "A.8.27", "title": "Secure system architecture and engineering principles"},
                {"id": "A.8.28", "title": "Secure coding"},
                {"id": "A.8.29", "title": "Security testing in development and acceptance"},
                {"id": "A.8.30", "title": "Outsourced development"},
                {"id": "A.8.31", "title": "Separation of development, test and production environments"},
                {"id": "A.8.32", "title": "Change management"},
                {"id": "A.8.33", "title": "Test information"},
                {"id": "A.8.34", "title": "Protection of information systems during audit testing"}
              ]
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO/IEC 27701:2019 — Privacy Information Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso27701",
      "code": "ISO/IEC 27701:2019",
      "name": "Privacy Information Management",
      "clauses": [
        {"id": "5", "title": "PIMS-specific requirements related to ISO/IEC 27001", "subclauses": [
          {"id": "5.1", "title": "General"},
          {"id": "5.2", "title": "Context of the organization", "subclauses": [
            {"id": "5.2.1", "title": "Understanding the organization and its context"},
            {"id": "5.2.2", "title": "Understanding the needs and expectations of interested parties"},
            {"id": "5.2.3", "title": "Determining the scope of the PIMS"},
            {"id": "5.2.4", "title": "Privacy information management system"}
          ]},
          {"id": "5.3", "title": "Leadership", "subclauses": [
            {"id": "5.3.1", "title": "Leadership and commitment"},
            {"id": "5.3.2", "title": "Policy"},
            {"id": "5.3.3", "title": "Organizational roles, responsibilities and authorities"}
          ]},
          {"id": "5.4", "title": "Planning", "subclauses": [
            {"id": "5.4.1", "title": "Actions to address risks and opportunities"},
            {"id": "5.4.2", "title": "Privacy information management objectives and planning to achieve them"}
          ]},
          {"id": "5.5", "title": "Support", "subclauses": [
            {"id": "5.5.1", "title": "Resources"},
            {"id": "5.5.2", "title": "Competence"},
            {"id": "5.5.3", "title": "Awareness"},
            {"id": "5.5.4", "title": "Communication"},
            {"id": "5.5.5", "title": "Documented information"}
          ]},
          {"id": "5.6", "title": "Operation", "subclauses": [
            {"id": "5.6.1", "title": "Operational planning and control"},
            {"id": "5.6.2", "title": "Privacy risk assessment"},
            {"id": "5.6.3", "title": "Privacy risk treatment"}
          ]},
          {"id": "5.7", "title": "Performance evaluation", "subclauses": [
            {"id": "5.7.1", "title": "Monitoring, measurement, analysis and evaluation"},
            {"id": "5.7.2", "title": "Internal audit"},
            {"id": "5.7.3", "title": "Management review"}
          ]},
          {"id": "5.8", "title": "Improvement", "subclauses": [
            {"id": "5.8.1", "title": "Nonconformity and corrective action"},
            {"id": "5.8.2", "title": "Continual improvement"}
          ]}
        ]},
        {"id": "6", "title": "PIMS-specific guidance related to ISO/IEC 27002", "subclauses": [
          {"id": "6.1", "title": "General"},
          {"id": "6.2", "title": "Information security policies", "subclauses": [
            {"id": "6.2.1.1", "title": "Policies for information security (PII extension)"}
          ]},
          {"id": "6.3", "title": "Organization of information security"},
          {"id": "6.4", "title": "Human resource security"},
          {"id": "6.5", "title": "Asset management"},
          {"id": "6.6", "title": "Access control"},
          {"id": "6.7", "title": "Cryptography"},
          {"id": "6.8", "title": "Physical and environmental security"},
          {"id": "6.9", "title": "Operations security"},
          {"id": "6.10", "title": "Communications security"},
          {"id": "6.11", "title": "System acquisition, development and maintenance"},
          {"id": "6.12", "title": "Supplier relationships"},
          {"id": "6.13", "title": "Information security incident management"},
          {"id": "6.14", "title": "Information security aspects of business continuity"},
          {"id": "6.15", "title": "Compliance"}
        ]},
        {"id": "7", "title": "Additional guidance for PII controllers", "subclauses": [
          {"id": "7.1", "title": "General"},
          {"id": "7.2", "title": "Conditions for collection and processing", "subclauses": [
            {"id": "7.2.1", "title": "Identify and document purpose"},
            {"id": "7.2.2", "title": "Identify lawful basis"},
            {"id": "7.2.3", "title": "Determine when and how consent is to be obtained"},
            {"id": "7.2.4", "title": "Obtain and record consent"},
            {"id": "7.2.5", "title": "Privacy impact assessment"},
            {"id": "7.2.6", "title": "Contracts with PII processors"},
            {"id": "7.2.7", "title": "Joint PII controller"},
            {"id": "7.2.8", "title": "Records related to processing PII"}
          ]},
          {"id": "7.3", "title": "Obligations to PII principals", "subclauses": [
            {"id": "7.3.1", "title": "Determining and fulfilling obligations to PII principals"},
            {"id": "7.3.2", "title": "Determining information for PII principals"},
            {"id": "7.3.3", "title": "Providing information to PII principals"},
            {"id": "7.3.4", "title": "Providing mechanism to modify or withdraw consent"},
            {"id": "7.3.5", "title": "Providing mechanism to object to PII processing"},
            {"id": "7.3.6", "title": "Access, correction and/or erasure"},
            {"id": "7.3.7", "title": "PII controllers' obligations to inform third parties"},
            {"id": "7.3.8", "title": "Providing copy of PII processed"},
            {"id": "7.3.9", "title": "Handling requests"},
            {"id": "7.3.10", "title": "Automated decision making"}
          ]},
          {"id": "7.4", "title": "Privacy by design and privacy by default", "subclauses": [
            {"id": "7.4.1", "title": "Limit collection"},
            {"id": "7.4.2", "title": "Limit processing"},
            {"id": "7.4.3", "title": "Accuracy and quality"},
            {"id": "7.4.4", "title": "PII minimization objectives"},
            {"id": "7.4.5", "title": "PII de-identification and deletion at the end of processing"},
            {"id": "7.4.6", "title": "Temporary files"},
            {"id": "7.4.7", "title": "Retention"},
            {"id": "7.4.8", "title": "Disposal"},
            {"id": "7.4.9", "title": "PII transmission controls"}
          ]},
          {"id": "7.5", "title": "PII sharing, transfer and disclosure", "subclauses": [
            {"id": "7.5.1", "title": "Identify basis for PII transfer between jurisdictions"},
            {"id": "7.5.2", "title": "Countries and international organizations to which PII can be transferred"},
            {"id": "7.5.3", "title": "Records of PII transfers"},
            {"id": "7.5.4", "title": "Records of PII disclosure to third parties"}
          ]}
        ]},
        {"id": "8", "title": "Additional guidance for PII processors", "subclauses": [
          {"id": "8.1", "title": "General"},
          {"id": "8.2", "title": "Conditions for collection and processing", "subclauses": [
            {"id": "8.2.1", "title": "Customer agreement"},
            {"id": "8.2.2", "title": "Organization's purposes"},
            {"id": "8.2.3", "title": "Marketing and advertising use"},
            {"id": "8.2.4", "title": "Infringing instruction"},
            {"id": "8.2.5", "title": "Customer obligations"},
            {"id": "8.2.6", "title": "Records related to processing PII"}
          ]},
          {"id": "8.3", "title": "Obligations to PII principals", "subclauses": [
            {"id": "8.3.1", "title": "Obligations to PII principals"},
            {"id": "8.3.2", "title": "Sub-contracted processing"}
          ]},
          {"id": "8.4", "title": "Privacy by design and privacy by default", "subclauses": [
            {"id": "8.4.1", "title": "Temporary files"},
            {"id": "8.4.2", "title": "Return, transfer or disposal of PII"},
            {"id": "8.4.3", "title": "PII transmission controls"}
          ]},
          {"id": "8.5", "title": "PII sharing, transfer and disclosure", "subclauses": [
            {"id": "8.5.1", "title": "Basis for PII transfer between jurisdictions"},
            {"id": "8.5.2", "title": "Countries and international organizations to which PII can be transferred"},
            {"id": "8.5.3", "title": "Records of PII transfers"},
            {"id": "8.5.4", "title": "Records of PII disclosure to third parties"},
            {"id": "8.5.5", "title": "Notification of PII disclosure requests"},
            {"id": "8.5.6", "title": "Legally binding PII disclosures"},
            {"id": "8.5.7", "title": "Disclosure of sub-contractors used to process PII"},
            {"id": "8.5.8", "title": "Change of sub-contractor to process PII"}
          ]}
        ]}
      ],
      "annexes": [
        {
          "id": "Annex A",
          "title": "PIMS-specific reference control objectives and controls (PII Controllers)",
          "controls": [
            {"id": "A.7.2.1", "title": "Identify and document purpose"},
            {"id": "A.7.2.2", "title": "Identify lawful basis"},
            {"id": "A.7.2.3", "title": "Determine when and how consent is to be obtained"},
            {"id": "A.7.2.4", "title": "Obtain and record consent"},
            {"id": "A.7.2.5", "title": "Privacy impact assessment"},
            {"id": "A.7.2.6", "title": "Contracts with PII processors"},
            {"id": "A.7.2.7", "title": "Joint PII controller"},
            {"id": "A.7.2.8", "title": "Records related to processing PII"},
            {"id": "A.7.3.1", "title": "Determining and fulfilling obligations to PII principals"},
            {"id": "A.7.3.2", "title": "Determining information for PII principals"},
            {"id": "A.7.3.3", "title": "Providing information to PII principals"},
            {"id": "A.7.3.4", "title": "Providing mechanism to modify or withdraw consent"},
            {"id": "A.7.3.5", "title": "Providing mechanism to object to PII processing"},
            {"id": "A.7.3.6", "title": "Access, correction and/or erasure"},
            {"id": "A.7.3.7", "title": "PII controllers' obligations to inform third parties"},
            {"id": "A.7.3.8", "title": "Providing copy of PII processed"},
            {"id": "A.7.3.9", "title": "Handling requests"},
            {"id": "A.7.3.10", "title": "Automated decision making"},
            {"id": "A.7.4.1", "title": "Limit collection"},
            {"id": "A.7.4.2", "title": "Limit processing"},
            {"id": "A.7.4.3", "title": "Accuracy and quality"},
            {"id": "A.7.4.4", "title": "PII minimization objectives"},
            {"id": "A.7.4.5", "title": "PII de-identification and deletion at the end of processing"},
            {"id": "A.7.4.6", "title": "Temporary files"},
            {"id": "A.7.4.7", "title": "Retention"},
            {"id": "A.7.4.8", "title": "Disposal"},
            {"id": "A.7.4.9", "title": "PII transmission controls"},
            {"id": "A.7.5.1", "title": "Identify basis for PII transfer between jurisdictions"},
            {"id": "A.7.5.2", "title": "Countries and international organizations to which PII can be transferred"},
            {"id": "A.7.5.3", "title": "Records of PII transfers"},
            {"id": "A.7.5.4", "title": "Records of PII disclosure to third parties"}
          ]
        },
        {
          "id": "Annex B",
          "title": "PIMS-specific reference control objectives and controls (PII Processors)",
          "controls": [
            {"id": "B.8.2.1", "title": "Customer agreement"},
            {"id": "B.8.2.2", "title": "Organization's purposes"},
            {"id": "B.8.2.3", "title": "Marketing and advertising use"},
            {"id": "B.8.2.4", "title": "Infringing instruction"},
            {"id": "B.8.2.5", "title": "Customer obligations"},
            {"id": "B.8.2.6", "title": "Records related to processing PII"},
            {"id": "B.8.3.1", "title": "Obligations to PII principals"},
            {"id": "B.8.3.2", "title": "Sub-contracted processing"},
            {"id": "B.8.4.1", "title": "Temporary files"},
            {"id": "B.8.4.2", "title": "Return, transfer or disposal of PII"},
            {"id": "B.8.4.3", "title": "PII transmission controls"},
            {"id": "B.8.5.1", "title": "Basis for PII transfer between jurisdictions"},
            {"id": "B.8.5.2", "title": "Countries and international organizations to which PII can be transferred"},
            {"id": "B.8.5.3", "title": "Records of PII transfers"},
            {"id": "B.8.5.4", "title": "Records of PII disclosure to third parties"},
            {"id": "B.8.5.5", "title": "Notification of PII disclosure requests"},
            {"id": "B.8.5.6", "title": "Legally binding PII disclosures"},
            {"id": "B.8.5.7", "title": "Disclosure of sub-contractors used to process PII"},
            {"id": "B.8.5.8", "title": "Change of sub-contractor to process PII"}
          ]
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO/IEC 20000-1:2018 — IT Service Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso20000",
      "code": "ISO/IEC 20000-1:2018",
      "name": "Information technology — Service management",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context"},
          {"id": "4.2", "title": "Understanding the needs and expectations of interested parties"},
          {"id": "4.3", "title": "Determining the scope of the service management system"},
          {"id": "4.4", "title": "Service management system"}
        ]},
        {"id": "5", "title": "Leadership", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment"},
          {"id": "5.2", "title": "Policy", "subclauses": [
            {"id": "5.2.1", "title": "Establishing the service management policy"},
            {"id": "5.2.2", "title": "Communicating the service management policy"}
          ]},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities"}
        ]},
        {"id": "6", "title": "Planning the service management system", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities"},
          {"id": "6.2", "title": "Service management objectives and planning to achieve them", "subclauses": [
            {"id": "6.2.1", "title": "Define service management objectives"},
            {"id": "6.2.2", "title": "Plan to achieve service management objectives"}
          ]},
          {"id": "6.3", "title": "Plan the service management system"}
        ]},
        {"id": "7", "title": "Support of the service management system", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness"},
          {"id": "7.4", "title": "Communication"},
          {"id": "7.5", "title": "Documented information", "subclauses": [
            {"id": "7.5.1", "title": "General"},
            {"id": "7.5.2", "title": "Creating and updating"},
            {"id": "7.5.3", "title": "Control of documented information"},
            {"id": "7.5.4", "title": "Service management system documented information"}
          ]},
          {"id": "7.6", "title": "Knowledge"}
        ]},
        {"id": "8", "title": "Operation of the service management system", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control"},
          {"id": "8.2", "title": "Service portfolio", "subclauses": [
            {"id": "8.2.1", "title": "Service delivery"},
            {"id": "8.2.2", "title": "Plan services"},
            {"id": "8.2.3", "title": "Control of parties involved in the service lifecycle"},
            {"id": "8.2.4", "title": "Service catalogue management"},
            {"id": "8.2.5", "title": "Asset management"},
            {"id": "8.2.6", "title": "Configuration management"}
          ]},
          {"id": "8.3", "title": "Relationship and agreement", "subclauses": [
            {"id": "8.3.1", "title": "General"},
            {"id": "8.3.2", "title": "Business relationship management"},
            {"id": "8.3.3", "title": "Service level management"},
            {"id": "8.3.4", "title": "Supplier management"}
          ]},
          {"id": "8.4", "title": "Supply and demand", "subclauses": [
            {"id": "8.4.1", "title": "Budgeting and accounting for services"},
            {"id": "8.4.2", "title": "Demand management"},
            {"id": "8.4.3", "title": "Capacity management"}
          ]},
          {"id": "8.5", "title": "Service design, build and transition", "subclauses": [
            {"id": "8.5.1", "title": "Change management"},
            {"id": "8.5.2", "title": "Service design and transition"},
            {"id": "8.5.3", "title": "Release and deployment management"}
          ]},
          {"id": "8.6", "title": "Resolution and fulfilment", "subclauses": [
            {"id": "8.6.1", "title": "Incident management"},
            {"id": "8.6.2", "title": "Service request management"},
            {"id": "8.6.3", "title": "Problem management"}
          ]},
          {"id": "8.7", "title": "Service assurance", "subclauses": [
            {"id": "8.7.1", "title": "Service availability management"},
            {"id": "8.7.2", "title": "Service continuity management"},
            {"id": "8.7.3", "title": "Information security management"}
          ]}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and evaluation"},
          {"id": "9.2", "title": "Internal audit"},
          {"id": "9.3", "title": "Management review"},
          {"id": "9.4", "title": "Service reporting"}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "Nonconformity and corrective action"},
          {"id": "10.2", "title": "Continual improvement"}
        ]}
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO 22301:2019 — Business Continuity Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso22301",
      "code": "ISO 22301:2019",
      "name": "Business continuity management systems",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context"},
          {"id": "4.2", "title": "Understanding the needs and expectations of interested parties", "subclauses": [
            {"id": "4.2.1", "title": "General"},
            {"id": "4.2.2", "title": "Legal and regulatory requirements"}
          ]},
          {"id": "4.3", "title": "Determining the scope of the BCMS", "subclauses": [
            {"id": "4.3.1", "title": "General"},
            {"id": "4.3.2", "title": "Scope of the BCMS"}
          ]},
          {"id": "4.4", "title": "Business continuity management system"}
        ]},
        {"id": "5", "title": "Leadership", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment"},
          {"id": "5.2", "title": "Policy", "subclauses": [
            {"id": "5.2.1", "title": "Establishing the business continuity policy"},
            {"id": "5.2.2", "title": "Communicating the business continuity policy"}
          ]},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities"}
        ]},
        {"id": "6", "title": "Planning", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities"},
          {"id": "6.2", "title": "Business continuity objectives and plans to achieve them"},
          {"id": "6.3", "title": "Planning changes to the BCMS"}
        ]},
        {"id": "7", "title": "Support", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness"},
          {"id": "7.4", "title": "Communication"},
          {"id": "7.5", "title": "Documented information", "subclauses": [
            {"id": "7.5.1", "title": "General"},
            {"id": "7.5.2", "title": "Creating and updating"},
            {"id": "7.5.3", "title": "Control of documented information"}
          ]}
        ]},
        {"id": "8", "title": "Operation", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control"},
          {"id": "8.2", "title": "Business impact analysis and risk assessment", "subclauses": [
            {"id": "8.2.1", "title": "General"},
            {"id": "8.2.2", "title": "Business impact analysis"},
            {"id": "8.2.3", "title": "Risk assessment"}
          ]},
          {"id": "8.3", "title": "Business continuity strategies and solutions", "subclauses": [
            {"id": "8.3.1", "title": "General"},
            {"id": "8.3.2", "title": "Identification of strategies and solutions"},
            {"id": "8.3.3", "title": "Resource requirements"},
            {"id": "8.3.4", "title": "Selection of strategies and solutions"},
            {"id": "8.3.5", "title": "Implementation of selected solutions"}
          ]},
          {"id": "8.4", "title": "Business continuity plans and procedures", "subclauses": [
            {"id": "8.4.1", "title": "General"},
            {"id": "8.4.2", "title": "Structure of response"},
            {"id": "8.4.3", "title": "Warning and communication"},
            {"id": "8.4.4", "title": "Business continuity plans"},
            {"id": "8.4.5", "title": "Recovery"}
          ]},
          {"id": "8.5", "title": "Exercise programme"},
          {"id": "8.6", "title": "Evaluation of business continuity documentation and capabilities"}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and evaluation"},
          {"id": "9.2", "title": "Internal audit"},
          {"id": "9.3", "title": "Management review"}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "Nonconformity and corrective action"},
          {"id": "10.2", "title": "Continual improvement"}
        ]}
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO 45001:2018 — Occupational Health & Safety Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso45001",
      "code": "ISO 45001:2018",
      "name": "Occupational Health and Safety Management System",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context"},
          {"id": "4.2", "title": "Understanding the needs and expectations of workers and other interested parties"},
          {"id": "4.3", "title": "Determining the scope of the OH&S management system"},
          {"id": "4.4", "title": "OH&S management system"}
        ]},
        {"id": "5", "title": "Leadership and worker participation", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment"},
          {"id": "5.2", "title": "OH&S policy"},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities"},
          {"id": "5.4", "title": "Consultation and participation of workers"}
        ]},
        {"id": "6", "title": "Planning", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities", "subclauses": [
            {"id": "6.1.1", "title": "General"},
            {"id": "6.1.2", "title": "Hazard identification and assessment of risks and opportunities", "subclauses": [
              {"id": "6.1.2.1", "title": "Hazard identification"},
              {"id": "6.1.2.2", "title": "Assessment of OH&S risks and other risks to the OH&S management system"},
              {"id": "6.1.2.3", "title": "Assessment of OH&S opportunities and other opportunities"}
            ]},
            {"id": "6.1.3", "title": "Determination of legal requirements and other requirements"},
            {"id": "6.1.4", "title": "Planning action"}
          ]},
          {"id": "6.2", "title": "OH&S objectives and planning to achieve them", "subclauses": [
            {"id": "6.2.1", "title": "OH&S objectives"},
            {"id": "6.2.2", "title": "Planning to achieve OH&S objectives"}
          ]}
        ]},
        {"id": "7", "title": "Support", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness"},
          {"id": "7.4", "title": "Communication", "subclauses": [
            {"id": "7.4.1", "title": "General"},
            {"id": "7.4.2", "title": "Internal communication"},
            {"id": "7.4.3", "title": "External communication"}
          ]},
          {"id": "7.5", "title": "Documented information", "subclauses": [
            {"id": "7.5.1", "title": "General"},
            {"id": "7.5.2", "title": "Creating and updating"},
            {"id": "7.5.3", "title": "Control of documented information"}
          ]}
        ]},
        {"id": "8", "title": "Operation", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control", "subclauses": [
            {"id": "8.1.1", "title": "General"},
            {"id": "8.1.2", "title": "Eliminating hazards and reducing OH&S risks"},
            {"id": "8.1.3", "title": "Management of change"},
            {"id": "8.1.4", "title": "Procurement", "subclauses": [
              {"id": "8.1.4.1", "title": "General"},
              {"id": "8.1.4.2", "title": "Contractors"},
              {"id": "8.1.4.3", "title": "Outsourcing"}
            ]}
          ]},
          {"id": "8.2", "title": "Emergency preparedness and response"}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and performance evaluation", "subclauses": [
            {"id": "9.1.1", "title": "General"},
            {"id": "9.1.2", "title": "Evaluation of compliance"}
          ]},
          {"id": "9.2", "title": "Internal audit", "subclauses": [
            {"id": "9.2.1", "title": "General"},
            {"id": "9.2.2", "title": "Internal audit programme"}
          ]},
          {"id": "9.3", "title": "Management review"}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "General"},
          {"id": "10.2", "title": "Incident, nonconformity and corrective action"},
          {"id": "10.3", "title": "Continual improvement"}
        ]}
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO 37001:2025 — Anti-Bribery Management System (with 2016 delta)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso37001",
      "code": "ISO 37001:2025",
      "name": "Anti-bribery management systems",
      "version": "2025",
      "previousVersion": "2016",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context",
            "delta": {"type": "modified", "note": "Added climate change consideration per Harmonized Structure"}},
          {"id": "4.2", "title": "Understanding the needs and expectations of interested parties"},
          {"id": "4.3", "title": "Determining the scope of the anti-bribery management system"},
          {"id": "4.4", "title": "Anti-bribery management system"},
          {"id": "4.5", "title": "Bribery risk assessment",
            "delta": {"type": "moved", "from2016": "8.2 (partial)", "note": "Elevated from operational clause to strategic planning; now its own dedicated clause requiring documented methodology"}}
        ]},
        {"id": "5", "title": "Leadership", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment", "subclauses": [
            {"id": "5.1.1", "title": "General"},
            {"id": "5.1.2", "title": "Governing body",
              "delta": {"type": "enhanced", "note": "Enhanced governing body requirements; must demonstrate active oversight of ABMS"}},
            {"id": "5.1.3", "title": "Anti-bribery culture",
              "delta": {"type": "new", "note": "NEW clause requiring formalized ethical culture programme with measurable indicators"}}
          ]},
          {"id": "5.2", "title": "Anti-bribery policy"},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities", "subclauses": [
            {"id": "5.3.1", "title": "General"},
            {"id": "5.3.2", "title": "Top management"},
            {"id": "5.3.3", "title": "Anti-bribery function",
              "delta": {"type": "renamed", "from2016": "Anti-bribery compliance function", "note": "Renamed; function must have direct access to governing body; independence requirements strengthened"}}
          ]}
        ]},
        {"id": "6", "title": "Planning", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities"},
          {"id": "6.2", "title": "Anti-bribery objectives and planning to achieve them"},
          {"id": "6.3", "title": "Planning of changes",
            "delta": {"type": "new", "note": "NEW clause per Harmonized Structure alignment; systematic change management for ABMS"}}
        ]},
        {"id": "7", "title": "Support", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness and training"},
          {"id": "7.4", "title": "Communication"},
          {"id": "7.5", "title": "Documented information"}
        ]},
        {"id": "8", "title": "Operation", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control"},
          {"id": "8.2", "title": "Due diligence"},
          {"id": "8.3", "title": "Financial controls"},
          {"id": "8.4", "title": "Non-financial controls",
            "delta": {"type": "new", "note": "NEW clause; addresses non-financial anti-bribery controls beyond monetary transactions"}},
          {"id": "8.5", "title": "Implementation of anti-bribery controls by controlled organizations and business associates"},
          {"id": "8.6", "title": "Anti-bribery commitments"},
          {"id": "8.7", "title": "Conflicts of interest",
            "delta": {"type": "enhanced", "note": "Enhanced from 2016; expanded scope covering personal, financial, and organizational conflicts; requires documented register"}},
          {"id": "8.8", "title": "Gifts, hospitality, donations and similar benefits"},
          {"id": "8.9", "title": "Managing inadequacy of anti-bribery controls"},
          {"id": "8.10", "title": "Raising concerns"},
          {"id": "8.11", "title": "Investigating and dealing with bribery"}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and evaluation"},
          {"id": "9.2", "title": "Internal audit"},
          {"id": "9.3", "title": "Management review"},
          {"id": "9.4", "title": "Review by anti-bribery function",
            "delta": {"type": "new", "note": "NEW clause; anti-bribery function must conduct formal periodic review with documented output to governing body"}},
          {"id": "9.5", "title": "Review by governing body",
            "delta": {"type": "new", "note": "NEW clause; governing body must formally review ABMS effectiveness at planned intervals"}}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "Continual improvement"},
          {"id": "10.2", "title": "Nonconformity and corrective action"}
        ]}
      ],
      "annexes": [
        {
          "id": "Annex A",
          "title": "Guidance on bribery risk assessment (informative)",
          "note": "Restructured in 2025 to align with Clause 4.5"
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ISO 50001:2018 — Energy Management System
    // ═══════════════════════════════════════════════════════════════════════════
    {
      "id": "iso50001",
      "code": "ISO 50001:2018",
      "name": "Energy Management System",
      "clauses": [
        {"id": "4", "title": "Context of the organization", "subclauses": [
          {"id": "4.1", "title": "Understanding the organization and its context"},
          {"id": "4.2", "title": "Understanding the needs and expectations of interested parties"},
          {"id": "4.3", "title": "Determining the scope of the energy management system"},
          {"id": "4.4", "title": "Energy management system"}
        ]},
        {"id": "5", "title": "Leadership", "subclauses": [
          {"id": "5.1", "title": "Leadership and commitment"},
          {"id": "5.2", "title": "Energy policy"},
          {"id": "5.3", "title": "Organizational roles, responsibilities and authorities"}
        ]},
        {"id": "6", "title": "Planning", "subclauses": [
          {"id": "6.1", "title": "Actions to address risks and opportunities"},
          {"id": "6.2", "title": "Objectives, energy targets and planning to achieve them"},
          {"id": "6.3", "title": "Energy review"},
          {"id": "6.4", "title": "Energy performance indicators (EnPIs)"},
          {"id": "6.5", "title": "Energy baseline (EnB)"},
          {"id": "6.6", "title": "Planning for collection of energy data"}
        ]},
        {"id": "7", "title": "Support", "subclauses": [
          {"id": "7.1", "title": "Resources"},
          {"id": "7.2", "title": "Competence"},
          {"id": "7.3", "title": "Awareness"},
          {"id": "7.4", "title": "Communication"},
          {"id": "7.5", "title": "Documented information", "subclauses": [
            {"id": "7.5.1", "title": "General"},
            {"id": "7.5.2", "title": "Creating and updating"},
            {"id": "7.5.3", "title": "Control of documented information"}
          ]}
        ]},
        {"id": "8", "title": "Operation", "subclauses": [
          {"id": "8.1", "title": "Operational planning and control"},
          {"id": "8.2", "title": "Design"},
          {"id": "8.3", "title": "Procurement"}
        ]},
        {"id": "9", "title": "Performance evaluation", "subclauses": [
          {"id": "9.1", "title": "Monitoring, measurement, analysis and evaluation of energy performance and the EnMS", "subclauses": [
            {"id": "9.1.1", "title": "General"},
            {"id": "9.1.2", "title": "Evaluation of compliance with legal and other requirements"}
          ]},
          {"id": "9.2", "title": "Internal audit", "subclauses": [
            {"id": "9.2.1", "title": "General"},
            {"id": "9.2.2", "title": "Internal audit programme"}
          ]},
          {"id": "9.3", "title": "Management review"}
        ]},
        {"id": "10", "title": "Improvement", "subclauses": [
          {"id": "10.1", "title": "Nonconformity and corrective action"},
          {"id": "10.2", "title": "Continual improvement"}
        ]}
      ]
    }
  ]
};
