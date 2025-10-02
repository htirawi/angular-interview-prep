/**
 * Interactive Quiz Data - Sample questions for different frameworks
 */

import type { InteractiveQuizQuestion } from "../types/interactive-quiz";

export const ANGULAR_INTERACTIVE_QUESTIONS: InteractiveQuizQuestion[] = [
  {
    id: "angular-1",
    question: "What is the main purpose of Angular's dependency injection system?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "To manage component lifecycle", isCorrect: false },
      { id: "b", text: "To provide services and dependencies to components", isCorrect: true },
      { id: "c", text: "To handle HTTP requests", isCorrect: false },
      { id: "d", text: "To manage routing", isCorrect: false },
    ],
    explanation:
      "Dependency injection in Angular allows you to provide services and dependencies to components without hard-coding them, making your code more modular and testable.",
    category: "Angular Basics",
    difficulty: "easy",
    tags: ["dependency-injection", "services"],
    points: 1,
  },
  {
    id: "angular-2",
    question: "Complete the following: Angular uses _____ for two-way data binding.",
    type: "fill-blank",
    correctAnswer: "ngModel",
    explanation:
      "ngModel is Angular's directive for two-way data binding, allowing you to bind form controls to component properties.",
    category: "Forms",
    difficulty: "medium",
    tags: ["forms", "data-binding", "ngModel"],
    points: 2,
  },
  {
    id: "angular-3",
    question: "Which of the following are Angular lifecycle hooks? (Select all that apply)",
    type: "multiple-checkbox",
    options: [
      { id: "a", text: "ngOnInit", isCorrect: true },
      { id: "b", text: "ngOnDestroy", isCorrect: true },
      { id: "c", text: "ngOnChange", isCorrect: false },
      { id: "d", text: "ngAfterViewInit", isCorrect: true },
      { id: "e", text: "ngOnUpdate", isCorrect: false },
    ],
    correctAnswers: ["a", "b", "d"],
    explanation:
      "ngOnInit, ngOnDestroy, and ngAfterViewInit are all valid Angular lifecycle hooks. ngOnChange and ngOnUpdate are not real Angular lifecycle hooks.",
    category: "Components",
    difficulty: "medium",
    tags: ["lifecycle-hooks", "components"],
    points: 3,
  },
  {
    id: "angular-4",
    question: "Angular CLI is the official command-line interface for Angular development.",
    type: "true-false",
    correctAnswer: "true",
    explanation:
      "Angular CLI is indeed the official command-line interface tool for Angular development, providing commands for creating, building, and testing Angular applications.",
    category: "Angular CLI",
    difficulty: "easy",
    tags: ["angular-cli", "tooling"],
    points: 1,
  },
  {
    id: "angular-5",
    question: "What is the purpose of Angular's Change Detection mechanism?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "To automatically update the DOM when data changes", isCorrect: true },
      { id: "b", text: "To manage component communication", isCorrect: false },
      { id: "c", text: "To handle HTTP requests", isCorrect: false },
      { id: "d", text: "To manage routing", isCorrect: false },
    ],
    explanation:
      "Angular's Change Detection mechanism automatically tracks changes in component data and updates the DOM accordingly, ensuring the view stays in sync with the component state.",
    category: "Change Detection",
    difficulty: "hard",
    tags: ["change-detection", "performance"],
    points: 2,
  },
];

export const REACT_INTERACTIVE_QUESTIONS: InteractiveQuizQuestion[] = [
  {
    id: "react-1",
    question: "What is the main difference between functional and class components in React?",
    type: "multiple-choice",
    options: [
      {
        id: "a",
        text: "Functional components use hooks, class components use lifecycle methods",
        isCorrect: true,
      },
      { id: "b", text: "Functional components are faster", isCorrect: false },
      { id: "c", text: "Class components are deprecated", isCorrect: false },
      { id: "d", text: "There is no difference", isCorrect: false },
    ],
    explanation:
      "The main difference is that functional components use hooks for state and lifecycle management, while class components use lifecycle methods and this.state.",
    category: "Components",
    difficulty: "medium",
    tags: ["functional-components", "class-components", "hooks"],
    points: 2,
  },
  {
    id: "react-2",
    question:
      "Complete the following: React uses _____ to manage component state in functional components.",
    type: "fill-blank",
    correctAnswer: "useState",
    explanation:
      "useState is the primary hook used in React functional components to manage local state.",
    category: "Hooks",
    difficulty: "easy",
    tags: ["useState", "hooks", "state"],
    points: 1,
  },
  {
    id: "react-3",
    question: "Which of the following are React hooks? (Select all that apply)",
    type: "multiple-checkbox",
    options: [
      { id: "a", text: "useState", isCorrect: true },
      { id: "b", text: "useEffect", isCorrect: true },
      { id: "c", text: "useContext", isCorrect: true },
      { id: "d", text: "useComponent", isCorrect: false },
      { id: "e", text: "useMemo", isCorrect: true },
    ],
    correctAnswers: ["a", "b", "c", "e"],
    explanation:
      "useState, useEffect, useContext, and useMemo are all valid React hooks. useComponent is not a real React hook.",
    category: "Hooks",
    difficulty: "medium",
    tags: ["hooks", "react-api"],
    points: 3,
  },
  {
    id: "react-4",
    question: "React components must always return JSX.",
    type: "true-false",
    correctAnswer: "false",
    explanation:
      "React components can return JSX, null, or other valid React elements. They don't always have to return JSX.",
    category: "Components",
    difficulty: "easy",
    tags: ["jsx", "components"],
    points: 1,
  },
];

