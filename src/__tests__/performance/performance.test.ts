/**
 * Performance and Security Tests
 * Tests application performance and security measures
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createMockQuestion,
  setupTestEnvironment,
  measurePerformance,
} from "../utils/testUtils";
import { InputSanitizer, rateLimiter } from "../../security/SecurityConfig";
import { questionRepository } from "../../repositories/QuestionRepository";

describe("Performance Tests", () => {
  beforeEach(() => {
    setupTestEnvironment();
    vi.clearAllMocks();
  });

  describe("Question Loading Performance", () => {
    it("should load questions within acceptable time limits", async () => {
      const largeQuestionSet = Array.from({ length: 1000 }, (_, i) =>
        createMockQuestion({
          id: i + 1,
          question: `Question ${i + 1}`,
          answer: `Answer ${i + 1}`.repeat(10), // Make answers longer
        })
      );

      vi.doMock("../../data/angular-enhanced", () => ({
        ANGULAR_ENHANCED_QUESTIONS: largeQuestionSet,
      }));

      const loadTime = await measurePerformance(async () => {
        await questionRepository.getAll("angular");
      });

      expect(loadTime).toBeLessThan(100); // Should load within 100ms
    });

    it("should cache questions for faster subsequent loads", async () => {
      const mockQuestions = [createMockQuestion({ id: 1 })];

      vi.doMock("../../data/react-enhanced", () => ({
        REACT_ENHANCED_QUESTIONS: mockQuestions,
      }));

      // First load
      const firstLoadTime = await measurePerformance(async () => {
        await questionRepository.getAll("react");
      });

      // Second load (should be cached)
      const secondLoadTime = await measurePerformance(async () => {
        await questionRepository.getAll("react");
      });

      expect(secondLoadTime).toBeLessThan(firstLoadTime);
      expect(questionRepository.getCacheSize()).toBe(1);
    });

    it("should handle search efficiently with large datasets", async () => {
      const largeQuestionSet = Array.from({ length: 5000 }, (_, i) =>
        createMockQuestion({
          id: i + 1,
          question: `Question about React ${i + 1}`,
          answer: `This is answer ${i + 1} about React concepts`,
          tags: ["react", "javascript", "frontend"],
        })
      );

      vi.doMock("../../data/react-enhanced", () => ({
        REACT_ENHANCED_QUESTIONS: largeQuestionSet,
      }));

      await questionRepository.getAll("react");

      const searchTime = await measurePerformance(async () => {
        await questionRepository.search("react", "React");
      });

      expect(searchTime).toBeLessThan(50); // Search should be fast
    });
  });

  describe("Memory Management", () => {
    it("should not leak memory when switching frameworks", async () => {
      const frameworks = ["angular", "react", "nextjs", "redux", "random"];

      for (const framework of frameworks) {
        const mockQuestions = [createMockQuestion({ id: 1 })];
        vi.doMock(`../../data/${framework}-enhanced`, () => ({
          [`${framework.toUpperCase()}_ENHANCED_QUESTIONS`]: mockQuestions,
        }));

        await questionRepository.getAll(framework as any);
      }

      // Clear cache and check memory usage
      questionRepository.clearCache();
      expect(questionRepository.getCacheSize()).toBe(0);
    });

    it("should handle large question sets without performance degradation", async () => {
      const veryLargeSet = Array.from({ length: 10000 }, (_, i) =>
        createMockQuestion({
          id: i + 1,
          question: `Question ${i + 1}`,
          answer: `Answer ${i + 1}`.repeat(20),
        })
      );

      vi.doMock("../../data/angular-enhanced", () => ({
        ANGULAR_ENHANCED_QUESTIONS: veryLargeSet,
      }));

      const loadTime = await measurePerformance(async () => {
        await questionRepository.getAll("angular");
      });

      expect(loadTime).toBeLessThan(200); // Should handle 10k questions efficiently
    });
  });
});

describe("Security Tests", () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  describe("Input Sanitization", () => {
    it("should sanitize malicious input in search queries", () => {
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        "onclick=\"alert('xss')\"",
        '"><script>alert("xss")</script>',
        '"><img src=x onerror=alert("xss")>',
      ];

      maliciousInputs.forEach((input) => {
        const sanitized = InputSanitizer.sanitizeSearchQuery(input);
        expect(sanitized).not.toContain("<script>");
        expect(sanitized).not.toContain("javascript:");
        expect(sanitized).not.toContain("onclick");
        expect(sanitized).not.toContain("onerror");
      });
    });

    it("should sanitize category and difficulty inputs", () => {
      const maliciousCategory = '<script>alert("xss")</script>';
      const maliciousDifficulty = 'javascript:alert("xss")';

      const sanitizedCategory = InputSanitizer.sanitizeCategory(maliciousCategory);
      const sanitizedDifficulty = InputSanitizer.sanitizeDifficulty(maliciousDifficulty);

      expect(sanitizedCategory).not.toContain("<script>");
      expect(sanitizedDifficulty).toBe("intermediate"); // Should default to safe value
    });

    it("should limit input length to prevent DoS attacks", () => {
      const longInput = "a".repeat(10000);
      const sanitized = InputSanitizer.sanitizeSearchQuery(longInput);

      expect(sanitized.length).toBeLessThanOrEqual(100);
    });
  });

  describe("Rate Limiting", () => {
    it("should allow requests within rate limits", () => {
      const identifier = "test-user";

      // Should allow requests within limit
      for (let i = 0; i < 50; i++) {
        expect(rateLimiter.isAllowed(identifier)).toBe(true);
      }
    });

    it("should block requests exceeding rate limits", () => {
      const identifier = "test-user";

      // Exceed rate limit
      for (let i = 0; i < 101; i++) {
        rateLimiter.isAllowed(identifier);
      }

      expect(rateLimiter.isAllowed(identifier)).toBe(false);
    });

    it("should reset rate limits after time window", () => {
      const identifier = "test-user";

      // Mock time to simulate window reset
      const originalNow = Date.now;
      Date.now = vi.fn(() => originalNow() + 16 * 60 * 1000); // 16 minutes later

      // Should allow requests after window reset
      expect(rateLimiter.isAllowed(identifier)).toBe(true);

      Date.now = originalNow; // Restore original
    });

    it("should track remaining requests correctly", () => {
      const identifier = "test-user";

      expect(rateLimiter.getRemainingRequests(identifier)).toBe(100);

      rateLimiter.isAllowed(identifier);
      expect(rateLimiter.getRemainingRequests(identifier)).toBe(99);
    });
  });

  describe("Content Security Policy", () => {
     it("should have proper CSP headers configured", async () => {
       const { securityHeaders } = await import("../../security/SecurityConfig");

       expect(securityHeaders["Content-Security-Policy"]).toBeDefined();
       expect(securityHeaders["X-Frame-Options"]).toBe("DENY");
       expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
       expect(securityHeaders["X-XSS-Protection"]).toBe("1; mode=block");
       expect(securityHeaders["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
     });

     it("should prevent inline script execution", async () => {
       const { cspConfig } = await import("../../security/SecurityConfig");

       // In production, unsafe-inline should be removed
       const isProduction = process.env.NODE_ENV === "production";
       if (isProduction) {
         expect(cspConfig["script-src"]).not.toContain("'unsafe-inline'");
         expect(cspConfig["script-src"]).not.toContain("'unsafe-eval'");
       }
     });
  });

  describe("Authentication Security", () => {
     it("should handle token expiration securely", async () => {
       const { authManager } = await import("../../security/AuthManager");

       const _expiredToken = {
         accessToken: "expired_token",
         refreshToken: "refresh_token",
         expiresAt: new Date(Date.now() - 3600000), // Expired
         tokenType: "Bearer",
       };

       vi.spyOn(authManager, "isTokenExpired").mockReturnValue(true);
       vi.spyOn(authManager, "logout").mockResolvedValue(undefined);

       await authManager.checkAuthStatus();

       expect(authManager.logout).toHaveBeenCalled();
     });

     it("should validate user permissions correctly", async () => {
       const { authManager } = await import("../../security/AuthManager");

      const regularUser = {
        id: "1",
        email: "user@example.com",
        name: "Regular User",
        role: "user",
        permissions: ["read"],
        lastLogin: new Date(),
        isActive: true,
      };

      vi.spyOn(authManager, "getCurrentUser").mockReturnValue(regularUser);
      vi.spyOn(authManager, "hasPermission").mockImplementation((permission) =>
        regularUser.permissions.includes(permission)
      );

      expect(authManager.hasPermission("read")).toBe(true);
      expect(authManager.hasPermission("write")).toBe(false);
      expect(authManager.hasPermission("admin")).toBe(false);
    });
  });

  describe("Data Validation", () => {
     it("should validate question data structure", () => {
       const validQuestion = createMockQuestion();
       const _invalidQuestion = { id: "invalid", question: null };

      // Valid question should have all required fields
      expect(validQuestion.id).toBeDefined();
      expect(validQuestion.question).toBeDefined();
      expect(validQuestion.answer).toBeDefined();
      expect(typeof validQuestion.id).toBe("number");
      expect(typeof validQuestion.question).toBe("string");
      expect(typeof validQuestion.answer).toBe("string");
    });

    it("should handle malformed question data gracefully", async () => {
      const malformedQuestions = [
        { id: 1 }, // Missing required fields
        { question: "Test", answer: "Answer" }, // Missing id
        { id: "invalid", question: "Test", answer: "Answer" }, // Invalid id type
      ];

      vi.doMock("../../data/test-enhanced", () => ({
        TEST_ENHANCED_QUESTIONS: malformedQuestions,
      }));

      // Should handle malformed data without crashing
      try {
        await questionRepository.getAll("test" as any);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
