import { useEffect, useRef } from 'react';

const useDebouncer = <T extends (...args: Array<unknown>) => void>(callback: T, timeout: number): T => {
  // We use Ref here instead of State to prevent unnecessary re-renders when the value changes
  const debouncingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      // Make sure to clear out the timer here
      clearTimeout(debouncingTimer.current!);
    };
  }, []);

  // Function to debounce another functions using callbacks
  const makeDebounce = (...args: Array<unknown>) => {
    clearTimeout(debouncingTimer.current!);
    debouncingTimer.current = setTimeout(() => {
      callback(...args);
    }, timeout);
  };

  return makeDebounce as T;
};

export { useDebouncer };
