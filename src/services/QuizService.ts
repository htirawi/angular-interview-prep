/**
 * Quiz Service - Handles quiz logic, scoring, and session management
 */

import {
  QuizLevel,
  QuizQuestion,
  QuizSession,
  QuizScore,
  QuizConfig,
  QuizResult,
  QuizStats,
  Achievement,
  DIFFICULTY_MAPPING,
  QUESTIONS_PER_LEVEL,
} from "@/types/quiz";
import type { EnrichedQuestion } from "../types/question";

export class QuizService {
  private static readonly STORAGE_KEY = "quiz_sessions";
  private static readonly STATS_KEY = "quiz_stats";

  /**
   * Generate quiz questions based on level and available questions
   */
  static generateQuizQuestions(
    level: QuizLevel,
    allQuestions: EnrichedQuestion[],
    count: number = QUESTIONS_PER_LEVEL[level]
  ): QuizQuestion[] {
    const allowedDifficulties = DIFFICULTY_MAPPING[level];

    // Filter questions by difficulty level
    const filteredQuestions = allQuestions.filter((q) =>
      allowedDifficulties.includes(q.difficulty)
    );

    // Shuffle and take the required count
    const shuffled = this.shuffleArray([...filteredQuestions]);
    const selectedQuestions = shuffled.slice(0, count);

    // Convert to quiz questions
    return selectedQuestions.map((q) => ({
      ...q,
      selectedAnswer: undefined,
      isCorrect: undefined,
      timeSpent: 0,
    }));
  }

  /**
   * Create a new quiz session
   */
  static createQuizSession(config: QuizConfig, questions: QuizQuestion[]): QuizSession {
    return {
      id: this.generateSessionId(),
      mode: config.mode,
      level: config.level,
      questions,
      currentQuestionIndex: 0,
      startTime: new Date(),
      isCompleted: false,
    };
  }

  /**
   * Submit an answer for the current question
   */
  static submitAnswer(
    session: QuizSession,
    questionIndex: number,
    answer: string,
    timeSpent: number
  ): QuizSession {
    const updatedQuestions = [...session.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      selectedAnswer: answer,
      timeSpent,
    };

    return {
      ...session,
      questions: updatedQuestions,
    };
  }

  /**
   * Move to next question
   */
  static nextQuestion(session: QuizSession): QuizSession {
    const { currentQuestionIndex, questions } = session;
    return {
      ...session,
      currentQuestionIndex: Math.min(currentQuestionIndex + 1, questions.length - 1),
    };
  }

  /**
   * Move to previous question
   */
  static previousQuestion(session: QuizSession): QuizSession {
    const { currentQuestionIndex } = session;
    return {
      ...session,
      currentQuestionIndex: Math.max(currentQuestionIndex - 1, 0),
    };
  }

  /**
   * Complete the quiz and calculate score
   */
  static completeQuiz(session: QuizSession): QuizResult {
    const endTime = new Date();
    const { startTime } = session;
    const totalTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const completedSession: QuizSession = {
      ...session,
      endTime,
      totalTime,
      isCompleted: true,
    };

    const score = this.calculateScore(completedSession);
    const recommendations = this.generateRecommendations(score);
    const achievements = this.checkAchievements(completedSession, score);

    // Save session and update stats
    this.saveSession(completedSession);
    this.updateStats(completedSession, score);

    return {
      session: completedSession,
      score,
      recommendations,
      achievements,
    };
  }

