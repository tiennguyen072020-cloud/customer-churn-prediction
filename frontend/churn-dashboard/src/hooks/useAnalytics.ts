import {
  useQuery,
} from "@tanstack/react-query";

import {
  getChurnDistribution,
  getContractChurn,
  getDashboardSummary,
  getTenureDistribution,
  getBusinessInsights,
  getInternetServiceChurn,
  getMonthlyChargesChurn,
  getPaymentMethodChurn,
  getTenureChurn,
} from "../services/analyticsService";


export const useBusinessInsights =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "business-insights",
      ],

      queryFn:
        getBusinessInsights,
    });
  };

export const useTenureChurn =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "tenure-churn",
      ],

      queryFn:
        getTenureChurn,
    });
  };

export const useMonthlyChargesChurn =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "monthly-charges-churn",
      ],

      queryFn:
        getMonthlyChargesChurn,
    });
  };

export const usePaymentMethodChurn =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "payment-method-churn",
      ],

      queryFn:
        getPaymentMethodChurn,
    });
  };


export const useInternetServiceChurn =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "internet-service-churn",
      ],

      queryFn:
        getInternetServiceChurn,
    });
  };

export const useDashboardSummary =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "summary",
      ],

      queryFn:
        getDashboardSummary,
    });

  };


export const useChurnDistribution =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "churn-distribution",
      ],

      queryFn:
        getChurnDistribution,
    });

  };


export const useContractChurn =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "contract-churn",
      ],

      queryFn:
        getContractChurn,
    });

  };


export const useTenureDistribution =
  () => {

    return useQuery({
      queryKey: [
        "analytics",
        "tenure-distribution",
      ],

      queryFn:
        getTenureDistribution,
    });

  };