from typing import Optional, Sequence

import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    OneHotEncoder, 
    StandardScaler
    )

def get_feature_types(
    X: pd.DataFrame,
) -> tuple[list[str], list[str]]:
    """
    Detect numerical and categorical features from a DataFrame.

    Parameters
    ----------
    X : pd.DataFrame
        Input feature dataset.

    Returns
    -------
    tuple[list[str], list[str]]
        numerical_features, categorical_features
    """

    numerical_features = X.select_dtypes(
        include=["number"]
    ).columns.tolist()

    categorical_features = X.select_dtypes(
        include=["object", "category", "bool"]
    ).columns.tolist()

    return numerical_features, categorical_features


def build_numerical_pipeline() -> Pipeline:
    """
    Build preprocessing pipeline for numerical features.

    Steps:
    1. Fill missing values using median.
    2. Standardize numerical values.

    Returns
    -------
    Pipeline
        Scikit-learn numerical preprocessing pipeline.
    """

    return Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(strategy="median")
            ),
            (
                "scaler",
                StandardScaler()
            ),
        ]
    )


def build_categorical_pipeline() -> Pipeline:
    """
    Build preprocessing pipeline for categorical features.

    Steps:
    1. Fill missing values using most frequent value.
    2. One-hot encode categorical features.

    Returns
    -------
    Pipeline
        Scikit-learn categorical preprocessing pipeline.
    """

    return Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(strategy="most_frequent")
            ),
            (
                "onehot",
                OneHotEncoder(
                    handle_unknown="ignore"
                )
            ),
        ]
    )


def build_preprocessor(
    X: pd.DataFrame,
    numerical_features: Optional[Sequence[str]] = None,
    categorical_features: Optional[Sequence[str]] = None,
) -> ColumnTransformer:
    """
    Create a reusable preprocessing transformer.

    If feature lists are not provided, numerical and categorical
    columns are detected automatically from the DataFrame.

    Parameters
    ----------
    X : pd.DataFrame
        Training feature dataset.

    numerical_features : Optional[Sequence[str]]
        Explicit list of numerical features.

    categorical_features : Optional[Sequence[str]]
        Explicit list of categorical features.

    Returns
    -------
    ColumnTransformer
        Scikit-learn preprocessing transformer.
    """

    if numerical_features is None or categorical_features is None:
        detected_numerical, detected_categorical = get_feature_types(X)

        if numerical_features is None:
            numerical_features = detected_numerical

        if categorical_features is None:
            categorical_features = detected_categorical

    numerical_features = list(numerical_features)
    categorical_features = list(categorical_features)

    numerical_pipeline = build_numerical_pipeline()
    categorical_pipeline = build_categorical_pipeline()

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numerical",
                numerical_pipeline,
                numerical_features,
            ),
            (
                "categorical",
                categorical_pipeline,
                categorical_features,
            ),
        ],
        remainder="drop",
    )

    return preprocessor