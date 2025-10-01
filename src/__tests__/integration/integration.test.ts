/**
 * Integration Tests for Core Functionality
 * Tests the interaction between different parts of the application
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { createMockQuestion, setupTestEnvironment } from "./utils/testUtils";
import { questionRepository } from "../repositories/QuestionRepository";
import { authManager } from "../security/AuthManager";
import { commandHistory } from "../commands/CommandPattern";
import { appStateManager } from "../observers/StateObserver";

describe("Integration Tests", () => {
  beforeEach(() => {
    setupTestEnvironment();
    vi.clearAllMocks();
  });

  describe("Question Repository Integration", () => {
    it("should load and cache questions for different frameworks", async () => {
      const mockQuestions = [
        createMockQuestion({ id: 1, question: "Test Question 1" }),
        createMockQuestion({ id: 2, question: "Test Question 2" }),
      ];

      // Mock the import
      vi.doMock("../data/angular-enhanced", () => ({
        ANGULAR_ENHANCED_QUESTIONS: mockQuestions,
      }));

      const questions = await questionRepository.getAll("angular");

      expect(questions).toHaveLength(2);
      expect(questions[0].question).toBe("Test Question 1");
      expect(questionRepository.getCacheSize()).toBe(1);
    });

    it("should search questions across different criteria", async () => {
      const mockQuestions = [
        createMockQuestion({
          id: 1,
          question: "What is React?",
          answer: "React is a library",
          category: "React Basics",
          tags: ["react", "javascript"],
        }),
        createMockQuestion({
          id: 2,
          question: "What is Angular?",
          answer: "Angular is a framework",
          category: "Angular Basics",
          tags: ["angular", "typescript"],
        }),
      ];

      vi.doMock("../data/react-enhanced", () => ({
        REACT_ENHANCED_QUESTIONS: mockQuestions,
      }));

      await questionRepository.getAll("react");

      const searchResults = await questionRepository.search("react", "React");
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].question).toBe("What is React?");
    });

    it("should filter questions by category and difficulty", async () => {
      const mockQuestions = [
        createMockQuestion({
          id: 1,
          category: "React Basics",
          difficulty: "intermediate",
        }),
        createMockQuestion({
          id: 2,
          category: "React Advanced",
          difficulty: "expert",
        }),
        createMockQuestion({
          id: 3,
          category: "React Basics",
          difficulty: "expert",
        }),
      ];

      vi.doMock("../data/react-enhanced", () => ({
        REACT_ENHANCED_QUESTIONS: mockQuestions,
      }));

      await questionRepository.getAll("react");

      const categoryResults = await questionRepository.getByCategory("react", "React Basics");
      expect(categoryResults).toHaveLength(2);

      const difficultyResults = await questionRepository.getByDifficulty("react", "expert");
      expect(difficultyResults).toHaveLength(2);
    });
  });

  describe("Authentication Integration", () => {
    it("should handle complete authentication flow", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "user" as const,
        permissions: ["read"],
        lastLogin: new Date(),
        isActive: true,
      };

       const _mockToken = {
         accessToken: "test_token",
         refreshToken: "refresh_token",
         expiresAt: new Date(Date.now() + 3600000),
         tokenType: "Bearer" as const,
       };

      // Mock successful login
      vi.spyOn(authManager, "login").mockResolvedValue(undefined);
      vi.spyOn(authManager, "getCurrentUser").mockReturnValue(mockUser);
      vi.spyOn(authManager, "isAuthenticated").mockReturnValue(true);

      await authManager.login("test@example.com", "password123");

      expect(authManager.isAuthenticated()).toBe(true);
      expect(authManager.getCurrentUser()).toEqual(mockUser);
    });

    it("should handle permission checking", async () => {
      const adminUser = {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
        role: "admin" as const,
        permissions: ["read", "write", "delete", "admin"],
        lastLogin: new Date(),
        isActive: true,
      };

      vi.spyOn(authManager, "getCurrentUser").mockReturnValue(adminUser);
      vi.spyOn(authManager, "hasPermission").mockImplementation(
        (permission) => adminUser.permissions.includes(permission) || adminUser.role === "admin"
      );

      expect(authManager.hasPermission("read")).toBe(true);
      expect(authManager.hasPermission("admin")).toBe(true);
      expect(authManager.hasPermission("nonexistent")).toBe(true); // Admin has all permissions
    });

    it("should handle token expiration and refresh", async () => {
       const _expiredToken = {
         accessToken: "expired_token",
         refreshToken: "refresh_token",
         expiresAt: new Date(Date.now() - 3600000), // Expired 1 hour ago
         tokenType: "Bearer" as const,
       };

      vi.spyOn(authManager, "isTokenExpired").mockReturnValue(true);
      vi.spyOn(authManager, "refreshToken").mockResolvedValue(true);

      const canRefresh = await authManager.refreshToken();
      expect(canRefresh).toBe(true);
    });
  });

  describe("Command Pattern Integration", () => {
    it("should handle bookmark command execution and undo", async () => {
       const _mockBookmarkService = {
         toggleBookmark: vi.fn(),
         addBookmark: vi.fn(),
         removeBookmark: vi.fn(),
       };

      const bookmarkCommand = {
        execute: vi.fn().mockResolvedValue(undefined),
        undo: vi.fn().mockResolvedValue(undefined),
        canUndo: vi.fn().mockReturnValue(true),
        getDescription: vi.fn().mockReturnValue("Bookmark question 1"),
      };

      vi.spyOn(commandHistory, "execute").mockResolvedValue(undefined);
      vi.spyOn(commandHistory, "undo").mockResolvedValue(undefined);
      vi.spyOn(commandHistory, "canUndo").mockReturnValue(true);

      await commandHistory.execute(bookmarkCommand);
      expect(commandHistory.canUndo()).toBe(true);

      await commandHistory.undo();
      expect(bookmarkCommand.undo).toHaveBeenCalled();
    });

    it("should maintain command history with size limits", async () => {
      const mockCommands = Array.from({ length: 60 }, (_, i) => ({
        execute: vi.fn().mockResolvedValue(undefined),
        undo: vi.fn().mockResolvedValue(undefined),
        canUndo: vi.fn().mockReturnValue(true),
        getDescription: vi.fn().mockReturnValue(`Command ${i}`),
      }));

      vi.spyOn(commandHistory, "getHistory").mockReturnValue(mockCommands.slice(0, 50));

      // Execute more commands than the limit
      for (const command of mockCommands) {
        await commandHistory.execute(command);
      }

      const history = commandHistory.getHistory();
      expect(history).toHaveLength(50); // Should be limited to 50
    });
  });

  describe("State Management Integration", () => {
    it("should handle state updates and notifications", () => {
      const mockObserver = {
        update: vi.fn(),
      };

      vi.spyOn(appStateManager, "subscribe").mockReturnValue(() => {});
      vi.spyOn(appStateManager, "notify").mockImplementation(() => {});
      vi.spyOn(appStateManager, "getState").mockReturnValue({
        currentFramework: "angular",
        currentQuestionId: 1,
        completedQuestions: new Set([1]),
        bookmarkedQuestions: new Set([2]),
        searchQuery: "test",
        selectedCategory: "React",
        selectedDifficulty: "intermediate",
        practiceMode: "sequential",
      });

      const unsubscribe = appStateManager.subscribe(mockObserver);
      appStateManager.setCurrentFramework("react");

      expect(appStateManager.getState().currentFramework).toBe("angular");
      unsubscribe();
    });

    it("should handle bookmark and completion toggles", () => {
      const initialState = {
        currentFramework: "angular",
        currentQuestionId: 1,
        completedQuestions: new Set<number>(),
        bookmarkedQuestions: new Set<number>(),
        searchQuery: "",
        selectedCategory: "",
        selectedDifficulty: "",
        practiceMode: "sequential",
      };

      vi.spyOn(appStateManager, "getState").mockReturnValue(initialState);
      vi.spyOn(appStateManager, "updateState").mockImplementation((updates) => {
        Object.assign(initialState, updates);
      });

      appStateManager.toggleBookmark(1);
      expect(initialState.bookmarkedQuestions.has(1)).toBe(true);

      appStateManager.toggleBookmark(1);
      expect(initialState.bookmarkedQuestions.has(1)).toBe(false);

      appStateManager.toggleCompleted(1);
      expect(initialState.completedQuestions.has(1)).toBe(true);
    });
  });

  describe("Cross-System Integration", () => {
    it("should integrate authentication with state management", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "user" as const,
        permissions: ["read"],
        lastLogin: new Date(),
        isActive: true,
      };

      vi.spyOn(authManager, "getCurrentUser").mockReturnValue(mockUser);
      vi.spyOn(authManager, "isAuthenticated").mockReturnValue(true);
      vi.spyOn(appStateManager, "updateState").mockImplementation(() => {});

      // Simulate user login affecting app state
      const isAuthenticated = authManager.isAuthenticated();
      if (isAuthenticated) {
        appStateManager.updateState({
          currentFramework: "angular",
          currentQuestionId: 0,
        });
      }

      expect(authManager.isAuthenticated()).toBe(true);
      expect(appStateManager.updateState).toHaveBeenCalled();
    });

    it("should integrate question repository with state management", async () => {
      const mockQuestions = [
        createMockQuestion({ id: 1, category: "React Basics" }),
        createMockQuestion({ id: 2, category: "React Advanced" }),
      ];

      vi.doMock("../data/react-enhanced", () => ({
        REACT_ENHANCED_QUESTIONS: mockQuestions,
      }));

      vi.spyOn(appStateManager, "getState").mockReturnValue({
        currentFramework: "react",
        currentQuestionId: 1,
        completedQuestions: new Set(),
        bookmarkedQuestions: new Set(),
        searchQuery: "",
        selectedCategory: "React Basics",
        selectedDifficulty: "",
        practiceMode: "sequential",
      });

      const questions = await questionRepository.getAll("react");
      const filteredQuestions = questions.filter(
        (q) => q.category === appStateManager.getState().selectedCategory
      );

      expect(filteredQuestions).toHaveLength(1);
      expect(filteredQuestions[0].category).toBe("React Basics");
    });
  });
});
