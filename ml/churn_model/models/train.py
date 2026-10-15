from pathlib import Path

import joblib
import pandas as pd

from sklearn.linear_model import (
    LogisticRegression,
)

from sklearn.model_selection import (
    train_test_split,
)

from ml.churn_model.models.pipeline import (
    build_model_pipeline,
)


RANDOM_STATE = 42

TEST_SIZE = 0.20


def load_training_data(
    data_path: str | Path,
) -> tuple[pd.DataFrame, pd.Series]:
    """
    Load raw Telco churn training data.
    """

    dataframe = pd.read_csv(
        data_path
    )

    X = dataframe.drop(
        columns=["Churn"]
    )

    y = (
        dataframe["Churn"]
        .map({
            "No": 0,
            "Yes": 1,
        })
    )

    return X, y


def train_model(
    data_path: str | Path,
):
    """
    Train the end-to-end churn pipeline.
    """

    X, y = load_training_data(
        data_path
    )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=TEST_SIZE,
            random_state=RANDOM_STATE,
            stratify=y,
        )
    )

    classifier = LogisticRegression(
        max_iter=1000,
        class_weight="balanced",
        random_state=RANDOM_STATE,
    )

    pipeline = build_model_pipeline(
        X_train=X_train,
        classifier=classifier,
    )

    pipeline.fit(
        X_train,
        y_train,
    )

    return (
        pipeline,
        X_test,
        y_test,
    )


def save_model(
    pipeline,
    model_path: str | Path,
) -> None:
    """
    Save trained pipeline.
    """

    model_path = Path(
        model_path
    )

    model_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        pipeline,
        model_path,
    )


def main() -> None:

    project_root = (
        Path(__file__)
        .resolve()
        .parents[4]
    )

    data_path = (
        project_root
        / "data"
        / "raw"
        / "WA_Fn-UseC_-Telco-Customer-Churn.csv"
    )

    model_path = (
        project_root
        / "artifacts"
        / "models"
        / "churn_pipeline.joblib"
    )

    pipeline, X_test, y_test = (
        train_model(
            data_path
        )
    )

    save_model(
        pipeline,
        model_path,
    )

    print(
        "Training completed successfully."
    )

    print(
        f"Model saved to: {model_path}"
    )

    print(
        f"Test samples: {len(X_test)}"
    )


if __name__ == "__main__":
    main()