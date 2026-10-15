from pathlib import Path
import sys
# add original folder into PYTHONPATH
project_root = Path().resolve().parent   
sys.path.append(str(project_root))
from ml.churn_model.models.predict import ChurnPredictionService


PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = (
    PROJECT_ROOT
    / "artifacts"
    / "models"
    / "churn_pipeline.joblib"
)


prediction_service = ChurnPredictionService(
    model_path=MODEL_PATH,
    threshold=0.5,
)