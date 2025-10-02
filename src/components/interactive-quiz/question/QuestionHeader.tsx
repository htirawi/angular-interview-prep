/**
 * Question Header Component for Interactive Quiz
 */

import type { QuestionHeaderProps } from "../../../types/interactive-quiz-components";

export function QuestionHeader({
  questionNumber,
  totalQuestions,
  question,
  isBookmarked = false,
  onToggleBookmark,
}: QuestionHeaderProps & {
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "🟢";
      case "medium":
        return "🟡";
      case "hard":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return "🔘";
      case "fill-blank":
        return "✏️";
      case "multiple-checkbox":
        return "☑️";
      case "true-false":
        return "✅";
      default:
        return "❓";
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      {/* Question Info */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white sm:h-12 sm:w-12">
            {questionNumber}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Question {questionNumber} of {totalQuestions}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium sm:px-3 sm:text-sm ${getDifficultyColor(question.difficulty)}`}
              >
                {getDifficultyIcon(question.difficulty)} {question.difficulty.toUpperCase()}
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200 sm:px-3 sm:text-sm">
                {getQuestionTypeIcon(question.type)} {question.type.replace("-", " ").toUpperCase()}
              </span>
              <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200 sm:px-3 sm:text-sm">
                {question.points === 1 ? "1pt" : `${question.points}pts`}
              </span>
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        {onToggleBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 sm:gap-2 sm:px-4 sm:text-sm ${
              isBookmarked
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
          >
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
