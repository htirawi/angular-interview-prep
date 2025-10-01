/**
 * Context-related types
 */

import type { ReactNode } from "react";
import type { FrameworkId } from "./framework";
import type { Question } from "./question";

export type Mode = "sequential" | "random" | "bookmarked";

export interface SidebarContextValue {
  // Framework
  currentFramework: FrameworkId;
  // Stats
  totalQuestions: number;
  completed: number;
  bookmarked: number;
  // Mode
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  // Search & Filters
  searchQuery: string;
  onSearchChange: (query: string) => void;
  questions: Question[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  // Actions
  onResetProgress: () => void;
  currentIndex: number;
  totalFiltered: number;
  onJumpToQuestion: (index: number) => void;
  questionList: Question[];
}

export interface SidebarProviderProps {
  children: ReactNode;
  value: SidebarContextValue;
}
