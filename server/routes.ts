import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedData() {
  const existing = await storage.getAnnouncements();
  if (existing.length === 0) {
    console.log("Seeding data...");
    
    // Featured
    await storage.createFeaturedContent({
      title: "RND Hub Welcome",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", 
      linkUrl: "/news",
      active: true,
      order: 1
    });

    // Announcements
    await storage.createAnnouncement({
      title: "Welcome to RND Hub!",
      summary: "Your central hub for school information.",
      content: "Stay updated with the latest news, menu, and sports.",
      date: new Date(),
      source: "Main Office"
    });

    // Menu
    await storage.createMenuItem({
      title: "Pasta Bar",
      date: new Date().toISOString().split('T')[0],
      description: "Custom pasta with choice of sauce.",
      price: "$5.50",
      category: "Main",
      location: "Student Commons"
    });

    // Sports Tryouts
    await storage.createSportsEvent({
      title: "Senior Boys Soccer Tryouts",
      date: new Date(Date.now() + 86400000 * 3),
      location: "School Field",
      isTryout: true
    });
    
    // Schedule Events
    const today = new Date().toISOString().split('T')[0];
    await storage.createSchoolEvent({
      title: "Daily Schedule",
      date: today,
      type: "Schedule",
      description: "Period 1: 8:30-9:45, Period 2: 9:50-11:05, Lunch: 11:05-11:50, Period 3: 11:55-1:10, Period 4: 1:15-2:30"
    });

    console.log("Seeding complete.");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  seedData().catch(console.error);

  // --- API Routes ---

  // Announcements
  app.get(api.announcements.list.path, async (_req, res) => {
    const items = await storage.getAnnouncements();
    res.json(items);
  });
  app.get(api.announcements.get.path, async (req, res) => {
    const item = await storage.getAnnouncements(); // Optimization: implement getAnnouncementById in storage if needed, filtering for now
    const found = item.find(i => i.id === Number(req.params.id));
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  });

  // Menu
  app.get(api.menu.list.path, async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  // Clubs
  app.get(api.clubs.list.path, async (_req, res) => {
    const items = await storage.getClubs();
    res.json(items);
  });

  // Sports
  app.get(api.sports.list.path, async (_req, res) => {
    const items = await storage.getSportsEvents();
    res.json(items);
  });

  // Events
  app.get(api.events.list.path, async (_req, res) => {
    const items = await storage.getSchoolEvents();
    res.json(items);
  });

  // Featured
  app.get(api.featured.list.path, async (_req, res) => {
    const items = await storage.getFeaturedContent();
    res.json(items);
  });

  return httpServer;
}
