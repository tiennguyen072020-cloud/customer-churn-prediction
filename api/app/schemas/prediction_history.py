from datetime import datetime

from pydantic import BaseModel


class PredictionHistoryItem(BaseModel):
    id: str

    timestamp: datetime

    customer_id: str | None = None

    churn_probability: float

    prediction: int

    prediction_label: str

    threshold: float

    risk_level: str | None = None


class PredictionHistoryResponse(BaseModel):
    total: int

    items: list[
        PredictionHistoryItem
    ]