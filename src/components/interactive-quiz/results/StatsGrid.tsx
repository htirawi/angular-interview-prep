/**
 * Stats Grid Component for Quiz Results
 */

import type { StatsGridProps } from "../../../types/quiz-results";

export function StatsGrid({ timeSpent, totalQuestions, correctAnswers }: StatsGridProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:gap-6 md:grid-cols-3">
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:from-blue-900/20 dark:to-blue-800/20 sm:p-6">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-blue-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

        <div className="relative">
          <div className="mb-2 text-2xl font-bold text-blue-600 sm:text-3xl">
            {formatTime(timeSpent)}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-800 dark:text-blue-300">
            <span className="text-lg">⏱️</span>
            <span>Time Spent</span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:from-green-900/20 dark:to-green-800/20 sm:p-6">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-green-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

        <div className="relative">
          <div className="mb-2 text-2xl font-bold text-green-600 sm:text-3xl">
            {Math.round(timeSpent / totalQuestions)}s
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-800 dark:text-green-300">
            <span className="text-lg">⚡</span>
            <span>Avg per Question</span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:from-purple-900/20 dark:to-purple-800/20 sm:p-6">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-purple-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

        <div className="relative">
          <div className="mb-2 text-2xl font-bold text-purple-600 sm:text-3xl">
            {Math.round((correctAnswers / totalQuestions) * 100)}%
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-purple-800 dark:text-purple-300">
            <span className="text-lg">🎯</span>
            <span>Accuracy Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
