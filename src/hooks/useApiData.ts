import { useState, useEffect } from 'react';

/**
 * useApiData - Shared hook for fetching API data with proper cleanup
 * 
 * Consolidates the duplicate fetch pattern used across events and meet-the-team pages.
 * Handles abort controller cleanup, prevents state updates on unmounted components,
 * and provides consistent error handling.
 * 
 * @param url - API endpoint to fetch from
 * @returns {data, loading, error} - Fetch state
 * 
 * @example
 * const { data, loading, error } = useApiData<{events: EventItem[]}>("/api/events");
 */
export function useApiData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(url, { 
          cache: "no-store",
          signal: controller.signal 
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch (${res.status})`);
        }
        
        const json = await res.json();
        
        if (isMounted) {
          setData(json);
        }
      } catch (e: any) {
        // Ignore abort errors (happens during cleanup)
        if (e.name === 'AbortError') return;
        
        if (isMounted) {
          setError(e.message ?? "Unknown error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    // Cleanup: abort fetch and prevent state updates
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
