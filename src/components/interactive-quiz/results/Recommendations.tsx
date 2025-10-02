/**
 * Recommendations Component for Quiz Results
 */

import type { RecommendationsProps } from "../../../types/quiz-results";

export function Recommendations({ recommendations }: RecommendationsProps) {
  const getRecommendationIcon = (index: number) => {
    const icons = ["💡", "🎯", "📚", "🚀", "⭐", "💪", "🎉", "🔍"];
    return icons[index % icons.length];
  };

  const getRecommendationColor = (index: number) => {
    const colors = [
      "from-yellow-400 to-orange-500",
      "from-blue-400 to-purple-500",
      "from-green-400 to-teal-500",
      "from-pink-400 to-rose-500",
      "from-indigo-400 to-blue-500",
      "from-emerald-400 to-green-500",
      "from-amber-400 to-yellow-500",
      "from-cyan-400 to-blue-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      <h3 className="mb-3 text-center text-lg font-bold text-gray-900 dark:text-white sm:mb-4 sm:text-xl">
        💡 Recommendations
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20 sm:p-4"
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getRecommendationColor(index)} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
            />

            <div className="relative flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 text-xl sm:text-2xl">
                {getRecommendationIcon(index)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-300 sm:text-base">
                  {recommendation}
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 right-0 h-8 w-8 rounded-tl-full bg-gradient-to-tr from-yellow-200/30 to-transparent dark:from-yellow-700/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
