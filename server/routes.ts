import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedData() {
  const announcementsList = await storage.getAnnouncements();
  if (announcementsList.length > 0) return;

  console.log("Seeding RND Hub data...");

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // 1. Featured Section - No text, Garnet background placeholder
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
    date: today,
    source: "Administration"
  });

  // 3. Food Section - Today only, Main only, Location included
  await storage.createMenuItem({
    title: "Chicken Parmesan",
    date: todayStr,
    description: "Breaded chicken with marinara and mozzarella.",
    price: "$7.00",
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
    title: "Senior Girls Volleyball Tryouts",
    date: new Date(Date.now() + 86400000 * 3),
    location: "Main Gym",
    isTryout: true
  });
  
  await storage.createSportsEvent({
    title: "Junior Boys Basketball Tryouts",
    date: new Date(Date.now() + 86400000 * 4),
    location: "Main Gym",
    isTryout: true
  });

  // Categorized Available Sports
  const seasonalSports = [
    {
      name: "Fall Season Sports",
      description: "Cross Country, Football, Boys Volleyball, Girls Basketball, Golf, Girls Field Hockey",
      location: "Check Athletics Board",
    },
    {
      name: "Winter Season Sports",
      description: "Girls Volleyball, Boys Basketball, Curling, Hockey, Badminton",
      location: "Check Athletics Board",
    },
    {
      name: "Spring Season Sports",
      description: "Soccer, Track & Field, Girls Softball, Tennis, Baseball",
      location: "Check Athletics Board",
    },
    {
      name: "Year-Round Sports",
      description: "Cheer & Dance",
      location: "Main Gym",
    }
  ];

  for (const sport of seasonalSports) {
    await storage.createClub({
      name: sport.name,
      description: sport.description,
      meetingTime: "Seasonal",
      location: sport.location,
    });
  }
  const scheduleData = [
    { title: "Period 1", time: "8:30 - 9:45" },
    { title: "Period 2", time: "9:50 - 11:05" },
    { title: "Lunch", time: "11:05 - 11:50" },
    { title: "Period 3", time: "11:55 - 1:10" },
    { title: "Period 4", time: "1:15 - 2:30" }
  ];

  for (const s of scheduleData) {
    await storage.createSchoolEvent({
      title: s.title,
      date: todayStr,
      type: "Schedule",
      description: s.time
    });
  }

  await storage.createSchoolEvent({
    title: "School Mass Schedule",
    date: "2026-02-18",
    type: "Mass",
    description: "Period 1: 8:30-9:30 | Mass: 9:45-11:00 | Period 2: 11:05-12:05 | Lunch: 12:05-12:50 | Period 3: 12:55-1:40 | Period 4: 1:45-2:30"
  });

  await storage.createSchoolEvent({
    title: "Professional Activity Day",
    date: "2026-02-02",
    type: "PA Day",
    description: "No school for students."
  });

  await storage.createSchoolEvent({
    title: "Family Day",
    date: "2026-02-16",
    type: "Holiday",
    description: "School closed."
  });

  await storage.createSchoolEvent({
    title: "Midterm Exams Period",
    date: "2026-03-20",
    type: "Exams",
    description: "Final assessment week."
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
