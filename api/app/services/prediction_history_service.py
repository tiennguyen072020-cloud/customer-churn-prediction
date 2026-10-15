from datetime import (
    datetime,
    timezone,
)

from pathlib import Path

from uuid import uuid4

import pandas as pd


class PredictionHistoryService:

    COLUMNS = [
        "id",
        "timestamp",
        "customer_id",
        "churn_probability",
        "prediction",
        "prediction_label",
        "threshold",
        "risk_level",
    ]


    def __init__(
        self,
        history_path: Path,
    ):

        self.history_path = (
            history_path
        )


        self.history_path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )


    # ========================================================
    # Save Prediction
    # ========================================================

    def save_prediction(
        self,
        *,
        churn_probability: float,
        prediction: int,
        prediction_label: str,
        threshold: float,
        risk_level: str | None = None,
        customer_id: str | None = None,
    ) -> dict:

        record = {

            "id":
                str(
                    uuid4()
                ),

            "timestamp":
                datetime.now(
                    timezone.utc
                ).isoformat(),

            "customer_id":
                customer_id,

            "churn_probability":
                float(
                    churn_probability
                ),

            "prediction":
                int(
                    prediction
                ),

            "prediction_label":
                str(
                    prediction_label
                ),

            "threshold":
                float(
                    threshold
                ),

            "risk_level":
                risk_level,
        }


        record_df = (
            pd.DataFrame(
                [
                    record
                ],
                columns=
                    self.COLUMNS,
            )
        )


        file_exists = (
            self.history_path.exists()
        )


        record_df.to_csv(
            self.history_path,
            mode="a",
            header=not file_exists,
            index=False,
        )


        return record


    # ========================================================
    # Get Prediction History
    # ========================================================

    def get_history(
        self,
        limit: int = 100,
    ) -> list[dict]:

        if not self.history_path.exists():

            return []


        df = pd.read_csv(
            self.history_path
        )


        if df.empty:

            return []


        # ----------------------------------------------------
        # Validate CSV columns
        # ----------------------------------------------------

        missing_columns = (
            set(
                self.COLUMNS
            )
            -
            set(
                df.columns
            )
        )


        if missing_columns:

            raise ValueError(
                "Prediction history CSV "
                "is missing columns: "
                f"{sorted(missing_columns)}"
            )


        # ----------------------------------------------------
        # Sort newest first
        # ----------------------------------------------------

        df = (
            df
            .sort_values(
                by="timestamp",
                ascending=False,
            )
            .head(
                limit
            )
        )


        # ----------------------------------------------------
        # Normalize values for FastAPI / Pydantic
        # ----------------------------------------------------

        records: list[dict] = []


        for _, row in df.iterrows():

            customer_id_value = (
                row[
                    "customer_id"
                ]
            )


            customer_id = (

                None

                if pd.isna(
                    customer_id_value
                )

                else str(
                    customer_id_value
                )
            )


            risk_level_value = (
                row[
                    "risk_level"
                ]
            )


            risk_level = (

                None

                if pd.isna(
                    risk_level_value
                )

                else str(
                    risk_level_value
                )
            )


            record = {

                "id":
                    str(
                        row[
                            "id"
                        ]
                    ),

                "timestamp":
                    str(
                        row[
                            "timestamp"
                        ]
                    ),

                "customer_id":
                    customer_id,

                "churn_probability":
                    float(
                        row[
                            "churn_probability"
                        ]
                    ),

                "prediction":
                    int(
                        row[
                            "prediction"
                        ]
                    ),

                "prediction_label":
                    str(
                        row[
                            "prediction_label"
                        ]
                    ),

                "threshold":
                    float(
                        row[
                            "threshold"
                        ]
                    ),

                "risk_level":
                    risk_level,
            }


            records.append(
                record
            )


        return records