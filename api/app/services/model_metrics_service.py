from pathlib import Path

import pandas as pd

from api.app.schemas.model_metrics import (
    ModelMetrics,
    ModelMetricsResponse,
)


class ModelMetricsService:

    def __init__(
        self,
        metrics_path: Path,
    ):
        self.metrics_path = (
            metrics_path
        )


    def get_metrics(
        self,
    ) -> ModelMetricsResponse:

        if not self.metrics_path.exists():

            raise FileNotFoundError(
                "Production model metrics "
                "were not found: "
                f"{self.metrics_path}"
            )


        df = pd.read_csv(
            self.metrics_path
        )


        if df.empty:

            raise ValueError(
                "Production model metrics "
                "file is empty."
            )


        row = df.iloc[0]


        required_columns = {
            "Model",
            "Accuracy",
            "Precision",
            "Recall",
            "F1",
            "ROC-AUC",
        }


        missing_columns = (
            required_columns
            - set(df.columns)
        )


        if missing_columns:

            raise ValueError(
                "Missing required metric columns: "
                f"{sorted(missing_columns)}"
            )


        pr_auc = None

        if "PR-AUC" in row.index:

            pr_auc = float(
                row["PR-AUC"]
            )


        return ModelMetricsResponse(

            model_name=str(
                row["Model"]
            ),

            metrics=ModelMetrics(

                accuracy=float(
                    row["Accuracy"]
                ),

                precision=float(
                    row["Precision"]
                ),

                recall=float(
                    row["Recall"]
                ),

                f1_score=float(
                    row["F1"]
                ),

                roc_auc=float(
                    row["ROC-AUC"]
                ),

                pr_auc=pr_auc,
            ),
        )