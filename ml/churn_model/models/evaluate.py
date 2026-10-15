from typing import Dict, Any
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    average_precision_score
)



def evaluate_classifier(
     model_name,
    y_true,
    y_pred,
    y_probability,
)-> Dict[str, Any]:
    """
    Calculate common binary classification metrics.

    Parameters
    ----------
    model_name : str
        Name of the evaluated model.

    y_true :
        Actual target values.

    y_pred :
        Predicted classes.

    y_probability :
        Predicted probability for positive class.

    Returns
    -------
    dict
        Classification metrics.
    """

    return {
        "Model": model_name,
        "Accuracy": accuracy_score(
            y_true,
            y_pred,
        ),
        "Precision": precision_score(
            y_true,
            y_pred,
            zero_division=0,
        ),
        "Recall": recall_score(
            y_true,
            y_pred,
            zero_division=0,
        ),
        "F1": f1_score(
            y_true,
            y_pred,
            zero_division=0,
        ),
        "ROC-AUC": roc_auc_score(
            y_true,
            y_probability,
        ),
         "PR-AUC": average_precision_score(
            y_true,
            y_probability,
        ),
    }