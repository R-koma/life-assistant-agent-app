from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.domain.llm.service import generate_llm_answer

router = APIRouter()


@router.post("/chat")
async def chat_llm(
    prompt: str,
    user=Depends(get_current_user),  # ここでUserオブジェクト/IDが取れる
):
    answer = await generate_llm_answer(prompt=prompt, user=user)
    return {"answer": answer}
