import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedData() {
  // Clear existing data by checking announcements
  const announcementsList = await storage.getAnnouncements();
  if (announcementsList.length > 0) return;

  console.log("Seeding RND Hub data...");

  // 1. Featured Section - No text as per request
  await storage.createFeaturedContent({
    title: "", 
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
    linkUrl: "#",
    active: true,
    order: 1
  });

  // 2. Daily Announcements
  await storage.createAnnouncement({
    title: "Welcome to RND Hub!",
    summary: "Your central location for school information.",
    content: "Check here daily for news, menu updates, and sports schedules.",
    date: new Date(),
    source: "Principal's Office"
  });

  // 3. Food Section - Today's Main dish only, location included
  const today = new Date().toISOString().split('T')[0];
  await storage.createMenuItem({
    title: "Today's Main Dish",
    date: today,
    description: "Chef's Special Lasagna with Garlic Bread",
    price: "$6.50",
    category: "Main",
    location: "Student Commons"
  });

  // 4. Clubs
  await storage.createClub({
    name: "Robotics Club",
    description: "Build and program robots for competition.",
    meetingTime: "Tuesdays after school",
    location: "Room 104",
    contactEmail: "robotics@rnd.edu"
  });

  // 5. Sports - Tryouts and Available Sports
  await storage.createSportsEvent({
    title: "Senior Boys Basketball Tryouts",
    date: new Date(Date.now() + 86400000 * 2),
    location: "Main Gym",
    isTryout: true
  });
  
  await storage.createSportsEvent({
    title: "Available Sports: Basketball, Volleyball, Soccer",
    date: new Date(),
    location: "Athletic Office",
    isTryout: false
  });

  // 6. Dates / Schedule
  // Daily Schedule
  await storage.createSchoolEvent({
    title: "Daily Schedule",
    date: today,
    type: "Schedule",
    description: "Period 1: 8:30-9:45, Period 2: 9:50-11:05, Lunch: 11:05-11:50, Period 3: 11:55-1:10, Period 4: 1:15-2:30"
  });
  
  // Mass Schedule (Placeholder)
  await storage.createSchoolEvent({
    title: "Mass Day Schedule",
    date: "2026-02-18",
    type: "Mass",
    description: "Special schedule: P1 (8:30-9:30), Mass (9:40-10:40), P2 (10:50-11:50)..."
  });

  // PA Days (Placeholder)
  await storage.createSchoolEvent({
    title: "PA Day",
    date: "2026-02-02",
    type: "PA Day",
    description: "No school for students"
  });

  // Holidays (Placeholder)
  await storage.createSchoolEvent({
    title: "Family Day Holiday",
    date: "2026-02-16",
    type: "Holiday",
    description: "School closed"
  });

  // Exams (Placeholder)
  await storage.createSchoolEvent({
    title: "Semester 1 Exams",
    date: "2026-01-26",
    type: "Exam",
    description: "Exam week begins"
  });

  console.log("RND Hub seeding complete.");
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
    const items = await storage.getAnnouncements();
    const found = items.find(i => i.id === Number(req.params.id));
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
