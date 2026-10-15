from pathlib import Path

# Project Root
PROJECT_ROOT = Path(__file__).resolve().parents[3]
#Artifact Directories
ARTIFACTS_DIR = ( 
    PROJECT_ROOT 
    / "artifacts"
    )

MODEL_DIR = (
    ARTIFACTS_DIR
    / "models"
)


METRICS_DIR = (
    ARTIFACTS_DIR
    / "metrics"
)


EVALUATION_DIR = (
    ARTIFACTS_DIR
    / "evaluation"
)

# Production Model Artifacts -  Model Files
MODEL_PATH = (
    MODEL_DIR
    / "churn_pipeline.joblib"
)

MODEL_METADATA_PATH = (
    MODEL_DIR
    / "churn_pipeline_metadata.json"
)
# Production Metrics
MODEL_METRICS_PATH = (
    ARTIFACTS_DIR
    / "metrics"
    / "end_to_end_pipeline_metrics.csv"
)
# Model Comparison Metrics
# Keep for future comparison endpoint
MODEL_COMPARISON_METRICS_PATH = (
    ARTIFACTS_DIR
    / "metrics"
    / "final_model_metrics.csv"
)
# Evaluation Artifacts
CONFUSION_MATRIX_PATH = (
    EVALUATION_DIR
    / "confusion_matrix.json"
)


ROC_CURVE_PATH = (
    EVALUATION_DIR
    / "roc_curve.json"
)

FEATURE_IMPORTANCE_PATH = (
    EVALUATION_DIR
    / "feature_importance.json"
)

# Predictions
PREDICTIONS_DIR = (
    ARTIFACTS_DIR
    / "predictions"
)


PREDICTIONS_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


PREDICTION_HISTORY_PATH = (
    PREDICTIONS_DIR
    / "prediction_history.csv"
)