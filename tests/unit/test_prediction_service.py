import pytest

from unittest.mock import (
    MagicMock,
    patch,
)

from ml.churn_model.services.prediction_service import (
    ChurnPredictionService,
)

def test_prediction_service_loads_threshold_from_metadata(
    tmp_path,
):

    metadata_path = (
        tmp_path
        / "metadata.json"
    )

    metadata_path.write_text(
        """
        {
          "decision_threshold": 0.48
        }
        """,
        encoding="utf-8",
    )


    with patch(
        "ml.churn_model.services.prediction_service.ChurnPredictor"
    ):

        service = ChurnPredictionService(
            model_path=
                tmp_path
                / "model.joblib",

            metadata_path=
                metadata_path,
        )


    assert (
        service.threshold
        ==
        pytest.approx(
            0.48
        )
    )

def test_predict_returns_churn_when_probability_above_threshold(
    tmp_path,
    valid_customer,
):

    metadata_path = (
        tmp_path
        / "metadata.json"
    )

    metadata_path.write_text(
        """
        {
          "decision_threshold": 0.48
        }
        """,
        encoding="utf-8",
    )


    with patch(
        "ml.churn_model.services.prediction_service.ChurnPredictor"
    ) as predictor_class:

        predictor_instance = (
            MagicMock()
        )

        predictor_instance \
            .predict_probability \
            .return_value = 0.80


        predictor_class.return_value = (
            predictor_instance
        )


        service = ChurnPredictionService(
            model_path=
                tmp_path
                / "model.joblib",

            metadata_path=
                metadata_path,
        )

        customer = (
                    valid_customer.copy()
                )
        
        customer[
                    "tenure"
                ] = 5

        result = service.predict(
            customer
        )


    assert (
        result[
            "prediction"
        ]
        ==
        1
    )


    assert (
        result[
            "churn_probability"
        ]
        ==
        pytest.approx(
            0.80
        )
    )

def test_predict_returns_no_churn_when_probability_below_threshold(
    tmp_path,
    valid_customer,
):

    metadata_path = (
        tmp_path
        / "metadata.json"
    )

    metadata_path.write_text(
        """
        {
          "decision_threshold": 0.48
        }
        """,
        encoding="utf-8",
    )


    with patch(
        "ml.churn_model.services.prediction_service.ChurnPredictor"
    ) as predictor_class:

        predictor_instance = (
            MagicMock()
        )

        predictor_instance \
            .predict_probability \
            .return_value = 0.20


        predictor_class.return_value = (
            predictor_instance
        )


        service = ChurnPredictionService(
            model_path=
                tmp_path
                / "model.joblib",

            metadata_path=
                metadata_path,
        )

        customer = (
            valid_customer.copy()
        )

        customer[
            "tenure"
        ] = 60

        result = service.predict(
            customer
        )


    assert (
        result[
            "prediction"
        ]
        ==
        0
    )
    
    assert (
        result[
            "churn_probability"
        ]
        ==
        pytest.approx(
            0.20
        )
    )