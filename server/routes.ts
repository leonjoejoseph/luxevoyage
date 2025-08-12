import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
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
