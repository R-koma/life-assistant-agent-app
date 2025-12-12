from __future__ import annotations

import asyncio
from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine

from app.config import settings
from app.infrastructure.db.base import Base


config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """
    Offline: DBに接続せずSQLを生成するモード
    """
    url = settings.DATABASE_URL_SYNC if settings.ALEMBIC_MODE == "sync" else settings.DATABASE_URL_ASYNC

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online_sync() -> None:
    """
    Online(sync): もっとも運用が簡単（推奨）
    """
    from sqlalchemy import create_engine

    engine = create_engine(
        settings.DATABASE_URL_SYNC,
        poolclass=pool.NullPool,
    )

    with engine.connect() as connection:
        do_run_migrations(connection)


async def run_migrations_online_async() -> None:
    """
    Online(async): asyncpg URLでそのまま回したい場合
    """
    engine = create_async_engine(
        settings.DATABASE_URL_ASYNC,
        poolclass=pool.NullPool,
    )

    async with engine.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await engine.dispose()


def run_migrations() -> None:
    if context.is_offline_mode():
        run_migrations_offline()
        return

    if settings.ALEMBIC_MODE == "sync":
        run_migrations_online_sync()
    else:
        asyncio.run(run_migrations_online_async())


run_migrations()
