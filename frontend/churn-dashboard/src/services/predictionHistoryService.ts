import apiClient
  from "./apiClient";

import type {
  PredictionHistoryResponse,
} from "../types/predictionHistory";


export const getPredictionHistory =
  async (
    limit = 100
  ): Promise<PredictionHistoryResponse> => {

    const response =
      await apiClient.get<PredictionHistoryResponse>(
        "/api/v1/predictions/history",
        {
          params: {
            limit,
          },
        }
      );

    return response.data;
  };