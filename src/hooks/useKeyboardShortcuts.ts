import { useEffect, useCallback } from 'react';

type ShortcutCallback = () => void;

interface ShortcutMap {
  [key: string]: ShortcutCallback;
}

/**
 * useKeyboardShortcuts Hook
 *
 * Manages keyboard shortcuts for the application.
 *
 * Usage:
 * useKeyboardShortcuts({
 *   'Escape': () => navigate('back'),
 *   ' ': () => handleSubmit(),
 *   'r': () => handleReset(),
 *   'h': () => showHint()
 * });
 */
export const useKeyboardShortcuts = (shortcuts: ShortcutMap): void => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Get the key pressed
      const key = event.key;

      // Check if callback exists for this key
      const callback = shortcuts[key];

      if (callback) {
        // Prevent default behavior for handled shortcuts
        event.preventDefault();

        // Execute callback
        callback();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
