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
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center dark:from-blue-900/20 dark:to-blue-800/20">
        <div className="mb-2 text-3xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
        <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Time Spent</div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center dark:from-green-900/20 dark:to-green-800/20">
        <div className="mb-2 text-3xl font-bold text-green-600">
          {Math.round(timeSpent / totalQuestions)}s
        </div>
        <div className="text-sm font-medium text-green-800 dark:text-green-300">
          Avg per Question
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center dark:from-purple-900/20 dark:to-purple-800/20">
        <div className="mb-2 text-3xl font-bold text-purple-600">
          {Math.round((correctAnswers / totalQuestions) * 100)}%
        </div>
        <div className="text-sm font-medium text-purple-800 dark:text-purple-300">
          Accuracy Rate
        </div>
      </div>
    </div>
  );
}
