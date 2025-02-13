from typing import Literal
from pydantic_settings import BaseSettings
from pydantic import EmailStr

class Settings(BaseSettings):
    DATABASE_URL: str
    CLIENT_ORIGIN: str
    LOGGING_MODE : Literal["file", "console", "both"]


    JWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRES_IN:int
    REFRESH_TOKEN_EXPIRES_IN:int
    JWT_ALGORITHM:str


    SENDGRID_API_KEY: str
    SENDGRID_FROM_EMAIL : EmailStr

    model_config = {
        "env_file": "./.env"
    }


settings = Settings()


