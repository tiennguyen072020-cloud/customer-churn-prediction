from pathlib import Path
from typing import Any

import joblib
import pandas as pd


class ChurnPredictor:
    """
    Low-level ML prediction wrapper.

    Responsibilities:
    - Load trained pipeline.
    - Convert raw customer input to DataFrame.
    - Generate churn probabilities.
    """

    def __init__(
        self,
        model_path: str | Path,
    ) -> None:

        self.model_path = Path(
            model_path
        )

        if not self.model_path.exists():
            raise FileNotFoundError(
                f"Churn model was not found: "
                f"{self.model_path}"
            )

        self.pipeline = joblib.load(
            self.model_path
        )

    def predict_probability(
        self,
        customer: dict[str, Any],
    ) -> float:
        """
        Predict churn probability
        for one customer.
        """

        customer_df = pd.DataFrame(
            [customer]
        )

        probabilities = (
            self.pipeline.predict_proba(
                customer_df
            )
        )

        churn_probability = (
            probabilities[0, 1]
        )

        return float(
            churn_probability
        )

    def predict_batch_probability(
        self,
        customers: list[
            dict[str, Any]
        ],
    ) -> list[float]:
        """
        Predict churn probabilities
        for multiple customers.
        """

        customers_df = pd.DataFrame(
            customers
        )

        probabilities = (
            self.pipeline.predict_proba(
                customers_df
            )[:, 1]
        )

        return [
            float(probability)
            for probability
            in probabilities
        ]

#
class ChurnPredictionService:

    def __init__(
        self,
        model_path,
        threshold: float = 0.5,
    ):
        self.model_path = model_path
        self.threshold = threshold

        self.model = self._load_model()

    def _load_model(self):

        if not self.model_path.exists():
            raise FileNotFoundError(
                f"Churn model was not found: "
                f"{self.model_path}"
            )

        return joblib.load(
            self.model_path
        )

    def predict(
        self,
        customer: dict,
    ) -> dict:

        customer_df = pd.DataFrame(
            [customer]
        )

        probability = float(
            self.model.predict_proba(
                customer_df
            )[0][1]
        )

        prediction = int(
            probability >= self.threshold
        )

        return {
            "prediction": prediction,
            "churn_prediction": (
                "Yes"
                if prediction == 1
                else "No"
            ),
            "churn_probability": round(
                probability,
                4,
            ),
            "threshold": self.threshold,
        }