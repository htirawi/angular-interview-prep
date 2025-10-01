import { useEffect, type DependencyList } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

type KeyMap = {
  [key: string]: KeyHandler;
};

/**
 * Advanced keyboard shortcut hook with modifier key support
 * @example
 * useKeyboard({
 *   'ArrowRight': () => goNext(),
 *   'ArrowLeft': () => goPrev(),
 *   'a': () => toggleAnswer(),
 *   'Meta+k': () => openSearch(), // Cmd+K or Ctrl+K
 * });
 */
export function useKeyboard(keyMap: KeyMap, deps: DependencyList = []) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Build key combination string
      const modifiers = [];
      if (event.metaKey || event.ctrlKey) modifiers.push("Meta");
      if (event.shiftKey) modifiers.push("Shift");
      if (event.altKey) modifiers.push("Alt");

      const key = event.key;
      const combination = modifiers.length > 0 ? `${modifiers.join("+")}+${key}` : key;

      // Check for exact match first
      if (keyMap[combination]) {
        event.preventDefault();
        keyMap[combination](event);
        return;
      }

      // Check for case-insensitive match for letters
      const lowerKey = key.toLowerCase();
      const lowerCombination =
        modifiers.length > 0 ? `${modifiers.join("+")}+${lowerKey}` : lowerKey;

      if (keyMap[lowerCombination]) {
        // Only prevent default if not typing in an input
        const target = event.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          event.preventDefault();
          keyMap[lowerCombination](event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyMap, ...deps]);
}
