/**
 * UI component prop types
 */

import type { ReactNode } from "react";
import type { Question } from "./question";
import type { PracticeMode } from "./practice";

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  totalQuestions: number;
  completed: number;
  bookmarked: number;
  mode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
  searchQuery?: string;
  onSearchChange: (query: string) => void;
  questions: Question[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onResetProgress: () => void;
  currentIndex: number;
  totalFiltered: number;
  onJumpToQuestion: (index: number) => void;
  questionList: Question[];
  children?: ReactNode;
}

export interface QuestionCardProps {
  item: Question;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  onToggleBookmark?: () => void;
  note?: string;
  onSaveNote?: (note: string) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export interface FilterPanelProps {
  questions: Question[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

export interface StatsPanelProps {
  completed: number;
  total: number;
  bookmarked: number;
}

export interface ProgressBarProps {
  progress: number;
  className?: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
