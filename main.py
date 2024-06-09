from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from guest import guest_router
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn

app = FastAPI()

# CORS 설정: 다른 출처에서의 요청을 허용
origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",
    "http://localhost",
    "http://localhost:5500",
    "http://localhost:8000",
    "44.193.239.247",
    "44.193.239.247:8000",
    "44.193.239.247:4000"
]

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 출처 목록
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

@app.get("/")
async def root():
    return FileResponse("static/index.html")

# guest_router를 FastAPI 애플리케이션에 포함시킴
app.include_router(guest_router)

# 정적 파일을 서빙할 경로 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

# 애플리케이션 실행 (개발 모드에서는 코드 변경 시 자동으로 재시작됨)
if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
