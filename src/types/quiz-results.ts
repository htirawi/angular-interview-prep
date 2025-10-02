/**
 * Types for Quiz Results Components
 */

import type { InteractiveQuizQuestion } from "./interactive-quiz";

export interface AnswerAnalysis {
  question: InteractiveQuizQuestion;
  userAnswer: string | string[];
  isCorrect: boolean;
  correctAnswer: string | string[];
  explanation: string;
}

export interface QuizStats {
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  accuracyRate: number;
  averageTimePerQuestion: number;
}

export interface PerformanceBreakdown {
  [key: string]: {
    correct: number;
    total: number;
    percentage: number;
  };
}

export interface PerformanceMessage {
  message: string;
  color: string;
}

export interface QuizResultsProps {
  result: {
    session: unknown;
    score: number;
    totalPoints: number;
    percentage: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    breakdown: PerformanceBreakdown;
    recommendations: string[];
  };
  onRestart: () => void;
  onBackToSelection: () => void;
}

export interface ScoreDisplayProps {
  animatedScore: number;
  animatedPercentage: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  performance: PerformanceMessage;
}

export interface StatsGridProps {
  timeSpent: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface PerformanceBreakdownProps {
  breakdown: PerformanceBreakdown;
}

export interface AnswerAnalysisProps {
  answerAnalysis: AnswerAnalysis[];
}

export interface RecommendationsProps {
  recommendations: string[];
}

export interface TabNavigationProps {
  selectedTab: "overview" | "analysis";
  onTabChange: (tab: "overview" | "analysis") => void;
}

export interface ActionButtonsProps {
  onRestart: () => void;
  onBackToSelection: () => void;
}
