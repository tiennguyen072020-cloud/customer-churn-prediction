# GET /api/v1/health
# {
#     "status": "healthy",
#     "service": "customer-churn-api"
# }

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["System"],
)


@router.get("",
    summary="Health Check",
    description="Check whether the Customer Churn Prediction API is running.",
    response_description="API health status",)
def health_check():
    """
    Check whether the API is running.
    """

    return {
        "status":
            "healthy",

        "service":
            "customer-churn-api",

        "version":
            "1.0.0",
    }