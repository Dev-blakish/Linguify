import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { generateChatResponse } from "./openai";
import { insertLessonSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Language learning routes
  app.get("/api/lessons/:language/:level", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const lessons = await storage.getLessons(
      req.params.language,
      req.params.level
    );
    res.json(lessons);
  });

  app.get("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const progress = await storage.getProgress(req.user!.id);
    res.json(progress);
  });

  app.post("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const progress = await storage.updateProgress({
      userId: req.user!.id,
      lessonId: req.body.lessonId,
      completed: req.body.completed,
      timeSpent: req.body.timeSpent || 0,
    });
    res.json(progress);
  });

  // Time tracking route
  app.post("/api/time-spent", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const user = await storage.updateUserTimeSpent(
      req.user!.id,
      req.body.timeSpent
    );
    res.json(user);
  });

  // Chat practice routes
  app.get("/api/chat-history", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const history = await storage.getChatHistory(req.user!.id);
    res.json(history);
  });

  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const response = await generateChatResponse(
        req.body.message,
        req.user!.language,
        req.user!.level
      );

      // Save chat history
      await storage.saveChatHistory({
        userId: req.user!.id,
        message: req.body.message,
        response,
        createdAt: new Date(),
      });

      res.json({ message: response });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}