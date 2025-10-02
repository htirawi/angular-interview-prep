import { useEffect, useCallback } from "react";

export interface KeyboardShortcutHandlers {
  onToggleAnswer?: () => void;
  onNextQuestion?: () => void;
  onPreviousQuestion?: () => void;
  onToggleBookmark?: () => void;
  onRandomQuestion?: () => void;
  onShowHelp?: () => void;
}

/**
 * Custom hook for handling keyboard shortcuts in the study interface
 * Provides intuitive keyboard navigation for power users
 */
export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === "true"
      ) {
        return;
      }

      // Prevent default behavior for our shortcuts
      const preventDefault = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      switch (event.code) {
        case "Space":
          preventDefault();
          handlers.onToggleAnswer?.();
          break;

        case "Enter":
          preventDefault();
          handlers.onToggleAnswer?.();
          break;

        case "ArrowRight":
          preventDefault();
          handlers.onNextQuestion?.();
          break;

        case "ArrowLeft":
          preventDefault();
          handlers.onPreviousQuestion?.();
          break;

        case "KeyB":
          preventDefault();
          handlers.onToggleBookmark?.();
          break;

        case "KeyR":
          preventDefault();
          handlers.onRandomQuestion?.();
          break;

        case "KeyH":
          if (event.ctrlKey || event.metaKey) {
            preventDefault();
            handlers.onShowHelp?.();
          }
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Hook for showing keyboard shortcut help
 */
export function useKeyboardHelp() {
  const showKeyboardHelp = useCallback(() => {
    const shortcuts = [
      { key: "Space / Enter", action: "Toggle Answer" },
      { key: "→", action: "Next Question" },
      { key: "←", action: "Previous Question" },
      { key: "B", action: "Toggle Bookmark" },
      { key: "R", action: "Random Question" },
      { key: "Ctrl+H", action: "Show Help" },
    ];

    // Create a simple help modal
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
          <button id="close-help" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          ${shortcuts
            .map(
              ({ key, action }) => `
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-700 dark:text-gray-300">${action}</span>
              <kbd class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">${key}</kbd>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Press <kbd class="px-1 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    `;

    const closeModal = () => {
      document.body.removeChild(modal);
    };

    modal.addEventListener("click", (e) => {
      if (e.target === modal || (e.target as HTMLElement).id === "close-help") {
        closeModal();
      }
    });

    document.addEventListener("keydown", function escapeHandler(e) {
      if (e.code === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escapeHandler);
      }
    });

    document.body.appendChild(modal);
  }, []);

  return { showKeyboardHelp };
}
