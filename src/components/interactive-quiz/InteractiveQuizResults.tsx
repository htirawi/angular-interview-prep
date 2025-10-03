/**
 * Interactive Quiz Results Component - Refactored
 * Uses smaller, focused components for better maintainability
 */

import { useState, useEffect } from "react";
import type { QuizResultsProps } from "../../types/quiz-results";
import { ScoreDisplay } from "./results/ScoreDisplay";
import { StatsGrid } from "./results/StatsGrid";
import { TabNavigation } from "./results/TabNavigation";
import { PerformanceBreakdown } from "./results/PerformanceBreakdown";
import { Recommendations } from "./results/Recommendations";
import { AnswerAnalysis } from "./results/AnswerAnalysis";
import { ActionButtons } from "./results/ActionButtons";
import { ResultsDashboard } from "./results/ResultsDashboard";
import { analyzeAnswers, getPerformanceMessage } from "../../utils/quizAnalysis";
import type { InteractiveQuizQuestion } from "../../types/interactive-quiz";

export default function InteractiveQuizResults({
  result,
  onBackToSelection,
  onRestart,
}: QuizResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<"overview" | "analysis" | "dashboard">("overview");

  const {
    session,
    score,
    totalPoints,
    percentage,
    correctAnswers,
    totalQuestions,
    timeSpent,
    breakdown,
    recommendations,
  } = result;

  // Analyze answers using utility function
  const answerAnalysis = analyzeAnswers(
    (session as Record<string, unknown>).questions as InteractiveQuizQuestion[],
    (session as Record<string, unknown>).answers as Record<string, string | string[]>
  );
  const performance = getPerformanceMessage(percentage);

  useEffect(() => {
    // Animate score counting
    const duration = 2000;
    const steps = 60;
    const scoreIncrement = score / steps;
    const percentageIncrement = percentage / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const currentScore = Math.round(scoreIncrement * currentStep);
      const currentPercentage = Math.round(percentageIncrement * currentStep);

      setAnimatedScore(currentScore);
      setAnimatedPercentage(currentPercentage);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, percentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:px-6 sm:py-12">
        {/* Enhanced Header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600">
              <span className="text-sm font-bold text-white">✓</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Quiz Complete
            </span>
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-blue-200 dark:to-indigo-200 sm:text-5xl">
            Excellent Work! 🎯
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            Here's your detailed performance analysis
          </p>
        </div>

        {/* Enhanced Main Score Card */}
        <div className="mx-auto mb-8 max-w-5xl sm:mb-12">
          <div className="overflow-hidden rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur-sm dark:bg-gray-800/80 sm:rounded-[2rem] sm:p-10">
            {/* Score Display */}
            <ScoreDisplay
              animatedScore={animatedScore}
              animatedPercentage={animatedPercentage}
              totalPoints={totalPoints}
              correctAnswers={correctAnswers}
              totalQuestions={totalQuestions}
              performance={performance}
            />

            {/* Enhanced Stats Grid */}
            <div className="mb-8">
              <StatsGrid
                timeSpent={timeSpent}
                totalQuestions={totalQuestions}
                correctAnswers={correctAnswers}
              />
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="mb-8">
              <TabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />
            </div>

            {/* Enhanced Tab Content */}
            {selectedTab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                <PerformanceBreakdown breakdown={breakdown} />
                <Recommendations recommendations={recommendations} />
              </div>
            )}

            {selectedTab === "analysis" && <AnswerAnalysis answerAnalysis={answerAnalysis} />}

            {selectedTab === "dashboard" && <ResultsDashboard result={result} />}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="px-4 sm:px-0">
          <ActionButtons onRestart={onRestart} onBackToSelection={onBackToSelection} />
        </div>
      </div>
    </div>
  );
}
