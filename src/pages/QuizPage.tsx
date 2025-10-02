/**
 * Quiz Page - Main quiz interface with beautiful UX
 */

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { EnrichedQuestion } from "@/types/question";
import { QuizService } from "@/services/QuizService";
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
    </div>
  );
}
