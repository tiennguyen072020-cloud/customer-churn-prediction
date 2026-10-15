import apiClient from "./apiClient";

import type {
  ChurnPredictionRequest,
  ChurnPredictionResponse,
} from "../types/prediction";


export const predictCustomerChurn = async (
  request: ChurnPredictionRequest
): Promise<ChurnPredictionResponse> => {

  const response =
    await apiClient.post<ChurnPredictionResponse>(
      "/api/v1/predictions/churn",
      request
    );

  return response.data;
};