import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Lesson, Progress, ChatHistory } from './db';
import type { InsertUser, InsertLesson, InsertProgress, InsertChatHistory } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: string): Promise<any>;
  getUserByUsername(username: string): Promise<any>;
  createUser(user: InsertUser): Promise<any>;
  updateUserProgress(userId: string, progress: number): Promise<any>;
  updateUserLastLogin(userId: string): Promise<any>;
  getLesson(id: string): Promise<any>;
  getLessons(language: string, level: string): Promise<any[]>;
  createLesson(lesson: InsertLesson): Promise<any>;
  getProgress(userId: string): Promise<any[]>;
  updateProgress(progress: InsertProgress): Promise<any>;
  getChatHistory(userId: string): Promise<any[]>;
  saveChatHistory(chat: InsertChatHistory): Promise<any>;
  sessionStore: session.SessionStore;
}

export class MongoStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: string) {
    return await User.findById(id);
  }

  async getUserByUsername(username: string) {
    return await User.findOne({ username });
  }

  async createUser(insertUser: InsertUser) {
    const user = new User(insertUser);
    return await user.save();
  }

  async updateUserProgress(userId: string, progress: number) {
    return await User.findByIdAndUpdate(
      userId,
      { progress },
      { new: true }
    );
  }

  async updateUserLastLogin(userId: string) {
    return await User.findByIdAndUpdate(
      userId,
      { lastLoginAt: new Date() },
      { new: true }
    );
  }

  async getLesson(id: string) {
    return await Lesson.findById(id);
  }

  async getLessons(language: string, level: string) {
    return await Lesson.find({ language, level });
  }

  async createLesson(insertLesson: InsertLesson) {
    const lesson = new Lesson(insertLesson);
    return await lesson.save();
  }

  async getProgress(userId: string) {
    return await Progress.find({ userId });
  }

  async updateProgress(insertProgress: InsertProgress) {
    const progress = new Progress(insertProgress);
    return await progress.save();
  }

  async getChatHistory(userId: string) {
    return await ChatHistory.find({ userId })
      .sort({ createdAt: -1 });
  }

  async saveChatHistory(insertChat: InsertChatHistory) {
    const chat = new ChatHistory(insertChat);
    return await chat.save();
  }
}

export const storage = new MongoStorage();