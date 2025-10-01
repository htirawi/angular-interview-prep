/**
 * Framework-related types
 */

export type FrameworkId = "angular" | "nextjs" | "react" | "redux" | "random";

// Alias for backward compatibility
export type QuestionSetId = FrameworkId;

export interface FrameworkMetadata {
  id: FrameworkId;
  name: string;
  count: number;
  icon: string;
}
