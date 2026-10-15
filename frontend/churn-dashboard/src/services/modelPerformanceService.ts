import apiClient from "./apiClient";

import type {
  ConfusionMatrixResponse,
  FeatureImportanceResponse,
  ModelInformation,
  ModelMetricsResponse,
  RocCurveResponse,
} from "../types/modelPerformance";


export const getModelMetrics =
  async (): Promise<ModelMetricsResponse> => {

    const response =
      await apiClient.get<ModelMetricsResponse>(
        "/api/v1/model/metrics"
      );

    return response.data;
  };

export const getFeatureImportance =
  async (): Promise<FeatureImportanceResponse> => {

    const response =
      await apiClient.get<FeatureImportanceResponse>(
        "/api/v1/model/feature-importance"
      );

    return response.data;
  };

export const getModelInfo =
  async (): Promise<ModelInformation> => {

    const response =
      await apiClient.get<ModelInformation>(
        "/api/v1/model/info"
      );

    return response.data;
  };


export const getConfusionMatrix =
  async (): Promise<ConfusionMatrixResponse> => {

    const response =
      await apiClient.get<ConfusionMatrixResponse>(
        "/api/v1/model/confusion-matrix"
      );

    return response.data;
  };


export const getRocCurve =
  async (): Promise<RocCurveResponse> => {

    const response =
      await apiClient.get<RocCurveResponse>(
        "/api/v1/model/roc-curve"
      );

    return response.data;
  };