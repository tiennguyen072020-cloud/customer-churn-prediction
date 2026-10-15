from pydantic import BaseModel


class ModelMetrics(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    pr_auc: float | None = None


class ModelInformation(BaseModel):
    name: str
    model_type: str | None = None
    threshold: float | None = None


class ModelMetricsResponse(BaseModel):
    model_name: str
    metrics: ModelMetrics