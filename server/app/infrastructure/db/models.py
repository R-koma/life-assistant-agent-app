from sqlalchemy import Column, String
from app.infrastructure.db.base import Base


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    image_url = Column(String)
