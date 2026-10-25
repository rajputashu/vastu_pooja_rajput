import os
from pydantic import BaseModel


class Settings(BaseModel):
    frontend_origin: str
    app_env: str


def load_settings() -> Settings:
    return Settings(
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://127.0.0.1:8080"),
        app_env=os.getenv("APP_ENV", "development"),
    )


settings = load_settings()
