from fastapi import APIRouter, Depends
from typing import Dict
from app.auth.clerk_auth import verify_clerk_token, get_current_user_id

router = APIRouter(prefix="/api", tags=["protected"])


@router.get("/protected")
async def protected_route(
    token_data: Dict = Depends(verify_clerk_token)
):
    user_id = token_data["sub"]
    session_id = token_data["sid"]

    return {
        "message": "Access granted",
        "user_id": user_id,
        "session_id": session_id,
        "token_claims": token_data
    }


@router.get("/user-info")
async def user_info(
    user_id: str = Depends(get_current_user_id)
):
    return {
        "user_id": user_id,
        "message": f"Hello, user {user_id}"
    }


protected_route()
