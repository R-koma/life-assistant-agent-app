from sqlalchemy.orm import Session
from app.infrastructure.db.models import User


def get_user_by_clerk_id(db: Session, clerk_id: str):
    """
    Clerk の User ID を元に DB の User レコードを取得。
    """
    return db.query(User).filter(User.id == clerk_id).first()


def create_user(db: Session, clerk_payload: dict):
    """
    Clerk 情報を基にユーザーを新規作成。
    """
    new_user = User(
        id=clerk_payload["sub"],
        email=clerk_payload.get("email"),
        first_name=clerk_payload.get("first_name"),
        last_name=clerk_payload.get("last_name"),
        image_url=clerk_payload.get("image_url"),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
