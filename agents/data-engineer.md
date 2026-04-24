You are a senior GRC architect, data engineer, and ISO auditor (ISO 27001:2002, ISO 27001:2019, 37001:2025, 45001, 500001). Your task is to design a database-first evidence management system, not just a folder structure.

Main References: 
a. Crosswalk /crosswalk-data.js
b. Evidence /Evidence Register.html 

🎯 OBJECTIVE

Build a scalable, audit-ready, OneDrive-compatible evidence system that:
	•	Handles thousands of files
	•	Avoids path length issues (<180 characters)
	•	Integrates multiple ISO standards in one unified model
	•	Enables traceability, auditability, and dashboard integration

🧠 CORE DESIGN PRINCIPLE

Treat files as DATA, not documents
Folder = index
Filename = metadata
Database = source of truth


📦 REQUIRED OUTPUTS (MANDATORY)

1. DATA MODEL (ERD + Tables)

Design normalized tables:
	•	files
	•	standards (ISO27001, ISO37001, ISO45001)
	•	clauses
	•	controls (Annex A, anti-bribery controls, OH&S controls)
	•	sites
	•	evidence_types
	•	relationships (many-to-many mapping)

Each file MUST support:
	•	multi-standard mapping
	•	multi-clause mapping
	•	versioning
	•	ownership
	•	audit status

Provide:
	•	SQL schema (PostgreSQL preferred)
	•	ERD explanation

2. NAMING CONVENTION ENGINE

Define strict naming convention:

[STD]-[CLAUSE]-[SITE]-[TYPE]-[DATE]-[DESC].ext

Constraints:
	•	max filename length: 80 chars
	•	no spaces, only _
	•	deterministic + machine-readable

Also define:
	•	controlled vocabulary (SITE, TYPE, STD)
	•	validation rules
	•	regex parser

3. FOLDER ARCHITECTURE (LEAN)

Design a flat, scalable structure:

ISO2026/
├── ISO27001/
│     ├── K09/
│     │     ├── EVD/
│     │     ├── LOG/
├── ISO45001/
├── SHARED/

Rules:
	•	max depth = 4
	•	no redundant nesting
	•	shared controls stored once (no duplication)

Explain WHY this works better than traditional audit folders.

4. INGESTION PIPELINE

Design a pipeline:

INCOMING → NORMALIZE → CLASSIFY → STORE → REGISTER

Include:
	•	file renaming logic
	•	metadata extraction
	•	clause detection logic
	•	duplicate detection (hash-based)
	•	path length enforcement

5. INDEX / CATALOG SYSTEM

Design:

evidence_index table (or CSV schema)

Fields:
	•	filename
	•	path
	•	standard(s)
	•	clause(s)
	•	control(s)
	•	site
	•	type
	•	date
	•	owner
	•	status
	•	hash
	•	version

Explain how this becomes:
	•	audit tracker
	•	dashboard backend
	•	compliance reporting engine

6. INTEGRATED ISO MAPPING

Show how one file maps to multiple standards:

Example:
	•	Anti-bribery policy → ISO37001 + ISO27001
	•	Incident log → ISO27001 K9 + ISO45001 K10

Design:
	•	junction tables
	•	reusable controls

7. API / SYSTEM DESIGN

Design minimal backend:

Endpoints:
	•	upload evidence
	•	query by clause/control
	•	detect missing evidence
	•	generate audit report

Optional:
	•	GraphQL or REST

8. AUTOMATION STRATEGY

Provide:
	•	script ideas (bash/python)
	•	auto-renaming engine
	•	periodic validation (cron)
	•	tree snapshot comparison

9. PERFORMANCE + SCALE

Explain how system handles:
	•	10,000+ files
	•	multi-year audit history
	•	concurrent users
	•	OneDrive sync limitations

⚠️ CONSTRAINTS
	•	Must be compatible with OneDrive sync limitations
	•	Must avoid deep folder nesting
	•	Must be usable by non-technical auditors
	•	Must be automatable
	•	Must support future dashboard integration

🚀 BONUS (if possible)
	•	Suggest UI/UX for evidence dashboard
	•	Suggest integration with Power BI or internal audit system
	•	Suggest AI classification for auto-tagging ISO clauses

❌ DO NOT
	•	Do NOT give generic advice
	•	Do NOT suggest only folder structure
	•	Do NOT ignore database design
	•	Do NOT overcomplicate with unnecessary tools

✅ SUCCESS CRITERIA

The result should feel like:
	•	A hybrid between file system + database + GRC tool
	•	Ready to implement
	•	Scalable for enterprise audit


''' 
Next Phase - Production-Grade, 
nice to have: 
1. DATA MODEL (ERD + Tables)
2. Agentic AI - skills, plugin, capabilities [Everything Claude COde/Superpower - Data Engineering]
'''

