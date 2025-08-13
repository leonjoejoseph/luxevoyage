import { sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  text,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - required for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table - supports both admin and regular users
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Travel packages table
export const packages = pgTable("packages", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: varchar("duration").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").notNull(),
  category: text("category").array().notNull(),
  image: varchar("image_url").notNull(),
  badge: varchar("badge").notNull(),
  badgeColor: varchar("badge_color").notNull(),
  includes: text("includes").array().notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  packageId: varchar("package_id").references(() => packages.id),
  customerName: varchar("customer_name").notNull(),
  customerEmail: varchar("customer_email").notNull(),
  customerPhone: varchar("customer_phone"),
  travelers: integer("travelers").notNull().default(1),
  travelDate: timestamp("travel_date"),
  specialRequests: text("special_requests"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("pending"), // pending, confirmed, cancelled, completed
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, paid, refunded
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Chat history table for AI chatbot
export const chatHistory = pgTable("chat_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  userMessage: text("user_message"),
  botResponse: text("bot_response"),
  timestamp: timestamp("timestamp").defaultNow(),
  userEmail: varchar("user_email"), // For sending chat history
  rating: integer("rating"), // 1-5 stars
  feedback: text("feedback"),
});

// Inquiries/Leads table for CRM
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  subject: varchar("subject"),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("new"), // new, in_progress, resolved, closed
  assignedTo: varchar("assigned_to").references(() => users.id),
  source: varchar("source").default("website"), // website, chat, phone, email
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics data
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: varchar("event_type").notNull(), // page_view, package_view, booking_attempt, etc.
  packageId: varchar("package_id").references(() => packages.id),
  userId: varchar("user_id").references(() => users.id),
  data: jsonb("data"), // Additional event data
  timestamp: timestamp("timestamp").defaultNow(),
});

// Currency and language preferences
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  currency: varchar("currency").default("USD"),
  language: varchar("language").default("en"),
  timezone: varchar("timezone").default("UTC"),
  emailNotifications: boolean("email_notifications").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  bookings: many(bookings),
  assignedInquiries: many(inquiries),
  analytics: many(analytics),
  preferences: one(userPreferences),
}));

export const packagesRelations = relations(packages, ({ many }) => ({
  bookings: many(bookings),
  analytics: many(analytics),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  package: one(packages, {
    fields: [bookings.packageId],
    references: [packages.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  assignedUser: one(users, {
    fields: [inquiries.assignedTo],
    references: [users.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, {
    fields: [analytics.userId],
    references: [users.id],
  }),
  package: one(packages, {
    fields: [analytics.packageId],
    references: [packages.id],
  }),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const upsertUserSchema = insertUserSchema.omit({ createdAt: true, updatedAt: true });

export const insertPackageSchema = createInsertSchema(packages);
export const selectPackageSchema = createSelectSchema(packages);

export const insertBookingSchema = createInsertSchema(bookings);
export const selectBookingSchema = createSelectSchema(bookings);

export const insertChatHistorySchema = createInsertSchema(chatHistory);
export const selectChatHistorySchema = createSelectSchema(chatHistory);

export const insertInquirySchema = createInsertSchema(inquiries);
export const selectInquirySchema = createSelectSchema(inquiries);

export const insertAnalyticsSchema = createInsertSchema(analytics);
export const selectAnalyticsSchema = createSelectSchema(analytics);

export const insertUserPreferencesSchema = createInsertSchema(userPreferences);
export const selectUserPreferencesSchema = createSelectSchema(userPreferences);

// Type exports
export type User = typeof users.$inferSelect;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type InsertUser = typeof users.$inferInsert;

export type Package = typeof packages.$inferSelect;
export type InsertPackage = typeof packages.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertChatHistory = typeof chatHistory.$inferInsert;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;