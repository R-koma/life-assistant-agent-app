from fastapi import APIRouter, Depends
from typing import Dict
from app.auth.clerk_auth import verify_clerk_token, get_current_user_id

router = APIRouter(prefix="/api/private", tags=["private"])


@router.get("/profile")
async def get_my_profile(user_id: str = Depends(get_current_user_id)):
    """
    認証が必要：自分のプロフィールを取得
    Depends(get_current_user_id) により認証必須
    """
    return {
        "user_id": user_id,
        "name": "John Doe",
        "email": "john@example.com",
        "premium": True,
    }


@router.get("/dashboard")
async def get_dashboard(token_data: Dict = Depends(verify_clerk_token)):
    """
    認証が必要：ダッシュボードデータを取得
    Depends(verify_clerk_token) により認証必須
    """
    user_id = token_data["sub"]
    session_id = token_data["sid"]

    return {
        "user_id": user_id,
        "session_id": session_id,
        "stats": {
            "articles_read": 23,
            "time_spent": "4h 32m",
            "last_login": "2025-12-07T08:00:00Z",
        },
        "recommendations": [
            "Article 10: Advanced FastAPI",
            "Article 15: Authentication Best Practices",
        ],
    }


@router.post("/settings")
async def update_settings(
    settings: dict,
    user_id: str = Depends(get_current_user_id)
):
    """
    認証が必要：設定を更新
    """
    return {
        "message": "Settings updated successfully",
        "user_id": user_id,
        "updated_settings": settings,
    }


@router.get("/premium-content")
async def get_premium_content(user_id: str = Depends(get_current_user_id)):
    """
    認証が必要：プレミアムコンテンツ
    認証されたユーザーのみがアクセスできる
    """
    return {
        "user_id": user_id,
        "premium_articles": [
            {"id": 100, "title": "Advanced Patterns", "premium": True},
            {"id": 101, "title": "Pro Tips & Tricks", "premium": True},
        ],
        "exclusive_features": [
            "AI-powered recommendations",
            "Unlimited exports",
            "Priority support",
        ],
    }
