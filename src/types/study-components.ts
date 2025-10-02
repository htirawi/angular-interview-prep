/**
 * Types for Study Mode Components
 */

import type React from "react";
import type { QuestionCardProps } from "./ui";

export interface StudyQuestionCardProps extends QuestionCardProps {
  // Additional props specific to study mode
  onStudyComplete?: () => void;
}

export interface QuestionHeaderProps {
  item: QuestionCardProps["item"];
  index: number;
  total: number;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark?: () => void;
}

export interface QuestionContentProps {
  item: QuestionCardProps["item"];
  isAnswerVisible: boolean;
  onRevealAnswer: () => void;
}

export interface QuestionAnswerProps {
  item: QuestionCardProps["item"];
  isAnswerVisible: boolean;
  answerRef: React.RefObject<HTMLDivElement>;
}

export interface StudyAnalyticsProps {
  item: QuestionCardProps["item"];
  studyTime: number;
  isVisible: boolean;
  onClose: () => void;
}

export interface QuestionRatingProps {
  questionId: string;
  initialRating: number;
  onRate: (questionId: string, rating: number) => void;
  compact?: boolean;
}

export interface QuestionNotesProps {
  questionId: string;
  note: string;
  onSaveNote: (questionId: string, note: string) => void;
}

export interface QuestionNavigationProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  studyTime: number;
}

export interface QuestionTagsProps {
  tags: string[];
}
