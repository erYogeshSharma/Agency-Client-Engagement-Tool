import logging
from logging.handlers import RotatingFileHandler
import os
from re import L
from dotenv import load_dotenv
from app.settings.config import settings

# Load environment variables
load_dotenv()


LOGGING_MODE = settings.LOGGING_MODE
# Ensure logs directory exists if file logging is enabled
LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "app.log")

if LOGGING_MODE in ["file", "both"]:
    os.makedirs(LOG_DIR, exist_ok=True)

# Create logger
logger = logging.getLogger("fastapi-logger")
logger.setLevel(logging.INFO)

# Log format
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")

# File-based logging (if enabled)
if LOGGING_MODE in ["file", "both"]:
    file_handler = RotatingFileHandler(LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=3)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

# Console-based logging (if enabled)
if LOGGING_MODE in ["console", "both"]:
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
