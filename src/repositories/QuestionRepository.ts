/**
 * Repository Pattern for Question Data Management
 * Provides abstraction layer for question data operations
 */

import type { Question, QA } from "../types";
import type { FrameworkId } from "../types/framework";

export interface QuestionRepository {
  getAll(framework: FrameworkId): Promise<QA[]>;
  getById(framework: FrameworkId, id: number): Promise<QA | null>;
  search(framework: FrameworkId, query: string): Promise<QA[]>;
  getByCategory(framework: FrameworkId, category: string): Promise<QA[]>;
  getByDifficulty(framework: FrameworkId, difficulty: string): Promise<QA[]>;
  getRandom(framework: FrameworkId, count: number): Promise<QA[]>;
}

export class LocalQuestionRepository implements QuestionRepository {
  private cache = new Map<FrameworkId, QA[]>();

  async getAll(framework: FrameworkId): Promise<QA[]> {
    if (this.cache.has(framework)) {
      return this.cache.get(framework)!;
    }

    try {
      const module = await this.loadFrameworkModule(framework);
      const questions = module.default || module[`${framework.toUpperCase()}_ENHANCED_QUESTIONS`];

      if (!questions) {
        throw new Error(`No questions found for framework: ${framework}`);
      }

      this.cache.set(framework, questions);
      return questions;
    } catch (error) {
      console.error(`Failed to load questions for ${framework}:`, error);
      throw new Error(`Failed to load questions for ${framework}`);
    }
  }

  async getById(framework: FrameworkId, id: number): Promise<QA | null> {
    const questions = await this.getAll(framework);
    return questions.find((q) => q.id === id) || null;
  }

  async search(framework: FrameworkId, query: string): Promise<QA[]> {
    const questions = await this.getAll(framework);
    const searchTerm = query.toLowerCase();

    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm) ||
        q.answer.toLowerCase().includes(searchTerm) ||
        q.category?.toLowerCase().includes(searchTerm) ||
        q.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getByCategory(framework: FrameworkId, category: string): Promise<QA[]> {
    const questions = await this.getAll(framework);
    return questions.filter((q) => q.category === category);
  }

  async getByDifficulty(framework: FrameworkId, difficulty: string): Promise<QA[]> {
    const questions = await this.getAll(framework);
    return questions.filter((q) => q.difficulty === difficulty);
  }

  async getRandom(framework: FrameworkId, count: number): Promise<QA[]> {
    const questions = await this.getAll(framework);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  private async loadFrameworkModule(framework: FrameworkId) {
    switch (framework) {
      case "angular":
        return import("../data/angular-enhanced");
      case "react":
        return import("../data/react-enhanced");
      case "nextjs":
        return import("../data/nextjs-enhanced");
      case "redux":
        return import("../data/redux");
      case "random":
        return import("../data/random-enhanced");
      default:
        throw new Error(`Unknown framework: ${framework}`);
    }
  }

  // Cache management
  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const questionRepository = new LocalQuestionRepository();
