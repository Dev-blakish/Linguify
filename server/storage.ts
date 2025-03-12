import { users, lessons, progress, chatHistory } from "@shared/schema";
import type { User, Lesson, Progress, ChatHistory, InsertUser, InsertLesson, InsertProgress, InsertChatHistory } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTimeSpent(userId: number, timeSpent: number): Promise<User>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessons(language: string, level: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getProgress(userId: number): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
  getChatHistory(userId: number): Promise<ChatHistory[]>;
  saveChatHistory(chat: InsertChatHistory): Promise<ChatHistory>;
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lessons: Map<number, Lesson>;
  private progresses: Map<number, Progress>;
  private chats: Map<number, ChatHistory>;
  sessionStore: session.SessionStore;
  currentId: { users: number; lessons: number; progress: number; chats: number };

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.progresses = new Map();
    this.chats = new Map();
    this.currentId = { users: 1, lessons: 1, progress: 1, chats: 1 };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id, timeSpent: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserTimeSpent(userId: number, timeSpent: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const updatedUser = { ...user, timeSpent };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessons(language: string, level: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(
      (lesson) => lesson.language === language && lesson.level === level
    );
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentId.lessons++;
    const lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.currentId.progress++;
    const progress = { ...insertProgress, id, timeSpent: 0 };
    this.progresses.set(id, progress);
    return progress;
  }

  async getChatHistory(userId: number): Promise<ChatHistory[]> {
    return Array.from(this.chats.values())
      .filter(chat => chat.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async saveChatHistory(insertChat: InsertChatHistory): Promise<ChatHistory> {
    const id = this.currentId.chats++;
    const chat = { ...insertChat, id, createdAt: new Date() };
    this.chats.set(id, chat);
    return chat;
  }
}

export const storage = new MemStorage();