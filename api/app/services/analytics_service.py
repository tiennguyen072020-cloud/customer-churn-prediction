from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(
    __file__
).resolve().parents[3]


DATA_PATH = (
    PROJECT_ROOT
    / "data"
    / "processed"
    / "customer_churn_clean.csv"
)


class AnalyticsService:

    def __init__(
        self,
        data_path: Path = DATA_PATH,
    ):
        self.data_path = data_path

        self._dataframe = self._load_data()


    
    # Load data
    

    def _load_data(
        self,
    ) -> pd.DataFrame:

        if not self.data_path.exists():

            raise FileNotFoundError(
                "Analytics dataset "
                f"was not found: "
                f"{self.data_path}"
            )


        dataframe = pd.read_csv(
            self.data_path
        )


        required_columns = [
            "Churn",
            "Contract",
            "tenure",
            "MonthlyCharges",
            "TotalCharges",
        ]


        missing_columns = [
            column
            for column in required_columns
            if column not in dataframe.columns
        ]


        if missing_columns:

            raise ValueError(
                "Analytics dataset is missing columns: "
                f"{missing_columns}"
            )


        return dataframe
    
    #business insights service
    def get_business_insights(
        self,
    ) -> list[dict]:

        insights = []

        contract_data = (
            self.get_contract_churn()
        )

        internet_data = (
            self.get_internet_service_churn()
        )

        payment_data = (
            self.get_payment_method_churn()
        )

        tenure_data = (
            self.get_tenure_churn()
        )


        # Contract
        if contract_data:

            highest_contract = max(
                contract_data,
                key=lambda item:
                    item["churn_rate"],
            )

            insights.append(
                {
                    "title":
                        "High-Risk Contract Segment",

                    "description":
                        (
                            f"Customers with "
                            f"{highest_contract['contract']} "
                            f"contracts have the highest "
                            f"churn rate."
                        ),

                    "metric":
                        (
                            f"{highest_contract['churn_rate']}%"
                        ),

                    "severity":
                        "warning",
                }
            )


        
        # Internet Service

        if internet_data:

            highest_internet = max(
                internet_data,
                key=lambda item:
                    item["churn_rate"],
            )

            insights.append(
                {
                    "title":
                        "Internet Service Risk",

                    "description":
                        (
                            f"{highest_internet['internet_service']} "
                            f"customers show the highest "
                            f"churn rate among internet "
                            f"service groups."
                        ),

                    "metric":
                        (
                            f"{highest_internet['churn_rate']}%"
                        ),

                    "severity":
                        "error",
                }
            )


        
        # Payment Method

        if payment_data:

            highest_payment = (
                payment_data[0]
            )

            insights.append(
                {
                    "title":
                        "Payment Method Risk",

                    "description":
                        (
                            f"{highest_payment['payment_method']} "
                            f"has the highest churn rate "
                            f"among payment methods."
                        ),

                    "metric":
                        (
                            f"{highest_payment['churn_rate']}%"
                        ),

                    "severity":
                        "warning",
                }
            )


        
        # Tenure

        if tenure_data:

            highest_tenure = max(
                tenure_data,
                key=lambda item:
                    item["churn_rate"],
            )

            insights.append(
                {
                    "title":
                        "Customer Lifecycle Risk",

                    "description":
                        (
                            f"Customers in the "
                            f"{highest_tenure['range']} month "
                            f"tenure group have the highest "
                            f"churn rate."
                        ),

                    "metric":
                        (
                            f"{highest_tenure['churn_rate']}%"
                        ),

                    "severity":
                        "info",
                }
            )

        return insights
    
    #tenure churn rate
    def get_tenure_churn(
        self,
    ) -> list[dict]:

        df = self._dataframe.copy()

        df["is_churn"] = (
            self._get_churn_mask(df)
            .astype(int)
        )

        bins = [
            -1,
            12,
            24,
            36,
            48,
            60,
            float("inf"),
        ]

        labels = [
            "0-12",
            "13-24",
            "25-36",
            "37-48",
            "49-60",
            "61+",
        ]

        df["tenure_range"] = pd.cut(
            df["tenure"],
            bins=bins,
            labels=labels,
        )

        grouped = (
            df.groupby(
                "tenure_range",
                observed=False,
            )
            .agg(
                churn_rate=(
                    "is_churn",
                    "mean",
                ),
                customers=(
                    "is_churn",
                    "size",
                ),
            )
            .reindex(labels)
            .reset_index()
        )

        grouped["churn_rate"] = (
            grouped["churn_rate"]
            .fillna(0)
            * 100
        )

        return [
            {
                "range": str(
                    row["tenure_range"]
                ),
                "churn_rate": round(
                    float(
                        row["churn_rate"]
                    ),
                    2,
                ),
                "customers": int(
                    row["customers"]
                ),
            }
            for _, row
            in grouped.iterrows()
        ]
    #monthly charges segmentation
    def get_monthly_charges_churn(
        self,
    ) -> list[dict]:

        df = self._dataframe.copy()

        df["is_churn"] = (
            self._get_churn_mask(df)
            .astype(int)
        )

        bins = [
            -1,
            30,
            60,
            90,
            120,
            float("inf"),
        ]

        labels = [
            "0-30",
            "31-60",
            "61-90",
            "91-120",
            "120+",
        ]

        df["charges_range"] = pd.cut(
            df["MonthlyCharges"],
            bins=bins,
            labels=labels,
        )

        grouped = (
            df.groupby(
                "charges_range",
                observed=False,
            )
            .agg(
                churn_rate=(
                    "is_churn",
                    "mean",
                ),
                customers=(
                    "is_churn",
                    "size",
                ),
            )
            .reindex(labels)
            .reset_index()
        )

        grouped["churn_rate"] = (
            grouped["churn_rate"]
            .fillna(0)
            * 100
        )

        return [
            {
                "range": str(
                    row["charges_range"]
                ),
                "churn_rate": round(
                    float(
                        row["churn_rate"]
                    ),
                    2,
                ),
                "customers": int(
                    row["customers"]
                ),
            }
            for _, row
            in grouped.iterrows()
        ]
    #payment method churn
    def get_payment_method_churn(
        self,
    ) -> list[dict]:

        df = self._dataframe.copy()

        df["is_churn"] = (
            self._get_churn_mask(df)
            .astype(int)
        )

        grouped = (
            df.groupby(
                "PaymentMethod",
                observed=True,
            )
            .agg(
                churn_rate=(
                    "is_churn",
                    "mean",
                ),
                customers=(
                    "is_churn",
                    "size",
                ),
            )
            .reset_index()
        )

        grouped["churn_rate"] = (
            grouped["churn_rate"]
            * 100
        )

        grouped = grouped.sort_values(
            "churn_rate",
            ascending=False,
        )

        return [
            {
                "payment_method": str(
                    row["PaymentMethod"]
                ),
                "churn_rate": round(
                    float(
                        row["churn_rate"]
                    ),
                    2,
                ),
                "customers": int(
                    row["customers"]
                ),
            }
            for _, row
            in grouped.iterrows()
        ]
    # internet service churn
    def get_internet_service_churn(
        self,
    ) -> list[dict]:

        df = self._dataframe.copy()

        df["is_churn"] = (
            self._get_churn_mask(df)
            .astype(int)
        )

        grouped = (
            df.groupby(
                "InternetService",
                observed=True,
            )
            .agg(
                churn_rate=(
                    "is_churn",
                    "mean",
                ),
                customers=(
                    "is_churn",
                    "size",
                ),
            )
            .reset_index()
        )

        grouped["churn_rate"] = (
            grouped["churn_rate"]
            * 100
        )

        return [
            {
                "internet_service": str(
                    row["InternetService"]
                ),
                "churn_rate": round(
                    float(
                        row["churn_rate"]
                    ),
                    2,
                ),
                "customers": int(
                    row["customers"]
                ),
            }
            for _, row
            in grouped.iterrows()
        ]
    
    # Churn helper
    

    def _get_churn_mask(
        self,
        dataframe: pd.DataFrame,
    ) -> pd.Series:

        """
        Support both:

        Churn = Yes / No

        and

        Churn = 1 / 0
        """

        churn = dataframe["Churn"]


        # Numeric target
        if pd.api.types.is_numeric_dtype(
            churn
        ):

            return churn == 1


        # String target
        normalized = (
            churn
            .astype(str)
            .str.strip()
            .str.lower()
        )


        return normalized.isin(
            [
                "yes",
                "1",
                "true",
            ]
        )


    
    # Dashboard summary
    

    def get_summary(
        self,
    ) -> dict:

        df = self._dataframe


        total_customers = len(df)


        churn_mask = (
            self._get_churn_mask(
                df
            )
        )


        churn_customers = int(
            churn_mask.sum()
        )


        retained_customers = (
            total_customers
            - churn_customers
        )


        churn_rate = (
            churn_customers
            / total_customers
            * 100
            if total_customers > 0
            else 0
        )


        retention_rate = (
            retained_customers
            / total_customers
            * 100
            if total_customers > 0
            else 0
        )


        return {

            "total_customers":
                total_customers,

            "churn_customers":
                churn_customers,

            "retained_customers":
                retained_customers,

            "churn_rate":
                round(
                    churn_rate,
                    2,
                ),

            "retention_rate":
                round(
                    retention_rate,
                    2,
                ),

            "model_threshold":
                0.5,
        }


    
    # Churn distribution
    
    def get_churn_distribution(
        self,
    ) -> list[dict]:

        df = self._dataframe


        churn_mask = (
            self._get_churn_mask(
                df
            )
        )


        churned = int(
            churn_mask.sum()
        )


        retained = int(
            (~churn_mask).sum()
        )


        return [

            {
                "label": "Retained",
                "value": retained,
            },

            {
                "label": "Churned",
                "value": churned,
            },

        ]


     # Contract churn
    

    def get_contract_churn(
        self,
    ) -> list[dict]:

        df = (
            self._dataframe
            .copy()
        )


        df["is_churn"] = (
            self._get_churn_mask(
                df
            )
            .astype(int)
        )


        grouped = (

            df.groupby(
                "Contract",
                observed=True,
            )["is_churn"]

            .mean()

            .mul(100)

            .reset_index(
                name="churn_rate"
            )

        )


        return [

            {
                "contract":
                    str(
                        row["Contract"]
                    ),

                "churn_rate":
                    round(
                        float(
                            row[
                                "churn_rate"
                            ]
                        ),
                        2,
                    ),
            }

            for _, row
            in grouped.iterrows()

        ]


    
    # Tenure distribution
    

    def get_tenure_distribution(
        self,
    ) -> list[dict]:

        df = (
            self._dataframe
            .copy()
        )


        bins = [
            -1,
            12,
            24,
            36,
            48,
            60,
            float("inf"),
        ]


        labels = [
            "0-12",
            "13-24",
            "25-36",
            "37-48",
            "49-60",
            "61+",
        ]


        df["tenure_range"] = pd.cut(
            df["tenure"],
            bins=bins,
            labels=labels,
        )


        counts = (
            df["tenure_range"]
            .value_counts(
                sort=False
            )
        )


        return [

            {
                "range": label,

                "customers": int(
                    counts.get(
                        label,
                        0,
                    )
                ),
            }

            for label in labels

        ]


analytics_service = (
    AnalyticsService()
)