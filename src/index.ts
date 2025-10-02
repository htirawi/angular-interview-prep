/**
 * Main Application Index - Central exports for the entire application
 *
 * Usage:
 * import { Component, Service, Hook } from '@/index';
 */

// Core functionality
export * from "./core";

// Components - specific exports to avoid conflicts
export {
  AccessibilityEnhancements,
  LoadingStates,
  MarkdownRenderer,
  LazyLoader,
  createLazyComponent,
  FrameworkIcon,
} from "./components/common";

export {
  MockInterviewMode,
  PerformanceDashboard,
  StatsPanel,
  StudyAnalytics,
} from "./components/features";

export { FilterPanel, QuestionRating, SearchBar } from "./components/forms";

export { InteractiveQuizQuestionCard, InteractiveQuizResults } from "./components/interactive-quiz";

export { Sidebar } from "./components/layout";

export {
  FrameworkSelector,
  FrameworkSwitcher,
  PreviousQuestionButton,
} from "./components/navigation";

export { QuizProgress, QuizQuestionCard, QuizResults, QuizTimer } from "./components/quiz";

export {
  QuestionCard,
  QuestionTags,
  StudyQuestionAnswer,
  StudyQuestionContent,
  StudyQuestionHeader,
  StudyQuestionNavigation,
} from "./components/study";

export {
  ComparisonTable,
  RegularTable,
  isComparisonTable,
  parseComparisonTable,
  parseRegularTable,
  parseHtmlTable,
} from "./components/tables";

// Pages
export * from "./pages";

// Services
export * from "./services";

// Hooks
export * from "./hooks";

// Contexts
export * from "./contexts";

// Types
export * from "./types";

// Utils
export * from "./utils";

// Shared
export * from "./shared";
