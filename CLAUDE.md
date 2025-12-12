# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Life Assistant Agent App is a full-stack AI-powered application with:
- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
- **Backend**: FastAPI (Python 3.13) + SQLAlchemy (async)
- **Database**: PostgreSQL 17
- **Auth**: Clerk (JWT-based)
- **AI**: OpenAI integration

All services run in Docker containers with Docker Compose orchestration.

## Development Commands

### Starting the Application

```bash
# Start all services (database, server, client)
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f server
docker-compose logs -f client

# Stop all services
docker-compose down
```

### Backend Development

```bash
# Run Alembic migrations (inside server directory or container)
uv run alembic revision --autogenerate -m "description"
uv run alembic upgrade head

# Access FastAPI interactive docs
http://localhost:8000/docs

# Run Python shell with app context (inside container)
docker-compose exec server uv run python
```

### Frontend Development

```bash
# Access Next.js dev server
http://localhost:3000

# Run inside client container
docker-compose exec client npm run lint
```

### Database Access

```bash
# Connect to PostgreSQL
docker-compose exec db psql -U life_assistant_user -d life_assistant_db

# View database logs
docker-compose logs -f db
```

## Architecture

### Layered Backend Architecture (Clean Architecture Pattern)

The backend follows a layered architecture with clear separation of concerns:

```
app/
├── api/v1/           # API endpoints (presentation layer)
├── domain/           # Business logic (domain layer)
├── infrastructure/   # External services (infrastructure layer)
├── services/         # Application services
└── core/            # Cross-cutting concerns (security, dependencies)
```

**Data Flow**: API → Domain → Infrastructure → Database

When adding new features:
1. Define models in `infrastructure/db/models.py`
2. Create service functions in `services/` or `domain/`
3. Add API endpoints in `api/v1/`
4. Use dependency injection via `Depends()`

### Database Architecture

**Dual Database URL Strategy**:
- `DATABASE_URL_ASYNC`: For FastAPI async operations (asyncpg driver)
- `DATABASE_URL_SYNC`: For Alembic migrations (psycopg driver)

Both connect to the same PostgreSQL database but use different drivers optimized for their use case.

**Alembic Configuration**:
- Mode: Controlled by `ALEMBIC_MODE` environment variable (default: "sync")
- The sync mode is recommended for stability
- Migrations auto-import models from `app.infrastructure.db.base.Base`

### Authentication Flow

```
Client Request → Clerk JWT Token → FastAPI verify_clerk_token() → get_current_user() → Protected Endpoint
```

**Key Components**:
- `app/core/security.py`: JWT verification using Clerk's JWKS endpoint
- `app/core/dependencies.py`: User extraction and auto-creation
- `client/proxy.ts`: Route protection middleware

**User Auto-Creation**: When a user authenticates for the first time, they're automatically created in the database using their Clerk user ID.

### Frontend Structure

**Next.js App Router** with these key patterns:
- `app/layout.tsx`: Root layout with ClerkProvider, ThemeProvider
- `proxy.ts`: Clerk middleware for route protection
- Public routes: `/`, `/sign-in`, `/sign-up`, `/articles`
- Protected routes: Everything else requires authentication

**API Communication**:
```typescript
const token = await getToken();
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/...`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

## Key Configuration Files

### Backend Configuration (`app/config.py`)

Uses Pydantic Settings for type-safe configuration:
```python
DATABASE_URL_ASYNC: str  # FastAPI async operations
DATABASE_URL_SYNC: str   # Alembic migrations
ALEMBIC_MODE: str        # "sync" or "async"
CLERK_FRONTEND_API_URL: str
CLERK_JWKS_URL: str
OPENAI_API_KEY: str
DEBUG: bool
```

### Environment Variables

