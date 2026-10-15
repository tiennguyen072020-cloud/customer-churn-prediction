import json

from pathlib import Path
from typing import Any


def load_model_metadata(
    metadata_path: str | Path,
) -> dict[str, Any]:
    """
    Load model metadata from JSON.
    """

    metadata_path = Path(
        metadata_path
    )

    if not metadata_path.exists():
        raise FileNotFoundError(
            f"Model metadata was not found: "
            f"{metadata_path}"
        )

    with metadata_path.open(
        mode="r",
        encoding="utf-8",
    ) as file:

        metadata = json.load(
            file
        )

    return metadata