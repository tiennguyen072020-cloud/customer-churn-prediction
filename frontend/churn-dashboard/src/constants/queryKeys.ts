export const predictionHistoryKeys = {

  all: [
    "prediction-history",
  ] as const,

  list: (
    limit: number
  ) => [
    ...predictionHistoryKeys.all,
    limit,
  ] as const,

};