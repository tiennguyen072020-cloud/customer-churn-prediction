from typing import Optional

import pandas as pd

from sklearn.base import (
    ClassifierMixin,
)

from sklearn.pipeline import (
    Pipeline,
)

from sklearn.preprocessing import (
    FunctionTransformer,
)

from sklearn.linear_model import (
    LogisticRegression,
)

from ml.churn_model.data.cleaning import (
    clean_model_input,
)

from ml.churn_model.data.preprocessing import (
    build_preprocessor,
)

from ml.churn_model.features.engineering import (
    engineer_features,
)


def build_model_pipeline(
    X_train: pd.DataFrame,
    classifier: Optional[
        ClassifierMixin
    ] = None,
) -> Pipeline:
    """
    Build complete end-to-end churn pipeline.

    Raw input
        -> cleaning
        -> feature engineering
        -> preprocessing
        -> classifier
    """

    # -------------------------------------
    # Determine the engineered data schema.
    # -------------------------------------

    X_schema = (
        clean_model_input(
            X_train
        )
    )

    X_schema = (
        engineer_features(
            X_schema
        )
    )

    # -------------------------------------
    # Build preprocessing transformer from
    # ENGINEERED feature schema.
    # -------------------------------------

    preprocessor = (
        build_preprocessor(
            X_schema
        )
    )

    # -------------------------------------
    # Default classifier.
    # -------------------------------------

    if classifier is None:

        classifier = (
            LogisticRegression(
                max_iter=1000,
                class_weight="balanced",
                random_state=42,
            )
        )

    # -------------------------------------
    # Full end-to-end pipeline.
    # -------------------------------------

    pipeline = Pipeline(
        steps=[
            (
                "cleaning",
                FunctionTransformer(
                    clean_model_input,
                    validate=False,
                ),
            ),

            (
                "feature_engineering",
                FunctionTransformer(
                    engineer_features,
                    validate=False,
                ),
            ),

            (
                "preprocessor",
                preprocessor,
            ),

            (
                "classifier",
                classifier,
            ),
        ]
    )

    return pipeline