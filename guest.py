from fastapi import APIRouter, status
from model import Guest

# APIRouter 객체 생성
guest_router = APIRouter()

# 데이터 모델 정의
class GuestbookItem(Guest):
    pass

# 방명록 데이터를 저장할 임시 저장소 (리스트 사용)
guestbook_data = []
guest_counter = 0

# 새로운 방명록 항목 추가
@guest_router.post("/guestbook/", response_model=GuestbookItem, status_code=status.HTTP_201_CREATED)
async def add_guestbook_item(item: GuestbookItem):
    global guest_counter

    item_dict = item.dict()
    item_dict["id"] = guest_counter = guest_counter + 1
    item_dict["created_at"] = datetime.utcnow()
    guestbook_data.append(item_dict)
    return item_dict

# 모든 방명록 항목 가져오기
@guest_router.get("/guestbook/", response_model=list[GuestbookItem])
async def get_guestbook_items():
    return guestbook_data

# 특정 방명록 항목 삭제
@guest_router.delete("/guestbook/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_guestbook_item(item_id: int):
    global guestbook_data
    guestbook_data = [item for item in guestbook_data if item["id"] != item_id]
    return {"msg": "Item deleted successfully"}