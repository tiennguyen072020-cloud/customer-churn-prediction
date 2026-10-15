from fastapi import (
    APIRouter,
    HTTPException,
)
from api.app.configuration.logging_config import (
    get_logger,
)
from api.app.configuration.config import (
    CONFUSION_MATRIX_PATH,
    FEATURE_IMPORTANCE_PATH,
    MODEL_METADATA_PATH,
    ROC_CURVE_PATH,
)

from api.app.schemas.model_evaluation import (
    ConfusionMatrixResponse,
    FeatureImportanceResponse,
    ModelInfoResponse,
    RocCurveResponse,
)

from api.app.services.model_evaluation_service import (
    ModelEvaluationService,
)


router = APIRouter(
    prefix="/model",
    tags=["Model Performance"],
)
logger = get_logger(
    __name__
)

model_evaluation_service = (
    ModelEvaluationService(

        metadata_path=
            MODEL_METADATA_PATH,

        confusion_matrix_path=
            CONFUSION_MATRIX_PATH,

        roc_curve_path=
            ROC_CURVE_PATH,

        feature_importance_path=
            FEATURE_IMPORTANCE_PATH,
    )
)

# Feature Importance
@router.get(
    "/feature-importance",
    response_model=
        FeatureImportanceResponse,
)
def get_feature_importance():

    try:

        return (
            model_evaluation_service
            .get_feature_importance()
        )

    except FileNotFoundError as exc:

        logger.exception( "Exception FileNotFoundError: "+
                           str(exc)
                       )
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc

    except ValueError as exc:
        logger.exception( "Exception ValueError: "+
                                   str(exc)
                               )
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        logger.exception( "HTTP Exception: "+
                                           str(exc)
                                       )
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to load "
                "feature importance."
            ),
        ) from exc

# Model Information

@router.get(
    "/info",
    response_model=ModelInfoResponse,
)
def get_model_info():

    try:

        return (
            model_evaluation_service
            .get_model_info()
        )

    except FileNotFoundError as exc:
        logger.exception(
            "Exception FileNotFoundError" + str(exc)
        )
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        logger.exception(
            "Exception Failed to load" + 
            str(exc)
        )
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to load "
                "model information."
            ),
        ) from exc



# Confusion Matrix

@router.get(
    "/confusion-matrix",
    response_model=ConfusionMatrixResponse,
)
def get_confusion_matrix():

    try:

        return (
            model_evaluation_service
            .get_confusion_matrix()
        )

    except FileNotFoundError as exc:
        logger.exception(
            "Exception FileNotFoundError" + 
            str(exc)
        )
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        logger.exception(
            "Exception Failed to load" + 
                    str(exc)
        )
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to load "
                "confusion matrix."
            ),
        ) from exc



# ROC Curve

@router.get(
    "/roc-curve",
    response_model=RocCurveResponse,
)
def get_roc_curve():

    try:

        return (
            model_evaluation_service
            .get_roc_curve()
        )

    except FileNotFoundError as exc:
        logger.exception(
            "Exception FileNotFoundError" + 
            str(exc)
        )
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        logger.exception(
                    "Exception Failed to load" + 
                    str(exc)
                )
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to load "
                "ROC curve."
            ),
        ) from exc