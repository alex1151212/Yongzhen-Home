from pydantic import BaseModel


class User(BaseModel):
    username: str


class User_register(User):
    password: str
    email: str


class User_login(User):
    password: str
