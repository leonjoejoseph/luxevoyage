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

// Local travel response system for when OpenAI is unavailable
function getLocalTravelResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for non-travel questions first
  const nonTravelKeywords = [
    'weather today', 'current weather', 'what time is it', 'politics', 'sports score', 
    'news', 'stock market', 'cryptocurrency', 'programming', 'coding', 'technology',
    'science', 'math', 'history', 'music', 'movies', 'books', 'recipes', 'cooking',
    'health advice', 'medical', 'finance', 'investment', 'personal', 'relationship'
  ];
  
  for (const keyword of nonTravelKeywords) {
    if (lowerMessage.includes(keyword) && !lowerMessage.includes('travel') && !lowerMessage.includes('vacation') && !lowerMessage.includes('destination')) {
      return "Out of topic Question";
    }
  }
  
  // Travel-related responses - check specific destinations first
  if (lowerMessage.includes('maldives')) {
    return "Our Maldives Ocean Villa Experience ($4,299) includes 5 days in an overwater villa with private butler service, snorkeling with manta rays, sunset dolphin cruise, spa treatments, and fine dining. It's perfect for romantic getaways and luxury relaxation.";
  }
  
  if (lowerMessage.includes('switzerland') || lowerMessage.includes('alpine') || lowerMessage.includes('swiss')) {
    return "The Swiss Alpine Luxury Experience ($3,899) offers 6 days of mountain luxury with helicopter skiing, Michelin-starred dining, luxury spa treatments, private alpine tours, and accommodations in premium chalets. Best visited December-March for winter sports or June-September for hiking.";
  }
  
  if (lowerMessage.includes('japan') || lowerMessage.includes('japanese') || lowerMessage.includes('ryokan')) {
    return "Our Japan Private Ryokan Experience ($11,299) includes 8 days of cultural immersion with private ryokan stays, hot springs, daily kaiseki meals, tea ceremony with a master, private temple meditation, and a helicopter tour of Mount Fuji.";
  }
  
  if (lowerMessage.includes('antarctica') || lowerMessage.includes('antarctic')) {
    return "The Antarctica Luxury Expedition ($28,999) is our most exclusive 12-day adventure aboard a luxury icebreaker. Includes expert naturalist guides, zodiac wildlife tours, photography workshops, and champagne ice tasting. Limited to 12 guests per departure.";
  }
  
  if (lowerMessage.includes('iceland') || lowerMessage.includes('northern lights') || lowerMessage.includes('aurora')) {
    return "Our Iceland Northern Lights package ($6,299) features 5 days in glass igloo accommodations, aurora hunting tours, Blue Lagoon spa access, glacier hiking, and Reykjavik city tours. Best visited September-March for northern lights viewing.";
  }
  
  if (lowerMessage.includes('bali') || lowerMessage.includes('indonesia')) {
    return "The Bali Private Villa Retreat ($8,599) offers 7 days in an exclusive cliff-side villa with personal chef and butler, helicopter temple tours, traditional spa treatments, and sunset yacht charters. Perfect for ultimate privacy and luxury.";
  }
  
  if (lowerMessage.includes('norway') || lowerMessage.includes('fjord') || lowerMessage.includes('norwegian')) {
    return "Our Norway Fjords Explorer ($9,299) combines 9 days of scenic railway journeys and premium fjord cruises, with northern lights hunting, gourmet Nordic cuisine, and cultural performances. Includes the famous Flam Railway and Geiranger Fjord.";
  }
  
  if (lowerMessage.includes('dubai') || lowerMessage.includes('penthouse')) {
    return "Our Dubai Penthouse Suite experience ($22,999) includes 5 nights in the Burj Al Arab Royal Suite with helicopter transfers, private desert safari, yacht charter, and shopping with a personal stylist. The ultimate in Middle Eastern luxury.";
  }
  
  if (lowerMessage.includes('patagonia') || lowerMessage.includes('chile') || lowerMessage.includes('argentina')) {
    return "The Patagonia Private Expedition ($7,899) offers 9 days of exclusive wilderness exploration with private charter flights, expert guides, luxury eco-lodges, and glacier trekking. Perfect for adventure seekers who demand comfort.";
  }
  
  if (lowerMessage.includes('kenya') || lowerMessage.includes('safari') || lowerMessage.includes('africa') || lowerMessage.includes('wildlife')) {
    return "Our Kenya Safari ($3,499) includes 6 days of Big Five wildlife viewing with professional guides, game drives in Masai Mara, cultural village visits, hot air balloon safari, and bush breakfast experiences in luxury tented camps.";
  }
  
  // Booking and service queries - must come before other more general checks
  if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('availability') || lowerMessage.includes('how to book') || lowerMessage.includes('i want to book')) {
    return "To book any of our luxury packages, please contact our travel experts at luxevoyage25@gmail.com or use our contact form. We'll arrange a personalized consultation to customize your perfect getaway. All packages include 24/7 concierge support.";
  }
  
  if (lowerMessage.includes('consultation') || lowerMessage.includes('custom') || lowerMessage.includes('personalized') || lowerMessage.includes('tailor')) {
    return "We offer complimentary luxury travel consultations to create personalized itineraries. Our experts will work with you to design the perfect experience based on your preferences, budget, and travel dates. Contact us at luxevoyage25@gmail.com to schedule your consultation.";
  }
  
  // Price and package queries
  if (lowerMessage.includes('package') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return "LuxeVoyage offers premium travel packages starting from $1,899 for our Angkor Wonder experience up to $28,999 for our Antarctica Luxury Expedition. Our most popular packages include the Maldives Ocean Villa ($4,299), Swiss Alpine Luxury ($3,899), and Japan Private Ryokan ($11,299). Would you like details about any specific destination?";
  }
  
  // Greetings and general help
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help') || lowerMessage === 'hey') {
    return "Welcome to LuxeVoyage! I'm here to help you plan the perfect luxury getaway. We specialize in exclusive travel experiences to destinations like the Maldives, Switzerland, Japan, Antarctica, Iceland, Bali, and Norway. What type of luxury adventure interests you?";
  }
  
  // Travel planning queries
  if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary') || lowerMessage.includes('trip planning')) {
    return "Our travel experts create fully customized luxury itineraries based on your preferences. We handle everything from accommodation and dining to exclusive experiences and transportation. Each package includes 24/7 concierge support. What destination interests you most?";
  }
  
  // Accommodation queries
  if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay') || lowerMessage.includes('villa') || lowerMessage.includes('where') || lowerMessage.includes('lodge')) {
    return "All LuxeVoyage packages include premium accommodations: overwater villas in the Maldives, luxury chalets in Switzerland, traditional ryokans in Japan, expedition suites in Antarctica, glass igloos in Iceland, cliff-side villas in Bali, and boutique hotels in Norway. Each offers exceptional service and unique experiences.";
  }
  
  // Contact and support queries
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('support')) {
    return "You can reach our luxury travel experts at luxevoyage25@gmail.com or use our contact form on the website. We provide 24/7 concierge support for all our guests and offer complimentary consultations for custom itinerary planning.";
  }
  
  // General destination queries
  if (lowerMessage.includes('destination') || lowerMessage.includes('where can') || lowerMessage.includes('places') || lowerMessage.includes('travel to')) {
    return "LuxeVoyage specializes in exclusive destinations worldwide: Maldives overwater villas, Swiss alpine retreats, Japan cultural immersion, Antarctica expeditions, Iceland northern lights, Bali private villas, Norway fjords, Dubai luxury, Patagonia adventures, and Kenya safaris. Which destination interests you most?";
  }
  
  // Default travel response
  return "I'm your luxury travel assistant for LuxeVoyage. I can help you with information about our exclusive packages, destinations, pricing, and booking. We offer premium experiences to the Maldives, Switzerland, Japan, Antarctica, Iceland, Bali, Norway, and more. What would you like to know about luxury travel?";
}

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

      // Always use local fallback due to API quota limits
      return res.json({
        success: true,
        response: getLocalTravelResponse(message)
      });

      try {
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
      } catch (apiError: any) {
        console.warn("OpenAI API error, falling back to local responses:", apiError.message);
        return res.json({
          success: true,
          response: getLocalTravelResponse(message)
        });
      }
    } catch (error) {
      console.error("Chat API error:", error);
      res.json({
        success: true,
        response: getLocalTravelResponse(req.body.message)
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
      if (!req.session?.user?.id) {
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
