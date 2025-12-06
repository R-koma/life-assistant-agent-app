from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    CLERK_FRONTEND_API_URL: str
    CLERK_JWKS_URL: str
    CLERK_AUDIENCE: str = ""

    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()