import { useEffect, useMemo, useRef, useState } from "react";
import QuestionNotes from "../features/notes/components/QuestionNotes";
import StudyTimer from "../features/study/components/StudyTimer";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { QuestionCardProps } from "../types";

const difficultyColors: Record<string, string> = {
  intermediate: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  advanced: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  expert: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function QuestionCard({
  item,
  index,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
  isBookmarked = false,
  isCompleted = false,
  onToggleBookmark,
  note = "",
  onSaveNote,
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to answer when revealed
  useEffect(() => {
    if (isAnswerVisible && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isAnswerVisible]);

  // Reset answer visibility when question changes
  useEffect(() => {
    setIsAnswerVisible(false);
  }, [item.id]);

  const handleRevealAnswer = () => {
    setIsAnswerVisible(true);
    setIsStudying(true);
  };

  const handleStudyTimeUpdate = (time: number) => {
    setStudyTime(time);
  };

  const difficulty = useMemo(() => {
    if (item.difficulty) return item.difficulty;
    // Fallback difficulty based on question number
    if (index < total * 0.3) return "intermediate";
    if (index < total * 0.7) return "advanced";
    return "expert";
  }, [item.difficulty, index, total]);

  const progressPercentage = useMemo(() => {
    return ((index + 1) / total) * 100;
  }, [index, total]);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                #{item.id}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${difficultyColors[difficulty]}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {onToggleBookmark && (
                <button
                  onClick={onToggleBookmark}
                  className={`rounded-lg p-2 transition-colors ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <svg
                    className="h-5 w-5"
                    fill={isBookmarked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              )}
              {isCompleted && (
                <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div ref={questionRef} className="px-6 py-6">
          <h2 className="mb-4 text-xl font-semibold leading-relaxed text-gray-900 dark:text-white">
            {item.question}
          </h2>

          {!isAnswerVisible ? (
            <button
              onClick={handleRevealAnswer}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Reveal Answer
            </button>
          ) : (
            <div ref={answerRef} className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Expert Answer
                </div>
                <MarkdownRenderer content={item.answer} />
              </div>

              {/* Study Timer */}
              <StudyTimer
                isActive={isStudying}
                onTimeUpdate={handleStudyTimeUpdate}
                onToggle={() => setIsStudying(!isStudying)}
              />

              {/* Question Notes */}
              {onSaveNote && (
                <QuestionNotes note={note} onSaveNote={onSaveNote} questionId={item.id} />
              )}
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={!canPrev}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                canPrev
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {studyTime > 0 &&
                  `${Math.floor(studyTime / 60)}:${(studyTime % 60).toString().padStart(2, "0")}`}
              </span>
            </div>

            <button
              onClick={onNext}
              disabled={!canNext}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                canNext
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-600"
              }`}
            >
              Next
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
