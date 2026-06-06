from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "secret"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()

    to_encode.update({
        "exp": datetime.utcnow() + timedelta(hours=6),
        "role": "reviewer"   # always reviewer for now (IMPORTANT RULE)
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)