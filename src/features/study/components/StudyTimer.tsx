import { useEffect, useState } from "react";

type Props = {
  onTimeUpdate?: (seconds: number) => void;
};

export default function StudyTimer({ onTimeUpdate }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        const newTime = s + 1;
        onTimeUpdate?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-gray-600 dark:text-gray-400"
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
        <span className="font-mono text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
          {formatTime(seconds)}
        </span>
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        aria-label={isRunning ? "Pause timer" : "Resume timer"}
      >
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button
        onClick={() => setSeconds(0)}
        className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        aria-label="Reset timer"
      >
        Reset
      </button>
    </div>
  );
}

