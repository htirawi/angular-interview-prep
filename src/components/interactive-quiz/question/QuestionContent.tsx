/**
 * Question Content Component for Interactive Quiz
 */

import type { QuestionContentProps } from "../../../types/interactive-quiz-components";

export function QuestionContent({ question, userAnswer, onAnswerChange }: QuestionContentProps) {
  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2 sm:space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className={`group flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:gap-4 sm:p-4 ${
                  userAnswer === option.id
                    ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={userAnswer === option.id}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-blue-400 dark:focus:ring-blue-400 sm:h-5 sm:w-5"
                  aria-label={`Select option: ${option.text}`}
                />
                <span className="flex-1 text-sm text-gray-800 dark:text-gray-200 sm:text-base">
                  {option.text}
                </span>
                {userAnswer === option.id && (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-in zoom-in-50 h-4 w-4 text-blue-600 duration-200 dark:text-blue-400 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-6">
            {/* Enhanced input field with better styling */}
            <div className="relative">
              <input
                type="text"
                value={userAnswer as string}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Enter your answer..."
                className={`w-full rounded-xl border-2 bg-white p-4 text-lg font-medium text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 ${
                  userAnswer && (userAnswer as string).trim()
                    ? "border-green-500 bg-green-50/30 focus:border-green-500 focus:ring-green-100 dark:border-green-400 dark:bg-green-900/20 dark:focus:border-green-400 dark:focus:ring-green-900/30"
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:bg-blue-900/20 dark:focus:ring-blue-900/30"
                }`}
                aria-label="Answer input field"
                aria-describedby="answer-hint"
              />
              {/* Input indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {userAnswer && (userAnswer as string).trim() ? (
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Character count and validation feedback */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                {userAnswer && (userAnswer as string).trim()
                  ? "Answer provided ✓"
                  : "Please enter your answer"}
              </div>
              <div className="text-gray-400 dark:text-gray-500">
                {(userAnswer as string)?.length || 0} characters
              </div>
            </div>

            {/* Helpful hint */}
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 text-blue-500 dark:text-blue-400"
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
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-medium">Tip:</span> Type the exact term or phrase that
                  completes the statement. The answer is case-sensitive.
                </p>
              </div>
            </div>
          </div>
        );

      case "multiple-checkbox":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className={`group flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${
                  Array.isArray(userAnswer) && userAnswer.includes(option.id)
                    ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(userAnswer) && userAnswer.includes(option.id)}
                  onChange={(e) => {
                    const newAnswer = Array.isArray(userAnswer) ? [...userAnswer] : [];
                    if (e.target.checked) {
                      onAnswerChange([...newAnswer, option.id]);
                    } else {
                      onAnswerChange(newAnswer.filter((id) => id !== option.id));
                    }
                  }}
                  className="h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:text-blue-400 dark:focus:ring-blue-400"
                  aria-label={`Select option: ${option.text}`}
                />
                <span className="flex-1 text-gray-800 dark:text-gray-200">{option.text}</span>
                {Array.isArray(userAnswer) && userAnswer.includes(option.id) && (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-in zoom-in-50 h-5 w-5 text-blue-600 duration-200 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        );

      case "true-false":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label
              className={`group flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md ${
                userAnswer === "true"
                  ? "border-green-500 bg-green-50 shadow-md dark:border-green-400 dark:bg-green-900/20"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-600 dark:hover:border-green-500 dark:hover:bg-green-900/10"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value="true"
                checked={userAnswer === "true"}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:text-green-400 dark:focus:ring-green-400"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">✓ True</span>
              {userAnswer === "true" && (
                <svg
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </label>
            <label
              className={`group flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md ${
                userAnswer === "false"
                  ? "border-red-500 bg-red-50 shadow-md dark:border-red-400 dark:bg-red-900/20"
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-600 dark:hover:border-red-500 dark:hover:bg-red-900/10"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value="false"
                checked={userAnswer === "false"}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="h-5 w-5 text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-red-400 dark:focus:ring-red-400"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                ✗ False
              </span>
              {userAnswer === "false" && (
                <svg
                  className="h-5 w-5 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </label>
          </div>
        );

      default:
        return <p className="text-red-500">Unknown question type</p>;
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="mb-6 text-lg font-semibold leading-relaxed text-gray-900 dark:text-white sm:mb-8 sm:text-xl lg:text-2xl">
        {question.type === "fill-blank" ? (
          <span className="inline-block">
            {question.question.split("____").map((part, index) => (
              <span key={index}>
                {part}
                {index < question.question.split("____").length - 1 && (
                  <span className="mx-1 inline-block min-w-[80px] border-b-2 border-dashed border-blue-400 bg-blue-50 px-2 py-1 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300 sm:mx-2 sm:min-w-[120px] sm:px-3">
                    [Your Answer]
                  </span>
                )}
              </span>
            ))}
          </span>
        ) : (
          question.question
        )}
      </h3>
      <div>{renderQuestionContent()}</div>
    </div>
  );
}
