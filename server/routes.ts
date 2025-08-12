import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { AuthService } from "./auth";
import { loginSchema, registerSchema } from "../shared/schema";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;

      if (!message) {
        return res.status(400).json({
          success: false,
          error: "Message is required"
        });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.json({
          success: true,
          response: "I apologize, but I'm experiencing technical difficulties. Please contact our travel experts directly at luxevoyage25@gmail.com for immediate assistance."
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: context || "You are a helpful luxury travel assistant for LuxeVoyage."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't process your request. Please try again.";

      res.json({
        success: true,
        response: response
      });
    } catch (error) {
      console.error("Chat API error:", error);
      res.json({
        success: true,
        response: "I apologize, but I'm experiencing technical difficulties. Please contact our travel experts directly at luxevoyage25@gmail.com for immediate assistance."
      });
    }
  });

  // Chat feedback endpoint
  app.post("/api/chat/feedback", async (req, res) => {
    try {
      const { rating, feedback, messages } = req.body;

      // Send feedback email
      const result = await sendContactEmail({
        firstName: "Chat",
        lastName: "Feedback",
        email: "system@luxevoyage.com",
        message: `
Chat Session Rating: ${rating}/5 stars

Feedback: ${feedback || 'No additional feedback provided'}

Chat Messages:
${messages?.map((msg: any, i: number) => `${i + 1}. ${msg.sender}: ${msg.text}`).join('\n') || 'No messages recorded'}
        `
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Chat feedback error:", error);
      res.status(500).json({ success: false, error: "Failed to submit feedback" });
    }
  });

  // Bookings endpoint
  app.get("/api/bookings", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ success: false, error: "Not authenticated" });
      }

      // For now, return mock data as no bookings have been made yet
      res.json([]);
    } catch (error) {
      console.error("Bookings error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch bookings" });
    }
  });

  // Authentication routes
  
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid input data",
          details: validation.error.issues.map(i => ({ field: i.path[0], message: i.message }))
        });
      }

      const { firstName, lastName, email, password } = validation.data;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "An account with this email already exists"
        });
      }

      // Hash password and create user
      const hashedPassword = await AuthService.hashPassword(password);
      const user = await storage.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isVerified: false
      });

      // Create session
      const sessionId = AuthService.generateSessionId();
      const expiresAt = AuthService.getSessionExpiration();
      await storage.createSession(user.id, sessionId, expiresAt);

      // Store user in express session
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: Boolean(user.isVerified)
      };

      res.json({
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid email or password format"
        });
      }

      const { email, password } = validation.data;

      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password"
        });
      }

      // Verify password
      const isValidPassword = await AuthService.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password"
        });
      }

      // Create session
      const sessionId = AuthService.generateSessionId();
      const expiresAt = AuthService.getSessionExpiration();
      await storage.createSession(user.id, sessionId, expiresAt);

      // Store user in express session
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: Boolean(user.isVerified)
      };

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req, res) => {
    try {
      if (req.session.user) {
        // Clean up session
        req.session.user = undefined;
        req.session.destroy(() => {});
      }
      
      res.json({
        success: true,
        message: "Logged out successfully"
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({
          success: false,
          error: "Not authenticated"
        });
      }

      res.json({
        success: true,
        user: req.session.user
      });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });

  // Contact form email endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, destination, travelDate, budget, message } = req.body;

      // Basic validation
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ 
          success: false, 
          error: "First name, last name, and email are required" 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: "Please provide a valid email address" 
        });
      }

      const result = await sendContactEmail({
        firstName,
        lastName,
        email,
        phone,
        destination,
        travelDate,
        budget,
        message
      });

      if (result.success) {
        res.json({ 
          success: true, 
          message: "Your travel inquiry has been sent successfully! We'll get back to you soon." 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: result.error || "Failed to send email. Please try again." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Internal server error. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
