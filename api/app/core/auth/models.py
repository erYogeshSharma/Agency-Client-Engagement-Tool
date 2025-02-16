from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from beanie import Document, before_event
from fastapi.security import HTTPBasicCredentials
from uuid import UUID, uuid4

class User(Document):
    id: UUID = Field(default_factory=uuid4)
    full_name :str
    email :str
    password :str
    is_active :bool
    role: str
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None

    @before_event
    async def update_timestamp(self):
        self.updated_at = datetime.utcnow()
    
    
    class Settings:
        name = "users"





