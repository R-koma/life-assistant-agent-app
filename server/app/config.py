from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"
    )

    CLERK_FRONTEND_API_URL: str
    CLERK_JWKS_URL: str
    CLERK_AUDIENCE: str = ""

    DEBUG: bool = False

    DATABASE_URL_ASYNC: str

    DATABASE_URL_SYNC: str

    ALEMBIC_MODE: str = "sync"

    OPENAI_API_KEY: str = ""


settings = Settings()
