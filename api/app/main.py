from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import project_router
from app.settings.config import settings
from app.core.auth.routes import router as auth_router
from app.core.database.mongo import initiate_database



app = FastAPI(
    lifespan= initiate_database
)

origins = [
    settings.CLIENT_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(auth_router, tags=['Auth'], prefix='/api/auth')
app.include_router(project_router.router)


@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to FastAPI with MongoDB"}
