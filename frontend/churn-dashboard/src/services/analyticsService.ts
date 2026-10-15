import apiClient from "./apiClient";

import type {
  ChurnDistributionItem,
  ContractChurnItem,
  DashboardSummary,
  TenureDistributionItem,
  BusinessInsightItem,
  InternetServiceChurnItem,
  MonthlyChargesChurnItem,
  PaymentMethodChurnItem,
  TenureChurnItem,
} from "../types/dashboard";

// - /analytics/business-insights
export const getBusinessInsights =
  async (): Promise<
    BusinessInsightItem[]
  > => {

    const response =
      await apiClient.get<
        BusinessInsightItem[]
      >(
        "/api/v1/analytics/business-insights"
      );

    return response.data;
  };

// - /analytics/tenure-churn
export const getTenureChurn =
  async (): Promise<
    TenureChurnItem[]
  > => {

    const response =
      await apiClient.get<
        TenureChurnItem[]
      >(
        "/api/v1/analytics/tenure-churn"
      );

    return response.data;
  };

// - /analytics/monthly-charges-churn
export const getMonthlyChargesChurn =
  async (): Promise<
    MonthlyChargesChurnItem[]
  > => {

    const response =
      await apiClient.get<
        MonthlyChargesChurnItem[]
      >(
        "/api/v1/analytics/monthly-charges-churn"
      );

    return response.data;
  };

// - /analytics/payment-method-churn
export const getPaymentMethodChurn =
  async (): Promise<
    PaymentMethodChurnItem[]
  > => {

    const response =
      await apiClient.get<
        PaymentMethodChurnItem[]
      >(
        "/api/v1/analytics/payment-method-churn"
      );

    return response.data;
  };

// - /analytics/internet-service-churn
export const getInternetServiceChurn =
  async (): Promise<
    InternetServiceChurnItem[]
  > => {

    const response =
      await apiClient.get<
        InternetServiceChurnItem[]
      >(
        "/api/v1/analytics/internet-service-churn"
      );

    return response.data;
  };

  // - /analytics/summary
export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {

    const response =
      await apiClient.get<DashboardSummary>(
        "/api/v1/analytics/summary"
      );

    return response.data;
  };

// - /analytics/churn-distribution
export const getChurnDistribution =
  async (): Promise<
    ChurnDistributionItem[]
  > => {

    const response =
      await apiClient.get<
        ChurnDistributionItem[]
      >(
        "/api/v1/analytics/churn-distribution"
      );

    return response.data;
  };

// - /analytics/contract-churn
export const getContractChurn =
  async (): Promise<
    ContractChurnItem[]
  > => {

    const response =
      await apiClient.get<
        ContractChurnItem[]
      >(
        "/api/v1/analytics/contract-churn"
      );

    return response.data;
  };

// - /analytics/tenure-distribution
export const getTenureDistribution =
  async (): Promise<
    TenureDistributionItem[]
  > => {

    const response =
      await apiClient.get<
        TenureDistributionItem[]
      >(
        "/api/v1/analytics/tenure-distribution"
      );

    return response.data;
  };