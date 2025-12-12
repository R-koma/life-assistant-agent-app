from fastapi import Depends
from app.infrastructure.db.session import get_db
from app.services.user_service import get_user_by_clerk_id, create_user
from app.core.security import verify_clerk_token


async def get_current_user(
    payload=Depends(verify_clerk_token),
    db=Depends(get_db)
):
    clerk_id = payload["sub"]

    user = get_user_by_clerk_id(db, clerk_id)
    if not user:
        user = create_user(db, payload)

    return user
