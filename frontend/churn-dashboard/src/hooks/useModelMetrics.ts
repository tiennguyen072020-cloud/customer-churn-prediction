import { useQuery } from "@tanstack/react-query";

import { getModelMetrics } from "../services/modelMetricsService";


export const useModelMetrics = () => {

  return useQuery({
    queryKey: ["model-metrics"],
    queryFn: getModelMetrics,
    staleTime: 5 * 60 * 1000,
  });
};