# Agentic AI Commercial Lending Platform - Todo

## Phase 3: Scaffolding & Design System
- [x] Global design system (colors, typography, CSS variables)
- [x] App.tsx routes setup
- [x] DashboardLayout customization for lending platform

## Phase 4: Core Pages
- [x] Landing/Home page with platform overview
- [x] Pipeline Dashboard (deals at all stages)
- [x] Deal list and deal cards

## Phase 5: Deal Detail & AI Features
- [x] Deal detail page with full journey timeline
- [x] Document upload & AI classification demo
- [x] Financial spreading simulation
- [x] AI credit memo viewer with citations

## Phase 6: Advanced Features
- [x] Real-time agent activity feed
- [x] Approval workflow with DOA routing
- [x] Compliance dashboard with audit trail
- [x] Portfolio monitoring with early warning alerts
- [x] KPI metrics dashboard with before/after AI comparisons

## Phase 7: Polish & Delivery
- [x] All navigation links working
- [x] Responsive design verified
- [x] Vitest tests (13 tests passing)
- [x] Checkpoint saved

## Follow-up Features (User Requested)
- [x] Guided demo tour — floating button with scripted 5-step journey and step tooltips
- [x] Live LLM-powered credit memo generator — real AI generation from mock financial data
- [x] Bank ROI calculator — personalized inputs with animated before/after results
- [x] Additional polish — ROI Calculator sidebar link added, 21 vitest tests passing

## Real Document Upload Flow (User Requested)
- [x] Database schema: uploaded_documents table with S3 key, classification, confidence, status
- [x] Backend: S3 multipart upload tRPC procedure
- [x] Backend: LLM vision classification procedure (document type, confidence, extracted fields)
- [x] Backend: document list/delete query helpers
- [x] Frontend: drag-and-drop upload zone with file type validation
- [x] Frontend: real-time upload progress indicator
- [x] Frontend: AI classification results panel with confidence scores
- [x] Frontend: extracted fields display (borrower name, date, amounts)
- [x] Frontend: document management table with status badges
- [x] Frontend: human review flag UI for low-confidence items
- [x] Vitest tests for classification logic and upload validation (21 total passing)

## PRD Webpage — 19 Sections (User Requested)
- [x] PRD route /prd added to App.tsx
- [x] PRD link added to sidebar navigation
- [x] Section 01: Executive Summary
- [x] Section 02: Problem Identification
- [x] Section 03: Pain Points & Research
- [x] Section 04: Gap Analysis
- [x] Section 05: Requirements Gathering
- [x] Section 06: User Personas
- [x] Section 07: Customer Journey Map
- [x] Section 08: Concept Testing
- [x] Section 09: Prioritization Framework
- [x] Section 10: A/B Testing Strategy
- [x] Section 11: User Story Detailing
- [x] Section 12: Functional Requirements
- [x] Section 13: Non-Functional Requirements
- [x] Section 14: System Architecture
- [x] Section 15: Orchestration & Data Flow
- [x] Section 16: API Integrations
- [x] Section 17: KPIs & Success Metrics
- [x] Section 18: Risks & Mitigations
- [x] Section 19: Roadmap & Milestones
- [x] Sticky sidebar TOC with active section highlighting
- [x] Smooth scroll navigation between sections

## PRD Comprehensive Rewrite — PDF Gap Analysis (User Requested)
- [ ] Add all 8 lifecycle stages with JTBD tables (Stage 1–8 from PDF Part II)
- [ ] Add all 9 agent specification tables with failure modes + integrations columns (from PDF Part III)
- [ ] Add all 3 representative journeys with step-by-step Today vs. Agentic tables (from PDF Part IV)
- [ ] Add complete feature list by lifecycle stage (from PDF Part V)
- [ ] Add all 4 UX principles with implementation details (from PDF Part VI)
- [ ] Add Responsible AI & Governance section (from PDF Part VIII)
- [ ] Add 3-tier KPI framework (Board/Management/Product) with baselines (from PDF Part IX)
- [ ] Add competitive differentiation section + sustainable moat analysis (from PDF Part XI)
- [ ] Add full citations appendix (10 sources from PDF Appendix)
- [ ] Add product hypothesis with falsifiable metrics (from PDF Section 1.2)
- [ ] Add JTBD framework table (all 5 personas × 3 job types) (from PDF Section 1.3)