**Critical Variables**:
- `DATABASE_URL_ASYNC`: postgresql+asyncpg://user:pass@db:5432/life_assistant_db
- `DATABASE_URL_SYNC`: postgresql+psycopg://user:pass@db:5432/life_assistant_db
- `CLERK_FRONTEND_API_URL`: Used for JWT issuer validation
- `CLERK_JWKS_URL`: Used to fetch public keys for JWT verification
- `NEXT_PUBLIC_API_URL`: Backend API URL (must start with NEXT_PUBLIC_ for client-side)
- `CORS_ORIGINS`: Allowed CORS origins for backend

**Docker Compose**: The `docker-compose.yml` dynamically constructs DATABASE_URL_ASYNC/SYNC from POSTGRES_* variables.

### Docker Service Dependencies

Services start in order with health checks:
1. **db**: PostgreSQL starts first
2. **server**: Waits for db health check (pg_isready)
3. **client**: Waits for server health check (/health endpoint)

Health checks ensure services only start when dependencies are ready.

## Package Management

### Backend (UV)

UV is a modern, fast Python package manager:
```bash
uv sync          # Install dependencies from uv.lock
uv add package   # Add new package
uv run command   # Run command in virtual environment
```

Dependencies are defined in `pyproject.toml`. Always use `uv run` prefix when running commands inside the container.

### Frontend (NPM)

Standard npm workflow:
- `package.json`: Dependencies
- `package-lock.json`: Lock file
- Node modules persisted in Docker volume for performance

## Database Migrations with Alembic

**Workflow**:
```bash
# 1. Modify models in app/infrastructure/db/models.py
# 2. Generate migration
uv run alembic revision --autogenerate -m "add_new_table"
# 3. Review generated migration in alembic/versions/
# 4. Apply migration
uv run alembic upgrade head
```

**Important**: The `alembic/env.py` automatically imports `Base.metadata` which includes all models. No manual registration needed.

## Adding New API Endpoints

1. **Define Model** (if needed):
```python
# app/infrastructure/db/models.py
class NewModel(Base):
    __tablename__ = "new_table"
    id = Column(Integer, primary_key=True)
```

2. **Create Service** (business logic):
```python
# app/services/new_service.py or app/domain/new_feature/service.py
async def do_something(db: AsyncSession, param: str):
    # Business logic here
    return result
```

3. **Add API Endpoint**:
```python
# app/api/v1/new_endpoint.py
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, get_db

router = APIRouter()

@router.post("/something")
async def endpoint(
    param: str,
    user = Depends(get_current_user),
    db = Depends(get_db)
):
    result = await do_something(db, param)
    return {"result": result}
```

4. **Register Router**:
```python
# app/api/v1/router.py
from app.api.v1 import new_endpoint
api_router.include_router(new_endpoint.router, prefix="/new", tags=["new"])
```

## Japanese Localization

The app is configured for Japanese users:
- Clerk UI: `localization={jaJP}` in ClerkProvider
- System messages in LLM: Japanese prompts
- Consider Japanese when adding UI text or error messages

## Technology-Specific Notes

### FastAPI Async Patterns

Always use `async`/`await` for database operations:
```python
# Correct
async def get_user(db: AsyncSession, user_id: str):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

# Incorrect - don't use sync operations
def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()
```

### SQLAlchemy 2.0+ Syntax

Use the new `select()` syntax, not legacy `.query()`:
```python
from sqlalchemy import select

# Correct
result = await db.execute(select(User).where(User.email == email))
user = result.scalar_one_or_none()

# Incorrect - legacy syntax
user = db.query(User).filter(User.email == email).first()
```

### Next.js 16 App Router

- Use Server Components by default
- Add `"use client"` only when needed (hooks, event handlers, browser APIs)
- Environment variables for client-side must be prefixed with `NEXT_PUBLIC_`
- Middleware runs on all routes before rendering

### Tailwind CSS 4

The project uses Tailwind CSS 4 (latest):
- Configuration in `tailwind.config.ts`
- PostCSS integration
- Custom theme in `app/globals.css`
