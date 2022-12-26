
from schemas import user_schemas
from fastapi import HTTPException
from helper import Hash, create_access_token


async def create_user(collection, userInput: user_schemas.User_register):
    user = await collection.find_one({"username": userInput.username})
    if user:
        raise HTTPException(
            status_code=400,
            detail=f"User already exists"
        )

    result = await collection.insert_one({**userInput.dict(), "password": Hash.bcrypt(userInput.password)})
    return result.inserted_id


async def get_user(collection, email: str):
    user = await collection.find_one({"email": email})
    return user


async def get_users(collection):

    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(user_schemas.User(**document))
    return users


async def update_user(collection, username: str, email: str):
    result = await collection.update_one(
        {"username": username},
        {"$set": {"email": email}, }
    )
    return result.modified_count


async def delete_user(collection, username: str):
    result = await collection.delete_one({"username": username})
    return True


async def login_user(collection, user: user_schemas.User_login):

    db_user = await collection.find_one({"username": user.username})

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail=f'沒有此用戶'
        )
    if not Hash.verify(db_user["password"], user.password):
        raise HTTPException(
            status_code=401,
            detail=f"使用者帳號或密碼錯誤!"
        )

    access_token = create_access_token(
        data={
            "username": user.username,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user.username,
    }
