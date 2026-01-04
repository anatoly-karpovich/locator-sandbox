import { useEffect, useState } from "react";
import { fetchTrainingsCatalog } from "../api";
import type { TrainingCatalogResponse } from "../types";

export function useTrainingCatalog() {
  const [data, setData] = useState<TrainingCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingsCatalog()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
