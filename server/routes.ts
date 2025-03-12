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
    });
    res.json(progress);
  });

  // Chat practice route
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const response = await generateChatResponse(
        req.body.message,
        req.user!.language,
        req.user!.level
      );
      res.json({ message: response });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
