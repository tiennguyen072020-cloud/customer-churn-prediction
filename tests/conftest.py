import sys
from pathlib import Path
from fastapi.testclient import TestClient
PROJECT_ROOT = (
    Path(__file__)
    .resolve()
    .parents[1]
)


if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(
        0,
        str(PROJECT_ROOT),
    )

from api.app.main import app
import pytest 

def pytest_configure():
    pass





@pytest.fixture
def client():

    return TestClient(
        app
    )

@pytest.fixture
def valid_customer():

    return {

        "gender":
            "Female",

        "SeniorCitizen":
            0,

        "Partner":
            "No",

        "Dependents":
            "No",

        "tenure":
            5,

        "PhoneService":
            "Yes",

        "MultipleLines":
            "No",

        "InternetService":
            "Fiber optic",

        "OnlineSecurity":
            "No",

        "OnlineBackup":
            "No",

        "DeviceProtection":
            "No",

        "TechSupport":
            "No",

        "StreamingTV":
            "Yes",

        "StreamingMovies":
            "Yes",

        "Contract":
            "Month-to-month",

        "PaperlessBilling":
            "Yes",

        "PaymentMethod":
            "Electronic check",

        "MonthlyCharges":
            95.5,

        "TotalCharges":
            477.5,
    }

def test_prediction_endpoint_returns_success(
    client,
    valid_customer,
):

    response = (
        client.post(
            "/api/v1/predictions/churn",
            json=
                valid_customer,
        )
    )


    assert (
        response.status_code
        ==
        200
    )


    body = (
        response.json()
    )


    assert (
        "prediction"
        in body
    )


    assert (
        "churn_probability"
        in body
    )


    assert (
        "threshold"
        in body
    )


