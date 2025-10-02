/**
 * Quiz Question Card - Beautiful question interface
 */

import { useState } from "react";
import type { QuizQuestion, QuizMode } from "../../types";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  mode: QuizMode;
  onAnswerSubmit: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onComplete: () => void;
}

export default function QuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  mode,
  onAnswerSubmit,
  onNext,
  onPrevious,
  canGoNext: _canGoNext,
  canGoPrevious,
  onComplete,
}: QuizQuestionCardProps) {
  const [answer, setAnswer] = useState(question.selectedAnswer || "");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const _handleSubmit = () => {
    if (answer.trim()) {
      onAnswerSubmit(answer.trim());
    }
  };

  const handleNext = () => {
    if (answer.trim() && !question.selectedAnswer) {
      onAnswerSubmit(answer.trim());
    }
    onNext();
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty) {
      case "intermediate":
        return "⭐";
      case "advanced":
        return "🔥";
      case "expert":
        return "💎";
      default:
        return "📝";
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Question Header */}
      <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">
              {questionNumber}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Question {questionNumber} of {totalQuestions}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
                >
                  {getDifficultyIcon(question.difficulty)} {question.difficulty?.toUpperCase()}
                </span>
                {question.category && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {question.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {mode === "practice" && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                💡 Hint
              </button>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                👁️ Show Answer
              </button>
            </div>
          )}
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold leading-relaxed text-gray-900 dark:text-white">
            {question.question}
          </h3>
        </div>

        {/* Hint */}
        {showHint && mode === "practice" && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Hint</h4>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Think about the core concepts and best practices related to this topic.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Answer Input */}
        <div className="mb-8">
          <label className="mb-3 block text-lg font-medium text-gray-900 dark:text-white">
            Your Answer:
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            rows={6}
            disabled={question.selectedAnswer !== undefined}
          />
        </div>

        {/* Show Answer */}
        {showAnswer && mode === "practice" && (
          <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div>
                <h4 className="mb-3 font-semibold text-green-800 dark:text-green-200">
                  Correct Answer
                </h4>
                <div className="prose prose-sm max-w-none text-green-700 dark:text-green-300">
                  <div
                    dangerouslySetInnerHTML={{ __html: question.answer.replace(/\n/g, "<br>") }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div className="flex gap-3">
            {questionNumber === totalQuestions ? (
              <button
                onClick={onComplete}
                className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Complete Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answer.trim() && !question.selectedAnswer}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
