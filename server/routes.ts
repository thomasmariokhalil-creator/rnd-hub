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

  // 1. Featured Section
  await storage.createFeaturedContent({
    title: "Welcome to the Student Hub", 
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

  // 3. Food Section
  await storage.createMenuItem({
    title: "Chicken Parmesan",
    date: todayStr,
    description: "Breaded chicken with marinara and mozzarella.",
    price: "$7.00",
    category: "Main",
    location: "Student Commons"
  });

  // 4. Sports Updates
  const sportsData = [
    { sportName: "Girls Volleyball", title: "Practice", type: "Practice", date: new Date(Date.now() + 86400000), location: "Main Gym" },
    { sportName: "Boys Basketball", title: "Tryouts", type: "Tryout", date: new Date(Date.now() + 86400000 * 2), location: "Main Gym" },
    { sportName: "Hockey", title: "Game vs Holy Cross", type: "Game", date: new Date(Date.now() + 86400000 * 3), location: "INVISTA Centre" },
  ];

  for (const s of sportsData) {
    await storage.createSportsEvent(s);
  }

  // 5. Clubs (Used for seasonal sports categorizes)
  const seasonalSports = [
    { name: "Fall Season Sports", description: "Cross Country, Football, Boys Volleyball, Girls Basketball, Golf, Girls Field Hockey", meetingTime: "Seasonal", location: "Check Athletics Board" },
    { name: "Winter Season Sports", description: "Girls Volleyball, Boys Basketball, Curling, Hockey, Badminton", meetingTime: "Seasonal", location: "Check Athletics Board" },
    { name: "Spring Season Sports", description: "Soccer, Track & Field, Girls Softball, Tennis, Baseball", meetingTime: "Seasonal", location: "Check Athletics Board" },
    { name: "Year-Round Sports", description: "Cheer", meetingTime: "Seasonal", location: "Main Gym" }
  ];

  for (const sport of seasonalSports) {
    await storage.createClub(sport);
  }

  // 6. Dates / Schedule
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
