import { useState } from "react";
import LendingLayout from "@/components/LendingLayout";
import { creditMemoSections, deals } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, FileText, ExternalLink, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Edit3, Download, Zap } from "lucide-react";
import { toast } from "sonner";

export default function CreditMemo() {
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);
  const [acceptedSections, setAcceptedSections] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const deal = deals[0];

  const totalCitations = creditMemoSections.reduce((s, sec) => s + sec.citations.length, 0);
  const accepted = acceptedSections.size;

  const handleAccept = (sectionId: string) => {
    setAcceptedSections(prev => { const next = new Set(Array.from(prev)); next.add(sectionId); return next; });
    toast.success("Section accepted", { description: "Underwriter approval recorded in audit trail." });
  };

  const renderContent = (content: string, citations: { id: number; text: string; source: string }[]) => {
    const parts = content.split(/(\[\d+\]|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|¹⁰|¹¹|¹²)/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]|[¹²³⁴⁵⁶⁷⁸⁹]|¹⁰|¹¹|¹²/);
      if (match) {
        const superscriptMap: Record<string, number> = { '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '¹⁰': 10, '¹¹': 11, '¹²': 12 };
        const citNum = match[1] ? parseInt(match[1]) : superscriptMap[part] || 0;
        const citation = citations.find(c => c.id === citNum);
        if (citation) {
          const key = `${i}-${citNum}`;
          return (
            <span key={key} className="relative inline-block">
              <button
                onClick={() => setExpandedCitation(expandedCitation === key ? null : key)}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold hover:bg-primary/40 transition-colors mx-0.5 align-super"
              >
                {citNum}
              </button>
              {expandedCitation === key && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-card border border-primary/30 rounded-lg p-3 shadow-xl z-50">
                  <div className="flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-medium text-primary mb-1">{citation.source}</div>
                      <div className="text-[10px] text-muted-foreground leading-relaxed">{citation.text}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border flex items-center gap-1 text-[9px] text-primary cursor-pointer hover:text-primary/80">
                    <ExternalLink className="w-2.5 h-2.5" /> Open source document
                  </div>
                </div>
              )}
            </span>
          );
        }
      }
      // Bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <LendingLayout title="AI Credit Memo" subtitle={`${deal.borrower} · ${deal.id}`}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Underwriting Copilot Agent</div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />Draft generated</span>
                <span>{totalCitations} citations</span>
                <span>{accepted}/{creditMemoSections.length} sections approved</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-border text-muted-foreground gap-1.5 text-xs h-8">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </Button>
            {accepted === creditMemoSections.length && (
              <Button size="sm" className="bg-green-500 text-white hover:bg-green-600 gap-1.5 text-xs h-8">
                <CheckCircle2 className="w-3.5 h-3.5" /> Submit for Approval
              </Button>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Underwriter Review Progress</span>
            <span className="text-xs text-muted-foreground">{accepted} of {creditMemoSections.length} sections approved</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full transition-all duration-500" style={{ width: `${(accepted / creditMemoSections.length) * 100}%` }} />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Click the numbered citations <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold mx-0.5">1</span> to view source evidence. Accept each section to advance to approval.
          </div>
        </div>

        {/* Memo sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            {/* Memo header */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-center border-b border-border pb-4 mb-4">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Confidential — Credit Committee Memorandum</div>
                <h2 className="text-lg font-bold text-foreground">Credit Approval Memorandum</h2>
                <div className="text-sm text-muted-foreground mt-1">{deal.borrower}</div>
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Deal ID: {deal.id}</span>
                  <span>Amount: $12,500,000</span>
                  <span>Date: March 4, 2024</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                  <Brain className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">AI-Generated Draft · Underwriting Copilot v2.3</span>
                </div>
                <span>Generated in 4m 32s</span>
              </div>
            </div>

            {creditMemoSections.map((section) => {
              const isAccepted = acceptedSections.has(section.id);
              return (
                <div key={section.id} className={`bg-card border rounded-xl overflow-hidden transition-all ${isAccepted ? 'border-green-400/30' : 'border-border'}`}>
                  <div className={`px-5 py-3 border-b flex items-center justify-between ${isAccepted ? 'border-green-400/20 bg-green-400/5' : 'border-border'}`}>
                    <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                    <div className="flex items-center gap-2">
                      {isAccepted && (
                        <div className="flex items-center gap-1 text-[10px] text-green-400">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </div>
                      )}
                      <span className="text-[10px] text-muted-foreground">{section.citations.length} citations</span>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {renderContent(section.content, section.citations)}
                    </p>
                  </div>
                  {!isAccepted && (
                    <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">Review this section and accept or request changes</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingSection(section.id)} className="border-border text-muted-foreground h-7 text-xs gap-1">
                          <Edit3 className="w-3 h-3" /> Edit
                        </Button>
                        <Button size="sm" onClick={() => handleAccept(section.id)} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 h-7 text-xs gap-1">
                          <ThumbsUp className="w-3 h-3" /> Accept
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Score */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-3">AI Risk Assessment</div>
              <div className="text-center py-3">
                <div className="text-4xl font-bold text-green-400 mb-1">82</div>
                <div className="text-xs text-muted-foreground">AI Risk Score / 100</div>
                <div className="mt-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 inline-block">
                  <span className="text-xs text-green-400 font-medium">Low Risk</span>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Financial Health", score: 88 },
                  { label: "Management Quality", score: 85 },
                  { label: "Industry Risk", score: 72 },
                  { label: "Collateral Coverage", score: 90 },
                  { label: "Relationship History", score: 95 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground">{item.score}</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-green-400/5 border border-green-400/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">AI Recommendation</span>
              </div>
              <div className="text-sm font-bold text-foreground mb-1">APPROVE</div>
              <div className="text-xs text-muted-foreground">$12.5M Term Loan · 7 years · SOFR + 225bps</div>
            </div>

            {/* Citation legend */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-2">Citation Guide</div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Numbers like <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold mx-0.5">1</span> are clickable citations. Click any to see the exact source data and document reference used by the AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
