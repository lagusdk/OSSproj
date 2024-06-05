from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from guest import guest_router
import uvicorn

app = FastAPI()

# "static" 디렉토리를 정적 파일 제공 디렉토리로 마운트
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS 설정: 다른 출처에서의 요청을 허용
origins = [
    "http://127.0.0.1:4000",
    "http://localhost:4000",
]

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 출처 목록
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# 루트 경로에 접근하면 main.html 파일을 응답으로 제공
@app.get("/")
async def welcome() -> FileResponse:
    return FileResponse('static/main.html')

# guest_router를 FastAPI 애플리케이션에 포함시킴
app.include_router(guest_router)

# 애플리케이션 실행 (개발 모드에서는 코드 변경 시 자동으로 재시작됨)
if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=4000, reload=True)
