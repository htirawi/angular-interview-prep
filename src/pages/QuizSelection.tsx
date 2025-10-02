/**
 * Quiz Selection Page - Choose framework, level, and mode for interactive quiz
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";
import { QUESTION_SETS } from "../data";

export default function QuizSelection() {
  const navigate = useNavigate();
  const [selectedFramework, setSelectedFramework] = useState("angular");
  const [selectedLevel, setSelectedLevel] = useState("junior");

  const levels = [
    {
      value: "junior",
      label: "Junior",
      description: "Entry-level questions (30 questions)",
      icon: "🟢",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      description: "Mid-level questions (30 questions)",
      icon: "🟡",
    },
    {
      value: "senior",
      label: "Senior",
      description: "Advanced questions (30 questions)",
      icon: "🔴",
    },
  ];

  const handleStartQuiz = () => {
    navigate(`/quiz/${selectedFramework}/${selectedLevel}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Interactive Quiz System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            Test your knowledge with multiple choice, fill-in-the-blank, and checkbox questions
          </p>
        </div>

        {/* Framework Selection */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Choose Framework
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUESTION_SETS.map((framework) => (
              <button
                key={framework.id}
                onClick={() => setSelectedFramework(framework.id)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  selectedFramework === framework.id
                    ? "scale-105 border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl"
                    : "border-gray-200 bg-white hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                }`}
              >
                <div className="mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
                  <FrameworkIcon framework={framework.icon} size={48} />
                </div>
                <h3 className="text-lg font-bold">{framework.name}</h3>
                <p className="text-sm opacity-75">{framework.count} questions</p>
              </button>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Choose Difficulty Level
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {levels.map(({ value, label, description, icon }) => {
              const isSelected = selectedLevel === value;

              return (
                <button
                  key={value}
                  onClick={() => setSelectedLevel(value)}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "scale-105 border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl"
                      : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                  }`}
                >
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-3xl">{icon}</span>
                      <h3 className="text-xl font-bold">{label}</h3>
                    </div>

                    <p
                      className={`text-sm ${isSelected ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {description}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute right-4 top-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="hover:shadow-3xl group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Start Quiz</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">🔘</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Multiple Choice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose the correct answer from multiple options
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">✏️</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Fill in the Blank</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete sentences with the correct terms
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">☑️</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Multiple Checkbox</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select all correct answers from multiple options
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-3 text-3xl">✅</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">True/False</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Determine if statements are true or false
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
