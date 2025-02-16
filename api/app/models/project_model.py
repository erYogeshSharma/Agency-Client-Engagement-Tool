from datetime import datetime
from typing import Optional
from beanie import Document, Insert, Link, Replace, SaveChanges, Update, before_event
from uuid import UUID, uuid4

from pydantic import Field
from app.core.auth.models import User


class Project(Document):
    project_id: UUID = Field(default_factory=uuid4)
    name: str
    description: str
    tags: list[str]
    is_active: bool
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    created_by: UUID
    is_deleted: bool = False
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    priority: Optional[int]
    status: Optional[int]

    
    @before_event(Insert)
    def set_created_at(self):
        self.created_at = datetime.utcnow()

    @before_event(Update,SaveChanges,Replace)
    async def update_timestamp(self):
        self.updated_at = datetime.utcnow()

    class Settings:
        name = "projects"

class Task(Document):
    task_id: UUID = Field(default_factory=uuid4)
    name: str
    description: str
    tags: str
    is_active: bool
    start_date: datetime
    commited_date: datetime
    completed_date: datetime
    is_important: bool
    is_urgent: bool
    project_id: UUID
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    created_by: Link[User]

    @before_event
    async def update_timestamp(self):
        self.updated_at = datetime.utcnow()

    class Settings:
        name = "tasks"