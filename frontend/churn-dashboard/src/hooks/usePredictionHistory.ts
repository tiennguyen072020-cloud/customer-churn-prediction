import {
  useQuery,
} from "@tanstack/react-query";

import {
  getPredictionHistory,
} from "../services/predictionHistoryService";

import {
  predictionHistoryKeys,
} from "../constants/queryKeys";


export const usePredictionHistory = (
  limit = 100
) => {

  return useQuery({

    queryKey:
      predictionHistoryKeys.list(
        limit
      ),

    queryFn: () =>
      getPredictionHistory(
        limit
      ),

    staleTime:
      30 * 1000,

    refetchOnWindowFocus:
      false,
  });
};