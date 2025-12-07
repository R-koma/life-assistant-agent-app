from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import protected, public, private

app = FastAPI(title="Clerk + FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(public.router)   # 公開API（認証不要）
app.include_router(private.router)  # 保護されたAPI（認証必須）
app.include_router(protected.router)  # 既存の保護されたAPI


@app.get("/")
async def root():
    return {"message": "Clerk + FastAPI Backend"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}
