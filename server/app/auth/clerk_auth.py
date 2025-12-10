from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient
from typing import Dict
from app.config import settings

security = HTTPBearer()

jwks_client = PyJWKClient(settings.CLERK_JWKS_URL, cache_keys=True)


async def verify_clerk_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict:
    token = credentials.credentials

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={
                "verify_signature": True,
                "verify_exp": True,
                "verify_nbf": True,
                "verify_iat": True,
                "verify_aud": False if not settings.CLERK_AUDIENCE else True,
            },
            audience=settings.CLERK_AUDIENCE if settings.CLERK_AUDIENCE else None,
            issuer=settings.CLERK_FRONTEND_API_URL,
        )

        return decoded

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")


def get_current_user_id(token_data: Dict = Depends(verify_clerk_token)) -> str:
    return token_data.get("sub")
