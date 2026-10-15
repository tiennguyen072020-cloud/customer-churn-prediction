export type RiskLevel =
  | "Low"
  | "Medium"
  | "High";


export const getRiskLevel = (
  probability: number
): RiskLevel => {

  if (probability < 0.3) {
    return "Low";
  }

  if (probability < 0.6) {
    return "Medium";
  }

  return "High";
};