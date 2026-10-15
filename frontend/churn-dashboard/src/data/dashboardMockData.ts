import type {
  ChurnDistributionItem,
  ContractChurnItem,
  DashboardSummary,
  RiskDistributionItem,
  TenureDistributionItem,
} from "../types/dashboard";


export const dashboardSummary: DashboardSummary = {
  total_customers: 7043,

  churn_customers: 1869,

  retained_customers: 5174,

  churn_rate: 26.54,

  retention_rate: 73.46,

  model_threshold: 0.5,
};


export const churnDistribution:
  ChurnDistributionItem[] = [

  {
    label: "Retained",
    value: 5174,
  },

  {
    label: "Churned",
    value: 1869,
  },

];


export const contractChurnData:
  ContractChurnItem[] = [

  {
    contract: "Month-to-month",
    churn_rate: 42.7,
  },

  {
    contract: "One year",
    churn_rate: 11.3,
  },

  {
    contract: "Two year",
    churn_rate: 2.8,
  },

];


export const tenureDistribution:
  TenureDistributionItem[] = [

  {
    range: "0-12",
    customers: 2186,
  },

  {
    range: "13-24",
    customers: 1024,
  },

  {
    range: "25-36",
    customers: 832,
  },

  {
    range: "37-48",
    customers: 745,
  },

  {
    range: "49-60",
    customers: 869,
  },

  {
    range: "61+",
    customers: 1387,
  },

];


export const riskDistribution:
  RiskDistributionItem[] = [

  {
    risk: "Low",
    customers: 3120,
  },

  {
    risk: "Medium",
    customers: 2054,
  },

  {
    risk: "High",
    customers: 1869,
  },

];