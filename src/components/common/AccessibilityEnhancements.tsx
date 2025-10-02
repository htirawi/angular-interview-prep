import React, { useState, useEffect } from "react";

interface AccessibilityEnhancementsProps {
  children: React.ReactNode;
}

/**
 * Accessibility Enhancement Component
 * Provides high contrast mode, focus indicators, and screen reader support
 */
export function AccessibilityEnhancements({ children }: AccessibilityEnhancementsProps) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);

    // Apply accessibility styles
    const root = document.documentElement;

    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }

    if (reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, [highContrast, largeText, reducedMotion]);

  return (
    <>
      {/* Accessibility Controls */}
      <div className="fixed right-4 top-4 z-30">
        <div className="rounded-lg border border-gray-200 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
          <div className="flex flex-col gap-1">
            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`rounded p-1.5 transition-colors ${
                highContrast
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
              title={highContrast ? "Disable high contrast" : "Enable high contrast"}
              aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>

            {/* Large Text Toggle */}
            <button
              onClick={() => setLargeText(!largeText)}
              className={`rounded p-1.5 transition-colors ${
                largeText
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
              title={largeText ? "Disable large text" : "Enable large text"}
              aria-label={largeText ? "Disable large text mode" : "Enable large text mode"}
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            {/* Screen Reader Announcements */}
            <div id="sr-announcements" className="sr-only" aria-live="polite" aria-atomic="true">
              {/* Screen reader announcements will be added here */}
            </div>
          </div>
        </div>
      </div>

      {/* Focus Indicators */}
      <style>{`
        /* Enhanced focus indicators */
        *:focus {
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }

        /* High contrast mode */
        .high-contrast {
          --tw-bg-opacity: 1;
          --tw-text-opacity: 1;
        }

        .high-contrast .bg-white {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .high-contrast .bg-gray-100 {
          background-color: #f3f4f6 !important;
          color: #000000 !important;
        }

        .high-contrast .bg-gray-800 {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        .high-contrast .text-gray-700 {
          color: #000000 !important;
        }

        .high-contrast .text-gray-300 {
          color: #ffffff !important;
        }

        .high-contrast .border-gray-200 {
          border-color: #000000 !important;
        }

        .high-contrast .border-gray-700 {
          border-color: #ffffff !important;
        }

        /* Large text mode */
        .large-text {
          font-size: 1.125rem;
        }

        .large-text h1 {
          font-size: 2.5rem !important;
        }

        .large-text h2 {
          font-size: 2rem !important;
        }

        .large-text h3 {
          font-size: 1.5rem !important;
        }

        .large-text p {
          font-size: 1.125rem !important;
          line-height: 1.8 !important;
        }

        /* Reduced motion */
        .reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Skip to content link */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          z-index: 1000;
        }

        .skip-link:focus {
          top: 6px;
        }
      `}</style>

      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main content wrapper */}
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
    </>
  );
}

/**
 * Hook for screen reader announcements
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useScreenReaderAnnouncement() {
  const announce = (message: string) => {
    const announcement = document.createElement("div");
    announcement.textContent = message;
    announcement.className = "sr-only";
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");

    document.getElementById("sr-announcements")?.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.getElementById("sr-announcements")?.removeChild(announcement);
    }, 1000);
  };

  return { announce };
}
