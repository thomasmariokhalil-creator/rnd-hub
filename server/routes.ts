import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedData() {
  // Clear existing to avoid duplicate seeds
  const announcementsList = await storage.getAnnouncements();
  if (announcementsList.length > 0) return;

  console.log("Seeding RND Hub data...");

  // 1. Featured Section - No photos, no text as per request
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
    summary: "Your central hub for school information.",
    content: "Keep up to date with the latest news, menus, and events.",
    date: new Date(),
    source: "Administration"
  });

  // 3. Food Section - Main dish only, location included
  const today = new Date().toISOString().split('T')[0];
  await storage.createMenuItem({
    title: "Main: Chicken Parmesan",
    date: today,
    description: "Breaded chicken with marinara and mozzarella.",
    price: "$7.00",
    category: "Main",
    location: "Student Commons"
  });

  // 4. Sports - Upcoming with tryouts & info
  await storage.createSportsEvent({
    title: "Senior Girls Volleyball Tryouts",
    date: new Date(Date.now() + 86400000 * 3),
    location: "Main Gym",
    isTryout: true
  });
  
  // Available sports list
  await storage.createClub({
    name: "Available Sports",
    description: "Basketball, Volleyball, Soccer, Football, Cross Country",
    meetingTime: "Check Athletics Board",
    location: "Athletic Office"
  });

  // 5. Dates / Schedule
  // Daily Schedule
  await storage.createSchoolEvent({
    title: "Period 1",
    date: today,
    type: "Schedule",
    description: "8:30 - 9:45"
  });
  await storage.createSchoolEvent({
    title: "Period 2",
    date: today,
    type: "Schedule",
    description: "9:50 - 11:05"
  });
  await storage.createSchoolEvent({
    title: "Lunch",
    date: today,
    type: "Schedule",
    description: "11:05 - 11:50"
  });
  await storage.createSchoolEvent({
    title: "Period 3",
    date: today,
    type: "Schedule",
    description: "11:55 - 1:10"
  });
  await storage.createSchoolEvent({
    title: "Period 4",
    date: today,
    type: "Schedule",
    description: "1:15 - 2:30"
  });

  // Placeholder Mass, PA Day, Holiday, Exam
  await storage.createSchoolEvent({
    title: "Mass Day Schedule",
    date: "2026-01-20",
    type: "Mass",
    description: "Revised times for liturgy"
  });
  await storage.createSchoolEvent({
    title: "PA Day",
    date: "2026-02-02",
    type: "PA Day",
    description: "No classes for students"
  });
  await storage.createSchoolEvent({
    title: "Family Day",
    date: "2026-02-16",
    type: "Holiday",
    description: "School Closed"
  });
  await storage.createSchoolEvent({
    title: "Final Exams",
    date: "2026-06-18",
    type: "Exams",
    description: "Semester 2 Finals"
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
