# 전체적으로 수정 필요

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

guest_router = APIRouter()

# 데이터 모델 정의
class GuestbookItem(BaseModel):
    author: str
    message: str
    created_at: Optional[datetime] = None

# 메모리 기반 저장소
guestbook_items = []

@router.post("/guestbook/", status_code=status.HTTP_201_CREATED)
async def add_guestbook_item(item: GuestbookItem):
    item.created_at = datetime.now()
    guestbook_items.append(item)
    return item

@router.get("/guestbook/", response_model=List[GuestbookItem])
async def get_guestbook_items():
    return guestbook_items

@router.delete("/guestbook/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_guestbook_item(item_id: int):
    if item_id < 0 or item_id >= len(guestbook_items):
        raise HTTPException(status_code=404, detail="Item not found")
    del guestbook_items[item_id]
    return {"msg": "Item deleted successfully"}
