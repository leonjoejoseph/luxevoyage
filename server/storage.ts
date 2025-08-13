import {
  users,
  packages,
  bookings,
  chatHistory,
  inquiries,
  analytics,
  userPreferences,
  type User,
  type UpsertUser,
  type Package,
  type InsertPackage,
  type Booking,
  type InsertBooking,
  type ChatHistory,
  type InsertChatHistory,
  type Inquiry,
  type InsertInquiry,
  type Analytics,
  type InsertAnalytics,
  type UserPreferences,
  type InsertUserPreferences,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like, count, gte, lte } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  
  // Package operations
  getAllPackages(): Promise<Package[]>;
  getPackageById(id: string): Promise<Package | undefined>;
  createPackage(packageData: InsertPackage): Promise<Package>;
  updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package>;
  deletePackage(id: string): Promise<void>;
  
  // Booking operations
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | undefined>;
  getUserBookings(userId: string): Promise<Booking[]>;
  createBooking(bookingData: InsertBooking): Promise<Booking>;
  updateBooking(id: string, bookingData: Partial<InsertBooking>): Promise<Booking>;
  
  // Chat history operations
  saveChatHistory(chatData: InsertChatHistory): Promise<ChatHistory>;
  getChatHistoryBySession(sessionId: string): Promise<ChatHistory[]>;
  getAllChatHistory(): Promise<ChatHistory[]>;
  
  // Inquiry/CRM operations
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiryData: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: string, inquiryData: Partial<InsertInquiry>): Promise<Inquiry>;
  getInquiriesByStatus(status: string): Promise<Inquiry[]>;
  
  // Analytics operations
  saveAnalytics(analyticsData: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByType(eventType: string): Promise<Analytics[]>;
  getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]>;
  getPopularPackages(): Promise<{ packageId: string; count: number }[]>;
  
  // User preferences
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  // Package operations
  async getAllPackages(): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.isActive, true)).orderBy(desc(packages.createdAt));
  }

  async getPackageById(id: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async createPackage(packageData: InsertPackage): Promise<Package> {
    const [pkg] = await db.insert(packages).values(packageData).returning();
    return pkg;
  }

  async updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package> {
    const [pkg] = await db
      .update(packages)
      .set({ ...packageData, updatedAt: new Date() })
      .where(eq(packages.id, id))
      .returning();
    return pkg;
  }

  async deletePackage(id: string): Promise<void> {
    await db.update(packages).set({ isActive: false }).where(eq(packages.id, id));
  }

  // Booking operations
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
  }

  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(bookingData).returning();
    return booking;
  }

  async updateBooking(id: string, bookingData: Partial<InsertBooking>): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ ...bookingData, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  // Chat history operations
  async saveChatHistory(chatData: InsertChatHistory): Promise<ChatHistory> {
    const [chat] = await db.insert(chatHistory).values(chatData).returning();
    return chat;
  }

  async getChatHistoryBySession(sessionId: string): Promise<ChatHistory[]> {
    return await db.select().from(chatHistory).where(eq(chatHistory.sessionId, sessionId)).orderBy(chatHistory.timestamp);
  }

  async getAllChatHistory(): Promise<ChatHistory[]> {
    return await db.select().from(chatHistory).orderBy(desc(chatHistory.timestamp));
  }

  // Inquiry/CRM operations
  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(inquiryData: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(inquiryData).returning();
    return inquiry;
  }

  async updateInquiry(id: string, inquiryData: Partial<InsertInquiry>): Promise<Inquiry> {
    const [inquiry] = await db
      .update(inquiries)
      .set({ ...inquiryData, updatedAt: new Date() })
      .where(eq(inquiries.id, id))
      .returning();
    return inquiry;
  }

  async getInquiriesByStatus(status: string): Promise<Inquiry[]> {
    return await db.select().from(inquiries).where(eq(inquiries.status, status)).orderBy(desc(inquiries.createdAt));
  }

  // Analytics operations
  async saveAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [analytic] = await db.insert(analytics).values(analyticsData).returning();
    return analytic;
  }

  async getAnalyticsByType(eventType: string): Promise<Analytics[]> {
    return await db.select().from(analytics).where(eq(analytics.eventType, eventType)).orderBy(desc(analytics.timestamp));
  }

  async getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]> {
    return await db
      .select()
      .from(analytics)
      .where(and(
        gte(analytics.timestamp, startDate),
        lte(analytics.timestamp, endDate)
      ))
      .orderBy(desc(analytics.timestamp));
  }

  async getPopularPackages(): Promise<{ packageId: string; count: number }[]> {
    const result = await db
      .select({
        packageId: analytics.packageId,
        count: count(analytics.id),
      })
      .from(analytics)
      .where(eq(analytics.eventType, 'package_view'))
      .groupBy(analytics.packageId)
      .orderBy(desc(count(analytics.id)))
      .limit(10);
    
    return result.filter(item => item.packageId !== null) as { packageId: string; count: number }[];
  }

  // User preferences
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    return prefs;
  }

  async updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const [prefs] = await db
      .insert(userPreferences)
      .values({ userId, ...preferences })
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: { ...preferences, updatedAt: new Date() },
      })
      .returning();
    return prefs;
  }
}

export const storage = new DatabaseStorage();