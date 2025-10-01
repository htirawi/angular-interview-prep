/**
 * Practice mode and progress types
 */

export type PracticeMode = "sequential" | "random" | "bookmarked";

// Alias for backward compatibility
export type Mode = PracticeMode;

export interface ProgressData {
  completed: number[];
  bookmarked: number[];
  notes: Record<number, string>;
  lastUpdated: string;
}

export interface StudySession {
  framework: string;
  startTime: number;
  endTime?: number;
  questionsCompleted: number;
}
