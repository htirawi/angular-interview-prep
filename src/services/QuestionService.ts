import type { Question, PracticeMode } from "../types";
import { questionRepository } from "../repositories/QuestionRepository";
import type { FrameworkId } from "../types/framework";
import { loadFrameworkData, loadBasicQuestions } from "../data/lazyLoaders";

/**
 * Enhanced Question Service with Repository Pattern
 * Centralizes question filtering, searching, and navigation logic
 */
export class QuestionService {
  /**
   * Filter questions based on multiple criteria
   */
  static filterQuestions(
    questions: Question[],
    filters: {
      searchQuery?: string;
      category?: string;
      difficulty?: string;
      mode?: PracticeMode;
      bookmarks?: Set<number>;
    }
  ): Question[] {
    let filtered = questions;

    // Filter by practice mode
    if (filters.mode === "bookmarked" && filters.bookmarks) {
      filtered = filtered.filter((q) => (filters.bookmarks || new Set()).has(q.id));
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.category?.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((q) => q.category === filters.category);
    }

    // Filter by difficulty
    if (filters.difficulty) {
      filtered = filtered.filter((q) => q.difficulty === filters.difficulty);
    }

    return filtered;
  }

  /**
   * Get questions using repository pattern
   */
  static async getQuestions(framework: FrameworkId): Promise<Question[]> {
    return await questionRepository.getAll(framework);
  }

  /**
   * Search questions using repository pattern
   */
  static async searchQuestions(framework: FrameworkId, query: string): Promise<Question[]> {
    return await questionRepository.search(framework, query);
  }

  /**
   * Get questions by category using repository pattern
   */
  static async getQuestionsByCategory(
    framework: FrameworkId,
    category: string
  ): Promise<Question[]> {
    return await questionRepository.getByCategory(framework, category);
  }

  /**
   * Get questions by difficulty using repository pattern
   */
  static async getQuestionsByDifficulty(
    framework: FrameworkId,
    difficulty: string
  ): Promise<Question[]> {
    return await questionRepository.getByDifficulty(framework, difficulty);
  }

  /**
   * Get random questions using repository pattern
   */
  static async getRandomQuestions(framework: FrameworkId, count: number): Promise<Question[]> {
    return await questionRepository.getRandom(framework, count);
  }

  /**
   * Generate random order for questions
   */
  static generateRandomOrder(questionCount: number): number[] {
    const indices = Array.from({ length: questionCount }, (_, i) => i);
    return indices.sort(() => Math.random() - 0.5);
  }

  /**
   * Apply random order to filtered questions
   */
  static applyRandomOrder(questions: Question[], randomOrder: number[]): Question[] {
    return randomOrder.map((i) => questions[i]).filter(Boolean);
  }

  /**
   * Get unique categories from questions
   */
  static getCategories(questions: Question[]): string[] {
    const categories = new Set(questions.map((q) => q.category).filter(Boolean) as string[]);
    return Array.from(categories).sort();
  }

  /**
   * Get unique difficulties from questions
   */
  static getDifficulties(questions: Question[]): string[] {
    const difficulties = new Set(questions.map((q) => q.difficulty).filter(Boolean) as string[]);
    return Array.from(difficulties).sort();
  }

  /**
   * Calculate progress percentage
   */
  static calculateProgress(completed: number, total: number): number {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * Get safe index within bounds
   */
  static getSafeIndex(index: number, total: number): number {
    return Math.min(Math.max(0, index), total - 1);
  }

  /**
   * Check if question is bookmarked
   */
  static isBookmarked(questionId: number, bookmarks: Set<number>): boolean {
    return bookmarks.has(questionId);
  }

  /**
   * Check if question is completed
   */
  static isCompleted(questionId: number, completed: Set<number>): boolean {
    return completed.has(questionId);
  }

  /**
   * Clear repository cache
   */
  static clearCache(): void {
    questionRepository.clearCache();
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): { size: number } {
    return {
      size: questionRepository.getCacheSize(),
    };
  }

  /**
   * Lazy load framework-specific questions
   * This reduces initial bundle size by loading data only when needed
   */
  static async loadFrameworkQuestions(framework: FrameworkId): Promise<Question[]> {
    try {
      console.warn(`Loading questions for framework: ${framework}`);
      const questions = await loadFrameworkData(framework);
      console.warn(`Loaded ${questions.length} questions for ${framework}`);
      return questions as Question[];
    } catch (error) {
      console.error(`Failed to load questions for ${framework}:`, error);
      // Fallback to basic questions if framework-specific loading fails
      const basicQuestions = await loadBasicQuestions();
      return basicQuestions.filter(
        (q: Record<string, unknown>) => q.framework === framework
      ) as Question[];
    }
  }

  /**
   * Preload framework questions for better UX
   */
  static async preloadFrameworkQuestions(framework: FrameworkId): Promise<void> {
    try {
      await this.loadFrameworkQuestions(framework);
    } catch (error) {
      console.warn(`Failed to preload questions for ${framework}:`, error);
    }
  }
}
