def test_model_metrics_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/model/metrics"
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
        "model_name"
        in body
    )


    assert (
        "metrics"
        in body
    )

def test_model_info_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/model/info"
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
        body[
            "algorithm"
        ]
        ==
        "RandomForestClassifier"
    )


    assert (
        "decision_threshold"
        in body
    )

def test_confusion_matrix_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/model/confusion-matrix"
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
        "true_positive"
        in body
    )


    assert (
        "false_negative"
        in body
    )

def test_roc_curve_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/model/roc-curve"
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
        "auc"
        in body
    )


    assert (
        isinstance(
            body[
                "points"
            ],
            list,
        )
    )

def test_feature_importance_endpoint(
    client,
):

    response = (
        client.get(
            "/api/v1/model/feature-importance"
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
        "features"
        in body
    )

