from re import A
from fastapi import APIRouter, Body,status

from app.core.auth.service import AuthService
from .schema import ForgotPassword, Login,Register, ResetPassword


router = APIRouter()
auth_service = AuthService()

@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(form: Register = Body(...)):
    user = await auth_service.register(form)
    return user


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(form: Login = Body(...)):
    user = await auth_service.login(form)
    return user 

@router.post('/logout', status_code=status.HTTP_200_OK)
async def logout():
    return {"message": "Logout"}

@router.post('/forgot-password', status_code=status.HTTP_200_OK)
async def forgot_password(form: ForgotPassword = Body(...)):
    return await auth_service.forgot_password(form.email)
 

@router.post('/reset-password', status_code=status.HTTP_200_OK)
async def reset_password(form: ResetPassword = Body(...)):
    return await auth_service.reset_password(form)