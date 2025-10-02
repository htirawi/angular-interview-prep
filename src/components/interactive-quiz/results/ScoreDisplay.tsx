/**
 * Score Display Component for Quiz Results
 */

import type { ScoreDisplayProps, PerformanceMessage } from "../../../types/quiz-results";

interface ScoreDisplayPropsInternal extends ScoreDisplayProps {
  performance: PerformanceMessage;
}

export function ScoreDisplay({
  animatedPercentage,
  correctAnswers,
  totalQuestions,
  performance,
}: ScoreDisplayPropsInternal) {
  const getScoreColor = () => {
    if (animatedPercentage >= 75) return "text-green-600";
    if (animatedPercentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreColorValue = () => {
    if (animatedPercentage >= 75) return "#059669";
    if (animatedPercentage >= 60) return "#d97706";
    return "#dc2626";
  };

  return (
    <div className="mb-6 text-center sm:mb-8">
      {/* Score Circle */}
      <div className="relative mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700" />

        {/* Progress circle */}
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            background: `conic-gradient(from 0deg, ${getScoreColorValue()} 0deg, ${getScoreColorValue()} ${(animatedPercentage / 100) * 360}deg, #e5e7eb 0deg)`,
          }}
        />

        {/* Inner circle */}
        <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800" />

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-2xl font-bold ${getScoreColor()} sm:text-3xl`}>
            {animatedPercentage}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Score</div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="mb-4 flex items-center justify-center gap-3 sm:gap-4">
        <div className="text-3xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          {correctAnswers}
        </div>
        <div className="text-2xl text-gray-400 dark:text-gray-500 sm:text-4xl">/</div>
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 sm:text-4xl">
          {totalQuestions}
        </div>
      </div>

      {/* Performance message */}
      <div className={`text-lg font-semibold ${performance.color} mb-3 sm:mb-4 sm:text-2xl`}>
        {performance.message}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-lg">
        {correctAnswers} out of {totalQuestions} questions correct
      </p>
    </div>
  );
}
