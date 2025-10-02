/**
 * Interactive Quiz Types - Support for multiple question types
 */

export type QuestionType = "multiple-choice" | "fill-blank" | "multiple-checkbox" | "true-false";

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface InteractiveQuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: QuizOption[]; // For multiple choice and multiple checkbox
  correctAnswer?: string; // For fill-blank and true-false
  correctAnswers?: string[]; // For multiple checkbox
  explanation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  points: number;
}

export interface InteractiveQuizSession {
  id: string;
  questions: InteractiveQuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>; // questionId -> answer(s)
  startTime: Date;
  endTime?: Date;
  score?: number;
  totalPoints?: number;
  isCompleted: boolean;
}

export interface InteractiveQuizResult {
  session: InteractiveQuizSession;
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  breakdown: {
    multipleChoice: { correct: number; total: number };
    fillBlank: { correct: number; total: number };
    multipleCheckbox: { correct: number; total: number };
    trueFalse: { correct: number; total: number };
  };
  recommendations: string[];
}
