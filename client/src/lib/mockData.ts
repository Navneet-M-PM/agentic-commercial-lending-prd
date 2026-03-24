// ─── Mock Data for Agentic AI Commercial Lending Platform Demo ───────────────

export type DealStage = 'Application' | 'Document Review' | 'Underwriting' | 'Approval' | 'Monitoring' | 'Closed';
export type RiskRating = 'Low' | 'Medium' | 'High' | 'Watch';

export interface Deal {
  id: string;
  borrower: string;
  industry: string;
  loanType: string;
  amount: number;
  stage: DealStage;
  riskRating: RiskRating;
  rm: string;
  submittedDate: string;
  lastActivity: string;
  daysInStage: number;
  dscr: number;
  ltv: number;
  aiScore: number;
  progress: number;
  city: string;
  description: string;
}

export const deals: Deal[] = [
  {
    id: 'DL-2024-001',
    borrower: 'Meridian Manufacturing Co.',
    industry: 'Manufacturing',
    loanType: 'Term Loan',
    amount: 12500000,
    stage: 'Underwriting',
    riskRating: 'Low',
    rm: 'Sarah Chen',
    submittedDate: '2024-03-01',
    lastActivity: '2 hours ago',
    daysInStage: 3,
    dscr: 1.42,
    ltv: 58,
    aiScore: 82,
    progress: 65,
    city: 'Chicago, IL',
    description: 'Working capital expansion for new production line. Strong cash flows, established 15-year relationship.',
  },
  {
    id: 'DL-2024-002',
    borrower: 'Apex Logistics Group',
    industry: 'Transportation',
    loanType: 'Revolving Credit',
    amount: 8000000,
    stage: 'Document Review',
    riskRating: 'Medium',
    rm: 'James Park',
    submittedDate: '2024-03-05',
    lastActivity: '45 min ago',
    daysInStage: 2,
    dscr: 1.18,
    ltv: 72,
    aiScore: 68,
    progress: 35,
    city: 'Dallas, TX',
    description: 'Fleet expansion financing. Moderate leverage, seasonal revenue patterns noted.',
  },
  {
    id: 'DL-2024-003',
    borrower: 'Sunrise Healthcare Systems',
    industry: 'Healthcare',
    loanType: 'Commercial Real Estate',
    amount: 22000000,
    stage: 'Approval',
    riskRating: 'Low',
    rm: 'Maria Rodriguez',
    submittedDate: '2024-02-20',
    lastActivity: '1 hour ago',
    daysInStage: 1,
    dscr: 1.65,
    ltv: 55,
    aiScore: 88,
    progress: 85,
    city: 'Houston, TX',
    description: 'New medical facility acquisition. Excellent credit history, strong DSCR, low LTV.',
  },
  {
    id: 'DL-2024-004',
    borrower: 'TechVentures Capital LLC',
    industry: 'Technology',
    loanType: 'Equipment Finance',
    amount: 4500000,
    stage: 'Application',
    riskRating: 'Medium',
    rm: 'David Kim',
    submittedDate: '2024-03-08',
    lastActivity: '3 hours ago',
    daysInStage: 1,
    dscr: 1.25,
    ltv: 65,
    aiScore: 71,
    progress: 15,
    city: 'San Francisco, CA',
    description: 'Data center equipment financing. New-to-bank relationship, strong tech sector growth.',
  },
  {
    id: 'DL-2024-005',
    borrower: 'Coastal Real Estate Partners',
    industry: 'Real Estate',
    loanType: 'Construction Loan',
    amount: 35000000,
    stage: 'Monitoring',
    riskRating: 'Watch',
    rm: 'Sarah Chen',
    submittedDate: '2023-11-15',
    lastActivity: '30 min ago',
    daysInStage: 45,
    dscr: 0.95,
    ltv: 78,
    aiScore: 52,
    progress: 95,
    city: 'Miami, FL',
    description: 'Mixed-use development. Construction delays noted. Cash flow under pressure. EWS alert triggered.',
  },
  {
    id: 'DL-2024-006',
    borrower: 'Green Energy Solutions Inc.',
    industry: 'Energy',
    loanType: 'Project Finance',
    amount: 18000000,
    stage: 'Underwriting',
    riskRating: 'Low',
    rm: 'James Park',
    submittedDate: '2024-03-03',
    lastActivity: '5 hours ago',
    daysInStage: 4,
    dscr: 1.55,
    ltv: 60,
    aiScore: 85,
    progress: 60,
    city: 'Phoenix, AZ',
    description: 'Solar farm project financing. Government-backed PPA contracts. Strong ESG profile.',
  },
  {
    id: 'DL-2024-007',
    borrower: 'Metro Retail Holdings',
    industry: 'Retail',
    loanType: 'Revolving Credit',
    amount: 6500000,
    stage: 'Document Review',
    riskRating: 'High',
    rm: 'Maria Rodriguez',
    submittedDate: '2024-03-06',
    lastActivity: '2 hours ago',
    daysInStage: 3,
    dscr: 1.05,
    ltv: 82,
    aiScore: 44,
    progress: 30,
    city: 'New York, NY',
    description: 'Inventory financing for retail chain. High leverage, declining foot traffic in key locations.',
  },
  {
    id: 'DL-2024-008',
    borrower: 'Pacific Food Distribution',
    industry: 'Food & Beverage',
    loanType: 'Term Loan',
    amount: 9200000,
    stage: 'Closed',
    riskRating: 'Low',
    rm: 'David Kim',
    submittedDate: '2024-02-01',
    lastActivity: '5 days ago',
    daysInStage: 0,
    dscr: 1.48,
    ltv: 62,
    aiScore: 79,
    progress: 100,
    city: 'Seattle, WA',
    description: 'Cold storage facility expansion. Closed in 4 days with AI-assisted underwriting.',
  },
];

