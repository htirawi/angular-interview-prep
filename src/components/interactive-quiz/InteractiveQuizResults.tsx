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
import { analyzeAnswers, getPerformanceMessage } from "../../utils/quizAnalysis";

export default function InteractiveQuizResults({
  result,
  onBackToSelection,
  onRestart,
}: QuizResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [_showDetails, setShowDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"overview" | "analysis">("overview");

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
  const answerAnalysis = analyzeAnswers(session.questions, session.answers);
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
        setTimeout(() => setShowDetails(true), 500);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, percentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Quiz Complete! 🎯
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Here's how you performed</p>
        </div>

        {/* Main Score Card */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            {/* Score Display */}
            <ScoreDisplay
              animatedScore={animatedScore}
              animatedPercentage={animatedPercentage}
              totalPoints={totalPoints}
              correctAnswers={correctAnswers}
              totalQuestions={totalQuestions}
              performance={performance}
            />

            {/* Stats Grid */}
            <StatsGrid
              timeSpent={timeSpent}
              totalQuestions={totalQuestions}
              correctAnswers={correctAnswers}
            />

            {/* Tab Navigation */}
            <TabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />

            {/* Tab Content */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                <PerformanceBreakdown breakdown={breakdown} />
                <Recommendations recommendations={recommendations} />
              </div>
            )}

            {selectedTab === "analysis" && <AnswerAnalysis answerAnalysis={answerAnalysis} />}
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons onRestart={onRestart} onBackToSelection={onBackToSelection} />
      </div>
    </div>
  );
}
