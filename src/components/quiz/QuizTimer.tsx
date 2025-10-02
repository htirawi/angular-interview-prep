/**
 * Quiz Timer Component - Beautiful timer with animations
 */

import { useState, useEffect } from "react";

interface QuizTimerProps {
  startTime: Date;
  onTimeUp?: () => void;
  timeLimit?: number; // in minutes
  isCompleted?: boolean; // Stop timer when quiz is completed
}

export default function QuizTimer({ startTime, onTimeUp, timeLimit, isCompleted }: QuizTimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (isCompleted) return; // Stop timer when quiz is completed

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setTimeElapsed(elapsed);

      if (timeLimit) {
        const remaining = timeLimit * 60 - elapsed;
        setTimeRemaining(remaining);

        if (remaining <= 0 && onTimeUp) {
          onTimeUp();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, timeLimit, onTimeUp, isCompleted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerBgColor = () => {
    if (!timeLimit || !timeRemaining) return "bg-blue-100 dark:bg-blue-900/20";

    const percentage = (timeRemaining / (timeLimit * 60)) * 100;
    if (percentage > 50) return "bg-green-100 dark:bg-green-900/20";
    if (percentage > 25) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20 ring-2 ring-red-200 dark:ring-red-800";
  };

  const getTimerTextColor = () => {
    if (!timeLimit || !timeRemaining) return "text-blue-600 dark:text-blue-400";

    const percentage = (timeRemaining / (timeLimit * 60)) * 100;
    if (percentage > 50) return "text-green-600 dark:text-green-400";
    if (percentage > 25) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const isUrgent = timeLimit && timeRemaining !== null && timeRemaining <= timeLimit * 5; // Last 5 minutes
  const isCritical = timeLimit && timeRemaining !== null && timeRemaining <= timeLimit * 2; // Last 2 minutes

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 ${getTimerBgColor()} ${
        isCritical
          ? "animate-pulse ring-2 ring-red-300 dark:ring-red-600"
          : isUrgent
            ? "animate-pulse"
            : ""
      }`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <svg
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            isCritical ? "animate-spin text-red-500" : isUrgent ? "animate-pulse" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className={`text-base font-bold sm:text-lg ${getTimerTextColor()}`}>
          {timeRemaining !== null
            ? formatTime(Math.max(0, timeRemaining))
            : formatTime(timeElapsed)}
        </span>
      </div>

      {timeLimit && timeRemaining !== null && (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:h-2 sm:w-16">
            <div
              className={`h-full transition-all duration-1000 ${
                timeRemaining > timeLimit * 30
                  ? "bg-green-500"
                  : timeRemaining > timeLimit * 15
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${Math.max(0, (timeRemaining / (timeLimit * 60)) * 100)}%` }}
            />
          </div>
          <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
            {timeRemaining > 0 ? "remaining" : "time up!"}
          </span>
        </div>
      )}
    </div>
  );
}
