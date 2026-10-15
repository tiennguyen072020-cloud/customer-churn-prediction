export interface PredictionHistoryItem {
  id: string;
  timestamp: string;

  customer_id?: string | null;

  churn_probability: number;

  prediction: number;

  prediction_label: string;

  threshold: number;

  risk_level?: string | null;
}


export interface PredictionHistoryResponse {
  total: number;

  items: PredictionHistoryItem[];
}