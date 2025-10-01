import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../shared/constants/app";
import type { FrameworkId, PracticeMode, Question } from "../types";

/**
 * Custom hook for managing user progress and state
 * Handles bookmarks, completion tracking, notes, and progress reset
 */
export function useProgressManager(
  selectedFramework: FrameworkId,
  success: (message: string) => void,
  warning: (message: string) => void
) {
  // Framework-specific state
  const [index, setIndex] = useLocalStorage<number>(
    `${selectedFramework}_${STORAGE_KEYS.INDEX}`,
    0
  );
  const [completed, setCompleted] = useLocalStorage<Set<number>>(
    `${selectedFramework}_${STORAGE_KEYS.COMPLETED}`,
    new Set()
  );
  const [bookmarks, setBookmarks] = useLocalStorage<Set<number>>(
    `${selectedFramework}_${STORAGE_KEYS.BOOKMARKS}`,
    new Set()
  );
  const [mode, setMode] = useLocalStorage<PracticeMode>(
    `${selectedFramework}_${STORAGE_KEYS.MODE}`,
    "sequential"
  );
  const [notes, setNotes] = useLocalStorage<Record<number, string>>(
    `${selectedFramework}_${STORAGE_KEYS.NOTES}`,
    {}
  );

  // Navigation functions
  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, [setIndex]);

  const goNext = useCallback(
    (item: Question | undefined, total: number) => {
      if (item && !completed.has(item.id)) {
        setCompleted((prev) => new Set(prev).add(item.id));
        success("Question marked as completed!");
      }
      setIndex((i) => Math.min(total - 1, i + 1));
    },
    [setIndex, setCompleted, completed, success]
  );

  const handleJump = useCallback(
    (targetIndex: number) => {
      setIndex(targetIndex);
    },
    [setIndex]
  );

  // Bookmark management
  const toggleBookmark = useCallback(
    (id: number) => {
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          warning("Bookmark removed");
        } else {
          next.add(id);
          success("Bookmarked! ⭐");
        }
        return next;
      });
    },
    [setBookmarks, success, warning]
  );

  // Note management
  const saveNote = useCallback(
    (note: string, item: Question | undefined) => {
      if (item) {
        setNotes((prev) => ({ ...prev, [item.id]: note }));
        success("Note saved!");
      }
    },
    [setNotes, success]
  );

  // Progress reset
  const handleReset = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Reset all progress for ${selectedFramework}? This cannot be undone.`)) {
      setCompleted(new Set());
      setBookmarks(new Set());
      setNotes({});
      setIndex(0);
      success("Progress reset!");
    }
  }, [selectedFramework, setCompleted, setBookmarks, setNotes, setIndex, success]);

  return {
    // State
    index,
    completed,
    bookmarks,
    mode,
    notes,
    // Actions
    setIndex,
    setMode,
    goPrev,
    goNext,
    handleJump,
    toggleBookmark,
    saveNote,
    handleReset,
  };
}
