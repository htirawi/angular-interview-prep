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
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
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

// Component-specific types
export interface MarkdownRendererProps {
  content: string;
}

export interface ComparisonRow {
  feature: string;
  reactive: string;
  template: string;
}

export interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
}

export interface TableRow {
  cells: string[];
  isHeader?: boolean;
}

export interface RegularTableProps {
  rows: TableRow[];
}

export interface FrameworkIconProps {
  framework: string;
  size?: number;
  className?: string;
}

export interface FrameworkSwitcherProps {
  currentFramework: string;
  onSwitch: (framework: string) => void;
  onOpenModal: () => void;
}

export interface FrameworkSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (framework: string) => void;
  currentFramework?: string;
}

export interface QuestionNotesProps {
  questionId: number;
  initialNote?: string;
  onSave: (questionId: number, note: string) => void;
}

export interface StudyTimerProps {
  onTimeUpdate?: (seconds: number) => void;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
