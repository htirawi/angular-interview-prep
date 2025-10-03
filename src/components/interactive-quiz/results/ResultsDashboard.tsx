/**
 * Comprehensive Results Dashboard Component
 * Advanced charts and statistics for quiz results
 */

import { useEffect, useState } from "react";
import type { QuizResultsProps } from "../../../types/quiz-results";

interface DashboardProps {
  result: QuizResultsProps["result"];
}

export function ResultsDashboard({ result }: DashboardProps) {
  const [animatedStats, setAnimatedStats] = useState({
    accuracy: 0,
    speed: 0,
    consistency: 0,
  });

  const { correctAnswers, totalQuestions, timeSpent, breakdown } = result;

  useEffect(() => {
    // Animate dashboard stats
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const avgTimePerQuestion = Math.round(timeSpent / totalQuestions);
    const consistency = Math.min(100, Math.max(0, 100 - (avgTimePerQuestion - 30) * 2));

    const duration = 1500;
    const steps = 30;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        accuracy: Math.round(accuracy * progress),
        speed: Math.round(avgTimePerQuestion * (1 - progress * 0.3)), // Animate down
        consistency: Math.round(consistency * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [correctAnswers, totalQuestions, timeSpent]);

  const getDifficultyStats = () => {
    const stats = {
      easy: { correct: 0, total: 0, percentage: 0 },
      medium: { correct: 0, total: 0, percentage: 0 },
      hard: { correct: 0, total: 0, percentage: 0 },
    };

    // breakdown is an object with category keys, not an array
    Object.values(breakdown).forEach((item: { correct: number; total: number }) => {
      // For now, we'll distribute evenly across difficulties
      // In a real implementation, you'd have difficulty info in the breakdown
      const easyCount = Math.floor(item.total / 3);
      const mediumCount = Math.floor(item.total / 3);
      const hardCount = item.total - easyCount - mediumCount;

      const easyCorrect = Math.floor(item.correct / 3);
      const mediumCorrect = Math.floor(item.correct / 3);
      const hardCorrect = item.correct - easyCorrect - mediumCorrect;

      stats.easy.total += easyCount;
      stats.easy.correct += easyCorrect;
      stats.medium.total += mediumCount;
      stats.medium.correct += mediumCorrect;
      stats.hard.total += hardCount;
      stats.hard.correct += hardCorrect;
    });

    // Calculate percentages
    Object.keys(stats).forEach((key) => {
      const stat = stats[key as keyof typeof stats];
      if (stat.total > 0) {
        stat.percentage = Math.round((stat.correct / stat.total) * 100);
      }
    });

    return stats;
  };

  const difficultyStats = getDifficultyStats();

  return (
    <div className="space-y-8">
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Accuracy Chart */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-emerald-900/20 dark:to-green-800/20">
          <div className="absolute inset-0 bg-emerald-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                Accuracy
              </h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                <span className="text-sm font-bold text-white">✓</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-emerald-600">{animatedStats.accuracy}%</div>
              <div className="text-sm text-emerald-700 dark:text-emerald-400">
                {correctAnswers} of {totalQuestions} correct
              </div>
            </div>

            {/* Mini progress bar */}
            <div className="h-2 rounded-full bg-emerald-200 dark:bg-emerald-800">
              <div
                className="duration-1500 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all"
                style={{ width: `${animatedStats.accuracy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Speed Chart */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-blue-900/20 dark:to-indigo-800/20">
          <div className="absolute inset-0 bg-blue-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Speed</h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <span className="text-sm font-bold text-white">⚡</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-blue-600">{animatedStats.speed}s</div>
              <div className="text-sm text-blue-700 dark:text-blue-400">Average per question</div>
            </div>

            {/* Speed indicator */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    i < Math.floor((100 - animatedStats.speed) / 20)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                      : "bg-blue-200 dark:bg-blue-800"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Consistency Chart */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-purple-900/20 dark:to-violet-800/20">
          <div className="absolute inset-0 bg-purple-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                Consistency
              </h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <span className="text-sm font-bold text-white">🎯</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-purple-600">{animatedStats.consistency}%</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">
                Performance stability
              </div>
            </div>

            {/* Consistency dots */}
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-full transition-all duration-500 ${
                    i < Math.floor(animatedStats.consistency / 20)
                      ? "bg-gradient-to-r from-purple-500 to-violet-600"
                      : "bg-purple-200 dark:bg-purple-800"
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Performance by Difficulty
        </h3>

        <div className="space-y-4">
          {Object.entries(difficultyStats).map(([difficulty, stats]) => (
            <div key={difficulty} className="group">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      difficulty === "easy"
                        ? "bg-green-500"
                        : difficulty === "medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                    {difficulty} Questions
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stats.correct}/{stats.total} ({stats.percentage}%)
                </div>
              </div>

              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    difficulty === "easy"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : difficulty === "medium"
                        ? "bg-gradient-to-r from-yellow-500 to-amber-600"
                        : "bg-gradient-to-r from-red-500 to-rose-600"
                  }`}
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-lg dark:from-gray-800 dark:to-slate-700">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Performance Insights
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white/60 p-4 dark:bg-gray-800/60">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-bold text-white">📊</span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Best Category</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {
                Object.entries(breakdown).reduce((best, [category, stats]) =>
                  stats.correct / stats.total > best[1].correct / best[1].total
                    ? [category, stats]
                    : best
                )[0]
              }
            </p>
          </div>

          <div className="rounded-xl bg-white/60 p-4 dark:bg-gray-800/60">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                <span className="text-xs font-bold text-white">🎯</span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Focus Area</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {
                Object.entries(breakdown).reduce((worst, [category, stats]) =>
                  stats.correct / stats.total < worst[1].correct / worst[1].total
                    ? [category, stats]
                    : worst
                )[0]
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
