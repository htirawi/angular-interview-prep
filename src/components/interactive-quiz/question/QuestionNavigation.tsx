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
    <div className="flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Center: Keyboard shortcut hint */}
      <div className="flex flex-col items-center gap-2">
        {/* Keyboard shortcut hint */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Use ← → arrow keys to navigate
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        {questionNumber === totalQuestions ? (
          <button
            onClick={() => {
              onComplete();
            }}
            disabled={!canComplete}
            className={`rounded-lg px-8 py-3 font-bold text-white shadow-lg transition-all ${
              canComplete
                ? "cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 hover:shadow-xl"
                : "cursor-not-allowed bg-gray-400 opacity-50"
            }`}
            type="button"
          >
            Complete Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all ${
              canGoNext
                ? "cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg"
                : "cursor-not-allowed bg-gray-400 opacity-50"
            }`}
          >
            Next
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Friendly reminder */}
        {(!canGoNext && questionNumber < totalQuestions) ||
        (!canComplete && questionNumber === totalQuestions) ? (
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  "🤔 Don't leave me hanging! Pick an answer!",
                  "🎭 Even a wild guess is better than no guess!",
                  "🍕 I'm hungry for your answer! Feed me!",
                  "🐱 My cat could answer this faster! (Just kidding)",
                  "🎪 The quiz circus needs your performance!",
                  "🚀 Houston, we need your answer to continue!",
                  "🎲 Roll the dice and pick something!",
                  "🦄 Unicorns believe in you! Pick an answer!",
                  "☕ Coffee break's over, time to answer!",
                  "🎨 Picasso said 'Every answer is art!'",
                  "🏆 You're not getting a trophy for skipping!",
                  "🎵 Don't be shy, give it a try!",
                  "🎈 This question is floating away without you!",
                  "🍀 Luck favors the bold! Make a choice!",
                  "🎪 Step right up and pick your answer!",
                ];

                if (questionNumber === totalQuestions) {
                  const finalMessages = [
                    "🎯 Last question! Don't chicken out now!",
                    "🏁 Almost at the finish line! One more answer!",
                    "🎉 Final boss battle! Defeat this question!",
                    "🥇 Gold medal answer coming up!",
                    "🎊 Last one! Make it count!",
                    "🚀 Launch sequence initiated! Answer required!",
                    "🎭 Final act! Give us your best performance!",
                    "🏆 Trophy is waiting! Just answer this!",
                  ];
                  return finalMessages[Math.floor(Math.random() * finalMessages.length)];
                } else {
                  return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
                }
              })()}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
