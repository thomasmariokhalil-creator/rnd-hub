import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedData() {
  const announcementsList = await storage.getAnnouncements();
  // We'll clear and re-seed to ensure all requirements are met
  if (announcementsList.length > 0) return;

  console.log("Seeding RND Hub data...");

  // 1. Featured Section - No photos, no text
  await storage.createFeaturedContent({
    title: "", // Empty as requested
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
    linkUrl: "#",
    active: true,
    order: 1
  });

  // 2. Daily Announcements
  await storage.createAnnouncement({
    title: "Welcome Back Students!",
    summary: "A warm welcome to all new and returning students.",
    content: "We are excited to start the new semester. Please check your timetables.",
    date: new Date(),
    source: "Principal's Office"
  });

  // 3. Food Section
  const today = new Date().toISOString().split('T')[0];
  await storage.createMenuItem({
    title: "Today's Main: Lasagna",
    date: today,
    description: "Classic meat lasagna with cheesy layers.",
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

  // 5. Sports - Tryouts
  await storage.createSportsEvent({
    title: "Senior Boys Basketball Tryouts",
    date: new Date(Date.now() + 86400000 * 2),
    location: "Main Gym",
    isTryout: true
  });
  
  // Sports - Available Sports List (using clubs or special announcements)
  await storage.createClub({
    name: "Available Sports: Fall Season",
    description: "Basketball, Volleyball, Cross Country, Soccer",
    meetingTime: "Check schedule for details",
    location: "Athletic Office"
  });

  // 6. Dates / Schedule
  // PA Days
  await storage.createSchoolEvent({
    title: "PA Day - Semester 1",
    date: "2026-02-02",
    type: "PA",
    description: "Professional Activity Day - No School"
  });
  // Holidays
  await storage.createSchoolEvent({
    title: "Family Day",
    date: "2026-02-16",
    type: "Holiday",
    description: "Provincial Holiday"
  });
  // Mass
  await storage.createSchoolEvent({
    title: "Ash Wednesday Mass",
    date: "2026-02-18",
    type: "Mass",
    description: "School-wide Mass at 9:00 AM"
  });
  // Exams
  await storage.createSchoolEvent({
    title: "Final Exams",
    date: "2026-06-20",
    type: "Exam",
    description: "Check individual schedule"
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
