import { useNavigate } from "react-router-dom";
import { QUESTION_SETS } from "../data";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";

export default function FrameworkSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="mb-16 text-center">
            <div className="mb-6">
              <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-6xl font-bold text-transparent dark:from-white dark:via-blue-200 dark:to-indigo-200 md:text-7xl lg:text-8xl">
                Interview Prep Platform
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 md:text-2xl lg:text-3xl">
                Master <span className="font-bold text-blue-600 dark:text-blue-400">569+</span>{" "}
                senior-level questions across{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">4 frameworks</span>
              </p>
            </div>

            {/* Enhanced Feature Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-slate-800/80">
                <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg"></div>
                <span className="font-medium text-slate-700 dark:text-slate-300">100% Free</span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-slate-800/80">
                <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg"></div>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Progress Tracking
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-slate-800/80">
                <div className="h-3 w-3 rounded-full bg-purple-500 shadow-lg"></div>
                <span className="font-medium text-slate-700 dark:text-slate-300">PWA Enabled</span>
              </div>
            </div>
          </div>

          {/* Enhanced Framework Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {QUESTION_SETS.map((framework, index) => (
              <button
                key={framework.id}
                onClick={() => navigate(`/study/${framework.id}`)}
                className="group relative overflow-hidden rounded-3xl bg-white/70 p-8 text-center transition-all duration-500 hover:scale-105 hover:bg-white/90 hover:shadow-2xl dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Border Gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className="mb-6 flex justify-center transition-all duration-500 group-hover:rotate-3 group-hover:scale-110">
                    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-lg dark:from-slate-700 dark:to-slate-800">
                      <FrameworkIcon framework={framework.icon} size={56} />
                    </div>
                  </div>

                  {/* Enhanced Name */}
                  <h2 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {framework.name}
                  </h2>

                  {/* Enhanced Question Count */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                      {framework.count}
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Senior-Level Questions
                    </div>
                  </div>

                  {/* Enhanced CTA */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-blue-400">
                    <span className="text-sm font-semibold">Start Learning</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>

          {/* Enhanced Features Section */}
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-2xl bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                📊
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                Track Progress
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Per-framework progress tracking with completion stats and bookmarks
              </p>
            </div>

            <div className="group rounded-2xl bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                🎯
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                Practice Modes
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sequential, random, and bookmarked modes to suit your study style
              </p>
            </div>

            <div className="group rounded-2xl bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                💡
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                Expert Answers
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive senior-level answers to ace your technical interviews
              </p>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-20 border-t border-slate-200/50 pt-12 dark:border-slate-700/50">
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Built with React 19, TypeScript, and Tailwind CSS
              </p>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Crafted with ❤️ by{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                  Hussein Tirawi
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                © 2024 All rights reserved
              </p>
              <div className="mt-6">
                <a
                  href="https://github.com/htirawi/angular-interview-prep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:shadow-lg dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                >
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
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
    </div>
  );
}
