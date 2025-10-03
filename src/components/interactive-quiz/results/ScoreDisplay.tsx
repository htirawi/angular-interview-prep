/**
 * Enhanced Score Display Component for Quiz Results
 * Professional circular progress chart with smooth animations
 */

import { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [strokeDasharray, setStrokeDasharray] = useState("0 100");

  useEffect(() => {
    setIsVisible(true);
    // Animate the stroke-dasharray for smooth progress animation
    const circumference = 2 * Math.PI * 45; // radius = 45
    const progress = (animatedPercentage / 100) * circumference;
    setStrokeDasharray(`${progress} ${circumference}`);
  }, [animatedPercentage]);

  const getScoreColor = () => {
    if (animatedPercentage >= 80) return "text-emerald-600";
    if (animatedPercentage >= 70) return "text-blue-600";
    if (animatedPercentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreColorValue = () => {
    if (animatedPercentage >= 80) return "#059669";
    if (animatedPercentage >= 70) return "#2563eb";
    if (animatedPercentage >= 60) return "#d97706";
    return "#dc2626";
  };

  const getScoreGradient = () => {
    if (animatedPercentage >= 80) return "from-emerald-500 to-green-600";
    if (animatedPercentage >= 70) return "from-blue-500 to-indigo-600";
    if (animatedPercentage >= 60) return "from-amber-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  return (
    <div className="mb-8 text-center">
      {/* Enhanced Score Circle with SVG */}
      <div className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56">
        {/* Background circle with subtle shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner dark:from-gray-700 dark:to-gray-800" />

        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getScoreColorValue()} />
              <stop offset="100%" stopColor={getScoreColorValue()} style={{ opacity: 0.8 }} />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className={`duration-2000 transition-all ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))",
            }}
          />
        </svg>

        {/* Inner content with enhanced styling */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Score percentage with enhanced typography */}
          <div
            className={`text-4xl font-bold transition-all duration-1000 ${getScoreColor()} sm:text-5xl`}
          >
            {animatedPercentage}%
          </div>

          {/* Score label with subtle styling */}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            Score
          </div>

          {/* Subtle performance indicator */}
          <div
            className={`mt-2 h-1 w-12 rounded-full bg-gradient-to-r ${getScoreGradient()} opacity-60`}
          />
        </div>
      </div>

      {/* Enhanced Score breakdown with better typography */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="text-5xl font-bold text-gray-900 transition-all duration-1000 dark:text-white sm:text-7xl">
          {correctAnswers}
        </div>
        <div className="text-3xl text-gray-300 dark:text-gray-600 sm:text-5xl">/</div>
        <div className="text-3xl font-semibold text-gray-600 dark:text-gray-400 sm:text-5xl">
          {totalQuestions}
        </div>
      </div>

      {/* Enhanced Performance message with better styling */}
      <div
        className={`text-xl font-bold transition-all duration-1000 ${performance.color} mb-4 sm:text-2xl`}
      >
        {performance.message}
      </div>

      {/* Enhanced Description with subtle background */}
      <div className="mx-auto max-w-md rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          {correctAnswers} out of {totalQuestions} questions correct
        </p>
      </div>

      {/* Additional visual elements */}
      <div className="mt-6 flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              i < Math.floor(animatedPercentage / 20)
                ? `bg-gradient-to-r ${getScoreGradient()}`
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
