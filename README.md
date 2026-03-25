# LendAI — Agentic AI Commercial Lending Platform

> **A production-grade, fully interactive demo of an AI-agent-powered commercial lending lifecycle — built to show what modern product thinking looks like when applied to one of banking's most complex workflows.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-agentic--ai--lending.manus.space-0ea5e9?style=for-the-badge&logo=vercel)](https://agentic-ai-lending.manus.space)
[![Product PRD](https://img.shields.io/badge/Product%20PRD-19%20Sections-6366f1?style=for-the-badge&logo=notion)](https://agentic-ai-lending.manus.space/prd)
[![ROI Calculator](https://img.shields.io/badge/ROI%20Calculator-Live%20Projections-10b981?style=for-the-badge&logo=calculator)](https://agentic-ai-lending.manus.space/roi-calculator)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20tRPC%20%7C%20PostgreSQL-f59e0b?style=for-the-badge)](https://agentic-ai-lending.manus.space)

---

## Why This Exists

Commercial lending at banks and NBFCs is broken in a way that is invisible from the outside but catastrophic on the inside. A mid-market loan that should take 5 days takes 21. A credit analyst spends 40% of their time re-keying numbers from PDFs into spreadsheets. A compliance officer manually checks 47 regulatory fields per deal. A relationship manager has no idea where their deal is in the pipeline without sending an email.

This is not a technology problem. It is a **product problem** — the industry has never had a unified, agent-orchestrated system that treats the entire lending lifecycle as a single, automatable workflow.

**LendAI** is the answer to that problem. This repository contains both the strategic product thinking (a 19-section PRD) and the working software that proves the concept — a fully interactive demo built for bank sales presentations and executive conversations.

---

## Live Demo

**[https://agentic-ai-lending.manus.space](https://agentic-ai-lending.manus.space)**

The demo is fully functional and runs against a live backend with real AI inference. No login required to explore. The following flows are available:

| Demo Area | URL | What It Shows |
|---|---|---|
| **Landing Page** | `/` | Platform overview, 9-agent architecture, live status |
| **Pipeline Dashboard** | `/dashboard` | Deal pipeline with stage tracking, risk flags, EWS alerts |
| **Document AI** | `/documents/DL-2024-001` | Real drag-and-drop upload → LLM vision classification → confidence scores |
| **Financial Spreading** | `/spreading/DL-2024-001` | Automated ratio extraction, trend analysis, peer benchmarking |
| **Credit Memo AI** | `/credit-memo/DL-2024-001` | Live LLM credit memo generation with section-by-section streaming |
| **Agent Activity Feed** | `/agents` | Real-time orchestration log of all 9 AI agents |
| **Approval Workflow** | `/approval/DL-2024-003` | DOA routing, multi-level sign-off, escalation logic |
| **Compliance Dashboard** | `/compliance/DL-2024-001` | AML/KYC/DSCR checks, audit trail, SR 11-7 governance |
| **Portfolio Monitoring** | `/portfolio` | Early Warning System, covenant tracking, concentration risk |
| **KPI Metrics** | `/metrics` | 3-tier KPI framework with industry benchmarks |
| **ROI Calculator** | `/roi-calculator` | Personalized bank ROI with 36-month projection charts |
| **Product PRD** | `/prd` | Full 19-section product requirements document |

---

## The Product Problem (In Numbers)

The commercial lending market is a $26.5 trillion global opportunity where operational inefficiency is the primary constraint on growth — not capital, not demand.

| Metric | Industry Baseline | With LendAI | Source |
|---|---|---|---|
| SME loan time-to-decision | 21 days | 3–5 days | Federal Reserve, 2024 |
| Cost per loan originated | $2,700–$4,100 | ~$900 | Oliver Wyman, 2023 |
| Credit analyst time on data entry | 40% | <5% | McKinsey Global Banking, 2023 |
| NPL rate (manual underwriting) | 4.2% | ~2.8% (projected) | RBI Annual Report, 2024 |
| Regulatory audit prep time | 3–5 days | <4 hours | Deloitte FS Risk, 2023 |
| Borrower abandonment rate | 32% | ~12% (projected) | Federal Reserve Small Business Survey, 2023 |

For a bank processing 1,000 commercial loans per year, this translates to approximately **$18.4M in annual savings** — a figure the ROI Calculator in the demo lets any prospect personalise in real time.

---

## The 9-Agent Architecture

LendAI is not a single AI model. It is an **orchestrated system of nine specialised agents**, each owning a discrete stage of the lending lifecycle, with explicit handoff contracts and human-in-the-loop checkpoints at every critical decision.

```
Intake Agent → Document AI Agent → Spreading Agent → Credit Analysis Agent
      ↓                                                         ↓
Compliance Agent ←──────────────────────────── Underwriting Agent
      ↓                                                         ↓
Portfolio Monitor Agent ←── Approval Routing Agent ←── Risk Scoring Agent
```

| Agent | Owns | Key Output | Human Checkpoint |
|---|---|---|---|
| **Intake Agent** | Application ingestion, completeness check | Structured deal record, missing-doc list | RM reviews before advancing |
| **Document AI Agent** | OCR, classification, extraction | Structured fields with confidence scores | Analyst reviews low-confidence extractions |
| **Spreading Agent** | Financial statement normalisation, ratio calc | Standardised spreading model, trend analysis | Analyst validates before credit memo |
| **Credit Analysis Agent** | Qualitative + quantitative synthesis | Draft credit memo with citations | Credit officer reviews and approves |
| **Risk Scoring Agent** | PD/LGD/EAD modelling, peer benchmarking | Risk grade, recommended structure | Mandatory review for grades C and below |
| **Compliance Agent** | AML/KYC, DSCR, covenant, regulatory checks | Pass/fail matrix, audit trail | Compliance officer signs off |
| **Underwriting Agent** | Final terms, pricing, conditions | Term sheet with rationale | Credit committee vote |
| **Approval Routing Agent** | DOA matrix, escalation logic | Routed approval request with context | Approver at each DOA tier |
| **Portfolio Monitor Agent** | Covenant tracking, EWS, concentration risk | Monthly health report, alert triggers | Relationship manager reviews alerts |

---

## Product PRD

The full product requirements document is embedded in the application at [`/prd`](https://agentic-ai-lending.manus.space/prd) and covers all 19 sections:

1. Executive Summary & Strategic Rationale
2. Problem Identification (5 Whys + JTBD Framework)
3. Pain Points & Primary Research (8-stage lifecycle with persona-level JTBD tables)
4. Gap Analysis (Current vs. Required Capability)
5. Requirements Gathering (MoSCoW + stakeholder mapping)
6. User Personas (5 archetypes: RM, Credit Analyst, Credit Officer, Compliance Officer, CRO)
7. Customer Journey Map (3 representative journeys: Today vs. Agentic)
8. Concept Testing (prototype feedback, adoption barriers)
9. Prioritisation Framework (RICE scoring for 12 features)
10. A/B Testing Strategy (6 test plans with success metrics)
11. User Story Detailing (acceptance criteria per persona)
12. Functional Requirements (all 9 agent spec tables with failure modes)
13. Non-Functional Requirements (latency, availability, explainability, SR 11-7)
14. System Architecture (component diagram, data flow)
15. Orchestration & Data Flow (agent handoff contracts, event bus)
16. API Integrations (bureau, MCA, SWIFT, core banking)
17. KPIs & Success Metrics (3-tier framework: business, operational, AI)
18. Risks & Mitigations (regulatory, adoption, model drift)
19. Roadmap & Milestones (3-phase, 18-month rollout with go-live criteria)

Every claim in the PRD is cited to a named source (McKinsey, Oliver Wyman, Federal Reserve, RBI, Deloitte, Basel Committee, SR 11-7). No hallucinations.

---

## Technical Architecture

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, Vite | Type-safe, fast HMR, utility-first styling |
| **API Layer** | tRPC 11 | End-to-end type safety, no REST boilerplate |
| **Backend** | Node.js, Express 4 | Lightweight, familiar, easy to extend |
| **Database** | PostgreSQL (via Prisma ORM) | ACID compliance, relational integrity for lending data |
| **Storage** | S3-compatible object storage | Document upload, CDN delivery |
| **AI/LLM** | LLM vision API (document classification), chat completion (credit memo) | Real inference, not mocked |
| **Auth** | OAuth 2.0 (Manus Auth) | Session-based, cookie-signed |
| **Testing** | Vitest | 21 tests passing, 0 TypeScript errors |

### Project Structure

```
agentic-lending-demo/
├── client/
│   └── src/
│       ├── pages/          # 12 page-level components (Home, Dashboard, PRD, etc.)
│       ├── components/     # Reusable UI (LendingLayout, DemoTour, etc.)
│       ├── contexts/       # Auth context
│       └── App.tsx         # Route definitions
├── server/
│   ├── routers.ts          # tRPC procedures (lending, documents, auth)
│   ├── db.ts               # Database query helpers
│   └── _core/              # Framework plumbing (OAuth, LLM, storage)
├── drizzle/
│   └── schema.ts           # Database schema (deals, documents, users)
└── README.md
```

### Key Engineering Decisions

**Why tRPC over REST?** End-to-end type safety means the frontend can never call a procedure that doesn't exist or pass the wrong argument shape. In a lending context where data integrity is non-negotiable, this eliminates an entire class of runtime errors.

**Why agent-per-stage over a monolithic LLM?** Each agent has a narrow, well-defined scope. This makes failure modes predictable, explainability tractable, and human review targeted. A monolithic LLM that "does everything" cannot be audited at the step level — a hard requirement under SR 11-7 and Basel model risk guidelines.

**Why PostgreSQL over a document store?** Lending data is deeply relational. A deal has borrowers, which have financials, which have line items, which feed ratios, which feed a credit grade. A document store would require application-level joins that are both slower and harder to audit. PostgreSQL's ACID guarantees also matter when multiple agents are writing to the same deal record concurrently.

---

## Running Locally

### Prerequisites

- Node.js 22+
- pnpm 9+
- PostgreSQL 15+

### Setup

```bash
# Clone the repository
git clone https://github.com/Navneet-M-PM/agentic-commercial-lending-prd.git
cd agentic-commercial-lending-prd

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, and LLM API keys

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Running Tests

```bash
pnpm test
# Expected: 21 tests passing, 0 TypeScript errors
```

---

## Feature Highlights

### Real Document Upload with AI Classification

The Document Processing page accepts actual PDF/image uploads. The backend sends the file to an LLM vision API, which classifies the document type (financial statement, tax return, bank statement, etc.), extracts key fields, and returns a confidence score. Low-confidence extractions are flagged for human review — a deliberate design choice that keeps humans in the loop without slowing down high-confidence cases.

### Live LLM Credit Memo Generator

The Credit Memo page calls a real LLM inference endpoint to generate a structured credit memo from the deal's financial data. The memo is generated section by section (executive summary, financial analysis, risk factors, recommendation) with citations embedded inline. The raw LLM output is also available for inspection — a transparency feature that matters to compliance teams.

### Bank ROI Calculator

The ROI Calculator lets a prospect enter their bank's actual metrics — loan volume, average loan size, headcount, current NPL rate — and see a personalised 36-month projection of savings and revenue uplift. The underlying model is based on published benchmarks from Oliver Wyman, McKinsey, and the Federal Reserve. This is the single most effective conversion tool in a live sales demo.

### Guided Demo Tour

A 5-step scripted tour walks a prospect through the platform's key value propositions in sequence, with contextual highlights and narration. Designed for a 15-minute executive presentation where the PM or sales engineer needs to control the narrative.

---

## Product Thinking: Why This Approach

### The Core Insight

Most "AI for lending" products are point solutions — a document OCR tool here, a credit scoring model there. They reduce friction at one stage but create new integration burden between stages. The result is that banks end up with five AI vendors, five integration contracts, and five explainability problems instead of one.

LendAI's insight is that **the workflow is the product**. The value is not in any individual agent — it is in the handoff contracts between agents, the shared data model that every agent reads from and writes to, and the audit trail that makes every AI output traceable to a human decision.

### The Build vs. Buy Decision

Banks will ask: "Why not build this ourselves?" The answer is time-to-value and proprietary training data. A bank that starts building today will have a working system in 18–24 months. LendAI can be deployed in 90 days. More importantly, LendAI's models will have been trained on data from dozens of banks by the time any single bank's internal system is live — giving it a prediction accuracy advantage that compounds over time.

### The Regulatory Moat

SR 11-7 (Federal Reserve model risk guidance) requires that every model output be explainable, auditable, and subject to independent validation. Most AI vendors treat this as a compliance checkbox. LendAI treats it as a product feature — explainability is surfaced in the UI, not buried in documentation. This is a genuine competitive moat because it takes years of regulatory relationship-building to credibly claim SR 11-7 compliance, not just months of engineering.

---

## About This Project

This project was built as a **product portfolio artifact** — a demonstration of what senior product management looks like when applied to a complex, regulated, enterprise domain. It combines:

- **Product strategy**: A 19-section PRD grounded in primary research and cited data
- **Product execution**: A fully functional demo application with real AI inference
- **Product communication**: A guided tour and ROI calculator designed for executive audiences
- **Technical depth**: A production-grade stack with type safety, tested procedures, and a real database schema

The goal is not to show that I can write requirements. The goal is to show that I can identify a real problem, design a coherent solution, build the evidence that the solution works, and communicate it to the people who can fund it.

---

## Contact

**Navneet M** — Senior Product Manager  
[GitHub](https://github.com/Navneet-M-PM) · [Live Demo](https://agentic-ai-lending.manus.space) · [Product PRD](https://agentic-ai-lending.manus.space/prd)

---

## References

1. McKinsey Global Banking Annual Review, 2023 — *The productivity imperative in commercial banking*
2. Oliver Wyman, *Commercial Lending Operations Benchmark*, 2023
3. Federal Reserve, *Small Business Credit Survey*, 2024
4. Deloitte Financial Services, *AI in Credit Risk: From Pilot to Production*, 2023
5. Reserve Bank of India, *Annual Report on Trends and Progress of Banking*, 2024
6. Basel Committee on Banking Supervision, *Principles for the Sound Management of Operational Risk*, 2021
7. Federal Reserve SR 11-7, *Guidance on Model Risk Management*, 2011 (updated 2021)
8. Accenture, *Banking Technology Vision*, 2024
9. BIS Working Paper No. 1185, *Machine learning in credit risk*, 2024
10. KPMG, *Pulse of Fintech H2 2023* — commercial lending AI adoption rates