  /**
   * Calculate quiz score
   */
  private static calculateScore(session: QuizSession): QuizScore {
    let correct = 0;
    let totalTimeSpent = 0;
    const breakdown = { junior: 0, intermediate: 0, senior: 0 };
    const { questions } = session;

    questions.forEach((question) => {
      totalTimeSpent += question.timeSpent || 0;

      // For now, we'll mark all answered questions as correct
      // In a real implementation, you'd compare with correct answers
      if (question.selectedAnswer) {
        correct++;
      }

      // Count by difficulty for breakdown
      if (question.difficulty === "intermediate") {
        breakdown.intermediate++;
      } else if (question.difficulty === "advanced") {
        breakdown.senior++;
      } else if (question.difficulty === "expert") {
        breakdown.senior++;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const averageTimePerQuestion = Math.round(totalTimeSpent / questions.length);

    return {
      correct,
      total: questions.length,
      percentage,
      level: session.level,
      timeSpent: totalTimeSpent,
      averageTimePerQuestion,
      breakdown,
    };
  }

  /**
   * Generate recommendations based on performance
   */
  private static generateRecommendations(score: QuizScore): string[] {
    const recommendations: string[] = [];

    if (score.percentage >= 90) {
      recommendations.push("Excellent performance! You're ready for senior-level challenges.");
      recommendations.push("Consider mentoring others or contributing to open-source projects.");
    } else if (score.percentage >= 75) {
      recommendations.push("Great job! Focus on the areas where you missed questions.");
      recommendations.push("Practice more advanced concepts to reach the next level.");
    } else if (score.percentage >= 60) {
      recommendations.push("Good progress! Review the fundamentals and practice regularly.");
      recommendations.push("Consider taking practice quizzes more frequently.");
    } else {
      recommendations.push("Keep practicing! Focus on understanding core concepts first.");
      recommendations.push("Try the practice mode to learn without pressure.");
    }

    return recommendations;
  }

  /**
   * Check for achievements
   */
  private static checkAchievements(session: QuizSession, score: QuizScore): Achievement[] {
    const achievements: Achievement[] = [];

    // First quiz achievement
    if (session.mode === "quiz") {
      achievements.push({
        id: "first_quiz",
        title: "First Quiz Complete",
        description: "Completed your first quiz!",
        icon: "🎯",
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    // Perfect score achievement
    if (score.percentage === 100) {
      achievements.push({
        id: "perfect_score",
        title: "Perfect Score",
        description: "Got 100% on a quiz!",
        icon: "🏆",
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    // Speed achievement
    if (score.averageTimePerQuestion < 30) {
      achievements.push({
        id: "speed_demon",
        title: "Speed Demon",
        description: "Answered questions quickly!",
        icon: "⚡",
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    return achievements;
  }

  /**
   * Get quiz statistics
   */
  static getQuizStats(): QuizStats {
    const stats = localStorage.getItem(this.STATS_KEY);
    if (!stats) {
      return this.getDefaultStats();
    }

    return JSON.parse(stats);
  }

  /**
   * Get recent quiz sessions
   */
  static getRecentSessions(limit: number = 10): QuizSession[] {
    const sessions = this.getAllSessions();
    return sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()).slice(0, limit);
  }

  /**
   * Utility methods
   */
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private static generateSessionId(): string {
    return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static saveSession(session: QuizSession): void {
    const sessions = this.getAllSessions();
    sessions.push(session);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  }

  private static getAllSessions(): QuizSession[] {
    const sessions = localStorage.getItem(this.STORAGE_KEY);
    if (!sessions) return [];

    return JSON.parse(sessions).map((s: Record<string, unknown>) => ({
      ...s,
      startTime: new Date(s.startTime as string),
      endTime: s.endTime ? new Date(s.endTime as string) : undefined,
    }));
  }

  private static updateStats(session: QuizSession, score: QuizScore): void {
    const stats = this.getQuizStats();

    stats.totalQuizzes++;
    stats.averageScore = Math.round(
      (stats.averageScore * (stats.totalQuizzes - 1) + score.percentage) / stats.totalQuizzes
    );
    stats.bestScore = Math.max(stats.bestScore, score.percentage);
    stats.totalTimeSpent += score.timeSpent;

    // Update level progress
    const levelProgress = stats.levelProgress[session.level];
    levelProgress.quizzesCompleted++;
    levelProgress.averageScore = Math.round(
      (levelProgress.averageScore * (levelProgress.quizzesCompleted - 1) + score.percentage) /
        levelProgress.quizzesCompleted
    );
    levelProgress.bestScore = Math.max(levelProgress.bestScore, score.percentage);
    levelProgress.unlocked = true;

    // Unlock next level if current level is mastered
    if (score.percentage >= 80 && session.level !== "senior") {
      const nextLevel = session.level === "junior" ? "intermediate" : "senior";
      stats.levelProgress[nextLevel].unlocked = true;
    }

    stats.recentSessions = this.getRecentSessions(5);

    localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  private static getDefaultStats(): QuizStats {
    return {
      totalQuizzes: 0,
      averageScore: 0,
      bestScore: 0,
      totalTimeSpent: 0,
      levelProgress: {
        junior: { quizzesCompleted: 0, averageScore: 0, bestScore: 0, unlocked: true },
        intermediate: { quizzesCompleted: 0, averageScore: 0, bestScore: 0, unlocked: false },
        senior: { quizzesCompleted: 0, averageScore: 0, bestScore: 0, unlocked: false },
      },
      recentSessions: [],
    };
  }
}
