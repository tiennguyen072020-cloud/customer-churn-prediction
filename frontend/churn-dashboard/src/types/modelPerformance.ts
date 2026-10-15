export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  pr_auc?: number | null;
}

export interface ModelMetricsResponse {
  model_name: string;
  metrics: ModelMetrics;
}


export interface ModelInformation {
  model_name: string;
  model_version?: string | null;
  algorithm: string;
  task: string;
  target: string;

  positive_class: string;
  negative_class: string;

  decision_threshold: number;

  model_selection_metric?: string | null;
  threshold_selection_metric?: string | null;

  status: string;

  metrics: Record<string, number>;
}


export interface ConfusionMatrixResponse {
  true_negative: number;
  false_positive: number;
  false_negative: number;
  true_positive: number;

  matrix: number[][];
  labels: string[];
}


export interface RocPoint {
  fpr: number;
  tpr: number;
}


export interface RocCurveResponse {
  auc: number;
  points: RocPoint[];
}

export interface FeatureImportanceItem {
  rank: number;
  feature: string;
  importance: number;
  percentage: number;
}


export interface FeatureImportanceResponse {
  model_name: string;
  algorithm: string;
  method: string;

  total_transformed_features: number;
  total_business_features: number;
  top_n: number;

  features: FeatureImportanceItem[];
}