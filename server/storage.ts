import { db } from "./db";
import {
  announcements, menuItems, clubs, sportsEvents, schoolEvents, featuredContent,
  type Announcement, type InsertAnnouncement,
  type MenuItem, type InsertMenuItem,
  type Club, type InsertClub,
  type SportsEvent, type InsertSportsEvent,
  type SchoolEvent, type InsertSchoolEvent,
  type FeaturedContent, type InsertFeaturedContent
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(item: InsertAnnouncement): Promise<Announcement>;

  // Menu
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;

  // Clubs
  getClubs(): Promise<Club[]>;
  createClub(item: InsertClub): Promise<Club>;

  // Sports
  getSportsEvents(): Promise<SportsEvent[]>;
  createSportsEvent(item: InsertSportsEvent): Promise<SportsEvent>;

  // Events
  getSchoolEvents(): Promise<SchoolEvent[]>;
  createSchoolEvent(item: InsertSchoolEvent): Promise<SchoolEvent>;

  // Featured
  getFeaturedContent(): Promise<FeaturedContent[]>;
  createFeaturedContent(item: InsertFeaturedContent): Promise<FeaturedContent>;
}

export class DatabaseStorage implements IStorage {
  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements).orderBy(desc(announcements.date));
  }
  async createAnnouncement(item: InsertAnnouncement): Promise<Announcement> {
    const [result] = await db.insert(announcements).values(item).returning();
    return result;
  }

  // Menu
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).orderBy(desc(menuItems.date));
  }
  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [result] = await db.insert(menuItems).values(item).returning();
    return result;
  }

  // Clubs
  async getClubs(): Promise<Club[]> {
    return await db.select().from(clubs).orderBy(clubs.season, clubs.name);
  }
  async createClub(item: InsertClub): Promise<Club> {
    const [result] = await db.insert(clubs).values(item).returning();
    return result;
  }

  // Sports
  async getSportsEvents(): Promise<SportsEvent[]> {
    return await db.select().from(sportsEvents).orderBy(desc(sportsEvents.date));
  }
  async createSportsEvent(item: InsertSportsEvent): Promise<SportsEvent> {
    const [result] = await db.insert(sportsEvents).values(item).returning();
    return result;
  }

  // Events
  async getSchoolEvents(): Promise<SchoolEvent[]> {
    return await db.select().from(schoolEvents).orderBy(schoolEvents.date);
  }
  async createSchoolEvent(item: InsertSchoolEvent): Promise<SchoolEvent> {
    const [result] = await db.insert(schoolEvents).values(item).returning();
    return result;
  }

  // Featured
  async getFeaturedContent(): Promise<FeaturedContent[]> {
    return await db.select().from(featuredContent).where(eq(featuredContent.active, true)).orderBy(featuredContent.order);
  }
  async createFeaturedContent(item: InsertFeaturedContent): Promise<FeaturedContent> {
    const [result] = await db.insert(featuredContent).values(item).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
