import logging
from uuid import UUID
from bson import ObjectId
from fastapi import HTTPException, status
from passlib.context import CryptContext

from app.core.utils.utils import handle_exception, raise_http_exception
from .models import User
from app.core.logger.logger import logger
from .jwt_handler import decode_jwt, sign_jwt
from app.settings.config import settings
from app.core.utils.email import send_email
from app.core.auth.schema import Login, Register, ResetPassword

hash_helper = CryptContext(schemes=["bcrypt"])
logging.getLogger('passlib').setLevel(logging.ERROR)


class AuthService: 
    def __init__(self):
        pass

    async def register(self, user: Register):
        """
        Register a new user
        """
        try:
            logger.info("Enter into register method in AuthService")
            user_exists = await User.find_one(User.email == user.email)
            if user_exists:
                raise_http_exception(
                    status.HTTP_409_CONFLICT, "User with this email already exists")

            user.password = hash_helper.hash(user.password)
            new_user = User(
                email=user.email,
                full_name=user.full_name,
                password=user.password,
                role="user",
                is_active=True
            )
            logger.info("User created successfully")
            logger.info("Exit from register method in AuthService")
            inserted_user = await new_user.save()
            send_email({
                "to": user.email,
                "subject": "Welcome to FastAPI",
                "content": f"Hi {user.full_name}, welcome to FastAPI"
            })

            return await self.get_auth_response(inserted_user)

        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")

    async def login(self, user: Login):
        """
        Login a user
        """
        try:
            logger.info("Enter into login method in AuthService")
            user_exists = await User.find_one(User.email == user.email)
            if not user_exists:
                raise_http_exception(
                    status.HTTP_404_NOT_FOUND, "User with this email does not exist")
            if not hash_helper.verify(user.password, user_exists.password):
                raise_http_exception(
                    status.HTTP_401_UNAUTHORIZED, "Invalid Credentials")

            logger.info("User logged in successfully")
            logger.info("Exit from login method in AuthService")
            return await self.get_auth_response(user_exists)

        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")

    async def forgot_password(self, email: str):
        """
        Send forgot password email
        """
        try:
            logger.info("Enter into forgot_password method in AuthService")
            user_exists = await User.find_one(User.email == email)
            if not user_exists:
                raise_http_exception(
                    status.HTTP_404_NOT_FOUND, "User with this email does not exist")
            reset_password_token = sign_jwt(
                str(user_exists.id), "reset-password", 3600)
            send_email({
                "to": email,
                "subject": "Reset Password",
                "content": f"Click on the link to reset your password: {settings.CLIENT_ORIGIN}/reset-password/{reset_password_token}"
            })
            logger.info("Reset password email sent successfully")
            logger.info("Exit from forgot_password method in AuthService")
            return {"message": "Reset password email sent successfully"}

        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
            
    async def reset_password(self, form:ResetPassword):
        """
        Reset password
        """
        try:
            logger.info("Enter into reset_password method in AuthService")
            decoded_token = decode_jwt(form.token)
            if not decoded_token:
                raise_http_exception(
                    status.HTTP_401_UNAUTHORIZED, "Invalid token")
            user_exists = await User.find_one({"_id": ObjectId(decoded_token["user_id"])})
            if not user_exists:
                raise_http_exception(
                    status.HTTP_404_NOT_FOUND, "User not found")
            user_exists.password = hash_helper.hash(form.password)
            await user_exists.save()
            
            return {"message": "Password reset successfully"}
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
            

    async def get_auth_response(self, user):
        """
        Generate auth response
        """
        try:
            logger.info("Enter into get_auth_response method in AuthService")
            access_token = sign_jwt(
                str(user.id), user.role, settings.ACCESS_TOKEN_EXPIRES_IN)
            refresh_token = sign_jwt(
                str(user.id), user.role, settings.REFRESH_TOKEN_EXPIRES_IN)

            decoded = decode_jwt(access_token)

            return {
                "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name,
                },
                "tokens":{
                "accessToken": access_token,
                "refreshToken": refresh_token
                }
            }
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
    
    async def refresh_token(self, token):
        """
        Refresh token
        """
        try:
            logger.info("Enter into refresh_token method in AuthService")
            print(token.refresh_token)
            decoded_token = decode_jwt(token.refresh_token)
            print(decoded_token)
            if not decoded_token:
                raise_http_exception(
                    status.HTTP_401_UNAUTHORIZED, "Invalid token")
            user_exists = await User.find_one({"_id": UUID(decoded_token["user_id"])})
            print(user_exists)
            if not user_exists:
                raise_http_exception(
                    status.HTTP_404_NOT_FOUND, "User not found")
            access_token = sign_jwt(
                str(user_exists.id), user_exists.role, settings.ACCESS_TOKEN_EXPIRES_IN)
            return {"accessToken": access_token}
        
        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
            


    

