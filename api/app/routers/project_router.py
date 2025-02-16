from fastapi import APIRouter, Body, Depends,Request
from fastapi.params import Param
from fastapi.routing import APIRoute

from app.core.auth.jwt_bearer import JWTBearer
from app.schemas.api_schema import  *
from app.services.project_service import ProjectService

router = APIRouter(
    prefix='/api/projects',
    tags=['Projects'],
    dependencies=[Depends(JWTBearer())]
)
project_service = ProjectService()


@router.get('/')
async def get_projects(request:Request):
    return await  project_service.get_projects(request)
    

@router.post('/')
async def create_project( request:Request, project: CreateProject = Body(...) ):
    return  await project_service.create_project(request,project)

@router.put('/')
async def update_project(project: UpdateProject):
    return await project_service.update_project(project)

@router.delete('/{project_id}')
async def delete_project(project_id: str):
    return await project_service.delete_project(project_id)

@router.get('/tasks/{project_id}')
async def get_tasks():
    return {"message": "Get all tasks"}

@router.post('/tasks/{project_id}')
async def create_task(project_id: str, task: CreateTask):
    return task

@router.put('/tasks/{project_id}')
async def update_task(task: UpdateTask):
    return task

@router.delete('/tasks/{project_id}')
async def delete_task(task_id: str):
    return {"message": f"Delete task {task_id}"}