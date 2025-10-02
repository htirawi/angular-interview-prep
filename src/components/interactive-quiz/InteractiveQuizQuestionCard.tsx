/**
 * Interactive Quiz Question Card - Refactored
 * Uses smaller, focused components for better maintainability
 */

import { useState, useEffect } from "react";
import type { InteractiveQuizQuestionCardProps } from "../../types/interactive-quiz-components";
import { QuestionHeader } from "./question/QuestionHeader";
import { QuestionContent } from "./question/QuestionContent";
import { QuestionNavigation } from "./question/QuestionNavigation";

export default function InteractiveQuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerSubmit,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  canComplete,
  onComplete,
  isBookmarked = false,
  onToggleBookmark,
}: InteractiveQuizQuestionCardProps & {
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  const [localAnswer, setLocalAnswer] = useState<string | string[]>("");
  const [_hasAnswered, setHasAnswered] = useState(false);

  // Reset local state when question changes or when userAnswer prop changes
  useEffect(() => {
    if (userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
      setLocalAnswer(userAnswer);
      setHasAnswered(true);
    } else {
      setLocalAnswer("");
      setHasAnswered(false);
    }
  }, [question.id, userAnswer]);

  const handleAnswerChange = (answer: string | string[]) => {
    setLocalAnswer(answer);
    setHasAnswered(true);
    onAnswerSubmit(question.id, answer);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Question Card */}
      <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
        {/* Question Header */}
        <QuestionHeader
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          question={question}
          isBookmarked={isBookmarked}
          onToggleBookmark={onToggleBookmark}
        />

        {/* Question Content */}
        <div className="mb-8">
          <QuestionContent
            question={question}
            userAnswer={localAnswer}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <QuestionNavigation
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            canComplete={canComplete}
            onNext={handleNext}
            onPrevious={onPrevious}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
}