export const agentActivities = [
  { id: 1, agent: 'Document Orchestration Agent', action: 'Classified 14 documents for DL-2024-002 (Apex Logistics)', status: 'completed', time: '2 min ago', deal: 'DL-2024-002', icon: 'FileSearch', color: 'text-purple-400' },
  { id: 2, agent: 'Spreading Agent', action: 'Auto-spread FY2023 P&L for Meridian Manufacturing — 94% confidence', status: 'completed', time: '8 min ago', deal: 'DL-2024-001', icon: 'BarChart3', color: 'text-yellow-400' },
  { id: 3, agent: 'Compliance Agent', action: 'Policy check passed for DL-2024-003 (Sunrise Healthcare) — 12/12 rules', status: 'completed', time: '15 min ago', deal: 'DL-2024-003', icon: 'Shield', color: 'text-red-400' },
  { id: 4, agent: 'Underwriting Copilot', action: 'Draft credit memo generated for DL-2024-001 — 8 risk factors identified', status: 'completed', time: '22 min ago', deal: 'DL-2024-001', icon: 'Brain', color: 'text-green-400' },
  { id: 5, agent: 'Monitoring Agent', action: 'EWS Alert: DL-2024-005 DSCR declined to 0.95 — covenant breach risk', status: 'alert', time: '30 min ago', deal: 'DL-2024-005', icon: 'AlertTriangle', color: 'text-orange-400' },
  { id: 6, agent: 'Intake & Eligibility Agent', action: 'New application DL-2024-004 (TechVentures) pre-screened — eligible', status: 'completed', time: '45 min ago', deal: 'DL-2024-004', icon: 'Zap', color: 'text-blue-400' },
  { id: 7, agent: 'Approval Flow Agent', action: 'DL-2024-003 routed to Senior Credit Committee — $22M threshold', status: 'pending', time: '1 hr ago', deal: 'DL-2024-003', icon: 'GitBranch', color: 'text-blue-400' },
  { id: 8, agent: 'Document Orchestration Agent', action: 'Missing document request sent to Metro Retail Holdings — 3 items', status: 'pending', time: '2 hr ago', deal: 'DL-2024-007', icon: 'FileSearch', color: 'text-purple-400' },
  { id: 9, agent: 'Spreading Agent', action: 'Balance sheet reconciliation flagged for DL-2024-007 — human review needed', status: 'review', time: '2 hr ago', deal: 'DL-2024-007', icon: 'BarChart3', color: 'text-yellow-400' },
  { id: 10, agent: 'Compliance Agent', action: 'BSA/AML screening completed for DL-2024-004 — no flags', status: 'completed', time: '3 hr ago', deal: 'DL-2024-004', icon: 'Shield', color: 'text-red-400' },
];

