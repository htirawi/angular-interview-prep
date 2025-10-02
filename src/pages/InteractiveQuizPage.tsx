/**
 * Interactive Quiz Page - Main quiz interface with different question types
 */

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { InteractiveQuizService } from "../services/InteractiveQuizService";
import InteractiveQuizQuestionCard from "../components/interactive-quiz/InteractiveQuizQuestionCard";
import QuizProgress from "../components/quiz/QuizProgress";
import QuizTimer from "../components/quiz/QuizTimer";
import InteractiveQuizResults from "../components/interactive-quiz/InteractiveQuizResults";
import type {
  InteractiveQuizQuestion,
  InteractiveQuizSession,
  InteractiveQuizResult,
} from "../types/interactive-quiz";

export default function InteractiveQuizPage() {
  const { framework, level } = useParams<{
    framework: string;
    level: string;
  }>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract retry parameter to avoid useEffect dependency issues
  const retryParam = searchParams.get("retry");

  const [session, setSession] = useState<InteractiveQuizSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InteractiveQuizResult | null>(null);

  // Load questions and create session
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);

        if (!framework) {
          throw new Error("Framework not specified");
        }

        // Load quiz data lazily
        const quizData = await InteractiveQuizService.loadQuizData();
        const frameworkData = quizData[framework as keyof typeof quizData];
        if (!frameworkData) {
          throw new Error(`Framework ${framework} not found`);
        }

        // Get questions for the specific level
        let quizQuestions: InteractiveQuizQuestion[] = [];
        if (level && frameworkData[level as keyof typeof frameworkData]) {
          quizQuestions = frameworkData[level as keyof typeof frameworkData];
        } else {
          // Fallback to junior level if level not found
          quizQuestions = frameworkData.junior || [];
        }

        // Shuffle questions for randomness
        const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);

        if (shuffledQuestions.length === 0) {
          throw new Error(`No questions found for ${framework} ${level} level`);
        }

        const newSession = InteractiveQuizService.createSession(shuffledQuestions);
        setSession(newSession);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [framework, level, retryParam]);

  // Handle answer submission
  const handleAnswerSubmit = useCallback(
    (questionId: string, answer: string | string[]) => {
      if (!session) {
        return;
      }

      const updatedSession = InteractiveQuizService.submitAnswer(session, questionId, answer);
      setSession(updatedSession);
    },
    [session]
  );

  // Handle next question
  const handleNext = useCallback(() => {
    if (!session) return;

    const updatedSession = InteractiveQuizService.nextQuestion(session);
    setSession(updatedSession);
  }, [session]);

  // Handle previous question
  const handlePrevious = useCallback(() => {
    if (!session) return;

    const updatedSession = InteractiveQuizService.previousQuestion(session);
    setSession(updatedSession);
  }, [session]);

  // Handle quiz completion
  const handleCompleteQuiz = useCallback(() => {
    if (!session) {
      return;
    }

    try {
      const quizResult = InteractiveQuizService.completeQuiz(session);
      setResult(quizResult);
      setSession(null); // Clear session to stop timer
    } catch (error) {
      console.error("Error completing quiz:", error);
    }
  }, [session]);

  // Handle restart
  const handleRestart = useCallback(() => {
    // Reset all state
    setSession(null);
    setResult(null);
    setError(null);
    setLoading(true);

    // Force navigation to reset the component
    navigate(`/quiz/${framework}/${level}?retry=${Date.now()}`);
  }, [navigate, framework, level]);

  // Handle back to selection
  const handleBackToSelection = useCallback(() => {
    navigate("/quiz");
  }, [navigate]);

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
      <InteractiveQuizResults
        result={result}
        onRestart={handleRestart}
        onBackToSelection={handleBackToSelection}
      />
    );
  }

  if (!session) {
    return null;
  }

  const { questions, currentQuestionIndex, answers } = session;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
        <div className="container mx-auto px-2 py-3 sm:px-4 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Back button and tags on same line with proper spacing */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                onClick={handleBackToSelection}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <svg
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back</span>
              </button>

              <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-3">
                <span className="whitespace-nowrap rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200 sm:px-3 sm:text-sm">
                  {framework?.toUpperCase()}
                </span>
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200 sm:px-3 sm:text-sm">
                  {level?.toUpperCase() || "ALL"}
                </span>
                <span className="whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200 sm:px-3 sm:text-sm">
                  QUIZ
                </span>
              </div>
            </div>

            {/* Timer - right aligned with proper spacing */}
            <div className="flex flex-shrink-0 justify-center sm:justify-end">
              <QuizTimer
                startTime={session.startTime}
                onTimeUp={handleCompleteQuiz}
                timeLimit={30}
                isCompleted={!!result}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
        <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-2">
          <QuizProgress
            current={currentQuestionIndex + 1}
            total={questions.length}
            progress={progress}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <InteractiveQuizQuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          userAnswer={answers[currentQuestion.id]}
          onAnswerSubmit={handleAnswerSubmit}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={currentQuestionIndex < questions.length - 1 && !!answers[currentQuestion.id]}
          canGoPrevious={currentQuestionIndex > 0}
          canComplete={
            currentQuestionIndex === questions.length - 1 && !!answers[currentQuestion.id]
          }
          onComplete={handleCompleteQuiz}
        />
      </div>
    </div>
  );
}
