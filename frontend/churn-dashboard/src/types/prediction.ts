export type YesNo = "Yes" | "No";

export interface ChurnPredictionRequest {
  gender: "Male" | "Female";

  SeniorCitizen: number;

  Partner: YesNo;

  Dependents: YesNo;

  tenure: number;

  PhoneService: YesNo;

  MultipleLines:
    | "Yes"
    | "No"
    | "No phone service";

  InternetService:
    | "DSL"
    | "Fiber optic"
    | "No";

  OnlineSecurity:
    | "Yes"
    | "No"
    | "No internet service";

  OnlineBackup:
    | "Yes"
    | "No"
    | "No internet service";

  DeviceProtection:
    | "Yes"
    | "No"
    | "No internet service";

  TechSupport:
    | "Yes"
    | "No"
    | "No internet service";

  StreamingTV:
    | "Yes"
    | "No"
    | "No internet service";

  StreamingMovies:
    | "Yes"
    | "No"
    | "No internet service";

  Contract:
    | "Month-to-month"
    | "One year"
    | "Two year";

  PaperlessBilling: YesNo;

  PaymentMethod:
    | "Electronic check"
    | "Mailed check"
    | "Bank transfer (automatic)"
    | "Credit card (automatic)";

  MonthlyCharges: number;

  TotalCharges: number;
}


export interface ChurnPredictionResponse {
  prediction: number;

  churn_prediction: "Yes" | "No";

  churn_probability: number;

  threshold: number;
}

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