export const documents = [
  { id: 1, name: 'FY2023_Annual_Report.pdf', type: 'Financial Statement', confidence: 98, status: 'verified', pages: 42, size: '3.2 MB', deal: 'DL-2024-001' },
  { id: 2, name: 'Q3_2023_Bank_Statement.pdf', type: 'Bank Statement', confidence: 96, status: 'verified', pages: 8, size: '1.1 MB', deal: 'DL-2024-001' },
  { id: 3, name: 'Tax_Return_2022.pdf', type: 'Tax Return', confidence: 99, status: 'verified', pages: 28, size: '2.8 MB', deal: 'DL-2024-001' },
  { id: 4, name: 'Property_Appraisal_Report.pdf', type: 'Appraisal', confidence: 94, status: 'verified', pages: 65, size: '8.4 MB', deal: 'DL-2024-001' },
  { id: 5, name: 'Articles_of_Incorporation.pdf', type: 'Legal Document', confidence: 100, status: 'verified', pages: 12, size: '0.8 MB', deal: 'DL-2024-001' },
  { id: 6, name: 'Personal_Financial_Statement.pdf', type: 'Personal Financials', confidence: 91, status: 'review', pages: 6, size: '0.5 MB', deal: 'DL-2024-001' },
  { id: 7, name: 'Q4_Bank_Statement.pdf', type: 'Bank Statement', confidence: 0, status: 'missing', pages: 0, size: '', deal: 'DL-2024-001' },
  { id: 8, name: 'Environmental_Assessment.pdf', type: 'Environmental Report', confidence: 0, status: 'missing', pages: 0, size: '', deal: 'DL-2024-001' },
];

export const financialData = {
  incomeStatement: [
    { label: 'Revenue', fy2021: 18400000, fy2022: 21200000, fy2023: 24800000, trend: 'up' },
    { label: 'Cost of Goods Sold', fy2021: 11040000, fy2022: 12720000, fy2023: 14880000, trend: 'up' },
    { label: 'Gross Profit', fy2021: 7360000, fy2022: 8480000, fy2023: 9920000, trend: 'up' },
    { label: 'Operating Expenses', fy2021: 4100000, fy2022: 4600000, fy2023: 5200000, trend: 'up' },
    { label: 'EBITDA', fy2021: 3260000, fy2022: 3880000, fy2023: 4720000, trend: 'up' },
    { label: 'Net Income', fy2021: 2100000, fy2022: 2650000, fy2023: 3200000, trend: 'up' },
  ],
  ratios: [
    { label: 'DSCR', value: 1.42, benchmark: 1.25, status: 'pass', description: 'Debt Service Coverage Ratio' },
    { label: 'Current Ratio', value: 2.1, benchmark: 1.5, status: 'pass', description: 'Current Assets / Current Liabilities' },
    { label: 'Debt/EBITDA', value: 2.8, benchmark: 4.0, status: 'pass', description: 'Total Debt / EBITDA' },
    { label: 'LTV', value: 58, benchmark: 75, status: 'pass', description: 'Loan-to-Value Ratio (%)' },
    { label: 'Gross Margin', value: 40.0, benchmark: 35.0, status: 'pass', description: 'Gross Profit / Revenue (%)' },
    { label: 'Revenue Growth', value: 17.0, benchmark: 5.0, status: 'pass', description: 'YoY Revenue Growth (%)' },
  ],
};

