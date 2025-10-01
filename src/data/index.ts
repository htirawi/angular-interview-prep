// Central export for all interview question sets

import type { FrameworkMetadata } from "../types/framework";

export { QUESTIONS } from "./questions";
export { NEXTJS_QUESTIONS } from "./nextjs";
export { REACT_QUESTIONS } from "./react";
export { REDUX_QUESTIONS } from "./redux";

// Re-export types
export type { Question, QA } from "../types/question";
export type { FrameworkId as QuestionSetId } from "../types/framework";

// Combined questions export
export const ALL_QUESTIONS = {
  angular: () => import("./questions").then((m) => m.QUESTIONS),
  nextjs: () => import("./nextjs").then((m) => m.NEXTJS_QUESTIONS),
  react: () => import("./react").then((m) => m.REACT_QUESTIONS),
  redux: () => import("./redux").then((m) => m.REDUX_QUESTIONS),
} as const;

// Metadata
export const QUESTION_SETS: FrameworkMetadata[] = [
  { id: "angular", name: "Angular", count: 100, icon: "⚡" },
  { id: "nextjs", name: "Next.js", count: 100, icon: "▲" },
  { id: "react", name: "React", count: 100, icon: "⚛️" },
  { id: "redux", name: "Redux", count: 100, icon: "🔄" },
];
