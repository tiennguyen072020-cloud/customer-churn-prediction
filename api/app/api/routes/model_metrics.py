from fastapi import (
    APIRouter,
    HTTPException,
)
from api.app.configuration.logging_config import (
    get_logger,
)

from api.app.configuration.config import (
    MODEL_METRICS_PATH,
)

from api.app.schemas.model_metrics import (
    ModelMetricsResponse,
)

from api.app.services.model_metrics_service import (
    ModelMetricsService,
)

logger = get_logger(
    __name__
)

router = APIRouter(
    prefix="/model",
    tags=["Model Performance"],
)


model_metrics_service = (
    ModelMetricsService(
        metrics_path=MODEL_METRICS_PATH
    )
)


@router.get(
    "/metrics",
    response_model=ModelMetricsResponse,
)
def get_model_metrics():

    try:

        return (
            model_metrics_service
            .get_metrics()
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

    except ValueError as exc:
        logger.exception(
            "Exception ValueError" + 
                            str(exc)
        )
        raise HTTPException(
            status_code=500,
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
                "model metrics."
            ),
        ) from exc