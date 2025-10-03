// Central export for all interview question sets

import type { FrameworkMetadata } from "../types/framework";

export { QUESTIONS } from "./questions";
export { NEXTJS_QUESTIONS } from "./nextjs";
export { REACT_QUESTIONS } from "./react";
export { REDUX_QUESTIONS } from "./redux";

// Enhanced question sets
export { ANGULAR_ENHANCED_QUESTIONS } from "./angular-enhanced";
export { REACT_ENHANCED_QUESTIONS } from "./react-enhanced";
export { NEXTJS_ENHANCED_QUESTIONS } from "./nextjs-enhanced";
export { RANDOM_ENHANCED_QUESTIONS } from "./random-enhanced";

// Re-export types
export type { Question, QA } from "../types/question";
export type { FrameworkId as QuestionSetId } from "../types/framework";

// Combined questions export - using enhanced versions
export const ALL_QUESTIONS = {
  angular: () => import("./angular-enhanced").then((m) => m.ANGULAR_ENHANCED_QUESTIONS),
  nextjs: () => import("./nextjs-enhanced").then((m) => m.NEXTJS_ENHANCED_QUESTIONS),
  react: () => import("./react-enhanced").then((m) => m.REACT_ENHANCED_QUESTIONS),
  redux: () => import("./redux").then((m) => m.REDUX_QUESTIONS),
  random: () => import("./random-enhanced").then((m) => m.RANDOM_ENHANCED_QUESTIONS),
} as const;

// Metadata with icon identifiers
export const QUESTION_SETS: FrameworkMetadata[] = [
  {
    id: "angular",
    name: "Angular",
    count: 227, // Updated count after adding 10 new Angular 16-19 questions
    icon: "angular",
  },
  {
    id: "nextjs",
    name: "Next.js",
    count: 100, // Updated count - all 100 questions from nextjs-enhanced.ts
    icon: "nextjs",
  },
  {
    id: "react",
    name: "React",
    count: 80, // Updated count after adding 30 comprehensive questions
    icon: "react",
  },
  {
    id: "redux",
    name: "Redux",
    count: 100,
    icon: "redux",
  },
  {
    id: "random",
    name: "Random",
    count: 52, // Mixed topics: Git, CSS, Angular Material, Performance, SASS, Webpack, Docker, TypeScript, GraphQL, Web APIs, JavaScript Advanced, Build Tools
    icon: "random",
  },
];
