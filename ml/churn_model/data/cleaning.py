import pandas as pd


def clean_model_input(
    dataframe: pd.DataFrame,
) -> pd.DataFrame:
    """
    Clean raw customer data before feature engineering.

    This function is designed to be used inside
    the end-to-end machine learning pipeline.

    Steps
    -----
    1. Copy the input DataFrame.
    2. Remove customerID because it is only an identifier.
    3. Convert TotalCharges to numeric.
    4. Preserve missing TotalCharges values so that
       the preprocessing pipeline can impute them.

    Parameters
    ----------
    dataframe : pd.DataFrame
        Raw customer data.

    Returns
    -------
    pd.DataFrame
        Cleaned customer feature data.
    """

    result = dataframe.copy()

    # Customer ID contains no predictive information.
    result = result.drop(
        columns=["customerID"],
        errors="ignore",
    )

    # Raw Telco dataset may store TotalCharges
    # as strings because some values are blank.
    if "TotalCharges" in result.columns:
        result["TotalCharges"] = pd.to_numeric(
            result["TotalCharges"],
            errors="coerce",
        )

    return result