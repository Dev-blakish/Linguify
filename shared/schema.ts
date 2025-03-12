import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  language: text("language").notNull(),
  level: text("level").notNull(),
  timeSpent: integer("time_spent").notNull().default(0), // in minutes
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  language: text("language").notNull(),
  level: text("level").notNull(),
  content: text("content").notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  timeSpent: integer("time_spent").notNull().default(0), // in minutes
});

export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertLessonSchema = createInsertSchema(lessons);
export const insertProgressSchema = createInsertSchema(progress);
export const insertChatHistorySchema = createInsertSchema(chatHistory);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type InsertChatHistory = z.infer<typeof insertChatHistorySchema>;

export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type ChatHistory = typeof chatHistory.$inferSelect;

export const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Japanese",
  "Korean",
  "Russian",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Turkish"
] as const;

export const levels = ["Beginner", "Intermediate", "Advanced"] as const;