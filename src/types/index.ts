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
export type { PracticeMode, ProgressData, StudySession } from "./practice";

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
  StudyTimerProps,
  LoadingSpinnerProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./ui";

// Context types
export type { Mode, SidebarContextValue, SidebarProviderProps } from "./context";

// Analytics types
export type { EventCategory, AnalyticsEvent } from "./analytics";

// Quiz types
export type {
  QuizLevel,
  QuizMode,
  QuizQuestion,
  QuizSession,
  QuizScore,
  QuizConfig,
  QuizResult,
  Achievement,
  LevelProgress,
  DIFFICULTY_MAPPING,
  QUESTIONS_PER_LEVEL,
  SCORING_WEIGHTS,
} from "./quiz";

// Interactive Quiz types
export type {
  QuestionType,
  QuizOption,
  InteractiveQuizQuestion,
  InteractiveQuizSession,
  InteractiveQuizResult,
} from "./interactive-quiz";

// Interactive Quiz Component types
export type {
  InteractiveQuizQuestionCardProps,
  QuestionHeaderProps,
  QuestionContentProps,
  QuestionNavigationProps,
} from "./interactive-quiz-components";

// Quiz Results types
export type {
  AnswerAnalysis,
  QuizStats,
  PerformanceBreakdown,
  PerformanceMessage,
  QuizResultsProps,
  ScoreDisplayProps,
  StatsGridProps,
  PerformanceBreakdownProps,
  AnswerAnalysisProps,
  RecommendationsProps,
  TabNavigationProps,
  ActionButtonsProps,
} from "./quiz-results";

// Study Component types
export type {
  StudyQuestionCardProps,
  QuestionHeaderProps as StudyQuestionHeaderProps,
  QuestionContentProps as StudyQuestionContentProps,
  QuestionAnswerProps as StudyQuestionAnswerProps,
  StudyAnalyticsProps,
  QuestionRatingProps,
  QuestionNotesProps,
  QuestionNavigationProps as StudyQuestionNavigationProps,
  QuestionTagsProps,
} from "./study-components";
