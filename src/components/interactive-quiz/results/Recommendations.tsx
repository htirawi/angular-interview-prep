/**
 * Recommendations Component for Quiz Results
 */

import type { RecommendationsProps } from "../../../types/quiz-results";

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
        💡 Recommendations
      </h3>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20"
          >
            <p className="text-yellow-800 dark:text-yellow-300">{recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
