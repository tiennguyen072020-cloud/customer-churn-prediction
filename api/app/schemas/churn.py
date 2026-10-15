from typing import Literal

from pydantic import BaseModel, Field
class ChurnPredictionRequest(BaseModel):
    """
    Request payload for customer churn prediction.
    """

    gender: Literal["Male", "Female"]

    SeniorCitizen: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes",
    )

    Partner: Literal["Yes", "No"]

    Dependents: Literal["Yes", "No"]

    tenure: int = Field(
        ...,
        ge=0,
        description="Number of months the customer has stayed",
    )

    PhoneService: Literal["Yes", "No"]

    MultipleLines: Literal[
        "Yes",
        "No",
        "No phone service",
    ]

    InternetService: Literal[
        "DSL",
        "Fiber optic",
        "No",
    ]

    OnlineSecurity: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    OnlineBackup: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    DeviceProtection: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    TechSupport: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    StreamingTV: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    StreamingMovies: Literal[
        "Yes",
        "No",
        "No internet service",
    ]

    Contract: Literal[
        "Month-to-month",
        "One year",
        "Two year",
    ]

    PaperlessBilling: Literal[
        "Yes",
        "No",
    ]

    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)",
    ]

    MonthlyCharges: float = Field(
        ...,
        ge=0,
    )

    TotalCharges: float = Field(
        ...,
        ge=0,
    )


class ChurnPredictionResponse(BaseModel):
    """
    Response returned by the prediction endpoint.
    """

    prediction: int

    churn_prediction: str

    churn_probability: float

    threshold: float