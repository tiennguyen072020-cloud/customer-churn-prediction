from fastapi import (
    APIRouter,
    Query,
)

from api.app.configuration.config import (
    PREDICTION_HISTORY_PATH,
)

from api.app.schemas.prediction_history import (
    PredictionHistoryResponse,
)

from api.app.services.prediction_history_service import (
    PredictionHistoryService,
)


router = APIRouter(
    prefix="/predictions",
    tags=["Prediction History"],
)


history_service = PredictionHistoryService(
    history_path=PREDICTION_HISTORY_PATH
)


@router.get(
    "/history",
    response_model=PredictionHistoryResponse,
)
def get_prediction_history(
    limit: int = Query(
        default=100,
        ge=1,
        le=1000,
    ),
):

    items = history_service.get_history(
        limit=limit
    )

    return PredictionHistoryResponse(
        total=len(items),
        items=items,
    )