export const creditMemoSections = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    content: `Meridian Manufacturing Co. ("Meridian" or the "Borrower") is requesting a $12.5 million term loan to finance the acquisition of new CNC manufacturing equipment and expand production capacity at its Chicago facility. The Borrower has demonstrated consistent revenue growth of **17% YoY** [¹] and maintains a strong DSCR of **1.42x** [²], comfortably above the Bank's minimum threshold of 1.25x. The proposed loan represents a moderate leverage position with an LTV of **58%** [³] against appraised collateral value of $21.6 million.`,
    citations: [
      { id: 1, text: 'FY2023 Annual Report, p. 12 — Revenue grew from $21.2M (FY2022) to $24.8M (FY2023)', source: 'FY2023_Annual_Report.pdf' },
      { id: 2, text: 'Financial Spreading Analysis — DSCR calculated as EBITDA ($4.72M) / Total Debt Service ($3.32M)', source: 'Spreading_Analysis.xlsx' },
      { id: 3, text: 'Property Appraisal Report — Appraised value $21.6M vs. Loan Amount $12.5M', source: 'Property_Appraisal_Report.pdf' },
    ],
  },
  {
    id: 'borrower-profile',
    title: 'Borrower Profile & Business Overview',
    content: `Meridian Manufacturing Co. was founded in 2009 and has operated as a precision CNC manufacturer serving the aerospace and automotive sectors for 15 years. The company employs **340 full-time employees** [⁴] across two facilities in Chicago, IL and Gary, IN. The management team is led by CEO Robert Meridian (founder, 25 years industry experience) and CFO Linda Park (CPA, 18 years experience). The company has maintained a **15-year banking relationship** [⁵] with First National Bank with no defaults or covenant violations recorded.`,
    citations: [
      { id: 4, text: 'FY2023 Annual Report, p. 8 — Employee count as of December 31, 2023', source: 'FY2023_Annual_Report.pdf' },
      { id: 5, text: 'CRM Records — Account opened March 2009, 15 years of continuous relationship', source: 'CRM_History.pdf' },
    ],
  },
  {
    id: 'financial-analysis',
    title: 'Financial Analysis',
    content: `The Borrower's financial performance demonstrates a consistent upward trajectory. Revenue has grown at a **3-year CAGR of 10.4%** [⁶], driven by new contracts with Boeing and General Motors announced in Q2 2023. EBITDA margins have expanded from **17.7% (FY2021) to 19.0% (FY2023)** [⁷], reflecting operational leverage and improved pricing power. Working capital remains healthy with a current ratio of **2.1x** [⁸]. The Underwriting Copilot Agent flagged one item for human review: **accounts receivable days outstanding increased from 42 to 58 days** [⁹] — management attributes this to a single large customer (Boeing) with extended payment terms.`,
    citations: [
      { id: 6, text: 'Spreading Analysis — Revenue CAGR: ($24.8M / $18.4M)^(1/2) - 1 = 10.4%', source: 'Spreading_Analysis.xlsx' },
      { id: 7, text: 'Spreading Analysis — EBITDA Margin FY2021: $3.26M/$18.4M = 17.7%; FY2023: $4.72M/$24.8M = 19.0%', source: 'Spreading_Analysis.xlsx' },
      { id: 8, text: 'Balance Sheet FY2023 — Current Assets $8.4M / Current Liabilities $4.0M = 2.1x', source: 'FY2023_Annual_Report.pdf' },
      { id: 9, text: 'Spreading Analysis — AR Days: FY2022 42 days vs. FY2023 58 days. See Note 4 in Annual Report.', source: 'FY2023_Annual_Report.pdf' },
    ],
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment & Mitigants',
    content: `The Underwriting Copilot Agent identified **8 risk factors** across four categories. Primary risks include: (1) **Customer concentration** — top 3 customers represent 62% of revenue [¹⁰], (2) **Industry cyclicality** — aerospace/auto sectors subject to economic downturns, (3) **Equipment obsolescence risk** — technology refresh cycle of 7-10 years. Key mitigants include: strong management team with 25+ years experience, diversified product portfolio, government defense contracts (18% of revenue) providing counter-cyclical stability [¹¹], and personal guarantee from Robert Meridian covering 100% of loan amount.`,
    citations: [
      { id: 10, text: 'FY2023 Annual Report, Note 14 — Customer Concentration: Boeing 28%, GM 22%, Lockheed 12%', source: 'FY2023_Annual_Report.pdf' },
      { id: 11, text: 'FY2023 Annual Report, p. 22 — Defense contracts: $4.46M (18% of $24.8M revenue)', source: 'FY2023_Annual_Report.pdf' },
    ],
  },
  {
    id: 'recommendation',
    title: 'Recommendation',
    content: `The Underwriting Copilot Agent recommends **APPROVAL** of the $12.5 million term loan subject to the following conditions: (1) 7-year amortization at SOFR + 225bps, (2) First lien on all equipment financed, (3) Annual financial reporting covenant with DSCR minimum 1.25x, (4) Personal guarantee from Robert Meridian, (5) Borrowing base certificate quarterly. The proposed structure adequately compensates the Bank for identified risks. The AI Risk Score of **82/100** [¹²] places this credit in the **Low Risk** category, consistent with the Borrower's financial profile and relationship history.`,
    citations: [
      { id: 12, text: 'AI Risk Model v2.3 — Score based on 47 financial, behavioral, and market variables. Model documentation available in MRM repository.', source: 'AI_Risk_Model_Output.pdf' },
    ],
  },
];

