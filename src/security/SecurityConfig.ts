/**
 * Content Security Policy Configuration
 * Provides comprehensive security headers and policies
 */

export interface CSPConfig {
  "default-src": string[];
  "script-src": string[];
  "style-src": string[];
  "img-src": string[];
  "font-src": string[];
  "connect-src": string[];
  "frame-src": string[];
  "object-src": string[];
  "base-uri": string[];
  "form-action": string[];
  "frame-ancestors": string[];
  "upgrade-insecure-requests": boolean;
}

export const cspConfig: CSPConfig = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'", // Required for Vite HMR in development
    "'unsafe-eval'", // Required for Vite in development
    "https://cdn.jsdelivr.net",
    "https://unpkg.com",
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS
    "https://fonts.googleapis.com",
  ],
  "img-src": ["'self'", "data:", "https:", "blob:"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  "connect-src": [
    "'self'",
    "https://api.github.com",
    "wss://localhost:*", // WebSocket for HMR
    "ws://localhost:*",
  ],
  "frame-src": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "upgrade-insecure-requests": true,
};

export function generateCSPHeader(config: CSPConfig): string {
  return Object.entries(config)
    .map(([directive, values]) => {
      if (typeof values === "boolean") {
        return values ? directive : "";
      }
      return `${directive} ${values.join(" ")}`;
    })
    .filter(Boolean)
    .join("; ");
}

export const cspHeader = generateCSPHeader(cspConfig);

// Security Headers Configuration
export const securityHeaders = {
  "Content-Security-Policy": cspHeader,
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

// Input Sanitization
export class InputSanitizer {
  static sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .replace(/javascript:/gi, "") // Remove javascript: protocol
      .replace(/on\w+=/gi, "") // Remove event handlers
      .trim();
  }

  static sanitizeSearchQuery(query: string): string {
    return this.sanitizeString(query)
      .replace(/[^\w\s-]/g, "") // Keep only alphanumeric, spaces, and hyphens
      .substring(0, 100); // Limit length
  }

  static sanitizeCategory(category: string): string {
    return this.sanitizeString(category)
      .replace(/[^\w\s-]/g, "")
      .substring(0, 50);
  }

  static sanitizeDifficulty(difficulty: string): string {
    const allowedDifficulties = ["intermediate", "advanced", "expert"];
    return allowedDifficulties.includes(difficulty) ? difficulty : "intermediate";
  }
}

// Rate Limiting
export class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests = 100; // requests per window
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requestData = this.requests.get(identifier);

    if (!requestData || now > requestData.resetTime) {
      this.requests.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (requestData.count >= this.maxRequests) {
      return false;
    }

    requestData.count++;
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const requestData = this.requests.get(identifier);
    if (!requestData) return this.maxRequests;
    return Math.max(0, this.maxRequests - requestData.count);
  }

  getResetTime(identifier: string): number {
    const requestData = this.requests.get(identifier);
    return requestData?.resetTime || Date.now() + this.windowMs;
  }
}

export const rateLimiter = new RateLimiter();
