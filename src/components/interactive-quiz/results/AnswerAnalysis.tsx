/**
 * Answer Analysis Component for Quiz Results
 */

import type { AnswerAnalysisProps } from "../../../types/quiz-results";

export function AnswerAnalysis({ answerAnalysis }: AnswerAnalysisProps) {
  return (
    <div className="space-y-6">
      <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
        Question-by-Question Analysis
      </h3>

      <div className="space-y-4">
        {answerAnalysis.map((analysis, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-6 ${
              analysis.isCorrect
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white ${
                  analysis.isCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      analysis.isCorrect
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {analysis.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {analysis.question.type.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {analysis.question.question}
                </h4>

                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Your answer:{" "}
                    </span>
                    <span
                      className={`font-medium ${
                        analysis.isCorrect
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {Array.isArray(analysis.userAnswer)
                        ? analysis.userAnswer.join(", ")
                        : analysis.userAnswer}
                    </span>
                  </div>

                  {!analysis.isCorrect && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Correct answer:{" "}
                      </span>
                      <span className="font-medium text-green-700 dark:text-green-400">
                        {Array.isArray(analysis.correctAnswer)
                          ? analysis.correctAnswer.join(", ")
                          : analysis.correctAnswer}
                      </span>
                    </div>
                  )}

                  <div className="mt-3 rounded-lg bg-white/50 p-3 dark:bg-gray-800/50">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">💡</span>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Explanation:{" "}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {analysis.explanation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
