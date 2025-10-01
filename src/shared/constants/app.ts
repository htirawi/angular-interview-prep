// Application constants - Single source of truth

export const APP_CONFIG = {
  name: "Angular Senior Interview Prep",
  version: "1.0.0",
  description: "Master 100 essential Angular interview questions",
  author: "Hussein Tirawi",
  repository: "https://github.com/htirawi/angular-interview-prep",
} as const;

export const STORAGE_KEYS = {
  INDEX: "mockInterview.index",
  COMPLETED: "mockInterview.completed",
  BOOKMARKS: "mockInterview.bookmarks",
  MODE: "mockInterview.mode",
  NOTES: "mockInterview.notes",
  STUDY_TIME: "mockInterview.studyTime",
  THEME: "theme",
} as const;

export const PRACTICE_MODES = {
  SEQUENTIAL: "sequential",
  RANDOM: "random",
  BOOKMARKED: "bookmarked",
} as const;

export const DIFFICULTY_LEVELS = {
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  EXPERT: "expert",
} as const;

export const KEYBOARD_SHORTCUTS = {
  NEXT: "ArrowRight",
  PREV: "ArrowLeft",
  TOGGLE_ANSWER: "a",
  BOOKMARK: "b",
  SEARCH: "/",
  ESCAPE: "Escape",
} as const;

export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  AUTOSAVE: 1000,
  RESIZE: 150,
} as const;

export const CATEGORIES = [
  "Architecture",
  "Reactive Programming",
  "Change Detection",
  "Forms",
  "HTTP & API",
  "Routing",
  "State Management",
  "Testing",
  "Performance",
  "Security & Auth",
  "Real-time",
  "SSR & Hydration",
  "Accessibility",
  "Components",
  "Dependency Injection",
] as const;

export const UI_CONFIG = {
  toastDuration: 3000,
  animationDuration: 300,
  maxSearchResults: 50,
  questionsPerPage: 1,
} as const;

