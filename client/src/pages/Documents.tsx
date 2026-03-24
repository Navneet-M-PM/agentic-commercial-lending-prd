import { useState, useCallback } from "react";
import LendingLayout from "@/components/LendingLayout";
import { documents, deals } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Upload, CheckCircle2, AlertTriangle, Clock,
  Eye, Download, Zap, FileSearch, X, ChevronRight, Shield
} from "lucide-react";
import { toast } from "sonner";

const docTypeColors: Record<string, string> = {
  'Financial Statement': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  'Bank Statement': 'text-green-400 bg-green-400/10 border-green-400/30',
  'Tax Return': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  'Appraisal': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'Legal Document': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  'Personal Financials': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  'Environmental Report': 'text-red-400 bg-red-400/10 border-red-400/30',
};

const classificationSteps = [
  "Scanning document structure...",
  "Identifying document type...",
  "Extracting metadata...",
  "Validating completeness...",
  "Cross-referencing checklist...",
  "Classification complete ✓",
];

export default function Documents() {
  const [isDragging, setIsDragging] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [classifyStep, setClassifyStep] = useState(0);
  const [classifiedDoc, setClassifiedDoc] = useState<null | { name: string; type: string; confidence: number }>(null);
  const [docList, setDocList] = useState(documents);

  const deal = deals[0];

  const simulateClassification = (fileName: string) => {
    setClassifying(true);
    setClassifyStep(0);
    setClassifiedDoc(null);

    classificationSteps.forEach((_, i) => {
      setTimeout(() => {
        setClassifyStep(i + 1);
        if (i === classificationSteps.length - 1) {
          setTimeout(() => {
            setClassifying(false);
            const newDoc = {
              name: fileName,
              type: 'Financial Statement',
              confidence: Math.floor(Math.random() * 8 + 90),
            };
            setClassifiedDoc(newDoc);
            toast.success("Document classified successfully", {
              description: `${newDoc.type} — ${newDoc.confidence}% confidence`,
            });
          }, 500);
        }
      }, i * 600);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateClassification(file.name);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateClassification(file.name);
  };

  const completeness = Math.round((docList.filter(d => d.status === 'verified').length / docList.length) * 100);
  const verified = docList.filter(d => d.status === 'verified').length;
  const missing = docList.filter(d => d.status === 'missing').length;
  const review = docList.filter(d => d.status === 'review').length;

  return (
    <LendingLayout title="Document Processing" subtitle={`${deal.borrower} · ${deal.id}`}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Status strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Completeness", value: `${completeness}%`, icon: FileSearch, color: "text-blue-400 bg-blue-400/10", border: "metric-card-blue" },
            { label: "Verified", value: verified.toString(), icon: CheckCircle2, color: "text-green-400 bg-green-400/10", border: "metric-card-green" },
            { label: "Under Review", value: review.toString(), icon: Clock, color: "text-yellow-400 bg-yellow-400/10", border: "metric-card-yellow" },
            { label: "Missing", value: missing.toString(), icon: AlertTriangle, color: "text-red-400 bg-red-400/10", border: "metric-card-red" },
          ].map((s) => (
            <div key={s.label} className={`bg-card border border-border rounded-xl p-4 ${s.border}`}>
              <div className={`w-8 h-8 rounded-lg ${s.color.split(' ')[1]} flex items-center justify-center mb-2`}>
                <s.icon className={`w-4 h-4 ${s.color.split(' ')[0]}`} />
              </div>
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Completeness bar */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Document Completeness</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-primary">
              <span className="status-live w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Document Orchestration Agent Active
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full progress-glow transition-all duration-500" style={{ width: `${completeness}%` }} />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-muted-foreground">{verified} of {docList.length} documents verified</span>
            <span className="text-xs font-medium text-primary">{completeness}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Upload zone */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-white/2'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input id="file-input" type="file" className="hidden" onChange={handleFileInput} />
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">Drop documents here</div>
              <div className="text-xs text-muted-foreground mb-3">PDF, Word, Excel · Max 50MB</div>
              <Button size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                Browse Files
              </Button>
            </div>

            {/* Classification animation */}
            {classifying && (
              <div className="bg-card border border-primary/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center agent-active">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary">Document Orchestration Agent</span>
                </div>
                <div className="space-y-1.5">
                  {classificationSteps.map((step, i) => (
                    <div key={step} className={`flex items-center gap-2 text-xs transition-all ${
                      i < classifyStep ? 'text-green-400' : i === classifyStep - 1 ? 'text-primary' : 'text-muted-foreground/40'
                    }`}>
                      {i < classifyStep ? <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> : <Circle className="w-3 h-3 flex-shrink-0" />}
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classification result */}
            {classifiedDoc && !classifying && (
              <div className="bg-green-400/5 border border-green-400/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">Classification Complete</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">File</span>
                    <span className="text-foreground font-medium truncate max-w-[150px]">{classifiedDoc.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Type Detected</span>
                    <span className="text-green-400 font-medium">{classifiedDoc.type}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="text-green-400 font-bold">{classifiedDoc.confidence}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI capabilities */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-3">AI Document Capabilities</div>
              {[
                { label: "Document Classification", value: "99.2% accuracy" },
                { label: "Data Extraction (OCR)", value: "<1% error rate" },
                { label: "Completeness Check", value: "Automated" },
                { label: "Fraud Detection", value: "Real-time" },
                { label: "Processing Speed", value: "< 30 seconds" },
              ].map((cap) => (
                <div key={cap.label} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{cap.label}</span>
                  <span className="text-xs text-green-400 font-medium">{cap.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Document list */}
          <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Document Checklist</h3>
              <span className="text-xs text-muted-foreground">{docList.length} items</span>
            </div>
            <div className="divide-y divide-border/50">
              {docList.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    doc.status === 'verified' ? 'bg-green-400/10' :
                    doc.status === 'review' ? 'bg-yellow-400/10' : 'bg-red-400/10'
                  }`}>
                    {doc.status === 'verified' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                     doc.status === 'review' ? <Clock className="w-4 h-4 text-yellow-400" /> :
                     <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">{doc.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${docTypeColors[doc.type] || 'text-muted-foreground bg-muted border-border'}`}>
                        {doc.type}
                      </span>
                      {doc.pages > 0 && <span className="text-[9px] text-muted-foreground">{doc.pages} pages · {doc.size}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {doc.confidence > 0 && (
                      <div className="text-xs font-medium text-green-400">{doc.confidence}%</div>
                    )}
                    {doc.status === 'missing' && (
                      <span className="text-[10px] text-red-400">Missing</span>
                    )}
                    {doc.status === 'review' && (
                      <span className="text-[10px] text-yellow-400">Review</span>
                    )}
                  </div>
                  {doc.status !== 'missing' && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {missing > 0 && <span className="text-red-400">{missing} missing documents — client notified automatically</span>}
                </span>
                <Button size="sm" variant="outline" className="border-border text-xs h-7">
                  Request Missing Docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}

function Circle({ className }: { className?: string }) {
  return <div className={`rounded-full border border-current ${className}`} style={{ width: '12px', height: '12px' }} />;
}