export const approvalWorkflow = {
  deal: 'DL-2024-003',
  borrower: 'Sunrise Healthcare Systems',
  amount: 22000000,
  stages: [
    { id: 1, name: 'RM Submission', approver: 'Maria Rodriguez', role: 'Relationship Manager', status: 'approved', date: '2024-02-20', comment: 'Strong credit, recommend approval. Client has excellent track record.' },
    { id: 2, name: 'Credit Analyst Review', approver: 'AI Underwriting Copilot', role: 'Automated Analysis', status: 'approved', date: '2024-02-21', comment: 'AI Score: 88/100. DSCR 1.65x, LTV 55%. All policy checks passed. Draft memo generated.' },
    { id: 3, name: 'Senior Underwriter', approver: 'Michael Torres', role: 'VP Credit', status: 'approved', date: '2024-02-23', comment: 'Reviewed AI memo. Concur with recommendation. Adjusted pricing to SOFR+195bps.' },
    { id: 4, name: 'Compliance Review', approver: 'AI Compliance Agent', role: 'Automated Compliance', status: 'approved', date: '2024-02-24', comment: 'BSA/AML clear. OFAC clear. CRA eligible. All 12 policy rules passed.' },
    { id: 5, name: 'Senior Credit Committee', approver: 'Jennifer Walsh', role: 'Chief Credit Officer', status: 'pending', date: null, comment: null },
    { id: 6, name: 'Final Approval & Booking', approver: 'AI Closing Agent', role: 'Automated Booking', status: 'waiting', date: null, comment: null },
  ],
};

