from fastapi import FastAPI, Depends
# import door
from services import user_service
import time
from auth import get_current_user
from schemas import user_schemas
from database import db


app = FastAPI()

app.include_router(user_service.app_service)


@app.get("/")
def root():
    return {"root": "Hello World!"}


@app.get('/open')
def open():
    try:

        # door.write_read('1')
        # time.sleep(0.05)
        # door.write_read('0')

        return "Success"
    except:
        return "Error"
