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
