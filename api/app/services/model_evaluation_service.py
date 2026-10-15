import json

from pathlib import Path

from api.app.schemas.model_evaluation import (
    ConfusionMatrixResponse,
    FeatureImportanceResponse,
    ModelInfoResponse,
    RocCurveResponse,
)


class ModelEvaluationService:

    def __init__(
        self,
        metadata_path: Path,
        confusion_matrix_path: Path,
        roc_curve_path: Path,
        feature_importance_path: Path,
    ):

        self.metadata_path = (
            metadata_path
        )

        self.confusion_matrix_path = (
            confusion_matrix_path
        )

        self.roc_curve_path = (
            roc_curve_path
        )

        self.feature_importance_path = (
            feature_importance_path
        )

    def get_feature_importance(
        self,
    ) -> FeatureImportanceResponse:

        data = self._read_json(
            self.feature_importance_path
        )

        return (
            FeatureImportanceResponse(
                **data
            )
        )

    @staticmethod
    def _read_json(
        path: Path,
    ) -> dict:

        if not path.exists():

            raise FileNotFoundError(
                "Evaluation artifact "
                "was not found: "
                f"{path}"
            )


        with path.open(
            "r",
            encoding="utf-8",
        ) as file:

            return json.load(
                file
            )


    def get_model_info(
        self,
    ) -> ModelInfoResponse:

        data = self._read_json(
            self.metadata_path
        )


        return ModelInfoResponse(
            model_name=data[
                "model_name"
            ],

            model_version=data.get(
                "model_version"
            ),

            algorithm=data[
                "algorithm"
            ],

            task=data[
                "task"
            ],

            target=data[
                "target"
            ],

            positive_class=data[
                "positive_class"
            ],

            negative_class=data[
                "negative_class"
            ],

            decision_threshold=float(
                data[
                    "decision_threshold"
                ]
            ),

            model_selection_metric=
                data.get(
                    "model_selection_metric"
                ),

            threshold_selection_metric=
                data.get(
                    "threshold_selection_metric"
                ),

            status=data[
                "status"
            ],

            metrics=data.get(
                "metrics",
                {},
            ),
        )


    def get_confusion_matrix(
        self,
    ) -> ConfusionMatrixResponse:

        data = self._read_json(
            self.confusion_matrix_path
        )


        return (
            ConfusionMatrixResponse(
                **data
            )
        )


    def get_roc_curve(
        self,
    ) -> RocCurveResponse:

        data = self._read_json(
            self.roc_curve_path
        )


        return (
            RocCurveResponse(
                **data
            )
        )