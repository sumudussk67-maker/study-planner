import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

// Calls onForeground when the app goes background/inactive -> active
export default function useAppState(onForeground) {
  const prev = useRef(AppState.currentState);
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (prev.current.match(/inactive|background/) && next === 'active') onForeground?.();
      prev.current = next;
      setAppState(next);
    });
    return () => sub.remove();
  }, []);
  return appState;
}
