import { useState, useEffect } from "react";

interface MockInterviewModeProps {
  isActive: boolean;
  duration: number; // in minutes
  onComplete: (results: MockInterviewResults) => void;
  onCancel: () => void;
}

export interface MockInterviewResults {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  averageTimePerQuestion: number;
}

/**
 * Mock Interview Mode Component
 * Provides timed practice sessions with performance tracking
 */
export function MockInterviewMode({
  isActive,
  duration,
  onComplete,
  onCancel,
}: MockInterviewModeProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isPaused, setIsPaused] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - complete the interview
          onComplete({
            totalQuestions: questionsAnswered + 1, // Estimate
            answeredQuestions: questionsAnswered,
            correctAnswers,
            accuracy: questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0,
            timeSpent: duration * 60 - prev,
            averageTimePerQuestion:
              questionsAnswered > 0 ? (duration * 60 - prev) / questionsAnswered : 0,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPaused, duration, questionsAnswered, correctAnswers, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const _handleAnswer = (correct: boolean) => {
    setQuestionsAnswered((prev) => prev + 1);
    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleComplete = () => {
    onComplete({
      totalQuestions: questionsAnswered + 1,
      answeredQuestions: questionsAnswered,
      correctAnswers,
      accuracy: questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0,
      timeSpent: duration * 60 - timeLeft,
      averageTimePerQuestion:
        questionsAnswered > 0 ? (duration * 60 - timeLeft) / questionsAnswered : 0,
    });
  };

  if (!isActive) return null;

  return (
    <div className="fixed right-4 top-4 z-50 min-w-[300px] rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mock Interview</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Timer */}
      <div className="mb-4 text-center">
        <div
          className={`font-mono text-3xl font-bold ${
            timeLeft < 60 ? "text-red-500" : timeLeft < 300 ? "text-yellow-500" : "text-green-500"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {isPaused ? "Paused" : "Time Remaining"}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {questionsAnswered}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Questions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePause}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isPaused
              ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
          }`}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
        >
          Complete
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <p>• Answer questions as quickly and accurately as possible</p>
        <p>• Use keyboard shortcuts for faster navigation</p>
        <p>• Focus on understanding, not just speed</p>
      </div>
    </div>
  );
}

export default MockInterviewMode;
