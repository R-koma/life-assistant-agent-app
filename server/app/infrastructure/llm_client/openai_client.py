from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def call_openai(messages: list[dict], model: str = "gpt-4o-mini") -> str:
    completion = await client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return completion.choices[0].message.content
