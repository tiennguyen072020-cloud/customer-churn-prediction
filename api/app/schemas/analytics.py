from pydantic import BaseModel


class AnalyticsSummaryResponse(BaseModel):
    total_customers: int
    churn_customers: int
    retained_customers: int

    churn_rate: float
    retention_rate: float

    model_threshold: float


class ChurnDistributionItem(BaseModel):
    label: str
    value: int


class ContractChurnItem(BaseModel):
    contract: str
    churn_rate: float


class TenureDistributionItem(BaseModel):
    range: str
    customers: int

class InternetServiceChurnItem(BaseModel):
    internet_service: str
    churn_rate: float
    customers: int


class PaymentMethodChurnItem(BaseModel):
    payment_method: str
    churn_rate: float
    customers: int


class MonthlyChargesChurnItem(BaseModel):
    range: str
    churn_rate: float
    customers: int


class TenureChurnItem(BaseModel):
    range: str
    churn_rate: float
    customers: int


class BusinessInsightItem(BaseModel):
    title: str
    description: str
    metric: str
    severity: str