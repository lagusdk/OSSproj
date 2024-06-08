from fastapi import APIRouter, Path
from model import Message
from typing import List
from datetime import datetime

# APIRouter 객체 생성
guest_router = APIRouter()

# 방명록 데이터를 저장할 임시 저장소 (리스트 사용)
messages: List[Message] = []
message_counter = 0

# 새로운 방명록 항목 추가
@guest_router.post("/guestbook")
async def add_message(message: Message) -> dict:
    global message_counter
    message.id = message_counter = message_counter + 1
    message.timestamp = datetime.now()
    messages.append(message)
    return {"msg": "Message added successfully"}

@guest_router.get("/guestbook")
async def retrieve_messages() -> dict:
    return {"messages": messages}

# 모든 방명록 항목 가져오기
@guest_router.get("/guestbook/{message_id}")
async def get_single_message(message_id: int) -> dict:
    for message in messages:
        if message.id == message_id:
            return {"message": message}
    raise HTTPException(status_code=404, detail="Message not found")

# 특정 방명록 항목 삭제
@guest_router.delete("/guestbook/{message_id}")
async def delete_message(message_id: int) -> dict:
    for index, message in enumerate(messages):
        if message.id == message_id:
            del messages[index]
            return {"msg": f"Message with ID {message_id} deleted successfully"}
    raise HTTPException(status_code=404, detail="Message not found")