

#invalid numerical value
def test_prediction_rejects_missing_contract(
    client,
    valid_customer,
):

    payload = (
        valid_customer.copy()
    )


    payload.pop(
        "Contract"
    )


    response = (
        client.post(
            "/api/v1/predictions/churn",
            json=payload,
        )
    )


    assert (
        response.status_code
        ==
        422
    )

#invalid category
def test_prediction_rejects_negative_tenure(
    client,
    valid_customer,
):

    payload = (
        valid_customer.copy()
    )


    payload[
        "tenure"
    ] = -10


    response = (
        client.post(
            "/api/v1/predictions/churn",
            json=payload,
        )
    )


    assert (
        response.status_code
        in [
            400,
            422,
        ]
    )

#invalid MonthlyCharges
def test_prediction_rejects_invalid_contract(
    client,
    valid_customer,
):

    payload = (
        valid_customer.copy()
    )


    payload[
        "Contract"
    ] = "Invalid Contract"


    response = (
        client.post(
            "/api/v1/predictions/churn",
            json=payload,
        )
    )


    assert (
        response.status_code
        in [
            400,
            422,
        ]
    )

def test_prediction_rejects_negative_monthly_charges(
    client,
    valid_customer,
):

    payload = (
        valid_customer.copy()
    )


    payload[
        "MonthlyCharges"
    ] = -1


    response = (
        client.post(
            "/api/v1/predictions/churn",
            json=payload,
        )
    )


    assert (
        response.status_code
        in [
            400,
            422,
        ]
    )

#Test Prediction History API
def test_prediction_history_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/predictions/history",
            params={
                "limit": 100,
            },
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
        "total"
        in body
    )


    assert (
        "items"
        in body
    )


    assert (
        isinstance(
            body[
                "items"
            ],
            list,
        )
    )

#Test invalid history limit
def test_prediction_history_rejects_invalid_limit(
    client,
):

    response = (
        client.get(
            "/api/v1/predictions/history",
            params={
                "limit": 0,
            },
        )
    )


    assert (
        response.status_code
        ==
        422
    )

