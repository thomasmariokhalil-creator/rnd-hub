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
      title: "",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      linkUrl: "/news",
      active: true,
      order: 1
    });

    // Announcements
    await storage.createAnnouncement({
      title: "Welcome Back Students!",
      summary: "A warm welcome to all new and returning students.",
      content: "We are excited to start the new semester. Please check your timetables.",
      date: new Date(),
      source: "Principal's Office"
    });
    await storage.createAnnouncement({
      title: "Yearbook Photos",
      summary: "School photos will be taken next Tuesday.",
      content: "Please wear your full uniform. Schedule is posted outside the main office.",
      date: new Date(),
      source: "Yearbook Committee"
    });

    // Menu
    await storage.createMenuItem({
      title: "Pepperoni Pizza",
      date: new Date().toISOString().split('T')[0],
      description: "Freshly baked pepperoni pizza slice.",
      price: "$4.50",
      category: "Main",
      location: "Student Commons"
    });

    // Clubs
    await storage.createClub({
      name: "Robotics Club",
      description: "Build and program robots for competition.",
      meetingTime: "Tuesdays after school",
      location: "Room 104",
      contactEmail: "robotics@rnd.edu"
    });

    // Sports Tryouts
    await storage.createSportsEvent({
      title: "Basketball Tryouts",
      date: new Date(Date.now() + 86400000 * 2),
      location: "Main Gym",
      isTryout: true
    });
    
    // Sports Games
    await storage.createSportsEvent({
      title: "Senior Boys Basketball vs. Regi",
      date: new Date(Date.now() + 86400000 * 5),
      location: "Main Gym",
      isTryout: false
    });

    // Schedules and Dates
    await storage.createSchoolEvent({
      title: "Mass Day",
      date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      type: "Schedule",
      description: "Special mass schedule will be followed."
    });
    
    await storage.createSchoolEvent({
      title: "PA Day",
      date: "2026-01-23",
      type: "Holiday",
      description: "Professional Activity Day."
    });

    await storage.createSchoolEvent({
      title: "Family Day",
      date: "2026-02-16",
      type: "Holiday",
      description: "Provincial holiday."
    });

    await storage.createSchoolEvent({
      title: "Exam Week",
      date: "2026-06-15",
      type: "Exam",
      description: "Final examinations."
    });
    
    console.log("Seeding complete.");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  seedData().catch(console.error);

  app.get(api.announcements.list.path, async (_req, res) => {
    const items = await storage.getAnnouncements();
    res.json(items);
  });
  app.get(api.announcements.get.path, async (req, res) => {
    const item = await storage.getAnnouncements();
    const found = item.find(i => i.id === Number(req.params.id));
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  });

  app.get(api.menu.list.path, async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.get(api.clubs.list.path, async (_req, res) => {
    const items = await storage.getClubs();
    res.json(items);
  });

  app.get(api.sports.list.path, async (_req, res) => {
    const items = await storage.getSportsEvents();
    res.json(items);
  });

  app.get(api.events.list.path, async (_req, res) => {
    const items = await storage.getSchoolEvents();
    res.json(items);
  });

  app.get(api.featured.list.path, async (_req, res) => {
    const items = await storage.getFeaturedContent();
    res.json(items);
  });

  return httpServer;
}
