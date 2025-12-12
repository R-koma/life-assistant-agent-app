from app.infrastructure.llm_client.openai_client import call_openai


async def generate_llm_answer(prompt: str, user):
    messages = [
        {"role": "system", "content": "あなたは親切なアシスタントです。"},
        {
            "role": "user",
            "content": f"ユーザーID: {user.id} からの質問です: {prompt}",
        },
    ]
    return await call_openai(messages)
