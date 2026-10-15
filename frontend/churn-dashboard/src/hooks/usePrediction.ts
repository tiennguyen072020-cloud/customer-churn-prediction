import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  predictCustomerChurn,
} from "../services/predictionService";


export const PREDICTION_HISTORY_QUERY_KEY = [
  "prediction-history",
];
import {
  predictionHistoryKeys,
} from "../constants/queryKeys";

export const usePrediction = () => {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      predictCustomerChurn,


    onSuccess: async () => {

      await queryClient.invalidateQueries({
        queryKey:
          predictionHistoryKeys.all,
      });
    },

  });
};