/**
 * Interactive Quiz Service - Handles interactive quiz logic
 */

import type {
  InteractiveQuizQuestion,
  InteractiveQuizSession,
  InteractiveQuizResult,
} from "../types/interactive-quiz";
import { loadInteractiveQuizData } from "../data/lazyLoaders";

export class InteractiveQuizService {
  private static readonly STORAGE_KEY = "interactive_quiz_sessions";

  /**
   * Create a new interactive quiz session
   */
  static createSession(questions: InteractiveQuizQuestion[]): InteractiveQuizSession {
    return {
      id: this.generateSessionId(),
      questions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: new Date(),
      isCompleted: false,
    };
  }

  /**
   * Submit an answer for a question
   */
  static submitAnswer(
    session: InteractiveQuizSession,
    questionId: string,
    answer: string | string[]
  ): InteractiveQuizSession {
    return {
      ...session,
      answers: {
        ...session.answers,
        [questionId]: answer,
      },
    };
  }

  /**
   * Move to next question
   */
  static nextQuestion(session: InteractiveQuizSession): InteractiveQuizSession {
    const { currentQuestionIndex, questions } = session;
    return {
      ...session,
      currentQuestionIndex: Math.min(currentQuestionIndex + 1, questions.length - 1),
    };
  }

  /**
   * Move to previous question
   */
  static previousQuestion(session: InteractiveQuizSession): InteractiveQuizSession {
    const { currentQuestionIndex } = session;
    return {
      ...session,
      currentQuestionIndex: Math.max(currentQuestionIndex - 1, 0),
    };
  }

  /**
   * Complete the quiz and calculate results
   */
  static completeQuiz(session: InteractiveQuizSession): InteractiveQuizResult {
    const endTime = new Date();
    const { startTime } = session;
    const _timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const completedSession: InteractiveQuizSession = {
      ...session,
      endTime,
      isCompleted: true,
    };

    try {
      const result = this.calculateResults(completedSession);

      // Save session
      this.saveSession(completedSession);

      return result;
    } catch (error) {
      console.error("Error in calculateResults:", error);
      throw error;
    }
  }

  /**
   * Calculate quiz results
   */
  private static calculateResults(session: InteractiveQuizSession): InteractiveQuizResult {
    let score = 0;
    let totalPoints = 0;
    let correctAnswers = 0;
    const { questions } = session;

    const breakdown = {
      multipleChoice: { correct: 0, total: 0, percentage: 0 },
      fillBlank: { correct: 0, total: 0, percentage: 0 },
      multipleCheckbox: { correct: 0, total: 0, percentage: 0 },
      trueFalse: { correct: 0, total: 0, percentage: 0 },
    };

    questions.forEach((question) => {
      totalPoints += question.points;

      // Map question type to breakdown key
      const typeMapping: Record<string, keyof typeof breakdown> = {
        "multiple-choice": "multipleChoice",
        "fill-blank": "fillBlank",
        "multiple-checkbox": "multipleCheckbox",
        "true-false": "trueFalse",
      };
      const breakdownKey = typeMapping[question.type];
      if (breakdownKey && breakdown[breakdownKey]) {
        breakdown[breakdownKey].total++;
      }

      const userAnswer = session.answers[question.id];
      if (!userAnswer) return;

      let isCorrect = false;

      switch (question.type) {
        case "multiple-choice": {
          const selectedOption = question.options?.find((opt) => opt.id === userAnswer);
          isCorrect = selectedOption?.isCorrect || false;
          break;
        }

        case "fill-blank": {
          isCorrect =
            userAnswer.toString().toLowerCase().trim() ===
            question.correctAnswer?.toLowerCase().trim();
          break;
        }

        case "multiple-checkbox": {
          const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
          const correctAnswersArr = question.correctAnswers || [];
          isCorrect =
            userAnswers.length === correctAnswersArr.length &&
            userAnswers.every((answer) => correctAnswersArr.includes(answer));
          break;
        }

        case "true-false":
          isCorrect = userAnswer.toString().toLowerCase() === question.correctAnswer?.toLowerCase();
          break;
      }

      if (isCorrect) {
        score += question.points;
        correctAnswers++;
        // Update breakdown for correct answers
        const breakdownKey = typeMapping[question.type];
        if (breakdownKey && breakdown[breakdownKey]) {
          breakdown[breakdownKey].correct++;
        }
      }
    });

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

    // Calculate percentages for each question type
    Object.keys(breakdown).forEach((key) => {
      const type = key as keyof typeof breakdown;
      if (breakdown[type].total > 0) {
        breakdown[type].percentage = Math.round(
          (breakdown[type].correct / breakdown[type].total) * 100
        );
      }
    });

    const recommendations = this.generateRecommendations(percentage, breakdown);

    // Calculate time spent if endTime is available
    const { endTime, startTime } = session;
    const timeSpent = endTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

    return {
      session,
      score,
      totalPoints,
      percentage,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent,
      breakdown,
      recommendations,
    };
  }

