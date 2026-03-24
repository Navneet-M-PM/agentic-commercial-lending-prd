import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { uploadedDocuments, InsertUploadedDocument, UploadedDocument } from "../drizzle/schema";

export async function insertDocument(doc: InsertUploadedDocument): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(uploadedDocuments).values(doc);
  return (result as any)[0]?.insertId ?? 0;
}

export async function getDocumentsByDeal(dealId: string): Promise<UploadedDocument[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(uploadedDocuments)
    .where(eq(uploadedDocuments.dealId, dealId))
    .orderBy(desc(uploadedDocuments.uploadedAt));
}

export async function getDocumentById(id: number): Promise<UploadedDocument | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(uploadedDocuments)
    .where(eq(uploadedDocuments.id, id))
    .limit(1);
  return rows[0];
}

export async function updateDocumentClassification(
  id: number,
  data: {
    classifiedType: string;
    classificationConfidence: number;
    classificationStatus: "completed" | "failed";
    extractedFields: Record<string, unknown>;
    aiSummary: string;
    requiresHumanReview: boolean;
    reviewReason?: string;
    classifiedAt: Date;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(uploadedDocuments)
    .set(data)
    .where(eq(uploadedDocuments.id, id));
}

export async function updateDocumentReview(
  id: number,
  data: {
    reviewStatus: "approved" | "rejected" | "flagged";
    reviewedBy: string;
    reviewNote?: string;
    reviewedAt: Date;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(uploadedDocuments)
    .set(data)
    .where(eq(uploadedDocuments.id, id));
}

export async function deleteDocument(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(uploadedDocuments).where(eq(uploadedDocuments.id, id));
}
