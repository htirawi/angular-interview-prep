/**
 * Quiz system types for comprehensive testing
 */

import type { Question, DifficultyLevel } from "./question";

export type QuizLevel = "junior" | "intermediate" | "senior";

export type QuizMode = "practice" | "quiz";

export interface QuizQuestion extends Question {
  selectedAnswer?: string;
  isCorrect?: boolean;
  timeSpent?: number; // in seconds
}

export interface QuizSession {
  id: string;
  mode: QuizMode;
  level: QuizLevel;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  totalTime?: number; // in seconds
  score?: QuizScore;
  isCompleted: boolean;
}

export interface QuizScore {
  correct: number;
  total: number;
  percentage: number;
  level: QuizLevel;
  timeSpent: number;
  averageTimePerQuestion: number;
  breakdown: {
    junior: number;
    intermediate: number;
    senior: number;
  };
}

export interface QuizConfig {
  level: QuizLevel;
  mode: QuizMode;
  questionCount: number;
  timeLimit?: number; // in minutes, optional
  allowSkip: boolean;
  showHints: boolean;
  shuffleQuestions: boolean;
}

export interface QuizResult {
  session: QuizSession;
  score: QuizScore;
  recommendations: string[];
  nextLevel?: QuizLevel;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  levelProgress: {
    junior: LevelProgress;
    intermediate: LevelProgress;
    senior: LevelProgress;
  };
  recentSessions: QuizSession[];
}

export interface LevelProgress {
  quizzesCompleted: number;
  averageScore: number;
  bestScore: number;
  unlocked: boolean;
}

// Difficulty mapping for quiz levels
export const DIFFICULTY_MAPPING: Record<QuizLevel, DifficultyLevel[]> = {
  junior: ["intermediate"], // Junior level uses intermediate questions
  intermediate: ["intermediate", "advanced"], // Mix of intermediate and advanced
  senior: ["advanced", "expert"], // Senior level uses advanced and expert questions
};

// Question count per level
export const QUESTIONS_PER_LEVEL = {
  junior: 30,
  intermediate: 40,
  senior: 50,
} as const;

// Scoring weights
export const SCORING_WEIGHTS = {
  junior: 1,
  intermediate: 1.2,
  senior: 1.5,
} as const;
