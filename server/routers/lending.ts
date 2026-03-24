import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

const generateCreditMemoInput = z.object({
  dealId: z.string(),
  borrowerName: z.string(),
  loanAmount: z.number(),
  loanPurpose: z.string(),
  industry: z.string(),
  revenue: z.number(),
  ebitda: z.number(),
  dscr: z.number(),
  ltv: z.number(),
  leverage: z.number(),
  currentRatio: z.number(),
  revenueGrowth: z.number(),
  yearsInBusiness: z.number(),
  collateralType: z.string(),
  collateralValue: z.number(),
  aiRiskScore: z.number(),
});

export const lendingRouter = router({
  generateCreditMemo: publicProcedure
    .input(generateCreditMemoInput)
    .mutation(async ({ input }) => {
      const systemPrompt = `You are a senior commercial credit underwriter at a major bank with 20+ years of experience. 
You write precise, professional credit memoranda that are used by credit committees to make lending decisions.
Your memos are:
- Factual and data-driven, citing specific financial metrics
- Balanced — presenting both strengths and risks
- Structured with clear sections
- Written in formal banking language
- Concise but comprehensive (not more than 600 words total)
Always include specific numbers from the provided financial data.`;

      const userPrompt = `Write a professional credit memorandum for the following commercial loan request.

DEAL INFORMATION:
- Deal ID: ${input.dealId}
- Borrower: ${input.borrowerName}
- Loan Amount: $${(input.loanAmount / 1_000_000).toFixed(1)}M
- Purpose: ${input.loanPurpose}
- Industry: ${input.industry}

FINANCIAL HIGHLIGHTS (from AI-assisted spreading):
- Annual Revenue: $${(input.revenue / 1_000_000).toFixed(1)}M
- EBITDA: $${(input.ebitda / 1_000_000).toFixed(1)}M
- DSCR: ${input.dscr.toFixed(2)}x (policy minimum: 1.25x)
- LTV: ${input.ltv}% (policy maximum: 75%)
- Leverage (Debt/EBITDA): ${input.leverage.toFixed(1)}x
- Current Ratio: ${input.currentRatio.toFixed(2)}x
- Revenue Growth (3-yr CAGR): ${input.revenueGrowth}%
- Years in Business: ${input.yearsInBusiness}

COLLATERAL:
- Type: ${input.collateralType}
- Appraised Value: $${(input.collateralValue / 1_000_000).toFixed(1)}M

AI RISK SCORE: ${input.aiRiskScore}/100

Write the credit memo with these exact sections:
1. EXECUTIVE SUMMARY (2-3 sentences)
2. BORROWER OVERVIEW (3-4 sentences about the company)
3. FINANCIAL ANALYSIS (key metrics, trends, and what they mean for credit quality)
4. COLLATERAL ANALYSIS (collateral coverage and quality)
5. KEY RISKS (2-3 specific, material risks with mitigants)
6. RECOMMENDATION (clear recommendation with proposed structure)

Format each section with the section header in ALL CAPS followed by a colon, then the content. Keep it professional and precise.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        const content = (response?.choices?.[0]?.message?.content ?? "") as string;

        // Parse sections from the generated memo
        const sections = parseMemoSections(content);

        return {
          success: true,
          rawContent: content,
          sections,
          generatedAt: new Date().toISOString(),
          model: "LendAI Underwriting Copilot v2.1",
          tokensUsed: response?.usage?.total_tokens ?? 0,
        };
      } catch (error) {
        console.error("[LLM] Credit memo generation failed:", error);
        throw new Error("Credit memo generation failed. Please try again.");
      }
    }),
});

function parseMemoSections(content: string): Record<string, string> {
  const sectionHeaders = [
    "EXECUTIVE SUMMARY",
    "BORROWER OVERVIEW",
    "FINANCIAL ANALYSIS",
    "COLLATERAL ANALYSIS",
    "KEY RISKS",
    "RECOMMENDATION",
  ];

  const sections: Record<string, string> = {};

  sectionHeaders.forEach((header, idx) => {
    const nextHeader = sectionHeaders[idx + 1];
    const startPattern = new RegExp(`${header}[:\\s]`, "i");
    const startMatch = content.search(startPattern);

    if (startMatch === -1) return;

    const startIdx = startMatch + header.length + 1;

    let endIdx: number;
    if (nextHeader) {
      const endPattern = new RegExp(`${nextHeader}[:\\s]`, "i");
      const endMatch = content.search(endPattern);
      endIdx = endMatch === -1 ? content.length : endMatch;
    } else {
      endIdx = content.length;
    }

    sections[header] = content.slice(startIdx, endIdx).trim();
  });

  return sections;
}
