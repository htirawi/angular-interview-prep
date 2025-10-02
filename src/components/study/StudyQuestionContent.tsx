/**
 * Study Question Content Component
 */

import type { QuestionContentProps } from "../../types/study-components";

export function StudyQuestionContent({
  item,
  isAnswerVisible,
  onRevealAnswer,
}: QuestionContentProps) {
  return (
    <div className="px-8 py-10">
      <h2 className="mb-8 text-2xl font-semibold leading-relaxed text-gray-900 dark:text-white">
        {item.question}
      </h2>

      {!isAnswerVisible ? (
        <button
          onClick={onRevealAnswer}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Reveal Answer
        </button>
      ) : null}
    </div>
  );
}