export const portfolioAlerts = [
  { id: 1, deal: 'DL-2024-005', borrower: 'Coastal Real Estate Partners', type: 'DSCR Breach', severity: 'critical', message: 'DSCR declined to 0.95x (covenant: 1.10x). Construction delays of 4 months reported.', date: '2024-03-08', agent: 'Monitoring Agent' },
  { id: 2, deal: 'DL-2023-089', borrower: 'Metro Retail Holdings', type: 'Revenue Decline', severity: 'warning', message: 'Q4 revenue declined 18% YoY. Cash burn rate elevated. Monitoring closely.', date: '2024-03-07', agent: 'Monitoring Agent' },
  { id: 3, deal: 'DL-2023-112', borrower: 'Pinnacle Hotels Group', type: 'Covenant Waiver Request', severity: 'info', message: 'Borrower requested waiver for leverage covenant. Q1 2024 improvement expected.', date: '2024-03-06', agent: 'Monitoring Agent' },
  { id: 4, deal: 'DL-2023-045', borrower: 'TechStart Innovations', type: 'Negative News', severity: 'warning', message: 'AI detected negative news: key customer (40% revenue) announced bankruptcy filing.', date: '2024-03-05', agent: 'Monitoring Agent' },
];

export const complianceChecks = [
  { id: 1, rule: 'BSA/AML Screening', status: 'pass', category: 'Regulatory', details: 'FinCEN database check — no matches', time: '0.8s' },
  { id: 2, rule: 'OFAC Sanctions Check', status: 'pass', category: 'Regulatory', details: 'SDN list — no matches for borrower or principals', time: '0.4s' },
  { id: 3, rule: 'Minimum DSCR (1.25x)', status: 'pass', category: 'Credit Policy', details: 'Actual DSCR: 1.42x — exceeds minimum', time: '0.1s' },
  { id: 4, rule: 'Maximum LTV (75%)', status: 'pass', category: 'Credit Policy', details: 'Actual LTV: 58% — within policy', time: '0.1s' },
  { id: 5, rule: 'Borrower Credit Score', status: 'pass', category: 'Credit Policy', details: 'AI Score 82/100 — above threshold of 60', time: '0.2s' },
  { id: 6, rule: 'Environmental Compliance', status: 'review', category: 'Regulatory', details: 'Phase I ESA report pending — flagged for human review', time: '0.3s' },
  { id: 7, rule: 'CRA Eligibility Assessment', status: 'pass', category: 'Regulatory', details: 'Qualifies as CRA-eligible community development loan', time: '0.5s' },
  { id: 8, rule: 'Concentration Limits', status: 'pass', category: 'Credit Policy', details: 'Industry concentration within 15% limit', time: '0.1s' },
  { id: 9, rule: 'Appraisal Independence', status: 'pass', category: 'Regulatory', details: 'Appraisal ordered via approved panel — FIRREA compliant', time: '0.2s' },
  { id: 10, rule: 'Flood Zone Determination', status: 'pass', category: 'Regulatory', details: 'Property not in FEMA flood zone', time: '0.3s' },
  { id: 11, rule: 'Personal Guarantee Coverage', status: 'pass', category: 'Credit Policy', details: '100% personal guarantee from Robert Meridian', time: '0.1s' },
  { id: 12, rule: 'Insider Lending Check', status: 'pass', category: 'Regulatory', details: 'No Regulation O conflicts identified', time: '0.2s' },
];

export const kpiData = {
  timeTodecision: { before: 21, after: 4, unit: 'days', improvement: 81 },
  costPerLoan: { before: 11319, after: 4200, unit: 'USD', improvement: 63 },
  throughput: { before: 8, after: 28, unit: 'deals/month/underwriter', improvement: 250 },
  firstPassYield: { before: 62, after: 96, unit: '%', improvement: 55 },
  nplRatio: { before: 2.8, after: 1.9, unit: '%', improvement: 32 },
  spreadingTime: { before: 72, after: 2, unit: 'hours', improvement: 97 },
};

