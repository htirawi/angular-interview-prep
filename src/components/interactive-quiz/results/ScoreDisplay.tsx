/**
 * Score Display Component for Quiz Results
 */

import type { ScoreDisplayProps, PerformanceMessage } from "../../../types/quiz-results";

interface ScoreDisplayPropsInternal extends ScoreDisplayProps {
  performance: PerformanceMessage;
}

export function ScoreDisplay({
  animatedScore: _animatedScore,
  animatedPercentage,
  totalPoints: _totalPoints,
  correctAnswers,
  totalQuestions,
  performance,
}: ScoreDisplayPropsInternal) {
  const getScoreColor = () => {
    if (animatedPercentage >= 75) return "text-green-600";
    if (animatedPercentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="text-6xl font-bold text-gray-900 dark:text-white">{correctAnswers}</div>
        <div className="text-4xl text-gray-400 dark:text-gray-500">/</div>
        <div className="text-4xl font-semibold text-gray-700 dark:text-gray-300">
          {totalQuestions}
        </div>
      </div>

      <div className={`text-5xl font-bold ${getScoreColor()} mb-2`}>{animatedPercentage}%</div>

      <div className={`text-2xl font-semibold ${performance.color} mb-4`}>
        {performance.message}
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-400">
        {correctAnswers} out of {totalQuestions} questions correct
      </p>
    </div>
  );
}
