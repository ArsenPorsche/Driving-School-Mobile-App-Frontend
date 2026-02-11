import { useState, useCallback } from "react";
import { productApi } from "../services/productApi";

/**
 * Hook to fetch and expose user lesson/exam balance.
 */
export function useBalance() {
  const [balance, setBalance] = useState({ purchasedLessons: 0, purchasedExams: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productApi.getUserBalance();
      setBalance(data);
      return data;
    } catch {
      // silent — caller can handle if needed
    } finally {
      setLoading(false);
    }
  }, []);

  return { balance, loading, refresh };
}
