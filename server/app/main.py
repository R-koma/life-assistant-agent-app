from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import protected

app = FastAPI(title="Clerk + FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(protected.router)


@app.get("/")
async def root():
    return {"message": "Clerk + FastAPI Backend"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}
