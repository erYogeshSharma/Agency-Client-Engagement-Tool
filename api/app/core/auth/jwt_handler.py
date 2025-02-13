from math import e
import time
from typing import Dict, Literal
import jwt
from app.settings.config import settings
from app.core.logger.logger import logger


def token_response(token: str):
    return token


secret_key = settings.JWT_SECRET_KEY
algorithm = settings.JWT_ALGORITHM


def sign_jwt(user_id: str, role:str,expires_after:int) -> str:
    logger.info("Enter into sign_jwt method in jwt_handler")
    payload = {"user_id": user_id,"role":role, "expires": time.time() + expires_after }
    logger.info("Exit from sign_jwt method in jwt_handler")
    return token_response(jwt.encode(payload, secret_key, algorithm=algorithm))



def decode_jwt(token: str) -> dict:
    logger.info("Enter into decode_jwt method in jwt_handler")
    decoded_token = jwt.decode(token.encode(), secret_key, algorithms=["HS256"])
    logger.info("Exit from decode_jwt method in jwt_handler")
    return decoded_token if decoded_token["expires"] >= time.time() else {}
