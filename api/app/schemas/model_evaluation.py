from pydantic import BaseModel


class ModelInfoResponse(BaseModel):
    model_name: str
    model_version: str | None = None
    algorithm: str
    task: str
    target: str

    positive_class: str
    negative_class: str

    decision_threshold: float

    model_selection_metric: str | None = None
    threshold_selection_metric: str | None = None

    status: str

    metrics: dict[str, float]


class ConfusionMatrixResponse(BaseModel):
    true_negative: int
    false_positive: int
    false_negative: int
    true_positive: int

    matrix: list[list[int]]
    labels: list[str]


class RocPoint(BaseModel):
    fpr: float
    tpr: float


class RocCurveResponse(BaseModel):
    auc: float
    points: list[RocPoint]


class FeatureImportanceItem(BaseModel):
    rank: int
    feature: str
    importance: float
    percentage: float


class FeatureImportanceResponse(BaseModel):
    model_name: str
    algorithm: str
    method: str

    total_transformed_features: int
    total_business_features: int
    top_n: int

    features: list[
        FeatureImportanceItem
    ]