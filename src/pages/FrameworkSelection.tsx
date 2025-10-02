import { useNavigate } from "react-router-dom";
import { QUESTION_SETS } from "../data";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";

export default function FrameworkSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Interview Prep Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 md:text-2xl">
            Master 400 senior-level questions across 4 frameworks
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

        {/* Framework Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUESTION_SETS.map((framework) => (
            <button
              key={framework.id}
              onClick={() => navigate(`/study/${framework.id}`)}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center transition-transform duration-300 group-hover:scale-110">
                <FrameworkIcon framework={framework.icon} size={64} />
              </div>

              {/* Name */}
              <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {framework.name}
              </h2>

              {/* Question Count */}
              <div className="mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {framework.count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Senior-Level Questions</div>

              {/* Arrow indicator on hover */}
              <div className="mt-6 flex items-center justify-center gap-2 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                <span className="text-sm font-semibold">Start Learning</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/20" />
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">📊</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Track Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Per-framework progress tracking with completion stats and bookmarks
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">🎯</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Practice Modes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sequential, random, and bookmarked modes to suit your study style
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">💡</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Expert Answers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive senior-level answers to ace your technical interviews
            </p>
          </div>
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
