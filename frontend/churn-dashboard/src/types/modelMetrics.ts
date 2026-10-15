export interface ModelInformation {
  name: string;
  model_type: string | null;
  task: string;
  target: string;
  threshold: number;
  status: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
}

export interface ModelMetricsResponse {
  model: ModelInformation;
  metrics: ModelMetrics;
}