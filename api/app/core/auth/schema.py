import json
import token
from pydantic import BaseModel

class Login(BaseModel):
    email: str
    password: str
    class Config:
        json_schema_extra = {
            "example": {
                "email": "Your email",
                "password": "Your password"
            }
        }

class Register(BaseModel):
    full_name: str
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "full_name": "John Doe",
                "email": "john@gmail.com",
                "password": "password",
            }
        }

class ForgotPassword(BaseModel):
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@gmail.com",
            }
        }

class ResetPassword(BaseModel):
    password: str
    token: str

    class Config:
        json_schema_extra = {
            "example": {
                "password": "password",
                "token":"token"
            }
        }