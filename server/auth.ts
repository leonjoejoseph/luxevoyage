import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import type { User, Session } from "../shared/schema";

export class AuthService {
  // Hash password with bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate secure session ID
  static generateSessionId(): string {
    return randomBytes(32).toString('hex');
  }

  // Generate user ID
  static generateUserId(): string {
    return randomBytes(16).toString('hex');
  }

  // Calculate session expiration (2 months from now)
  static getSessionExpiration(): Date {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 2);
    return expiration;
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  static isValidPassword(password: string): { valid: boolean; message?: string } {
    if (password.length < 6) {
      return { valid: false, message: "Password must be at least 6 characters long" };
    }
    if (password.length > 128) {
      return { valid: false, message: "Password must be less than 128 characters" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    return { valid: true };
  }

  // Clean expired sessions
  static isSessionExpired(session: Session): boolean {
    return new Date() > session.expiresAt;
  }
}

// Middleware to check authentication
export function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

// Middleware to check if user is already authenticated
export function redirectIfAuthenticated(req: any, res: any, next: any) {
  if (req.session?.user) {
    return res.status(200).json({ authenticated: true, user: req.session.user });
  }
  next();
}