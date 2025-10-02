/**
 * Performance Breakdown Component for Quiz Results
 */

import type { PerformanceBreakdownProps } from "../../../types/quiz-results";

export function PerformanceBreakdown({ breakdown }: PerformanceBreakdownProps) {
  const getTypeIcon = (type: string) => {
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
        return "📝";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return "from-blue-500 to-blue-600";
      case "fill-blank":
        return "from-green-500 to-green-600";
      case "multiple-checkbox":
        return "from-purple-500 to-purple-600";
      case "true-false":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div>
      <h3 className="mb-3 text-center text-lg font-bold text-gray-900 dark:text-white sm:mb-4 sm:text-xl">
        Performance by Question Type
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
        {Object.entries(breakdown).map(([type, data]) => {
          const percentage = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
          const typeName = type.replace(/-/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");

          return (
            <div
              key={type}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-3 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:from-gray-700 dark:to-gray-800 sm:p-4"
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(type)} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />

              {/* Icon */}
              <div className="mb-2 text-2xl sm:text-3xl">{getTypeIcon(type)}</div>

              {/* Score */}
              <div className="mb-1 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                {data.correct}/{data.total}
              </div>

              {/* Type name */}
              <div className="mb-1 text-xs capitalize text-gray-600 dark:text-gray-400 sm:text-sm">
                {typeName}
              </div>

              {/* Percentage */}
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-500 sm:text-sm">
                {percentage}%
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getTypeColor(type)} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
