/**
 * Central type exports - Single source of truth for all types
 *
 * Import types from here instead of individual files:
 *
 * @example
 * ```typescript
 * import type { Question, PracticeMode, ToastType } from '@/types';
 * ```
 */

// Question types
export type {
  Question,
  QA, // Alias for backward compatibility
  DifficultyLevel,
  QuestionCategory,
  EnrichedQuestion,
} from "./question";

// Framework types
export type { FrameworkId, QuestionSetId, FrameworkMetadata } from "./framework";

// Practice types
export type { PracticeMode, Mode, ProgressData, StudySession } from "./practice";

// UI component types
export type {
  SidebarProps,
  QuestionCardProps,
  SearchBarProps,
  FilterPanelProps,
  StatsPanelProps,
  ProgressBarProps,
  ToastType,
  ToastProps,
  ToastItem,
  MarkdownRendererProps,
  ComparisonRow,
  ComparisonTableProps,
  TableRow,
  RegularTableProps,
  FrameworkIconProps,
  FrameworkSwitcherProps,
  FrameworkSelectorProps,
  QuestionNotesProps,
  StudyTimerProps,
  LoadingSpinnerProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./ui";

// Context types
export type { Mode, SidebarContextValue, SidebarProviderProps } from "./context";

// Analytics types
export type { EventCategory, AnalyticsEvent } from "./analytics";
