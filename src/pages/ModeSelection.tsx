/**
 * Mode Selection Page - Choose between Study Mode and Quiz Mode
 */

import { useNavigate } from "react-router-dom";

export default function ModeSelection() {
  const navigate = useNavigate();

  const handleStudyMode = () => {
    navigate("/study");
  };

  const handleQuizMode = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Interview Prep Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 md:text-2xl">
            Choose your learning approach
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Progress Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>PWA Enabled</span>
            </div>
          </div>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Study Mode */}
          <button
            onClick={handleStudyMode}
            className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-12 text-left transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
          >
            {/* Icon */}
            <div className="mb-8 flex justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h2 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              Study Mode
            </h2>

            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
              Traditional interview preparation with comprehensive questions and detailed answers.
              Perfect for deep learning and understanding concepts.
            </p>

            {/* Features */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>400+ Senior-level questions</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Detailed explanations</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Progress tracking & bookmarks</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Notes & personal annotations</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-2 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
              <span className="text-lg font-semibold">Start Learning</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-cyan-900/20" />
          </button>

          {/* Quiz Mode */}
          <button
            onClick={handleQuizMode}
            className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-12 text-left transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600"
          >
            {/* Icon */}
            <div className="mb-8 flex justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h2 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
              Quiz Mode
            </h2>

            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
              Interactive quizzes with multiple choice, fill-in-the-blank, and checkbox questions.
              Test your knowledge with immediate feedback and scoring.
            </p>

            {/* Features */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Multiple choice questions</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Fill-in-the-blank exercises</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Multiple checkbox selections</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Instant feedback & scoring</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-2 text-purple-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-purple-400">
              <span className="text-lg font-semibold">Take Quiz</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-purple-900/20 dark:to-pink-900/20" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
              <div className="h-1 w-1 rounded-full bg-purple-500"></div>
              <div className="h-1 w-1 rounded-full bg-pink-500"></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with React 19, TypeScript, and Tailwind CSS
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Crafted with ❤️ by{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Hussein Tirawi</span>
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              © 2024 All rights reserved
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/htirawi/angular-interview-prep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
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
