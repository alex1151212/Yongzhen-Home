from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 1
REFRESH_TOKEN_EXPIRE_MINUTES = 5

pwd_cxt = CryptContext(schemes=['bcrypt'], deprecated="auto")


def create_access_token(data: dict, expire_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expire_delta:
        expire = datetime.utcnow() + expire_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        user = payload.get("user")
        return {"user": user}
    except:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization"
        )


class Hash():
    @staticmethod
    def bcrypt(password: str):

        return pwd_cxt.hash(password)

    @staticmethod
    def verify(hashed_password, plain_password):

        return pwd_cxt.verify(plain_password, hashed_password)
