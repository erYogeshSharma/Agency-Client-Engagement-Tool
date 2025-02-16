from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CreateProject(BaseModel):
    name: str
    description: Optional[str] = None
    tags: Optional[list[str]] = None
    is_active: Optional[bool] = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    priority: Optional[int] = None
    status: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Project Name",
                "description": "Project Description",
                "tags": ["Project Tags"],
                "is_active": True
            }
        }


class UpdateProject(BaseModel):
    project_id: str
    name: str
    description: Optional[str] = None
    tags: Optional[list[str]] = None
    is_active: Optional[bool] = True
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    priority: Optional[int] = None
    status: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Project Name",
                "description": "Project Description",
                "tags": "Project Tags",
                "is_active": True
            }
        }


class CreateTask(BaseModel):
    name: str
    description: Optional[str] = None
    tags: Optional[str] = None
    is_active: Optional[bool] = True
    start_date: Optional[str] = None
    commited_date: Optional[str] = None
    completed_date: Optional[str] = None
    is_important: Optional[bool] = False
    is_urgent: Optional[bool] = False
    project_id: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Task Name",
                "description": "Task Description",
                "tags": "Task Tags",
                "is_active": True,
                "start_date": "2022-12-12",
                "commited_date": "2022-12-12",
                "completed_date": "2022-12-12",
                "is_important": False,
                "is_urgent": False,
                "project_id": "Project ID"

            }
        }


class UpdateTask(BaseModel):
    task_id: str
    name: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[str] = None
    is_active: Optional[bool] = True
    start_date: Optional[str] = None
    commited_date: Optional[str] = None
    completed_date: Optional[str] = None
    is_important: Optional[bool] = False
    is_urgent: Optional[bool] = False
    project_id: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Task Name",
                "description": "Task Description",
                "tags": "Task Tags",
                "is_active": True,
                "start_date": "2022-12-12",
                "commited_date": "2022-12-12",
                "completed_date": "2022-12-12",
                "is_important": False,
                "is_urgent": False,
                "project_id": "Project ID"


            }
        }


class CreateComment(BaseModel):
    comment: str
    task_id: str

    class Config:
        json_schema_extra = {
            "example": {
                "comment": "Comment",
                "task_id": "Task ID"
            }
        }
