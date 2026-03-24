import {
  int, mysqlEnum, mysqlTable, text, timestamp, varchar,
  float, boolean, json
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Uploaded documents table — stores every document uploaded through the
 * Document Processing page. S3 holds the file bytes; this table holds metadata,
 * AI classification results, and review status.
 */
export const uploadedDocuments = mysqlTable("uploaded_documents", {
  id: int("id").autoincrement().primaryKey(),

  // Deal context
  dealId: varchar("dealId", { length: 64 }).notNull(),

  // File metadata
  filename: varchar("filename", { length: 512 }).notNull(),
  originalName: varchar("originalName", { length: 512 }).notNull(),
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  fileSize: int("fileSize").notNull(),           // bytes
  s3Key: varchar("s3Key", { length: 1024 }).notNull(),
  s3Url: text("s3Url").notNull(),

  // AI classification results
  classifiedType: varchar("classifiedType", { length: 128 }),
  classificationConfidence: float("classificationConfidence"),  // 0–100
  classificationStatus: mysqlEnum("classificationStatus", [
    "pending", "processing", "completed", "failed"
  ]).default("pending").notNull(),

  // Extracted fields (JSON blob from LLM vision)
  extractedFields: json("extractedFields"),

  // AI summary and flags
  aiSummary: text("aiSummary"),
  requiresHumanReview: boolean("requiresHumanReview").default(false).notNull(),
  reviewReason: text("reviewReason"),

  // Human review
  reviewStatus: mysqlEnum("reviewStatus", [
    "pending", "approved", "rejected", "flagged"
  ]).default("pending").notNull(),
  reviewedBy: varchar("reviewedBy", { length: 128 }),
  reviewNote: text("reviewNote"),

  // Timestamps
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  classifiedAt: timestamp("classifiedAt"),
  reviewedAt: timestamp("reviewedAt"),
});

export type UploadedDocument = typeof uploadedDocuments.$inferSelect;
export type InsertUploadedDocument = typeof uploadedDocuments.$inferInsert;
