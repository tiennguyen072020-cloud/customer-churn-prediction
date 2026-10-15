import apiClient from "./apiClient";

import type {
  HealthResponse,
} from "../types/health";


export const getApiHealth =
  async (): Promise<HealthResponse> => {

    const response =
      await apiClient.get<HealthResponse>(
        "/api/v1/health"
      );

    return response.data;
  };