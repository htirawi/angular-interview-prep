import { useNavigate } from "react-router-dom";
import { QUESTION_SETS } from "../data";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";

export default function FrameworkSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl">
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
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Built with React 19, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">
            Open source •{" "}
            <a
              href="https://github.com/htirawi/angular-interview-prep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
