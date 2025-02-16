from math import e
import stat
from typing import List, Set
from uuid import UUID
from fastapi import HTTPException,status
from fastapi.params import Param
from h11 import Request
from app.core.utils.utils import handle_exception
from app.schemas.api_schema import CreateProject, UpdateProject
from app.models.project_model import Project
from app.core.logger.logger import logger
from datetime import datetime

class ProjectService:
    def __init__(self):
        pass
        

    async def create_project(self,request:Request, project:CreateProject):
        """
        Create a new project

        """
        try:
            logger.info("Enter into create_project method in ProjectService")
            new_project = Project(
                name=project.name,
                description=project.description,
                tags=project.tags,
                is_active=project.is_active,
                created_by=request.state.user.get("user_id"),
                status=project.status,
                priority=project.priority,
                start_date=project.start_date,
                end_date=project.end_date,
            )
            inserted_project = await new_project.save()  # Await the save method
            logger.info("Exit from create_project method in ProjectService")
            return inserted_project.dict()  # Convert to dictionary before returning
        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
        return {'project': project.dict(), "user": request.state.user}
    
    async def update_project(self, project:UpdateProject):
        """
        Update a project

        """
        try:           
            existing_project = await Project.find_one(Project.project_id == UUID(project.project_id))
            if not existing_project:
                raise HTTPException(status_code=404, detail="Project not found")
            logger.info("Enter into update_project method in ProjectService")
            existing_project.name = project.name
            existing_project.description = project.description
            existing_project.tags = project.tags
            existing_project.is_active = project.is_active
            existing_project.status = project.status
            existing_project.priority = project.priority
            existing_project.start_date = project.start_date
            existing_project.end_date = project.end_date
            
            await existing_project.replace()
            logger.info("Exit from update_project method in ProjectService")
            return existing_project.dict()
        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            print(e)
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
        return {'project': project.dict()}
    
    async def delete_project(self, project_id:str):
        """
        Delete a project

        """

        try:
            print( "Pronect", project_id)
            logger.info("Enter into delete_project method in ProjectService")
            existing_project = await Project.find_one(Project.project_id == UUID(project_id)).update({"$set": {Project.is_deleted: True}})
            if not existing_project:
                raise HTTPException(status_code=404, detail="Project not found")
            logger.info("Exit from delete_project method in ProjectService")
            return {"message": "Project deleted successfully"}
        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
        return {"message": "Project deleted successfully"}
    



    async def get_projects(self, request):
        """
        Get all projects
        """
        try:
            logger.info("Enter into get_projects method in ProjectService")
    
            projects: List[Project] = await Project.find(
                Project.created_by == UUID(request.state.user.get("user_id"))
            ).to_list()
    
            # Convert date fields to ISO 8601 formatted strings
            for project in projects:
                if project.start_date and isinstance(project.start_date, datetime):
                    project.start_date = project.start_date.isoformat()
                if project.end_date and isinstance(project.end_date, datetime):
                    project.end_date = project.end_date.isoformat()
    
            logger.info("Exit from get_projects method in ProjectService")
            return projects
        except HTTPException as e:
            handle_exception(e)
        except Exception as e:
            handle_exception(
                e, status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error")
        return {"message": "Get all projects"}



    

        