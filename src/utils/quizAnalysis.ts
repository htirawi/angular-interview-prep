/**
 * Utility functions for Quiz Analysis
 */

import type { AnswerAnalysis } from "../types/quiz-results";
import type { InteractiveQuizQuestion } from "../types/interactive-quiz";

/**
 * Analyze user answers and create detailed feedback
 */
export function analyzeAnswers(
  questions: InteractiveQuizQuestion[],
  answers: Record<string, string | string[]>
): AnswerAnalysis[] {
  return questions.map((question) => {
    const userAnswer = answers[question.id];
    let isCorrect = false;
    let correctAnswer: string | string[] = "";

    switch (question.type) {
      case "multiple-choice":
        const selectedOption = question.options?.find((opt) => opt.id === userAnswer);
        isCorrect = selectedOption?.isCorrect || false;
        correctAnswer = question.options?.find((opt) => opt.isCorrect)?.text || "";
        break;

      case "fill-blank":
        isCorrect =
          userAnswer?.toString().toLowerCase().trim() ===
          question.correctAnswer?.toLowerCase().trim();
        correctAnswer = question.correctAnswer || "";
        break;

      case "multiple-checkbox":
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        const correctAnswers = question.correctAnswers || [];
        isCorrect =
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((answer) => correctAnswers.includes(answer));
        correctAnswer =
          question.options
            ?.filter((opt) => correctAnswers.includes(opt.id))
            .map((opt) => opt.text) || [];
        break;

      case "true-false":
        isCorrect = userAnswer?.toString().toLowerCase() === question.correctAnswer?.toLowerCase();
        correctAnswer = question.correctAnswer || "";
        break;
    }

    return {
      question,
      userAnswer: userAnswer || "No answer provided",
      isCorrect,
      correctAnswer,
      explanation: question.explanation || "No explanation available",
    };
  });
}

/**
 * Get performance message based on percentage
 */
export function getPerformanceMessage(percentage: number): { message: string; color: string } {
  if (percentage >= 90) return { message: "Outstanding! 🌟", color: "text-green-600" };
  if (percentage >= 75) return { message: "Great job! 🎉", color: "text-blue-600" };
  if (percentage >= 60) return { message: "Good effort! 👍", color: "text-yellow-600" };
  return { message: "Keep learning! 🪴", color: "text-red-600" };
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Calculate accuracy rate
 */
export function calculateAccuracyRate(correctAnswers: number, totalQuestions: number): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

/**
 * Calculate average time per question
 */
export function calculateAverageTimePerQuestion(timeSpent: number, totalQuestions: number): number {
  return Math.round(timeSpent / totalQuestions);
}
