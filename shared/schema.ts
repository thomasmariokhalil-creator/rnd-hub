import { pgTable, text, serial, timestamp, boolean, date, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// 1. Announcements / Daily News
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  source: text("source").default("Internal"),
  imageUrl: text("image_url"),
});

// 2. Cafeteria Menu
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  price: text("price"),
  category: text("category").default("Main"),
  location: text("location"),
  imageUrl: text("image_url"),
});

// 3. Clubs and Activities
export const clubs = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  meetingTime: text("meeting_time"),
  location: text("location"),
  contactEmail: text("contact_email"),
  imageUrl: text("image_url"),
});

// 4. Sports Updates
export const sportsEvents = pgTable("sports_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sportName: text("sport_name").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // 'Tryout', 'Practice', 'Game', 'Event'
  location: text("location"),
  description: text("description"),
  result: text("result"),
  imageUrl: text("image_url"),
});

// 5. Important Dates
export const schoolEvents = pgTable("school_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date").notNull(),
  type: text("type").notNull(),
  description: text("description"),
});

// 6. Featured Carousel Content
export const featuredContent = pgTable("featured_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url"),
  active: boolean("active").default(true),
  order: integer("order"),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertClubSchema = createInsertSchema(clubs).omit({ id: true });
export const insertSportsEventSchema = createInsertSchema(sportsEvents).omit({ id: true });
export const insertSchoolEventSchema = createInsertSchema(schoolEvents).omit({ id: true });
export const insertFeaturedContentSchema = createInsertSchema(featuredContent).omit({ id: true });

export type Announcement = typeof announcements.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Club = typeof clubs.$inferSelect;
export type SportsEvent = typeof sportsEvents.$inferSelect;
export type SchoolEvent = typeof schoolEvents.$inferSelect;
export type FeaturedContent = typeof featuredContent.$inferSelect;
