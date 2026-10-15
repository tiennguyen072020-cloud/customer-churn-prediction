import {
  useQuery,
} from "@tanstack/react-query";

import {
  getConfusionMatrix,
  getFeatureImportance,
  getModelInfo,
  getModelMetrics,
  getRocCurve,
} from "../services/modelPerformanceService";


const STALE_TIME =
  10 * 60 * 1000;

export const useFeatureImportance = () => {

  return useQuery({

    queryKey: [
      "model-performance",
      "feature-importance",
    ],

    queryFn:
      getFeatureImportance,

    staleTime:
      STALE_TIME,
  });
};

export const useModelMetrics = () => {

  return useQuery({
    queryKey: [
      "model-performance",
      "metrics",
    ],

    queryFn:
      getModelMetrics,

    staleTime:
      STALE_TIME,
  });
};


export const useModelInfo = () => {

  return useQuery({
    queryKey: [
      "model-performance",
      "info",
    ],

    queryFn:
      getModelInfo,

    staleTime:
      STALE_TIME,
  });
};


export const useConfusionMatrix = () => {

  return useQuery({
    queryKey: [
      "model-performance",
      "confusion-matrix",
    ],

    queryFn:
      getConfusionMatrix,

    staleTime:
      STALE_TIME,
  });
};


export const useRocCurve = () => {

  return useQuery({
    queryKey: [
      "model-performance",
      "roc-curve",
    ],

    queryFn:
      getRocCurve,

    staleTime:
      STALE_TIME,
  });
};