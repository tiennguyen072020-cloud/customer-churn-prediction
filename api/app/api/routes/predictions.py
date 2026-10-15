from fastapi import (
    APIRouter,
    HTTPException,
    status,
)

from api.app.configuration.logging_config import (
    get_logger,
)

from api.app.schemas.churn import (
    ChurnPredictionRequest,
    ChurnPredictionResponse,
)

from api.app.configuration.config import (
    MODEL_PATH,
    MODEL_METADATA_PATH,
    PREDICTION_HISTORY_PATH,
)

from api.app.services.prediction_history_service import (
    PredictionHistoryService,
)

from ml.churn_model.services.prediction_service import (
    ChurnPredictionService,
)


logger = get_logger(
    __name__
)
# Router

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)



# Prediction Service

prediction_service = (
    ChurnPredictionService(
        model_path=MODEL_PATH,
        metadata_path=MODEL_METADATA_PATH,
    )
)



# Prediction History Service

history_service = (
    PredictionHistoryService(
        history_path=
            PREDICTION_HISTORY_PATH
    )
)



# Predict Customer Churn

@router.post(
    "/churn",
    response_model=ChurnPredictionResponse,
    status_code=status.HTTP_200_OK,
    summary="Predict Customer Churn",
    description="""
Predict whether a customer is likely to churn.

The endpoint receives customer information and returns:

- Prediction
- Churn status
- Churn probability
- Decision threshold

The prediction result is also stored in
prediction history.
""",
    response_description=
        "Customer churn prediction result",
)
def predict_churn(
    request: ChurnPredictionRequest,
):

    try:

        # Convert request to dictionary

        customer = (
            request.model_dump()
        )


        # Remove non-ML fields if present

        customer_id = (
            customer.pop(
                "customer_id",
                None,
            )
        )


        # Predict

        result = (
            prediction_service
            .predict(
                customer
            )
        )


        logger.info(
            "Prediction completed: "
            "prediction=%s probability=%.4f",
            result.get(
                "prediction"
            ),
            float(
                result.get(
                    "churn_probability",
                    0,
                )
            ),
        )



        # Resolve Prediction Value

        prediction_value = (
            result.get(
                "prediction"
            )
        )


        if prediction_value is None:
            logger.warning(
                "Exception ValueError "
                "Prediction service did not"
                "return 'prediction'."                 
            )
            raise ValueError(
                "Prediction service did not "
                "return 'prediction'."
            )


        prediction_value = int(
            prediction_value
        )



        # Resolve Prediction Label

        prediction_label = (
            result.get(
                "prediction_label"
            )
        )


        if prediction_label is None:
            logger.info(
                "Exception ValueError "
                "prediction label"
                "return Churn(1)/NoChurn(none): %s" ,
                str(prediction_label)                 
            )
            prediction_label = (
                "Churn"
                if prediction_value == 1
                else "No Churn"
            )


        # Save Prediction History

        history_service.save_prediction(

            customer_id=
                customer_id,

            churn_probability=
                float(
                    result[
                        "churn_probability"
                    ]
                ),

            prediction=
                prediction_value,

            prediction_label=
                prediction_label,

            threshold=
                float(
                    result.get(
                        "threshold",
                        prediction_service.threshold,
                    )
                ),

            risk_level=
                result.get(
                    "risk_level"
                ),
        )


    
        # API Response
        return ChurnPredictionResponse(

            prediction=
                prediction_value,

            churn_prediction=
                    prediction_label,

            churn_probability=
                float(
                    result[
                        "churn_probability"
                    ]
                ),

            threshold=
                float(
                    result.get(
                        "threshold",
                        prediction_service.threshold,
                    )
                ),
        )


    except ValueError as exc:
        logger.warning(
            "Invalid prediction request: %s",
            exc,
        )

        raise HTTPException(
            status_code=
                status.HTTP_400_BAD_REQUEST,

            detail=
                "Unexpected prediction error.",
        ) from exc


    except Exception as exc:

        logger.exception(
            "Exception Prediction error: %s",
            exc
        )
        raise HTTPException(
            status_code=
                status.HTTP_500_INTERNAL_SERVER_ERROR,

            detail=
                "Prediction service failed.",
        ) from exc