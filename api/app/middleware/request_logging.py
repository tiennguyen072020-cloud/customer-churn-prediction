import time

from fastapi import Request
from starlette.middleware.base import (
    BaseHTTPMiddleware,
)

from api.app.configuration.logging_config import (
    get_logger,
)


logger = get_logger(
    __name__
)


class RequestLoggingMiddleware(
    BaseHTTPMiddleware
):

    async def dispatch(
        self,
        request: Request,
        call_next,
    ):

        start_time = (
            time.perf_counter()
        )

        response = await call_next(
            request
        )

        elapsed = (
            time.perf_counter()
            -
            start_time
        )

        duration_ms = (
            elapsed
            * 1000
        )

        logger.info(
            "%s %s -> %s %.2fms",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )

        return response