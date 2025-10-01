import { useCallback, useEffect, useMemo, useState } from "react";
import type { Question, PracticeMode } from "../types";

/**
 * Custom hook for managing question filtering and navigation logic
 * Handles search, filters, practice modes, and question navigation
 */
export function useQuestionNavigation(
  enrichedQuestions: Question[],
  bookmarks: Set<number>,
  mode: PracticeMode
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [randomOrder, setRandomOrder] = useState<number[]>([]);

  // Initialize random order
  useEffect(() => {
    if (randomOrder.length === 0) {
      const indices = Array.from({ length: enrichedQuestions.length }, (_, i) => i);
      setRandomOrder(indices.sort(() => Math.random() - 0.5));
    }
  }, [enrichedQuestions.length, randomOrder.length]);

  // Filter questions based on search, category, difficulty, and mode
  const filteredQuestions = useMemo(() => {
    let filtered = enrichedQuestions;

    if (mode === "bookmarked") {
      filtered = filtered.filter((q) => bookmarks.has(q.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.category?.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [enrichedQuestions, mode, bookmarks, searchQuery, selectedCategory, selectedDifficulty]);

  // Get current question list based on practice mode
  const currentQuestionList = useMemo(() => {
    if (mode === "random" && randomOrder.length > 0) {
      return randomOrder.map((i) => filteredQuestions[i]).filter(Boolean);
    }
    return filteredQuestions;
  }, [mode, randomOrder, filteredQuestions]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedDifficulty("");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    currentQuestionList,
    resetFilters,
  };
}
