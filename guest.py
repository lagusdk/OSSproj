from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import databases, sqlalchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime

# 데이터베이스 URL 설정 (SQLite 사용)
DATABASE_URL = "sqlite:///./test.db"
database = databases.Database(DATABASE_URL)

# 메타데이터 객체 생성
metadata = MetaData()

# guestbook 테이블 정의
guestbook = Table(
    "guestbook",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("author", String),
    Column("message", String),
    Column("created_at", DateTime, default=datetime.utcnow),
)

# 데이터베이스 엔진 생성 및 테이블 생성
engine = create_engine(DATABASE_URL)
metadata.create_all(engine)

# APIRouter 객체 생성
guest_router = APIRouter()

# 데이터 모델 정의
class GuestbookItem(BaseModel):
    id: Optional[int] = None
    author: str
    message: str
    created_at: Optional[datetime] = None

# FastAPI 애플리케이션이 시작될 때 데이터베이스 연결
@guest_router.on_event("startup")
async def startup():
    await database.connect()

# FastAPI 애플리케이션이 종료될 때 데이터베이스 연결 해제
@guest_router.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# 새로운 방명록 항목 추가
@guest_router.post("/guestbook/", response_model=GuestbookItem, status_code=status.HTTP_201_CREATED)
async def add_guestbook_item(item: GuestbookItem):
    query = guestbook.insert().values(author=item.author, message=item.message, created_at=datetime.utcnow())
    last_record_id = await database.execute(query)
    return {**item.dict(), "id": last_record_id, "created_at": datetime.utcnow()}

# 모든 방명록 항목 가져오기
@guest_router.get("/guestbook/", response_model=List[GuestbookItem])
async def get_guestbook_items():
    query = guestbook.select()
    return await database.fetch_all(query)

# 특정 방명록 항목 삭제
@guest_router.delete("/guestbook/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_guestbook_item(item_id: int):
    query = guestbook.delete().where(guestbook.c.id == item_id)
    result = await database.execute(query)
    if result:
        return {"msg": "Item deleted successfully"}
    raise HTTPException(status_code=404, detail="Item not found")
