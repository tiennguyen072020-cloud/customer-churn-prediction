export interface PredictionHistoryItem {

  id: string;

  timestamp: string;

  contract: string;

  tenure: number;

  monthlyCharges: number;

  probability: number;

  prediction: "Yes" | "No";

  riskLevel:
    | "Low"
    | "Medium"
    | "High";

}