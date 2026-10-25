from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.health import health_payload
from app.core.config import settings

app = FastAPI(
    title="Pooja Rajput Vastu API",
    version="0.1.0",
    summary="Phase 1 health API. No database, accounts, or payments.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_error(_request: Request, exc: StarletteHTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, str) else "Request could not be completed."
    return JSONResponse(status_code=exc.status_code, content={"error": detail})


@app.exception_handler(Exception)
async def unexpected_error(_request: Request, _exc: Exception) -> JSONResponse:
    return JSONResponse(status_code=500, content={"error": "Unexpected server error."})


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "pooja-rajput-vastu", "status": "ok", "docs": "/docs"}


@app.get("/api/v1/health")
def health() -> dict[str, str]:
    return health_payload().model_dump()
