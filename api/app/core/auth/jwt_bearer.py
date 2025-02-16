from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .jwt_handler import decode_jwt


def verify_jwt(jwtoken: str) -> bool:
    isTokenValid: bool = False
    payload = None
    try:

        payload = decode_jwt(jwtoken)
        print(payload)
    except Exception as e:
        payload = None

    if payload:
        isTokenValid = True
    return isTokenValid, payload


class JWTBearer(HTTPBearer):
    def __init__(self, allowed_roles: list = None,  auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)
        self.allowed_roles = allowed_roles

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            JWTBearer, self
        ).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=401, detail="Invalid authentication token"
                )

            isTokenValid, payload = verify_jwt(credentials.credentials)

            if not isTokenValid:
                raise HTTPException(
                    status_code=401, detail="Invalid token or expired token"
                )
            request.state.user = payload
            return payload
        else:
            raise HTTPException(
                status_code=401, detail="Invalid authorization token")
