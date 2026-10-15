from fastapi import APIRouter

from api.app.schemas.analytics import (
     AnalyticsSummaryResponse,
    BusinessInsightItem,
    ChurnDistributionItem,
    ContractChurnItem,
    InternetServiceChurnItem,
    MonthlyChargesChurnItem,
    PaymentMethodChurnItem,
    TenureChurnItem,
    TenureDistributionItem,
)

from api.app.services.analytics_service import (
    analytics_service,
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)

#/business-insights
@router.get(
    "/business-insights",
    response_model=list[
        BusinessInsightItem
    ],
    summary="Get Business Insights",
)
def get_business_insights():

    return (
        analytics_service
        .get_business_insights()
    )
#/tenure-churn
@router.get(
    "/tenure-churn",
    response_model=list[
        TenureChurnItem
    ],
    summary="Get Churn by Tenure",
)
def get_tenure_churn():

    return (
        analytics_service
        .get_tenure_churn()
    )

#/monthly-charges-churn
@router.get(
    "/monthly-charges-churn",
    response_model=list[
        MonthlyChargesChurnItem
    ],
    summary="Get Churn by Monthly Charges",
)
def get_monthly_charges_churn():

    return (
        analytics_service
        .get_monthly_charges_churn()
    )

#/payment-method-churn
@router.get(
    "/payment-method-churn",
    response_model=list[
        PaymentMethodChurnItem
    ],
    summary="Get Churn by Payment Method",
)
def get_payment_method_churn():

    return (
        analytics_service
        .get_payment_method_churn()
    )


# /internet-service-churn
@router.get(
    "/internet-service-churn",
    response_model=list[
        InternetServiceChurnItem
    ],
    summary="Get Churn by Internet Service",
)
def get_internet_service_churn():

    return (
        analytics_service
        .get_internet_service_churn()
    )

#/summary
@router.get(
    "/summary",
    response_model=AnalyticsSummaryResponse,
    summary="Get Dashboard Summary",
)
def get_summary():

    return (
        analytics_service
        .get_summary()
    )

#/churn-distribution
@router.get(
    "/churn-distribution",
    response_model=list[
        ChurnDistributionItem
    ],
    summary="Get Churn Distribution",
)
def get_churn_distribution():

    return (
        analytics_service
        .get_churn_distribution()
    )

#/contract-churn
@router.get(
    "/contract-churn",
    response_model=list[
        ContractChurnItem
    ],
    summary="Get Churn by Contract",
)
def get_contract_churn():

    return (
        analytics_service
        .get_contract_churn()
    )

#/tenure-distribution
@router.get(
    "/tenure-distribution",
    response_model=list[
        TenureDistributionItem
    ],
    summary="Get Tenure Distribution",
)
def get_tenure_distribution():

    return (
        analytics_service
        .get_tenure_distribution()
    )