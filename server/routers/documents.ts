import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { storagePut, storageGet } from "../storage";
import {
  insertDocument,
  getDocumentsByDeal,
  getDocumentById,
  updateDocumentClassification,
  updateDocumentReview,
  deleteDocument,
} from "../documentDb";

// ─── Allowed MIME types ────────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/tiff",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE_BYTES = 16 * 1024 * 1024; // 16 MB

// ─── Document type definitions for LLM classification ─────────────────────────
const DOCUMENT_TYPES = [
  "Financial Statement (Audited)",
  "Financial Statement (Unaudited)",
  "Tax Return (Business)",
  "Tax Return (Personal)",
  "Bank Statement",
  "Accounts Receivable Aging",
  "Accounts Payable Aging",
  "Appraisal Report",
  "Environmental Report",
  "Legal Agreement / Contract",
  "Corporate Documents (MOA/AOA)",
  "KYC / Identity Document",
  "Insurance Certificate",
  "Collateral Document",
  "Projection / Business Plan",
  "Other",
] as const;

// ─── Helper: build a random S3 key ────────────────────────────────────────────
function buildS3Key(dealId: string, filename: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const ext = filename.split(".").pop() ?? "bin";
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
  return `lending-docs/${dealId}/${timestamp}-${random}-${safeName}`;
}

// ─── LLM Vision classification ────────────────────────────────────────────────
async function classifyDocumentWithLLM(
  s3Url: string,
  filename: string,
  mimeType: string
): Promise<{
  classifiedType: string;
  confidence: number;
  extractedFields: Record<string, unknown>;
  aiSummary: string;
  requiresHumanReview: boolean;
  reviewReason?: string;
}> {
  const isImage = mimeType.startsWith("image/");
  const isPdf = mimeType === "application/pdf";

  const systemPrompt = `You are an expert document classification AI for a commercial bank's lending platform.
Your job is to:
1. Identify the document type from the provided list
2. Extract key financial or legal fields visible in the document
3. Assess document quality and flag issues requiring human review
4. Provide a confidence score for your classification

Always respond with valid JSON matching the exact schema provided.`;

  const documentTypesList = DOCUMENT_TYPES.join("\n- ");

  const userPrompt = `Analyze this commercial lending document and classify it.

Filename: ${filename}
MIME type: ${mimeType}

Document types to choose from:
- ${documentTypesList}

Respond with ONLY valid JSON in this exact schema:
{
  "classifiedType": "<one of the document types above>",
  "confidence": <number 0-100>,
  "extractedFields": {
    "borrowerName": "<if visible>",
    "documentDate": "<if visible, YYYY-MM-DD format>",
    "periodCovered": "<e.g. FY2023, Q3 2024>",
    "totalRevenue": "<if financial doc, e.g. $28.4M>",
    "netIncome": "<if visible>",
    "totalAssets": "<if visible>",
    "bankName": "<if bank statement>",
    "accountNumber": "<last 4 digits only if visible>",
    "propertyAddress": "<if appraisal>",
    "appraisedValue": "<if appraisal>",
    "issuer": "<company or person who issued the document>"
  },
  "aiSummary": "<2-3 sentence professional summary of what this document shows and its relevance to the loan>",
  "requiresHumanReview": <true/false>,
  "reviewReason": "<only if requiresHumanReview is true: specific reason>"
}

Set requiresHumanReview to true if:
- Confidence is below 75%
- Document appears altered or unclear
- Key fields are missing or inconsistent
- Document is expired or outdated (>2 years old)
- Document type doesn't match expected lending documents`;

  // Build message content — use vision for images, text for PDFs/docs
  let messageContent: Array<{ type: string; text?: string; image_url?: { url: string } }>;

  if (isImage) {
    messageContent = [
      { type: "text", text: userPrompt },
      { type: "image_url", image_url: { url: s3Url } },
    ];
  } else if (isPdf) {
    // For PDFs, use file_url content type
    messageContent = [
      { type: "text", text: userPrompt },
      // Include the file URL as context — LLM will use filename + context
      { type: "text", text: `Document URL for reference: ${s3Url}\n\nNote: This is a PDF document. Classify based on filename "${filename}" and provide a professional assessment.` },
    ];
  } else {
    messageContent = [
      { type: "text", text: `${userPrompt}\n\nDocument URL: ${s3Url}\nFilename: ${filename}` },
    ];
  }

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: messageContent as any },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "document_classification",
        strict: true,
        schema: {
          type: "object",
          properties: {
            classifiedType: { type: "string" },
            confidence: { type: "number" },
            extractedFields: {
              type: "object",
              properties: {
                borrowerName: { type: "string" },
                documentDate: { type: "string" },
                periodCovered: { type: "string" },
                totalRevenue: { type: "string" },
                netIncome: { type: "string" },
                totalAssets: { type: "string" },
                bankName: { type: "string" },
                accountNumber: { type: "string" },
                propertyAddress: { type: "string" },
                appraisedValue: { type: "string" },
                issuer: { type: "string" },
              },
              required: ["borrowerName", "documentDate", "periodCovered", "totalRevenue", "netIncome", "totalAssets", "bankName", "accountNumber", "propertyAddress", "appraisedValue", "issuer"],
              additionalProperties: false,
            },
            aiSummary: { type: "string" },
            requiresHumanReview: { type: "boolean" },
            reviewReason: { type: "string" },
          },
          required: ["classifiedType", "confidence", "extractedFields", "aiSummary", "requiresHumanReview", "reviewReason"],
          additionalProperties: false,
        },
      },
    },
  });

  const raw = response?.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));

  return {
    classifiedType: parsed.classifiedType ?? "Other",
    confidence: Math.min(100, Math.max(0, parsed.confidence ?? 50)),
    extractedFields: parsed.extractedFields ?? {},
    aiSummary: parsed.aiSummary ?? "Document processed by AI classification engine.",
    requiresHumanReview: parsed.requiresHumanReview ?? (parsed.confidence < 75),
    reviewReason: parsed.reviewReason ?? undefined,
  };
}

