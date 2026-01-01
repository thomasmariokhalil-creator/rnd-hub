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
      title: "Welcome to RND Student Hub",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", // School hallway/student vibe
      linkUrl: "/news",
      active: true,
      order: 1
    });
    await storage.createFeaturedContent({
      title: "Big Game Tonight!",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ad0", // Basketball
      linkUrl: "/sports",
      active: true,
      order: 2
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
      category: "Main"
    });
    await storage.createMenuItem({
      title: "Caesar Salad",
      date: new Date().toISOString().split('T')[0],
      description: "Crisp romaine lettuce with caesar dressing.",
      price: "$3.00",
      category: "Side"
    });

    // Clubs
    await storage.createClub({
      name: "Robotics Club",
      description: "Build and program robots for competition.",
      meetingTime: "Tuesdays after school",
      location: "Room 104",
      contactEmail: "robotics@rnd.edu"
    });
    await storage.createClub({
      name: "Debate Team",
      description: "Sharpen your public speaking and critical thinking skills.",
      meetingTime: "Thursdays at lunch",
      location: "Library",
      contactEmail: "debate@rnd.edu"
    });

    // Sports
    await storage.createSportsEvent({
      title: "Senior Boys Basketball vs. Regi",
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      location: "Main Gym",
      result: "Upcoming"
    });
    await storage.createSportsEvent({
      title: "Junior Girls Volleyball",
      date: new Date(Date.now() - 86400000), // Yesterday
      location: "Away",
      result: "W 3-1"
    });

    // Events
    await storage.createSchoolEvent({
      title: "Midterm Exams Start",
      date: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
      type: "Exam",
      description: "Check the exam schedule."
    });
    await storage.createSchoolEvent({
      title: "Professional Activity Day",
      date: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
      type: "Holiday",
      description: "No school for students."
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
