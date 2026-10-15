import apiClient from "./apiClient";

import type {
  ModelMetricsResponse,
} from "../types/modelMetrics";


export const getModelMetrics =
  async (): Promise<ModelMetricsResponse> => {

    const response =
      await apiClient.get<ModelMetricsResponse>(
        "/api/v1/model/metrics"
      );

    return response.data;
  };