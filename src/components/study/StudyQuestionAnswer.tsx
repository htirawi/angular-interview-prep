/**
 * Study Question Answer Component
 */

import type { QuestionAnswerProps } from "../../types/study-components";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

export function StudyQuestionAnswer({ item, isAnswerVisible, answerRef }: QuestionAnswerProps) {
  if (!isAnswerVisible) return null;

  return (
    <div
      ref={answerRef}
      className="space-y-3 px-2 py-4 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3 dark:from-gray-900/50 dark:to-gray-800/50 sm:rounded-xl sm:p-6 lg:p-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 sm:mb-6 sm:text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          Expert Answer
        </div>
        <div className="prose prose-sm dark:prose-invert sm:prose-lg w-full overflow-hidden">
          <MarkdownRenderer content={item.answer} />
        </div>
      </div>
    </div>
  );
}
