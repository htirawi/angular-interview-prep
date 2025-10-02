/**
 * Quiz Results Component - Beautiful results display with achievements
 */

import { useState, useEffect } from "react";
import type { QuizResult } from "../../types";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onBackToSelection: () => void;
}

export default function QuizResults({ result, onRestart, onBackToSelection }: QuizResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showAchievements, setShowAchievements] = useState(false);

  const { score, achievements, recommendations } = result;

  useEffect(() => {
    // Animate score counting
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = score.percentage / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score.percentage) {
        current = score.percentage;
        clearInterval(timer);
        setTimeout(() => setShowAchievements(true), 500);
      }
      setAnimatedScore(Math.round(current));
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score.percentage]);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 dark:bg-green-900/20";
    if (percentage >= 75) return "bg-blue-100 dark:bg-blue-900/20";
    if (percentage >= 60) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! You're a true expert! 🏆";
    if (percentage >= 75) return "Excellent work! You're doing great! 🌟";
    if (percentage >= 60) return "Good job! Keep practicing! 💪";
    return "Keep learning! You'll get there! 📚";
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "junior":
        return "🌱";
      case "intermediate":
        return "🚀";
      case "senior":
        return "💎";
      default:
        return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Quiz Complete!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Great job completing the {score.level} level quiz
          </p>
        </div>

        {/* Score Card */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div
            className={`rounded-2xl p-8 text-center shadow-2xl ${getScoreBgColor(score.percentage)}`}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">{getLevelIcon(score.level)}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {score.level.toUpperCase()} Level
              </h2>
            </div>

            <div className="mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(score.percentage)}`}>
                {animatedScore}%
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {score.correct} out of {score.total} questions correct
              </p>
            </div>

            <div className="mb-6 text-lg font-semibold text-gray-800 dark:text-gray-200">
              {getScoreMessage(score.percentage)}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.floor(score.timeSpent / 60)}m {score.timeSpent % 60}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {score.averageTimePerQuestion}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg per Question</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mx-auto mb-8 max-w-4xl">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              🏆 Achievements Unlocked!
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`rounded-xl border-2 p-6 text-center transition-all duration-500 ${
                    showAchievements ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mb-3 text-4xl">{achievement.icon}</div>
                  <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="mx-auto mb-8 max-w-3xl">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            💡 Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-800/80">
                <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            onClick={onBackToSelection}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Selection
          </button>
        </div>

        {/* Level Breakdown */}
        <div className="mx-auto mt-12 max-w-2xl">
          <h3 className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-white">
            Performance Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white/80 p-4 text-center dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {score.breakdown.junior}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Junior</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 text-center dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {score.breakdown.intermediate}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Intermediate</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 text-center dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {score.breakdown.senior}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Senior</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
