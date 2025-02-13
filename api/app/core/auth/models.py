from pydantic import BaseModel, Field
from typing import Optional
from beanie import Document
from fastapi.security import HTTPBasicCredentials

class User(Document):
    full_name :str
    email :str
    password :str
    is_active :bool
    role: str

    class Config:
        json_schema_extra = {
            "example": {
                "full_name": "John Doe",
                "email": "johm@doe.com",
                "password": "password",
                "is_active": True,
                "role": "admin"
        }
        }
    
    class Settings:
        name = "users"





