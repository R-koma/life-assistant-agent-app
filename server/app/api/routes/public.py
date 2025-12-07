from fastapi import APIRouter

router = APIRouter(prefix="/api/public", tags=["public"])


@router.get("/articles")
async def get_public_articles():
    """
    誰でもアクセスできる公開記事一覧
    認証不要
    """
    return {
        "articles": [
            {"id": 1, "title": "Introduction to FastAPI", "public": True},
            {"id": 2, "title": "Getting Started with Next.js", "public": True},
            {"id": 3, "title": "Building APIs", "public": True},
        ]
    }


@router.get("/articles/{article_id}")
async def get_article(article_id: int):
    """
    誰でも特定の記事を閲覧できる
    認証不要
    """
    return {
        "id": article_id,
        "title": f"Article {article_id}",
        "content": "This is public content that anyone can read.",
        "public": True,
    }


@router.get("/stats")
async def get_public_stats():
    """
    公開統計情報
    認証不要
    """
    return {
        "total_users": 1250,
        "total_articles": 45,
        "total_views": 25000,
    }
