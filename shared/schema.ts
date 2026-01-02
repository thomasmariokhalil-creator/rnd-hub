import { pgTable, text, serial, timestamp, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// 1. Announcements / Daily News
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  source: text("source").default("Internal"), // e.g., SharePoint, Smores
  imageUrl: text("image_url"),
});

// 2. Cafeteria Menu
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(), // YYYY-MM-DD
  title: text("title").notNull(), // e.g., "Pepperoni Pizza"
  description: text("description"),
  price: text("price"),
  category: text("category").default("Main"), // Main, Side, Drink
  location: text("location"),
  imageUrl: text("image_url"),
});

// 3. Clubs and Activities
export const clubs = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  meetingTime: text("meeting_time"), // e.g., "Thursdays at lunch"
  location: text("location"),
  contactEmail: text("contact_email"),
  imageUrl: text("image_url"),
});

// 4. Sports Updates
export const sportsEvents = pgTable("sports_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // e.g., "Senior Boys Basketball vs. Regi"
  date: timestamp("date").notNull(),
  result: text("result"), // e.g., "W 54-40" or null if upcoming
  location: text("location"),
  isTryout: boolean("is_tryout").default(false),
  imageUrl: text("image_url"),
});

// 5. Important Dates
export const schoolEvents = pgTable("school_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date").notNull(),
  type: text("type").notNull(), // Exam, Holiday, Event, Schedule
  description: text("description"),
});

// 6. Featured Carousel Content
export const featuredContent = pgTable("featured_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url"),
  active: boolean("active").default(true),
  order: serial("order"),
});

// --- Schemas ---

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertClubSchema = createInsertSchema(clubs).omit({ id: true });
export const insertSportsEventSchema = createInsertSchema(sportsEvents).omit({ id: true });
export const insertSchoolEventSchema = createInsertSchema(schoolEvents).omit({ id: true });
export const insertFeaturedContentSchema = createInsertSchema(featuredContent).omit({ id: true });

// --- Types ---

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type Club = typeof clubs.$inferSelect;
export type InsertClub = z.infer<typeof insertClubSchema>;

export type SportsEvent = typeof sportsEvents.$inferSelect;
export type InsertSportsEvent = z.infer<typeof insertSportsEventSchema>;

export type SchoolEvent = typeof schoolEvents.$inferSelect;
export type InsertSchoolEvent = z.infer<typeof insertSchoolEventSchema>;

export type FeaturedContent = typeof featuredContent.$inferSelect;
export type InsertFeaturedContent = z.infer<typeof insertFeaturedContentSchema>;
