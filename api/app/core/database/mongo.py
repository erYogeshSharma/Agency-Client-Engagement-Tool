from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.logger.logger import logger
from app.settings.config import settings
from app import models


@asynccontextmanager
async def initiate_database(app:FastAPI):
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    
    await init_beanie(
        database=client.get_default_database(), document_models=models.__all__
    )
    logger.info("Database connection established")
    

    yield

    client.close()