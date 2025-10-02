/**
 * Study Question Card - Refactored
 * Uses smaller, focused components for better maintainability
 */

import React, { useEffect, useRef, useState } from "react";

import type { QuestionCardProps } from "../../types";
import { StudyQuestionHeader } from "./StudyQuestionHeader";
import { StudyQuestionContent } from "./StudyQuestionContent";
import { StudyQuestionAnswer } from "./StudyQuestionAnswer";
import { StudyQuestionNavigation } from "./StudyQuestionNavigation";
import { QuestionTags } from "./QuestionTags";

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
  note: _note = "",
  onSaveNote: _onSaveNote,
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to answer when revealed (with mobile-friendly behavior)
  useEffect(() => {
    if (isAnswerVisible && answerRef.current) {
      // Use a small delay to ensure the answer is rendered
      setTimeout(() => {
        answerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isAnswerVisible]);

  // Reset answer visibility when question changes
  useEffect(() => {
    setIsAnswerVisible(false);
    setStudyTime(0); // Reset study time for new question
    setIsStudying(true); // Start studying for new question
  }, [item.id]);

  // Study timer effect
  useEffect(() => {
    if (!isStudying) return;

    const interval = setInterval(() => {
      setStudyTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStudying]);

  const handleRevealAnswer = () => {
    setIsAnswerVisible(true);
    setIsStudying(false); // Stop study timer when answer is revealed
  };

  const _handleSaveNote = (note: string) => {
    if (_onSaveNote) {
      _onSaveNote(note);
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-2 sm:mx-auto sm:max-w-4xl sm:px-6 lg:max-w-6xl lg:px-8">
      {/* Keyboard shortcuts hint - hidden on mobile, shown on desktop */}
      <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 lg:block">
        <div className="rounded-lg bg-white/80 px-3 py-1 text-xs text-gray-500 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-400">
          Use ← → arrow keys to navigate
        </div>
      </div>

      {/* Question Header */}
      <StudyQuestionHeader
        item={item}
        index={index}
        total={total}
        isBookmarked={isBookmarked}
        isCompleted={isCompleted}
        onToggleBookmark={onToggleBookmark}
      />

      {/* Question Content */}
      <StudyQuestionContent
        item={item}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={handleRevealAnswer}
      />

      {/* Question Answer */}
      {isAnswerVisible && (
        <StudyQuestionAnswer
          item={item}
          isAnswerVisible={isAnswerVisible}
          answerRef={answerRef as React.RefObject<HTMLDivElement>}
        />
      )}

      {/* Question Navigation */}
      <StudyQuestionNavigation
        canPrev={canPrev}
        canNext={canNext}
        onPrev={onPrev}
        onNext={onNext}
        studyTime={studyTime}
      />

      {/* Tags */}
      {item.tags && <QuestionTags tags={item.tags} />}
    </div>
  );
}
