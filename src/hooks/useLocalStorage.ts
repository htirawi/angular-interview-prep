import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const read = useCallback((): T => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;

      const parsed = JSON.parse(raw);

      // Handle Set objects - convert arrays back to Sets
      if (initial instanceof Set && Array.isArray(parsed)) {
        return new Set(parsed) as T;
      }

      return parsed as T;
    } catch {
      return initial;
    }
  }, [key, initial]);

  const [value, setValue] = useState<T>(read);

  useEffect(() => {
    try {
      // Handle Set objects - convert Sets to arrays for storage
      const valueToStore = value instanceof Set ? Array.from(value) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue] as const;
}
