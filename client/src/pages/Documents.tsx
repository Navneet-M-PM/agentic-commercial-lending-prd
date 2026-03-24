import { useState, useCallback, useRef, useEffect } from "react";
import { useParams } from "wouter";
import LendingLayout from "@/components/LendingLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Upload, FileText, CheckCircle2, AlertTriangle,
  XCircle, RefreshCw, Eye, Trash2, Download, Brain,
  ShieldCheck, Loader2, FileImage, File, Sparkles, X,
  ZoomIn, Clock
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "reading" | "uploading" | "classifying" | "done" | "error";
  errorMessage?: string;
  documentId?: number;
}

interface DocumentRecord {
  id: number;
  dealId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  s3Key: string;
  s3Url: string;
  classifiedType: string | null;
  classificationConfidence: number | null;
  classificationStatus: "pending" | "processing" | "completed" | "failed";
  extractedFields: Record<string, string> | null;
  aiSummary: string | null;
  requiresHumanReview: boolean;
  reviewReason: string | null;
  reviewStatus: "pending" | "approved" | "rejected" | "flagged";
  reviewedBy: string | null;
  reviewNote: string | null;
  uploadedAt: Date;
  classifiedAt: Date | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string) {
  if (mimeType === "application/pdf") return FileText;
  if (mimeType.startsWith("image/")) return FileImage;
  return File;
}

function getConfidenceColor(confidence: number | null): string {
  if (!confidence) return "text-muted-foreground";
  if (confidence >= 90) return "text-emerald-400";
  if (confidence >= 75) return "text-amber-400";
  return "text-red-400";
}

