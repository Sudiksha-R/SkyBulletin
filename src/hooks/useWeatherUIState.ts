import { useCallback, useEffect, useMemo, useState } from 'react';
type Status = 'idle' | 'loading' | 'success' | 'error';
export function useWeatherUIState<T>(fetcher: () => Promise<T>) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);
  const load = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const result = await fetcher();
      setData(result);
      setStatus('success');
      setLastUpdated(Date.now());
    } catch (e: any) {
      setStatus('error');
      setErrorMessage(e?.message || 'Something went wrong.');
    }
  }, [fetcher]);

  // Convenience: formatted "last updated"
  const lastUpdatedLabel = useMemo(() => {
    if (!lastUpdated) return null;
    const d = new Date(lastUpdated);
    return d.toLocaleString();
  }, [lastUpdated]);
  return {
    status,
    data,
    errorMessage,
    lastUpdatedLabel,
    isOffline,
    load
  };
}