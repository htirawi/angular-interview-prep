/**
 * Core question types for all frameworks
 */

export interface Question {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: DifficultyLevel;
  tags?: string[];
}

// Alias for backward compatibility
export type QA = Question;

export type DifficultyLevel = "intermediate" | "advanced" | "expert";

export type QuestionCategory =
  | "Architecture"
  | "Reactive Programming"
  | "Change Detection"
  | "Forms"
  | "HTTP & API"
  | "Routing"
  | "State Management"
  | "Testing"
  | "Performance"
  | "Security & Auth"
  | "Real-time"
  | "SSR & Hydration"
  | "Accessibility"
  | "Components"
  | "Dependency Injection";

export interface EnrichedQuestion extends Question {
  category: string;
  difficulty: DifficultyLevel;
  tags: string[];
}
