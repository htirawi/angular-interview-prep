/**
 * Question Tags Component
 */

import type { QuestionTagsProps } from "../../types/study-components";

export function QuestionTags({ tags }: QuestionTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 text-sm font-medium text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
