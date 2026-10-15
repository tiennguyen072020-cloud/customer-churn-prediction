from pathlib import Path
from typing import Any

from ml.churn_model.models.predict import (
    ChurnPredictor,
)

from ml.churn_model.models.model_metadata import (
    load_model_metadata,
)

REQUIRED_MODEL_FEATURES = [
    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges",
]

class ChurnPredictionService:
    """
    Business service for customer churn prediction.

    Responsibilities
    ----------------
    - Validate prediction threshold.
    - Request churn probability from the ML predictor.
    - Convert probability into prediction label.
    - Determine churn risk level.
    - Generate business recommendation.
    - Return a stable response structure.
    """

    def __init__(
    self,
    model_path: str | Path,
    metadata_path: str | Path,
) -> None:


    # Load production metadata

        self.metadata = load_model_metadata(
            metadata_path
        )


    # Load optimized decision threshold

        decision_threshold = (
            self.metadata.get(
                "decision_threshold"
            )
        )


        if decision_threshold is None:

            raise ValueError(
                "Model metadata does not contain "
                "'decision_threshold'."
            )


        self._validate_threshold(
            decision_threshold
        )


        self.threshold = float(
            decision_threshold
        )


    # Load production pipeline

        self.predictor = ChurnPredictor(
            model_path=model_path
        )
    def get_model_info(
        self,
    ) -> dict[str, Any]:
        """
            Return model metadata and active threshold.
        """

        return {
         **self.metadata,
            "threshold": self.threshold,
        }
    def predict(
        self,
        customer: dict[str, Any],
    ) -> dict[str, Any]:
        """
        Predict customer churn.

        Parameters
        ----------
        customer : dict[str, Any]
            Raw customer information.

        Returns
        -------
        dict[str, Any]
            Prediction result including probability,
            risk level and recommendation.
        """

        self._validate_customer(
            customer
        )

        churn_probability = (
            self.predictor
            .predict_probability(
                customer
            )
        )

        prediction = int(
            churn_probability
            >= self.threshold
        )

        prediction_label = (
            "Churn"
            if prediction == 1
            else "No Churn"
        )

        risk_level = (
            self._get_risk_level(
                churn_probability
            )
        )

        recommendation = (
            self._get_recommendation(
                risk_level
            )
        )

        return {
            "prediction": prediction,

            "prediction_label":
                prediction_label,

            "churn_probability":
                round(
                    churn_probability,
                    4,
                ),

            "churn_probability_percent":
                round(
                    churn_probability * 100,
                    2,
                ),

            "threshold":
                self.threshold,

            "risk_level":
                risk_level,

            "recommendation":
                recommendation,
        }

    def predict_batch(
        self,
        customers: list[dict[str, Any]],
    ) -> list[dict[str, Any]]:
        """
        Predict churn for multiple customers.
        """

        if not customers:
            raise ValueError(
                "Customers list cannot be empty."
            )
        
        for customer in customers:
            self._validate_customer(
                customer
            )

        probabilities = (
            self.predictor
            .predict_batch_probability(
                customers
            )
        )

        results = []

        for probability in probabilities:

            prediction = int(
                probability
                >= self.threshold
            )

            prediction_label = (
                "Churn"
                if prediction == 1
                else "No Churn"
            )

            risk_level = (
                self._get_risk_level(
                    probability
                )
            )

            recommendation = (
                self._get_recommendation(
                    risk_level
                )
            )

            results.append({
                "prediction":
                    prediction,

                "prediction_label":
                    prediction_label,

                "churn_probability":
                    round(
                        probability,
                        4,
                    ),

                "churn_probability_percent":
                    round(
                        probability * 100,
                        2,
                    ),

                "threshold":
                    self.threshold,

                "risk_level":
                    risk_level,

                "recommendation":
                    recommendation,
            })

        return results

    @staticmethod
    def _validate_threshold(
    threshold: float,
) -> None:

        if not isinstance(
            threshold,
            (int, float),
        ):
            raise TypeError(
                "Threshold must be numeric."
            )


        if not 0.0 <= float(threshold) <= 1.0:

            raise ValueError(
                "Threshold must be between "
                "0 and 1."
            )

    @staticmethod
    def _validate_customer(
    customer: dict[str, Any],
    ) -> None:
        """  
    Validate whether all raw model 
    input features are available. 
    """

        if not customer:
         raise ValueError(
            "Customer data cannot be empty."
            )

        missing_fields = [
        field
        for field
            in REQUIRED_MODEL_FEATURES
                if field not in customer
        ]

        if missing_fields:

            raise ValueError(
                "Missing required model fields: "
                + ", ".join(
                   missing_fields
             )
        )

    @staticmethod
    def _get_risk_level(
        churn_probability: float,
    ) -> str:
        """
        Convert churn probability into
        a business-friendly risk level.
        """

        if churn_probability < 0.30:
            return "Low"

        if churn_probability < 0.60:
            return "Medium"

        if churn_probability < 0.80:
            return "High"

        return "Critical"

    @staticmethod
    def _get_recommendation(
        risk_level: str,
    ) -> str:
        """
        Generate a simple retention recommendation.
        """

        recommendations = {

            "Low":
                (
                    "No immediate retention action "
                    "is required. Continue standard "
                    "customer engagement."
                ),

            "Medium":
                (
                    "Monitor the customer and consider "
                    "proactive engagement or a "
                    "personalized service offer."
                ),

            "High":
                (
                    "Prioritize retention outreach and "
                    "consider targeted incentives, "
                    "contract upgrades, or service review."
                ),

            "Critical":
                (
                    "Immediate retention intervention is "
                    "recommended. Contact the customer "
                    "and investigate potential service "
                    "or pricing concerns."
                ),
        }

        return recommendations[
            risk_level
        ]

    
    