export const portfolioTrends = [
  { month: 'Sep', npl: 2.8, avgDscr: 1.38, newDeals: 12, closedDeals: 9 },
  { month: 'Oct', npl: 2.6, avgDscr: 1.40, newDeals: 15, closedDeals: 11 },
  { month: 'Nov', npl: 2.5, avgDscr: 1.42, newDeals: 18, closedDeals: 14 },
  { month: 'Dec', npl: 2.3, avgDscr: 1.44, newDeals: 14, closedDeals: 16 },
  { month: 'Jan', npl: 2.1, avgDscr: 1.45, newDeals: 20, closedDeals: 18 },
  { month: 'Feb', npl: 2.0, avgDscr: 1.47, newDeals: 22, closedDeals: 19 },
  { month: 'Mar', npl: 1.9, avgDscr: 1.48, newDeals: 24, closedDeals: 21 },
];

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
};

export const stageColors: Record<DealStage, string> = {
  'Application': 'stage-application',
  'Document Review': 'stage-documents',
  'Underwriting': 'stage-underwriting',
  'Approval': 'stage-approval',
  'Monitoring': 'stage-monitoring',
  'Closed': 'risk-low',
};

export const riskColors: Record<RiskRating, string> = {
  'Low': 'risk-low',
  'Medium': 'risk-medium',
  'High': 'risk-high',
  'Watch': 'risk-watch',
};

export interface PortfolioAccount {
  id: string;
  dealId: string;
  borrower: string;
  industry: string;
  outstandingBalance: number;
  dscr: number;
  riskScore: number;
  riskFlag: 'green' | 'yellow' | 'red';
  ewsSignal: 'Normal' | 'Watch' | 'Alert';
  lastReview: string;
}

export const portfolioAccounts: PortfolioAccount[] = [
  { id: 'PA-001', dealId: 'DL-2024-001', borrower: 'Meridian Manufacturing Co.', industry: 'Manufacturing', outstandingBalance: 12500000, dscr: 1.42, riskScore: 82, riskFlag: 'green', ewsSignal: 'Normal', lastReview: 'Mar 1, 2024' },
  { id: 'PA-002', dealId: 'DL-2024-003', borrower: 'Sunrise Healthcare Systems', industry: 'Healthcare', outstandingBalance: 22000000, dscr: 1.65, riskScore: 88, riskFlag: 'green', ewsSignal: 'Normal', lastReview: 'Feb 20, 2024' },
  { id: 'PA-003', dealId: 'DL-2024-005', borrower: 'Coastal Real Estate Partners', industry: 'Real Estate', outstandingBalance: 35000000, dscr: 0.95, riskScore: 38, riskFlag: 'red', ewsSignal: 'Alert', lastReview: 'Mar 8, 2024' },
  { id: 'PA-004', dealId: 'DL-2024-006', borrower: 'Green Energy Solutions Inc.', industry: 'Energy', outstandingBalance: 18000000, dscr: 1.55, riskScore: 85, riskFlag: 'green', ewsSignal: 'Normal', lastReview: 'Mar 3, 2024' },
  { id: 'PA-005', dealId: 'DL-2024-007', borrower: 'Metro Retail Holdings', industry: 'Retail', outstandingBalance: 6500000, dscr: 1.05, riskScore: 44, riskFlag: 'yellow', ewsSignal: 'Watch', lastReview: 'Mar 6, 2024' },
  { id: 'PA-006', dealId: 'DL-2024-008', borrower: 'Pacific Food Distribution', industry: 'Food & Beverage', outstandingBalance: 9200000, dscr: 1.48, riskScore: 79, riskFlag: 'green', ewsSignal: 'Normal', lastReview: 'Mar 5, 2024' },
  { id: 'PA-007', dealId: 'DL-2023-089', borrower: 'Lakeside Hospitality Group', industry: 'Hospitality', outstandingBalance: 14500000, dscr: 1.12, riskScore: 51, riskFlag: 'yellow', ewsSignal: 'Watch', lastReview: 'Mar 7, 2024' },
  { id: 'PA-008', dealId: 'DL-2023-112', borrower: 'Summit Retail Partners', industry: 'Retail', outstandingBalance: 8800000, dscr: 1.08, riskScore: 48, riskFlag: 'yellow', ewsSignal: 'Watch', lastReview: 'Mar 6, 2024' },
];
