/**
 * Types for Interactive Quiz Components
 */

import type { InteractiveQuizQuestion } from "./interactive-quiz";

export interface InteractiveQuizQuestionCardProps {
  question: InteractiveQuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  userAnswer?: string | string[];
  onAnswerSubmit: (questionId: string, answer: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  canComplete: boolean;
  onComplete: () => void;
}

export interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  question: InteractiveQuizQuestion;
}

export interface QuestionContentProps {
  question: InteractiveQuizQuestion;
  userAnswer: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
}

export interface QuestionNavigationProps {
  questionNumber: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  canComplete: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}
