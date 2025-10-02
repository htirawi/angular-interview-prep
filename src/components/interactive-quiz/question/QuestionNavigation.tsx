/**
 * Question Navigation Component for Interactive Quiz
 */

import type { QuestionNavigationProps } from "../../../types/interactive-quiz-components";

export function QuestionNavigation({
  questionNumber,
  totalQuestions,
  canGoNext,
  canGoPrevious,
  canComplete,
  onNext,
  onPrevious,
  onComplete,
}: QuestionNavigationProps) {
  return (
    <div className="space-y-4">
      {/* Mobile hint */}
      <div className="text-center sm:hidden">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          💡 Swipe left/right or tap buttons to navigate
        </p>
      </div>

      {/* Navigation buttons - properly aligned */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:px-6 sm:py-3"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {/* Desktop: Keyboard shortcut hint */}
        <div className="hidden flex-col items-center gap-2 sm:flex">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Use ← → arrow keys to navigate
          </div>
        </div>

        {questionNumber === totalQuestions ? (
          <button
            onClick={() => {
              onComplete();
            }}
            disabled={!canComplete}
            className={`rounded-lg px-6 py-2.5 font-bold text-white shadow-lg transition-all duration-200 active:scale-95 sm:px-8 sm:py-3 ${
              canComplete
                ? "cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 hover:shadow-xl"
                : "cursor-not-allowed bg-gray-400 opacity-50"
            }`}
            type="button"
          >
            <span className="text-sm sm:text-base">Complete Quiz</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium text-white transition-all duration-200 active:scale-95 sm:px-6 sm:py-3 ${
              canGoNext
                ? "cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg"
                : "cursor-not-allowed bg-gray-400 opacity-50"
            }`}
          >
            <span className="text-sm sm:text-base">Next</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Friendly reminder - separate row */}
      {((!canGoNext && questionNumber < totalQuestions) ||
        (!canComplete && questionNumber === totalQuestions)) && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 sm:gap-2 sm:text-sm">
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {(() => {
              const funnyMessages = [
                "🤔 Pick an answer!",
                "🎭 Make a choice!",
                "🍕 Feed me an answer!",
                "🐱 Even my cat could answer this!",
                "🎪 Step right up!",
                "🚀 Houston, we need an answer!",
                "🎲 Roll the dice!",
                "🦄 Unicorns believe in you!",
                "☕ Coffee break's over!",
                "🎨 Every answer is art!",
                "🏆 No trophy for skipping!",
                "🎵 Don't be shy!",
                "🎈 Answer is floating away!",
                "🍀 Luck favors the bold!",
                "🎪 Pick your answer!",
              ];

              if (questionNumber === totalQuestions) {
                const finalMessages = [
                  "🎯 Last question!",
                  "🏁 Almost there!",
                  "🎉 Final boss!",
                  "🥇 Gold medal answer!",
                  "🎊 Make it count!",
                  "🚀 Launch sequence!",
                  "🎭 Final act!",
                  "🏆 Trophy waiting!",
                ];
                return finalMessages[Math.floor(Math.random() * finalMessages.length)];
              } else {
                return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
              }
            })()}
          </span>
        </div>
      )}
    </div>
  );
}
