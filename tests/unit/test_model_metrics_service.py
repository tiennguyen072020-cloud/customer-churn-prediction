import pandas as pd
import pytest 
import sys
from pathlib import Path

from api.app.services.model_metrics_service import (
    ModelMetricsService,
)

def test_get_metrics_returns_expected_values(
    tmp_path,
):

    metrics_path = (
        tmp_path
        / "metrics.csv"
    )


    pd.DataFrame(
        [
            {
                "Model":
                    "End-to-End Tuned Random Forest",

                "Accuracy":
                    0.76,

                "Precision":
                    0.54,

                "Recall":
                    0.79,

                "F1":
                    0.64,

                "ROC-AUC":
                    0.84,

                "PR-AUC":
                    0.65,
            }
        ]
    ).to_csv(
        metrics_path,
        index=False,
    )


    service = (
        ModelMetricsService(
            metrics_path=
                metrics_path
        )
    )


    result = (
        service
        .get_metrics()
    )


    assert (
        result.model_name
        ==
        "End-to-End Tuned Random Forest"
    )


    assert (
        result.metrics.roc_auc
        ==
        pytest.approx(
            0.84
        )
    )

def test_get_metrics_raises_when_file_missing(
        tmp_path,
    ):

        service = (
            ModelMetricsService(
                metrics_path=
                    tmp_path
                    / "missing.csv"
            )
        )


        with pytest.raises(
            FileNotFoundError
        ):

            service.get_metrics()

def test_get_metrics_raises_when_csv_empty(
    tmp_path,
):

    metrics_path = (
        tmp_path
        / "empty.csv"
    )


    metrics_path.write_text(
        "",
        encoding="utf-8",
    )


    service = (
        ModelMetricsService(
            metrics_path=
                metrics_path
        )
    )


    with pytest.raises(
        Exception
    ):

        service.get_metrics()

def test_get_metrics_raises_when_required_columns_missing(
    tmp_path,
):

    metrics_path = (
        tmp_path
        / "metrics.csv"
    )


    pd.DataFrame(
        [
            {
                "Model":
                    "RF",

                "Accuracy":
                    0.76,
            }
        ]
    ).to_csv(
        metrics_path,
        index=False,
    )


    service = (
        ModelMetricsService(
            metrics_path=
                metrics_path
        )
    )


    with pytest.raises(
        ValueError
    ):

        service.get_metrics()