export interface DashboardSummary {
  total_customers: number;

  churn_customers: number;

  retained_customers: number;

  churn_rate: number;

  retention_rate: number;

  model_threshold: number;
}


export interface ChurnDistributionItem {
  label: string;

  value: number;
}


export interface ContractChurnItem {
  contract: string;

  churn_rate: number;
}


export interface TenureDistributionItem {
  range: string;

  customers: number;
}

export interface InternetServiceChurnItem {
  internet_service: string;

  churn_rate: number;

  customers: number;
}


export interface PaymentMethodChurnItem {
  payment_method: string;

  churn_rate: number;

  customers: number;
}


export interface MonthlyChargesChurnItem {
  range: string;

  churn_rate: number;

  customers: number;
}


export interface TenureChurnItem {
  range: string;

  churn_rate: number;

  customers: number;
}


export type InsightSeverity =
  | "info"
  | "success"
  | "warning"
  | "error";


export interface BusinessInsightItem {
  title: string;

  description: string;

  metric: string;

  severity: InsightSeverity;
}

export interface RiskDistributionItem {
 risk: string;
 
  customers: number;
}