  /**
   * Generate recommendations based on performance
   */
  private static generateRecommendations(
    percentage: number,
    breakdown: Record<string, { correct: number; total: number; percentage: number }>
  ): string[] {
    const recommendations: string[] = [];

    if (percentage >= 90) {
      recommendations.push(
        "Excellent performance! You have a strong understanding of the concepts."
      );
      recommendations.push("Consider exploring more advanced topics or helping others learn.");
    } else if (percentage >= 75) {
      recommendations.push("Good job! Focus on the areas where you missed questions.");
      recommendations.push(
        "Review the explanations for incorrect answers to strengthen your knowledge."
      );
    } else if (percentage >= 60) {
      recommendations.push("Keep practicing! Focus on understanding the fundamentals.");
      recommendations.push("Consider taking the quiz again after reviewing the material.");
    } else {
      recommendations.push(
        "Don't worry! Learning takes time. Focus on understanding the basics first."
      );
      recommendations.push("Review the study materials and try the quiz again.");
    }

    // Add specific recommendations based on question type performance
    if (breakdown.fillBlank.correct < breakdown.fillBlank.total * 0.7) {
      recommendations.push(
        "Focus on memorizing key terms and concepts for fill-in-the-blank questions."
      );
    }

    if (breakdown.multipleCheckbox.correct < breakdown.multipleCheckbox.total * 0.7) {
      recommendations.push("Practice identifying multiple correct answers in complex scenarios.");
    }

    return recommendations;
  }

  /**
   * Get recent quiz sessions
   */
  static getRecentSessions(limit: number = 10): InteractiveQuizSession[] {
    const sessions = this.getAllSessions();
    return sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()).slice(0, limit);
  }

  /**
   * Utility methods
   */
  private static generateSessionId(): string {
    return `interactive_quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static saveSession(session: InteractiveQuizSession): void {
    const sessions = this.getAllSessions();
    sessions.push(session);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  }

  private static getAllSessions(): InteractiveQuizSession[] {
    const sessions = localStorage.getItem(this.STORAGE_KEY);
    if (!sessions) return [];

    return JSON.parse(sessions).map((s: Record<string, unknown>) => ({
      ...s,
      startTime: new Date(s.startTime as string),
      endTime: s.endTime ? new Date(s.endTime as string) : undefined,
    }));
  }

  /**
   * Lazy load interactive quiz data
   * This reduces initial bundle size by loading data only when needed
   */
  static async loadQuizData(): Promise<Record<string, Record<string, InteractiveQuizQuestion[]>>> {
    try {
      const data = await loadInteractiveQuizData();

      // Transform the data to match expected format
      return {
        angular: data,
      };
    } catch (error) {
      console.error("Failed to load interactive quiz data:", error);
      throw error;
    }
  }

  /**
   * Preload quiz data for better UX
   */
  static async preloadQuizData(): Promise<void> {
    try {
      await this.loadQuizData();
    } catch (error) {
      console.warn("Failed to preload interactive quiz data:", error);
    }
  }
}
