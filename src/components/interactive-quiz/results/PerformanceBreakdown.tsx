/**
 * Performance Breakdown Component for Quiz Results
 */

import type { PerformanceBreakdownProps } from "../../../types/quiz-results";

export function PerformanceBreakdown({ breakdown }: PerformanceBreakdownProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
        Performance by Question Type
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(breakdown).map(([type, data]: [string, any]) => (
          <div key={type} className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.correct}/{data.total}
            </div>
            <div className="text-sm capitalize text-gray-600 dark:text-gray-400">
              {type.replace(/-/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
