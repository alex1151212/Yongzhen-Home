from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from schemas import user_schemas
from database import db
from utils import user_utils
from auth import get_current_user
from helper import create_access_token

collection = db.users

app_service = APIRouter(
    tags=["User"]
)


@app_service.post('/login')
async def login(userInput: OAuth2PasswordRequestForm = Depends()):
    user = user_schemas.User_login(**userInput.__dict__)
    return await user_utils.login_user(collection, user)


@app_service.post("/user")
async def create_user(user: user_schemas.User_register):

    try:
        user_id = await user_utils.create_user(collection, user)
        return {"message": "User added successfully"}

    except:
        raise HTTPException(
            status_code=400,
            detail=f"User added error"
        )


@app_service.get("/test")
async def test(user=Depends(get_current_user)):

    return user
# @app_service.put("/user/{username}")
# async def update_user(username: str, user: user_schemas.User):
#     result = await user_utils.update_user(collection, username, user.email)
#     if result:
#         return {"message": "User updated successfully"}
#     return {"message": "User not found"}


@app_service.get("/users")
async def get_user():
    result = await user_utils.get_users(collection)
    if result:
        return result
    return {"message": "Users not found"}


@app_service.get("/user/{username}")
async def delete_user(username):
    result = await user_utils.delete_user(collection, username)
    if result:
        return result
    return {"message": "Users not found"}