function getConfidenceBg(confidence: number | null): string {
  if (!confidence) return "bg-muted/20";
  if (confidence >= 90) return "bg-emerald-500/10 border-emerald-500/20";
  if (confidence >= 75) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

function getStatusBadge(status: DocumentRecord["classificationStatus"]) {
  switch (status) {
    case "completed": return <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[10px]">Classified</Badge>;
    case "processing": return <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/20 text-[10px] animate-pulse">Processing</Badge>;
    case "failed": return <Badge className="bg-red-500/15 text-red-400 border-red-500/20 text-[10px]">Failed</Badge>;
    default: return <Badge className="bg-muted/20 text-muted-foreground text-[10px]">Pending</Badge>;
  }
}

// ─── Document Detail Drawer ────────────────────────────────────────────────────
function DocumentDetailDrawer({
  doc,
  onClose,
  onReview,
  onReclassify,
}: {
  doc: DocumentRecord;
  onClose: () => void;
  onReview: (id: number, status: "approved" | "rejected" | "flagged", note?: string) => void;
  onReclassify: (id: number) => void;
}) {
  const [reviewNote, setReviewNote] = useState("");
  const extractedFields = doc.extractedFields as Record<string, string> | null;
  const nonEmptyFields = extractedFields
    ? Object.entries(extractedFields).filter(([, v]) => v && v.trim() !== "")
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[oklch(0.11_0.013_240)] border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[oklch(0.11_0.013_240)] border-b border-border px-6 py-4 flex items-start justify-between z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {getStatusBadge(doc.classificationStatus)}
              {doc.requiresHumanReview && doc.reviewStatus === "pending" && (
                <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20 text-[10px]">Needs Review</Badge>
              )}
              {doc.reviewStatus === "approved" && (
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[10px]">Approved</Badge>
              )}
              {doc.reviewStatus === "rejected" && (
                <Badge className="bg-red-500/15 text-red-400 border-red-500/20 text-[10px]">Rejected</Badge>
              )}
              {doc.reviewStatus === "flagged" && (
                <Badge className="bg-orange-500/15 text-orange-400 border-orange-500/20 text-[10px]">Flagged</Badge>
              )}
            </div>
            <h2 className="text-sm font-semibold text-foreground truncate">{doc.originalName}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatBytes(doc.fileSize)} · Uploaded {new Date(doc.uploadedAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* AI Classification Result */}
          {doc.classificationStatus === "completed" && (
            <div className={`rounded-xl border p-4 ${getConfidenceBg(doc.classificationConfidence)}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">AI Classification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-lg font-bold ${getConfidenceColor(doc.classificationConfidence)}`}>
                    {doc.classificationConfidence?.toFixed(0)}%
                  </span>
                  <span className="text-xs text-muted-foreground">confidence</span>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Document Type</span>
                <p className="text-sm font-medium text-foreground mt-0.5">{doc.classifiedType}</p>
              </div>
              {doc.classificationConfidence !== null && (
                <Progress value={doc.classificationConfidence} className="h-1.5 mb-3" />
              )}
              {doc.aiSummary && (
                <p className="text-xs text-muted-foreground leading-relaxed">{doc.aiSummary}</p>
              )}
            </div>
          )}

          {/* Processing indicator */}
          {doc.classificationStatus === "processing" && (
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">AI Classification in Progress</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  The Document Understanding Agent is analyzing this file…
                </p>
              </div>
            </div>
          )}

          {/* Failed indicator */}
          {doc.classificationStatus === "failed" && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Classification Failed</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                The AI could not classify this document automatically.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={() => onReclassify(doc.id)}
              >
                <RefreshCw className="w-3 h-3 mr-1.5" /> Retry Classification
              </Button>
            </div>
          )}

          {/* Human Review Flag */}
          {doc.requiresHumanReview && doc.reviewStatus === "pending" && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">Human Review Required</span>
              </div>
              {doc.reviewReason && (
                <p className="text-xs text-muted-foreground">{doc.reviewReason}</p>
              )}
            </div>
          )}

          {/* Extracted Fields */}
          {nonEmptyFields.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Extracted Fields</span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  {nonEmptyFields.length} fields
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {nonEmptyFields.map(([key, value]) => (
                  <div key={key} className="bg-white/3 rounded-lg p-2.5 border border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-xs font-medium text-foreground truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View Document */}
          <a
            href={doc.s3Url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            View original document
          </a>

          <Separator className="bg-border/50" />

          {/* Human Review Actions */}
          {doc.classificationStatus === "completed" && doc.reviewStatus === "pending" && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-3">Human Review Decision</p>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Add review notes (optional)…"
                className="w-full text-xs bg-white/5 border border-border rounded-lg p-2.5 text-foreground placeholder:text-muted-foreground resize-none h-16 mb-3 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => onReview(doc.id, "approved", reviewNote)}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  onClick={() => onReview(doc.id, "flagged", reviewNote)}
                >
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Flag
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => onReview(doc.id, "rejected", reviewNote)}
                >
                  <XCircle className="w-3.5 h-3.5 mr-1.5" /> Reject
                </Button>
              </div>
            </div>
          )}

          {/* Already reviewed */}
          {doc.reviewStatus !== "pending" && (
            <div className="rounded-lg bg-white/3 border border-border/50 p-3">
              <p className="text-xs text-muted-foreground">
                Reviewed by{" "}
                <span className="text-foreground font-medium">{doc.reviewedBy}</span>
                {doc.reviewNote && <> · &ldquo;{doc.reviewNote}&rdquo;</>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Required document checklist config ───────────────────────────────────────
const REQUIRED_DOCS = [
  { type: "Financial Statement (Audited)", required: true },
  { type: "Tax Return (Business)", required: true },
  { type: "Bank Statement", required: true },
  { type: "Appraisal Report", required: true },
  { type: "Corporate Documents (MOA/AOA)", required: true },
  { type: "KYC / Identity Document", required: false },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Documents() {
  const params = useParams<{ dealId: string }>();
  const dealId = params.dealId ?? "DL-2024-001";

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── tRPC ────────────────────────────────────────────────────────────────────
  const { data: docsData, refetch: refetchDocs } = trpc.documents.listByDeal.useQuery(
    { dealId },
    { refetchInterval: 4000 }
  );
  const uploadMutation = trpc.documents.upload.useMutation();
  const reviewMutation = trpc.documents.review.useMutation();
  const reclassifyMutation = trpc.documents.reclassify.useMutation();
  const deleteMutation = trpc.documents.delete.useMutation();

  const documents = (docsData?.documents ?? []) as DocumentRecord[];

  // Keep selected doc in sync with live data
  useEffect(() => {
    if (selectedDoc) {
      const updated = documents.find((d) => d.id === selectedDoc.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedDoc)) {
        setSelectedDoc(updated);
      }
    }
  }, [documents]);

  // ─── File reading ────────────────────────────────────────────────────────────
  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // ─── Upload handler ──────────────────────────────────────────────────────────
  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const MAX_SIZE = 16 * 1024 * 1024;
      const ALLOWED = [
        "application/pdf", "image/jpeg", "image/png", "image/webp", "image/tiff",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      for (const file of fileArray) {
        if (!ALLOWED.includes(file.type)) {
          toast.error(`"${file.name}" is not supported. Please upload PDF or image files.`);
          continue;
        }
        if (file.size > MAX_SIZE) {
          toast.error(`"${file.name}" exceeds the 16MB limit.`);
          continue;
        }

        const uploadId = `${Date.now()}-${Math.random()}`;
        setUploadingFiles((prev) => [
          ...prev,
          { id: uploadId, file, progress: 0, status: "reading" },
        ]);

        try {
          // Read
          setUploadingFiles((p) => p.map((u) => u.id === uploadId ? { ...u, progress: 15, status: "reading" } : u));
          const base64Data = await readFileAsBase64(file);

          // Upload
          setUploadingFiles((p) => p.map((u) => u.id === uploadId ? { ...u, progress: 45, status: "uploading" } : u));
          const result = await uploadMutation.mutateAsync({
            dealId,
            filename: file.name,
            mimeType: file.type,
            fileSize: file.size,
            base64Data,
          });

          // Classifying (async on server)
          setUploadingFiles((p) =>
            p.map((u) => u.id === uploadId
              ? { ...u, progress: 80, status: "classifying", documentId: result.documentId }
              : u
            )
          );
          await new Promise((r) => setTimeout(r, 1800));

          setUploadingFiles((p) => p.map((u) => u.id === uploadId ? { ...u, progress: 100, status: "done" } : u));
          toast.success(`"${file.name}" uploaded — AI classification in progress`);
          refetchDocs();

          setTimeout(() => {
            setUploadingFiles((p) => p.filter((u) => u.id !== uploadId));
          }, 3000);
        } catch (err: any) {
          setUploadingFiles((p) =>
            p.map((u) => u.id === uploadId
              ? { ...u, status: "error", errorMessage: err?.message ?? "Upload failed" }
              : u
            )
          );
          toast.error(`Failed to upload "${file.name}": ${err?.message ?? "Unknown error"}`);
        }
      }
    },
    [dealId, uploadMutation, refetchDocs]
  );

  // ─── Drag & drop ─────────────────────────────────────────────────────────────
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  // ─── Actions ─────────────────────────────────────────────────────────────────
  const handleReview = async (id: number, status: "approved" | "rejected" | "flagged", note?: string) => {
    await reviewMutation.mutateAsync({ id, reviewStatus: status, reviewedBy: "Sarah Chen (Underwriter)", reviewNote: note });
    toast.success(`Document ${status}`);
    refetchDocs();
    setSelectedDoc(null);
  };

  const handleReclassify = async (id: number) => {
    await reclassifyMutation.mutateAsync({ id });
    toast.info("Re-classification started");
    refetchDocs();
  };

  const handleDelete = async (id: number, filename: string) => {
    if (!confirm(`Delete "${filename}"? This cannot be undone.`)) return;
    await deleteMutation.mutateAsync({ id });
    toast.success("Document deleted");
    refetchDocs();
    if (selectedDoc?.id === id) setSelectedDoc(null);
  };

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const stats = {
    total: documents.length,
    classified: documents.filter((d) => d.classificationStatus === "completed").length,
    needsReview: documents.filter((d) => d.requiresHumanReview && d.reviewStatus === "pending").length,
    approved: documents.filter((d) => d.reviewStatus === "approved").length,
  };

  const completeness = REQUIRED_DOCS.filter((r) =>
    r.required && documents.some((d) => d.classifiedType === r.type && d.classificationStatus === "completed")
  ).length;
  const completenessPercent = Math.round((completeness / REQUIRED_DOCS.filter((r) => r.required).length) * 100);

  return (
    <LendingLayout
      title="Document Processing"
      subtitle={`Deal ${dealId} · AI-powered classification and verification`}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Documents", value: stats.total, icon: FileText, color: "text-primary" },
          { label: "AI Classified", value: stats.classified, icon: Brain, color: "text-emerald-400" },
          { label: "Needs Review", value: stats.needsReview, icon: AlertTriangle, color: "text-amber-400" },
          { label: "Approved", value: stats.approved, icon: ShieldCheck, color: "text-emerald-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completeness bar */}
      <Card className="bg-card border-border mb-5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Required Document Completeness</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
              <span className="text-xs text-primary">Document Orchestration Agent Active</span>
            </div>
          </div>
          <Progress value={completenessPercent} className="h-2 mb-1.5" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {completeness} of {REQUIRED_DOCS.filter((r) => r.required).length} required documents received
            </span>
            <span className="text-xs font-bold text-primary">{completenessPercent}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: Upload + queue + checklist */}
        <div className="lg:col-span-2 space-y-4">
          {/* Drop zone */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all duration-200
                  ${isDragging
                    ? "border-primary bg-primary/10 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-white/2"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.tiff,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <div className={`w-11 h-11 rounded-xl mx-auto mb-3 flex items-center justify-center transition-colors ${isDragging ? "bg-primary/20" : "bg-white/5"}`}>
                  <Upload className={`w-5 h-5 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {isDragging ? "Drop files here" : "Drag & drop files"}
                </p>
                <p className="text-xs text-muted-foreground mb-3">or click to browse</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {["PDF", "JPG", "PNG", "WEBP", "DOC"].map((ext) => (
                    <span key={ext} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-border/50">{ext}</span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Max 16MB per file</p>
              </div>

              {/* Agent info */}
              <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Document Understanding Agent</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Each uploaded document is automatically classified using LLM vision, key fields are extracted, and low-confidence items are flagged for human review.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload queue */}
          {uploadingFiles.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Upload Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadingFiles.map((uf) => {
                  const FileIcon = getFileIcon(uf.file.type);
                  return (
                    <div key={uf.id} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <FileIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{uf.file.name}</p>
                          <p className="text-[10px] text-muted-foreground">{formatBytes(uf.file.size)}</p>
                        </div>
                        {uf.status === "done" && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {uf.status === "error" && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                        {["reading", "uploading", "classifying"].includes(uf.status) && (
                          <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                        )}
                      </div>
                      {uf.status !== "error" && (
                        <div>
                          <Progress value={uf.progress} className="h-1 mb-0.5" />
                          <p className="text-[10px] text-muted-foreground">
                            {uf.status === "reading" && "Reading file…"}
                            {uf.status === "uploading" && "Uploading to secure storage…"}
                            {uf.status === "classifying" && "AI classification in progress…"}
                            {uf.status === "done" && "Complete — AI classifying in background"}
                          </p>
                        </div>
                      )}
                      {uf.status === "error" && (
                        <p className="text-[10px] text-red-400">{uf.errorMessage}</p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Required docs checklist */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Required Document Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              {REQUIRED_DOCS.map((req) => {
                const isUploaded = documents.some(
                  (d) => d.classifiedType === req.type && d.classificationStatus === "completed"
                );
                return (
                  <div key={req.type} className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
                    {isUploaded
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      : <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${req.required ? "border-amber-500/50" : "border-border"}`} />
                    }
                    <span className={`text-xs flex-1 ${isUploaded ? "text-foreground" : "text-muted-foreground"}`}>
                      {req.type}
                    </span>
                    {req.required && !isUploaded && (
                      <span className="text-[10px] text-amber-400">Required</span>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right: Document library */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Document Library
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">{documents.length}</Badge>
                </CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs border-border" onClick={() => refetchDocs()}>
                  <RefreshCw className="w-3 h-3 mr-1.5" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No documents yet</p>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Upload documents using the panel on the left. The AI will automatically classify each file and extract key fields.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => {
                    const FileIcon = getFileIcon(doc.mimeType);
                    const isProcessing = doc.classificationStatus === "processing";
                    return (
                      <div
                        key={doc.id}
                        className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-white/2 transition-all cursor-pointer"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isProcessing ? "bg-blue-500/10" : "bg-white/5"}`}>
                          {isProcessing
                            ? <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            : <FileIcon className="w-4 h-4 text-muted-foreground" />
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{doc.originalName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {doc.classifiedType && (
                              <span className="text-[10px] text-muted-foreground truncate max-w-[160px]">
                                {doc.classifiedType}
                              </span>
                            )}
                            {doc.classificationConfidence !== null && (
                              <span className={`text-[10px] font-medium ${getConfidenceColor(doc.classificationConfidence)}`}>
                                {doc.classificationConfidence.toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {getStatusBadge(doc.classificationStatus)}
                          {doc.requiresHumanReview && doc.reviewStatus === "pending" && (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          {doc.reviewStatus === "approved" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>

                        {/* Hover actions */}
                        <div
                          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setSelectedDoc(doc)}
                            title="View details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={doc.s3Url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                          <button
                            className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                            onClick={() => handleDelete(doc.id, doc.originalName)}
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail drawer */}
      {selectedDoc && (
        <DocumentDetailDrawer
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onReview={handleReview}
          onReclassify={handleReclassify}
        />
      )}
    </LendingLayout>
  );
}
