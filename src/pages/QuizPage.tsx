/**
 * Quiz Page - Main quiz interface with beautiful UX
 */

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { EnrichedQuestion } from "@/types/question";
import { QuizService } from "@/services/QuizService";
import { ALL_QUESTIONS } from "@/data";
import QuizQuestionCard from "../components/quiz/QuizQuestionCard";
import QuizProgress from "../components/quiz/QuizProgress";
import QuizTimer from "../components/quiz/QuizTimer";
import QuizResults from "../components/quiz/QuizResults";
import type { QuizSession, QuizQuestion, QuizLevel, QuizMode, QuizResult } from "../types";

export default function QuizPage() {
  const { framework, level, mode } = useParams<{
    framework: string;
    level: QuizLevel;
    mode: QuizMode;
  }>();

  const navigate = useNavigate();

  const [session, setSession] = useState<QuizSession | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Load questions and create session
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);

        if (!framework || !level || !mode) {
          throw new Error("Missing quiz parameters");
        }

        // Load questions for the framework
        const questionLoader = ALL_QUESTIONS[framework as keyof typeof ALL_QUESTIONS];
        if (!questionLoader) {
          throw new Error(`Framework ${framework} not found`);
        }

        const frameworkQuestions = await questionLoader();
        const quizQuestions = QuizService.generateQuizQuestions(
          level,
          frameworkQuestions as EnrichedQuestion[]
        );

        const newSession = QuizService.createQuizSession(
          {
            level,
            mode,
            questionCount: quizQuestions.length,
            allowSkip: mode === "practice",
            showHints: mode === "practice",
            shuffleQuestions: true,
          },
          quizQuestions
        );

        setQuestions(quizQuestions);
        setSession(newSession);
        setQuestionStartTime(Date.now());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [framework, level, mode]);

  // Handle answer submission
  const handleAnswerSubmit = useCallback(
    (answer: string) => {
      if (!session) return;

      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      const updatedSession = QuizService.submitAnswer(
        session,
        session.currentQuestionIndex,
        answer,
        timeSpent
      );

      setSession(updatedSession);
      setQuestionStartTime(Date.now());
    },
    [session, questionStartTime]
  );

  // Handle next question
  const handleNext = useCallback(() => {
    if (!session) return;

    const updatedSession = QuizService.nextQuestion(session);
    setSession(updatedSession);
    setQuestionStartTime(Date.now());
  }, [session]);

  // Handle previous question
  const handlePrevious = useCallback(() => {
    if (!session) return;

    const updatedSession = QuizService.previousQuestion(session);
    setSession(updatedSession);
    setQuestionStartTime(Date.now());
  }, [session]);

  // Handle quiz completion
  const handleCompleteQuiz = useCallback(() => {
    if (!session) return;

    const quizResult = QuizService.completeQuiz(session);
    setResult(quizResult);
  }, [session]);

  // Handle restart
  const handleRestart = useCallback(() => {
    navigate(`/quiz/${framework}/${level}/${mode}`);
  }, [navigate, framework, level, mode]);

  // Handle back to selection
  const handleBackToSelection = useCallback(() => {
    navigate(`/quiz/${framework}`);
  }, [navigate, framework]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mb-4 text-6xl">😞</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Oops!</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <QuizResults
        result={result}
        onRestart={handleRestart}
        onBackToSelection={handleBackToSelection}
      />
    );
  }

  if (!session) {
    return null;
  }

  const currentQuestion = questions[session.currentQuestionIndex];
  const progress = ((session.currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToSelection}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {framework?.toUpperCase()}
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {level?.toUpperCase()}
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  {mode?.toUpperCase()}
                </span>
              </div>
            </div>

            <QuizTimer
              startTime={session.startTime}
              onTimeUp={mode === "quiz" ? handleCompleteQuiz : undefined}
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 py-2">
          <QuizProgress
            current={session.currentQuestionIndex + 1}
            total={questions.length}
            progress={progress}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <QuizQuestionCard
          question={currentQuestion}
          questionNumber={session.currentQuestionIndex + 1}
          totalQuestions={questions.length}
          mode={mode as QuizMode}
          onAnswerSubmit={handleAnswerSubmit}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={session.currentQuestionIndex < questions.length - 1}
          canGoPrevious={session.currentQuestionIndex > 0}
          onComplete={handleCompleteQuiz}
        />
      </div>

      {/* Enhanced Footer */}
      <div className="mt-20 border-t border-slate-200/50 pt-12 dark:border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Built with React 19, TypeScript, and Tailwind CSS
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              Crafted with ❤️ by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                Hussein Tirawi
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
              © 2024 All rights reserved
            </p>
            <div className="mt-6">
              <a
                href="https://github.com/htirawi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
