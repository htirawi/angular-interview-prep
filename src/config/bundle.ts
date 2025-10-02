/**
 * Bundle Configuration - Optimize bundle splitting and lazy loading
 */

// Define which modules should be code-split
export const CODE_SPLIT_MODULES = {
  // Large data files - lazy load by framework
  ANGULAR_DATA: () => import("../data/angular-enhanced"),
  REACT_DATA: () => import("../data/react-enhanced"),
  NEXTJS_DATA: () => import("../data/nextjs-enhanced"),
  REDUX_DATA: () => import("../data/redux"),
  RANDOM_DATA: () => import("../data/random-enhanced"),

  // Interactive quiz data
  INTERACTIVE_QUIZ_DATA: () => import("../data/enhanced-interactive-quiz"),

  // Heavy components - lazy load when needed
  STUDY_ANALYTICS: () => import("../components/features/StudyAnalytics"),
  MOCK_INTERVIEW: () => import("../components/features/MockInterviewMode"),
  QUIZ_RESULTS: () => import("../components/interactive-quiz/InteractiveQuizResults"),
} as const;

// Preload critical data
export const PRELOAD_CRITICAL_DATA = [
  "interactive-quiz", // Always needed for quiz functionality
] as const;

// Bundle size optimization tips
export const BUNDLE_OPTIMIZATION = {
  // Max file size before code splitting (in KB)
  MAX_FILE_SIZE: 50,

  // Critical path components (load immediately)
  CRITICAL_COMPONENTS: ["App", "ModeSelection", "FrameworkSelection"],

  // Non-critical components (can be lazy loaded)
  NON_CRITICAL_COMPONENTS: ["StudyAnalytics", "MockInterviewMode", "QuizResults"],
} as const;
