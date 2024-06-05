from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from guest import guest_router
import uvicorn

app = FastAPI()

#CORS(2)
origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
]

#CORS(3)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 모든 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.get("/")
async def welcome() -> dict:
    return{
        "msg": "hello world?"
    }

app.include_router(guest_router) #API router를 app에 연결

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)