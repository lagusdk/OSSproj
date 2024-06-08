from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Message(BaseModel):
    id: Optional[int] = None
    author: str
    content: str
    timestamp: Optional[datetime] = None