export const NEXTJS_INTERACTIVE_QUESTIONS: InteractiveQuizQuestion[] = [
  {
    id: "nextjs-1",
    question: "What is the main advantage of Next.js over plain React?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Better performance", isCorrect: false },
      { id: "b", text: "Built-in routing, SSR, and optimization features", isCorrect: true },
      { id: "c", text: "Smaller bundle size", isCorrect: false },
      { id: "d", text: "Better TypeScript support", isCorrect: false },
    ],
    explanation:
      "Next.js provides built-in features like file-based routing, server-side rendering, static site generation, and automatic optimizations that aren't available in plain React.",
    category: "Next.js Basics",
    difficulty: "medium",
    tags: ["routing", "ssr", "optimization"],
    points: 2,
  },
  {
    id: "nextjs-2",
    question: "Complete the following: Next.js uses the _____ directory for API routes.",
    type: "fill-blank",
    correctAnswer: "pages/api",
    explanation:
      "Next.js uses the pages/api directory to create API routes that run as serverless functions.",
    category: "API Routes",
    difficulty: "medium",
    tags: ["api-routes", "serverless"],
    points: 2,
  },
  {
    id: "nextjs-3",
    question: "Which of the following are Next.js features? (Select all that apply)",
    type: "multiple-checkbox",
    options: [
      { id: "a", text: "File-based routing", isCorrect: true },
      { id: "b", text: "Server-side rendering", isCorrect: true },
      { id: "c", text: "Static site generation", isCorrect: true },
      { id: "d", text: "Built-in CSS support", isCorrect: true },
      { id: "e", text: "Built-in database", isCorrect: false },
    ],
    correctAnswers: ["a", "b", "c", "d"],
    explanation:
      "Next.js provides file-based routing, SSR, SSG, and built-in CSS support, but it doesn't include a built-in database.",
    category: "Features",
    difficulty: "medium",
    tags: ["routing", "ssr", "ssg", "css"],
    points: 3,
  },
];

export const REDUX_INTERACTIVE_QUESTIONS: InteractiveQuizQuestion[] = [
  {
    id: "redux-1",
    question: "What are the three principles of Redux?",
    type: "multiple-choice",
    options: [
      {
        id: "a",
        text: "Single source of truth, state is read-only, changes via pure functions",
        isCorrect: true,
      },
      { id: "b", text: "Multiple stores, mutable state, async actions", isCorrect: false },
      { id: "c", text: "Component state, props, lifecycle", isCorrect: false },
      { id: "d", text: "Actions, reducers, middleware", isCorrect: false },
    ],
    explanation:
      "Redux follows three core principles: single source of truth (store), state is read-only (immutable), and changes are made through pure functions (reducers).",
    category: "Redux Basics",
    difficulty: "medium",
    tags: ["principles", "store", "immutability"],
    points: 2,
  },
  {
    id: "redux-2",
    question: "Complete the following: Redux uses _____ to describe state changes.",
    type: "fill-blank",
    correctAnswer: "actions",
    explanation:
      "Redux uses actions, which are plain JavaScript objects that describe what happened in the application.",
    category: "Actions",
    difficulty: "easy",
    tags: ["actions", "state-changes"],
    points: 1,
  },
];

// Combined questions by framework
export const INTERACTIVE_QUIZ_DATA = {
  angular: ANGULAR_INTERACTIVE_QUESTIONS,
  react: REACT_INTERACTIVE_QUESTIONS,
  nextjs: NEXTJS_INTERACTIVE_QUESTIONS,
  redux: REDUX_INTERACTIVE_QUESTIONS,
} as const;
