from app.schemas.health import HealthResponse

SERVICE = "pooja-rajput-vastu"
VERSION = "0.1.0"


def health_payload() -> HealthResponse:
    return HealthResponse(status="ok", service=SERVICE, version=VERSION)
