import { useState, useCallback } from "react";
import { Alert } from "react-native";

/**
 * Generic hook for API calls with loading / error state.
 *
 * Usage:
 *   const { data, loading, error, execute } = useApiCall(productApi.getProducts);
 *   // then: execute()            — no args
 *   // or:   execute(someArg)     — forwarded to the wrapped fn
 */
export function useApiCall(apiFn, { onSuccess, onError, alertOnError = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFn(...args);
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "Something went wrong";
        setError(msg);
        if (alertOnError) Alert.alert("Error", msg);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn, onSuccess, onError, alertOnError],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
