from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.app.api.routes.health import (
    router as health_router,
)

from api.app.api.routes.predictions import (
    router as predictions_router,
)

from api.app.api.routes.analytics import (
    router as analytics_router,
)

from api.app.api.routes.model_metrics import (
    router as model_metrics_router,
)

from api.app.api.routes.model_evaluation import (
    router as model_evaluation_router,
)

from api.app.api.routes.prediction_history import (
    router as prediction_history_router,
)

from api.app.configuration.logging_config import (
    configure_logging,
)

from api.app.middleware.request_logging import (
    RequestLoggingMiddleware,
)
# add configuration
configure_logging()

app = FastAPI(
    title="Customer Churn Prediction API",
    description=(
        "REST API for predicting customer churn "
        "using a trained machine learning model."
    ),
    version="1.0.0",
     # Swagger
    docs_url="/docs",

    # ReDoc
    redoc_url="/redoc",

    # OpenAPI JSON
    openapi_url="/openapi.json",
)


allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Logging middleware before all requests
app.add_middleware(RequestLoggingMiddleware)
# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)


# Routes

app.include_router(
    model_metrics_router,
    prefix="/api/v1",
)


app.include_router(
    model_evaluation_router,
    prefix="/api/v1",
)


app.include_router(
    predictions_router,
    prefix="/api/v1",
)

app.include_router(
    model_metrics_router,
    prefix="/api/v1",
)

app.include_router(
    health_router,
    prefix="/api/v1",
)

app.include_router(
    analytics_router,
    prefix="/api/v1",
)

app.include_router(
    prediction_history_router,
    prefix="/api/v1",
)

# Root endpoint

@app.get(
    "/",
    tags=["Root"],
     summary="API Information",
    description="Return basic information about the API.",
)
def root():

    return {
        "name": "Customer Churn Prediction API",
        "version": "1.0.0",
        "swagger": "/docs",
        "redoc": "/redoc",
        "health": "/api/v1/health",
    }