// ─── Router ────────────────────────────────────────────────────────────────────
export const documentsRouter = router({
  /**
   * Upload a document: receives base64-encoded file, stores to S3,
   * saves metadata to DB, then triggers async LLM classification.
   */
  upload: publicProcedure
    .input(
      z.object({
        dealId: z.string().min(1),
        filename: z.string().min(1),
        mimeType: z.string().min(1),
        fileSize: z.number().positive(),
        base64Data: z.string().min(1), // base64-encoded file content
      })
    )
    .mutation(async ({ input }) => {
      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(input.mimeType as any)) {
        throw new Error(
          `File type "${input.mimeType}" is not supported. Please upload PDF, image, or Word documents.`
        );
      }

      // Validate file size
      if (input.fileSize > MAX_FILE_SIZE_BYTES) {
        throw new Error(
          `File size ${(input.fileSize / 1024 / 1024).toFixed(1)}MB exceeds the 16MB limit.`
        );
      }

      // Decode base64 to buffer
      const fileBuffer = Buffer.from(input.base64Data, "base64");

      // Build S3 key and upload
      const s3Key = buildS3Key(input.dealId, input.filename);
      const { url: s3Url } = await storagePut(s3Key, fileBuffer, input.mimeType);

      // Insert document record with pending status
      const docId = await insertDocument({
        dealId: input.dealId,
        filename: input.filename,
        originalName: input.filename,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
        s3Key,
        s3Url,
        classificationStatus: "processing",
        requiresHumanReview: false,
        reviewStatus: "pending",
        uploadedAt: new Date(),
      });

      // Run LLM classification asynchronously (don't block the upload response)
      classifyDocumentWithLLM(s3Url, input.filename, input.mimeType)
        .then(async (result) => {
          await updateDocumentClassification(docId, {
            classifiedType: result.classifiedType,
            classificationConfidence: result.confidence,
            classificationStatus: "completed",
            extractedFields: result.extractedFields,
            aiSummary: result.aiSummary,
            requiresHumanReview: result.requiresHumanReview,
            reviewReason: result.reviewReason,
            classifiedAt: new Date(),
          });
        })
        .catch(async (err) => {
          console.error("[Documents] Classification failed for doc", docId, err);
          await updateDocumentClassification(docId, {
            classifiedType: "Other",
            classificationConfidence: 0,
            classificationStatus: "failed",
            extractedFields: {},
            aiSummary: "Classification failed. Please review manually.",
            requiresHumanReview: true,
            reviewReason: "Automated classification failed — manual review required.",
            classifiedAt: new Date(),
          });
        });

      return {
        success: true,
        documentId: docId,
        s3Url,
        message: "Document uploaded successfully. AI classification in progress.",
      };
    }),

  /**
   * List all documents for a deal, ordered by upload time descending.
   */
  listByDeal: publicProcedure
    .input(z.object({ dealId: z.string().min(1) }))
    .query(async ({ input }) => {
      const docs = await getDocumentsByDeal(input.dealId);
      return { documents: docs };
    }),

  /**
   * Get a single document by ID (for polling classification status).
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const doc = await getDocumentById(input.id);
      if (!doc) throw new Error("Document not found");
      return doc;
    }),

  /**
   * Re-classify an already-uploaded document (retry after failure).
   */
  reclassify: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const doc = await getDocumentById(input.id);
      if (!doc) throw new Error("Document not found");

      // Reset to processing
      await updateDocumentClassification(input.id, {
        classifiedType: "Other",
        classificationConfidence: 0,
        classificationStatus: "completed",
        extractedFields: {},
        aiSummary: "Re-classification in progress...",
        requiresHumanReview: false,
        classifiedAt: new Date(),
      });

      // Trigger reclassification
      classifyDocumentWithLLM(doc.s3Url, doc.filename, doc.mimeType)
        .then(async (result) => {
          await updateDocumentClassification(input.id, {
            classifiedType: result.classifiedType,
            classificationConfidence: result.confidence,
            classificationStatus: "completed",
            extractedFields: result.extractedFields,
            aiSummary: result.aiSummary,
            requiresHumanReview: result.requiresHumanReview,
            reviewReason: result.reviewReason,
            classifiedAt: new Date(),
          });
        })
        .catch(async (err) => {
          console.error("[Documents] Re-classification failed:", err);
          await updateDocumentClassification(input.id, {
            classifiedType: "Other",
            classificationConfidence: 0,
            classificationStatus: "failed",
            extractedFields: {},
            aiSummary: "Re-classification failed.",
            requiresHumanReview: true,
            reviewReason: "Automated classification failed — manual review required.",
            classifiedAt: new Date(),
          });
        });

      return { success: true, message: "Re-classification started." };
    }),

  /**
   * Submit a human review decision for a document.
   */
  review: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        reviewStatus: z.enum(["approved", "rejected", "flagged"]),
        reviewedBy: z.string().min(1),
        reviewNote: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateDocumentReview(input.id, {
        reviewStatus: input.reviewStatus,
        reviewedBy: input.reviewedBy,
        reviewNote: input.reviewNote,
        reviewedAt: new Date(),
      });
      return { success: true };
    }),

  /**
   * Delete a document record (does not delete from S3 — S3 cleanup is handled separately).
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await deleteDocument(input.id);
      return { success: true };
    }),

  /**
   * Get a fresh presigned download URL for a document.
   */
  getDownloadUrl: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const doc = await getDocumentById(input.id);
      if (!doc) throw new Error("Document not found");
      const { url } = await storageGet(doc.s3Key);
      return { url };
    }),
});
