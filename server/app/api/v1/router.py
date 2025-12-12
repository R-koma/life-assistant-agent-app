from fastapi import APIRouter
from . import llm


api_router = APIRouter()
api_router.include_router(llm.router, prefix="/llm", tags=["LLM"])
