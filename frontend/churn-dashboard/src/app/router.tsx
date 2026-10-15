import type { RouteObject } from "react-router-dom";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import DashboardPage
  from "../pages/DashboardPage";

import PredictionPage
  from "../pages/PredictionPage";

import NotFoundPage
  from "../pages/NotFoundPage";

import AnalyticsPage
  from "../pages/AnalyticsPage";

import ModelPerformancePage 
  from "../pages/ModelPerformancePage";

import PredictionHistoryPage
  from "../pages/PredictionHistoryPage";
export const routes:
  RouteObject[] = [

  {
    path: "/",

    element:
      <DashboardLayout />,

    children: [

      {
        index: true,

        element:
          <DashboardPage />,
      },
      {
         path:
          "model-performance",

        element:
          <ModelPerformancePage />,
      },
      {
        path:
          "prediction",

        element:
          <PredictionPage />,
      },
      {
        path: 
          "analytics",

        element:
          <AnalyticsPage />,
      },
      {
        path:
          "prediction-history",

        element:
          <PredictionHistoryPage />,
      },
    ],
  },


  {
    path: "*",

    element:
      <NotFoundPage />,
  },

];