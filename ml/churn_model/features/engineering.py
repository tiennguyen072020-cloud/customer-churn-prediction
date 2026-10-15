import pandas as pd


def create_tenure_group(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["tenure_group"] = pd.cut(
        result["tenure"],
        bins=[-1, 12, 24, 48, float("inf")],
        labels=[
            "0-12",
            "13-24",
            "25-48",
            "49+"
        ]
    )

    return result


def create_tenure_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["is_new_customer"] = (
        result["tenure"] <= 12
    ).astype(int)

    result["is_loyal_customer"] = (
        result["tenure"] >= 48
    ).astype(int)

    return result

def create_value_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["charges_per_service"] = (
        result["MonthlyCharges"]
        / result["num_services"].replace(
            0,
            1,
        )
    )

    return result

def create_financial_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["avg_monthly_spend"] = (
        result["TotalCharges"]
        / result["tenure"].replace(0, 1)
    )

    result["customer_value"] = (
        result["MonthlyCharges"]
        * result["tenure"]
    )

    return result


def create_contract_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["is_long_term_contract"] = (
        result["Contract"].isin([
            "One year",
            "Two year"
        ])
    ).astype(int)

    return result


def create_payment_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["automatic_payment"] = (
        result["PaymentMethod"].isin([
            "Bank transfer (automatic)",
            "Credit card (automatic)"
        ])
    ).astype(int)

    result["is_electronic_check"] = (
        result["PaymentMethod"]
        == "Electronic check"
    ).astype(int)

    return result


def create_support_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["has_tech_support"] = (
        result["TechSupport"] == "Yes"
    ).astype(int)

    result["has_online_security"] = (
        result["OnlineSecurity"] == "Yes"
    ).astype(int)

    support_columns = [
        "TechSupport",
        "OnlineSecurity",
        "DeviceProtection",
        "OnlineBackup",
    ]

    result["num_support_services"] = sum(
        (result[column] == "Yes").astype(int)
        for column in support_columns
    )

    result["has_support_service"] = (
        result["num_support_services"] > 0
    ).astype(int)

    return result


def create_service_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    service_columns = [
        "PhoneService",
        "MultipleLines",
        "OnlineSecurity",
        "OnlineBackup",
        "DeviceProtection",
        "TechSupport",
        "StreamingTV",
        "StreamingMovies",
    ]

    result["num_services"] = sum(
        (result[column] == "Yes").astype(int)
        for column in service_columns
    )

    result["uses_streaming"] = (
        (result["StreamingTV"] == "Yes")
        |
        (result["StreamingMovies"] == "Yes")
    ).astype(int)

    return result


def create_customer_profile_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result["has_family"] = (
        (result["Partner"] == "Yes")
        |
        (result["Dependents"] == "Yes")
    ).astype(int)

    return result


def engineer_features(
    dataframe: pd.DataFrame
) -> pd.DataFrame:

    result = dataframe.copy()

    result = create_tenure_group(result)
    result = create_tenure_features(result)
    result = create_financial_features(result)
    result = create_contract_features(result)
    result = create_payment_features(result)
    result = create_support_features(result)
    result = create_service_features(result)
    result = create_value_features(result)
    result = create_customer_profile_features(result)

    return result