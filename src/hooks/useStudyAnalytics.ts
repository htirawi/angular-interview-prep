import { useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface StudySession {
  id: string;
  framework: string;
  startTime: number;
  endTime?: number;
  questionsAnswered: number;
  correctAnswers: number;
  bookmarksCreated: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface StudyStats {
  totalSessions: number;
  totalStudyTime: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageAccuracy: number;
  longestStreak: number;
  currentStreak: number;
  lastStudyDate?: number;
  frameworksStudied: Set<string>;
  difficultyStats: {
    Easy: { attempted: number; correct: number };
    Medium: { attempted: number; correct: number };
    Hard: { attempted: number; correct: number };
  };
}

export interface QuestionRating {
  questionId: string;
  rating: number; // 1-5 stars
  timestamp: number;
}

/**
 * Hook for managing study analytics and performance tracking
 */
export function useStudyAnalytics() {
  const [sessions, setSessions] = useLocalStorage<StudySession[]>("studySessions", []);
  const [ratings, setRatings] = useLocalStorage<QuestionRating[]>("questionRatings", []);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);

  // Calculate study statistics
  const stats: StudyStats = {
    totalSessions: sessions.length,
    totalStudyTime: sessions.reduce((total, session) => {
      const duration = (session.endTime || Date.now()) - session.startTime;
      return total + duration;
    }, 0),
    totalQuestionsAnswered: sessions.reduce(
      (total, session) => total + session.questionsAnswered,
      0
    ),
    totalCorrectAnswers: sessions.reduce((total, session) => total + session.correctAnswers, 0),
    averageAccuracy: 0,
    longestStreak: 0,
    currentStreak: 0,
    lastStudyDate: sessions.length > 0 ? Math.max(...sessions.map((s) => s.startTime)) : undefined,
    frameworksStudied: new Set(sessions.map((s) => s.framework)),
    difficultyStats: {
      Easy: { attempted: 0, correct: 0 },
      Medium: { attempted: 0, correct: 0 },
      Hard: { attempted: 0, correct: 0 },
    },
  };

  // Calculate average accuracy
  if (stats.totalQuestionsAnswered > 0) {
    stats.averageAccuracy = (stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100;
  }

  // Calculate study streaks
  const studyDays = sessions
    .map((s) => new Date(s.startTime).toDateString())
    .filter((day, index, arr) => arr.indexOf(day) === index)
    .sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < studyDays.length; i++) {
    const currentDate = new Date(studyDays[i]);
    const prevDate = i > 0 ? new Date(studyDays[i - 1]) : null;

    if (prevDate && currentDate.getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);
  currentStreak = tempStreak;

  stats.longestStreak = longestStreak;
  stats.currentStreak = currentStreak;

  // Start a new study session
  const startSession = useCallback((framework: string, difficulty: "Easy" | "Medium" | "Hard") => {
    const session: StudySession = {
      id: Date.now().toString(),
      framework,
      startTime: Date.now(),
      questionsAnswered: 0,
      correctAnswers: 0,
      bookmarksCreated: 0,
      difficulty,
    };

    setCurrentSession(session);
    return session;
  }, []);

  // End the current session
  const endSession = useCallback(() => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        endTime: Date.now(),
      };

      setSessions((prev) => [...prev, updatedSession]);
      setCurrentSession(null);
    }
  }, [currentSession, setSessions]);

  // Record a question answer
  const recordAnswer = useCallback(
    (correct: boolean) => {
      if (currentSession) {
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                questionsAnswered: prev.questionsAnswered + 1,
                correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
              }
            : null
        );
      }
    },
    [currentSession]
  );

  // Record a bookmark
  const recordBookmark = useCallback(() => {
    if (currentSession) {
      setCurrentSession((prev) =>
        prev
          ? {
              ...prev,
              bookmarksCreated: prev.bookmarksCreated + 1,
            }
          : null
      );
    }
  }, [currentSession]);

  // Rate a question
  const rateQuestion = useCallback(
    (questionId: string, rating: number) => {
      const newRating: QuestionRating = {
        questionId,
        rating,
        timestamp: Date.now(),
      };

      setRatings((prev) => {
        const filtered = prev.filter((r) => r.questionId !== questionId);
        return [...filtered, newRating];
      });
    },
    [setRatings]
  );

  // Get rating for a question
  const getQuestionRating = useCallback(
    (questionId: string): number | null => {
      const rating = ratings.find((r) => r.questionId === questionId);
      return rating ? rating.rating : null;
    },
    [ratings]
  );

  // Get session duration
  const getSessionDuration = useCallback((session: StudySession): number => {
    const endTime = session.endTime || Date.now();
    return endTime - session.startTime;
  }, []);

  // Format duration for display
  const formatDuration = useCallback((milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }, []);

  // Get performance by difficulty
  const getDifficultyPerformance = useCallback(
    (difficulty: "Easy" | "Medium" | "Hard") => {
      const difficultySessions = sessions.filter((s) => s.difficulty === difficulty);
      const attempted = difficultySessions.reduce((total, s) => total + s.questionsAnswered, 0);
      const correct = difficultySessions.reduce((total, s) => total + s.correctAnswers, 0);

      return {
        attempted,
        correct,
        accuracy: attempted > 0 ? (correct / attempted) * 100 : 0,
      };
    },
    [sessions]
  );

  return {
    stats,
    currentSession,
    startSession,
    endSession,
    recordAnswer,
    recordBookmark,
    rateQuestion,
    getQuestionRating,
    getSessionDuration,
    formatDuration,
    getDifficultyPerformance,
  };
}
