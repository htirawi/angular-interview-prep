import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface ReviewItem {
  questionId: string;
  framework: string;
  difficulty: "Easy" | "Medium" | "Hard";
  nextReview: number;
  interval: number; // in days
  repetitions: number;
  easeFactor: number;
  lastReviewed?: number;
  correctStreak: number;
}

export interface ReviewSession {
  id: string;
  startTime: number;
  itemsReviewed: ReviewItem[];
  correctAnswers: number;
  totalAnswers: number;
}

/**
 * Spaced Repetition System (SRS) based on the SM-2 algorithm
 * Helps users review questions at optimal intervals for long-term retention
 */
export function useSpacedRepetition() {
  const [reviewItems, setReviewItems] = useLocalStorage<ReviewItem[]>("spacedRepetitionItems", []);
  const [reviewSessions, setReviewSessions] = useLocalStorage<ReviewSession[]>(
    "reviewSessions",
    []
  );

  // Get items due for review
  const itemsDueForReview = useMemo(() => {
    const now = Date.now();
    return reviewItems.filter((item) => item.nextReview <= now);
  }, [reviewItems]);

  // Get items by framework
  const getItemsByFramework = useCallback(
    (framework: string) => {
      return reviewItems.filter((item) => item.framework === framework);
    },
    [reviewItems]
  );

  // Add a question to the spaced repetition system
  const addQuestion = useCallback(
    (questionId: string, framework: string, difficulty: "Easy" | "Medium" | "Hard") => {
      const existingItem = reviewItems.find((item) => item.questionId === questionId);

      if (existingItem) {
        return; // Already exists
      }

      const newItem: ReviewItem = {
        questionId,
        framework,
        difficulty,
        nextReview: Date.now(), // Review immediately for new items
        interval: 1, // Start with 1 day
        repetitions: 0,
        easeFactor: 2.5, // Default ease factor
        correctStreak: 0,
      };

      setReviewItems((prev) => [...prev, newItem]);
    },
    [reviewItems, setReviewItems]
  );

  // Review an item (answer: 0 = again, 1 = hard, 2 = good, 3 = easy)
  const reviewItem = useCallback(
    (questionId: string, quality: 0 | 1 | 2 | 3) => {
      const itemIndex = reviewItems.findIndex((item) => item.questionId === questionId);

      if (itemIndex === -1) return;

      const item = reviewItems[itemIndex];
      const now = Date.now();

      let newInterval: number;
      let newRepetitions: number;
      let newEaseFactor: number;
      let newCorrectStreak: number;

      if (quality < 3) {
        // Incorrect answer - reset
        newInterval = 1;
        newRepetitions = 0;
        newEaseFactor = Math.max(1.3, item.easeFactor - 0.2);
        newCorrectStreak = 0;
      } else {
        // Correct answer
        newRepetitions = item.repetitions + 1;
        newCorrectStreak = item.correctStreak + 1;

        if (item.repetitions === 0) {
          newInterval = 1;
        } else if (item.repetitions === 1) {
          newInterval = 6;
        } else {
          newInterval = Math.round(item.interval * item.easeFactor);
        }

        // Adjust ease factor based on quality
        newEaseFactor = item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        newEaseFactor = Math.max(1.3, newEaseFactor);
      }

      const updatedItem: ReviewItem = {
        ...item,
        nextReview: now + newInterval * 24 * 60 * 60 * 1000, // Convert days to milliseconds
        interval: newInterval,
        repetitions: newRepetitions,
        easeFactor: newEaseFactor,
        lastReviewed: now,
        correctStreak: newCorrectStreak,
      };

      setReviewItems((prev) => {
        const updated = [...prev];
        updated[itemIndex] = updatedItem;
        return updated;
      });

      return updatedItem;
    },
    [reviewItems, setReviewItems]
  );

  // Get next review date for a question
  const getNextReviewDate = useCallback(
    (questionId: string): Date | null => {
      const item = reviewItems.find((item) => item.questionId === questionId);
      return item ? new Date(item.nextReview) : null;
    },
    [reviewItems]
  );

  // Get review statistics
  const getReviewStats = useCallback(() => {
    const now = Date.now();
    const dueCount = reviewItems.filter((item) => item.nextReview <= now).length;
    const overdueCount = reviewItems.filter(
      (item) =>
        item.nextReview < now &&
        item.lastReviewed &&
        now - item.lastReviewed > item.interval * 24 * 60 * 60 * 1000
    ).length;

    const totalItems = reviewItems.length;
    const masteredItems = reviewItems.filter((item) => item.correctStreak >= 5).length;

    return {
      dueCount,
      overdueCount,
      totalItems,
      masteredItems,
      masteryRate: totalItems > 0 ? (masteredItems / totalItems) * 100 : 0,
    };
  }, [reviewItems]);

  // Start a review session
  const startReviewSession = useCallback(() => {
    const session: ReviewSession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      itemsReviewed: [],
      correctAnswers: 0,
      totalAnswers: 0,
    };

    setReviewSessions((prev) => [...prev, session]);
    return session;
  }, [setReviewSessions]);

  // Complete a review session
  const completeReviewSession = useCallback(
    (sessionId: string) => {
      setReviewSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId ? { ...session, endTime: Date.now() } : session
        )
      );
    },
    [setReviewSessions]
  );

  // Get review session history
  const getReviewHistory = useCallback(
    (days: number = 30) => {
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      return reviewSessions.filter((session) => session.startTime >= cutoff);
    },
    [reviewSessions]
  );

  // Calculate retention rate
  const getRetentionRate = useCallback(() => {
    if (reviewSessions.length === 0) return 0;

    const totalAnswers = reviewSessions.reduce((sum, session) => sum + session.totalAnswers, 0);
    const correctAnswers = reviewSessions.reduce((sum, session) => sum + session.correctAnswers, 0);

    return totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
  }, [reviewSessions]);

  // Get recommended review schedule
  const getRecommendedSchedule = useCallback(() => {
    const now = Date.now();
    const today = new Date(now);
    const tomorrow = new Date(now + 24 * 60 * 60 * 1000);
    const week = new Date(now + 7 * 24 * 60 * 60 * 1000);
    const month = new Date(now + 30 * 24 * 60 * 60 * 1000);

    return {
      today: reviewItems.filter((item) => {
        const reviewDate = new Date(item.nextReview);
        return reviewDate.toDateString() === today.toDateString();
      }).length,
      tomorrow: reviewItems.filter((item) => {
        const reviewDate = new Date(item.nextReview);
        return reviewDate.toDateString() === tomorrow.toDateString();
      }).length,
      thisWeek: reviewItems.filter((item) => item.nextReview <= week.getTime()).length,
      thisMonth: reviewItems.filter((item) => item.nextReview <= month.getTime()).length,
    };
  }, [reviewItems]);

  return {
    reviewItems,
    itemsDueForReview,
    getItemsByFramework,
    addQuestion,
    reviewItem,
    getNextReviewDate,
    getReviewStats,
    startReviewSession,
    completeReviewSession,
    getReviewHistory,
    getRetentionRate,
    getRecommendedSchedule,
  };
}
