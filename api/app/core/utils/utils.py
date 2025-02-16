
from fastapi import HTTPException
from app.core.logger.logger import logger

def handle_exception( exception, status_code=None, detail=None):
        logger.error(f"Error: {exception}")
        if isinstance(exception, HTTPException):
            raise exception
        else:
            raise HTTPException(status_code=status_code, detail=detail)
def raise_http_exception( status_code, detail):
        raise HTTPException(status_code=status_code, detail=detail)