from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Guest(BaseModel):
    id: Optional[int] = None
    author: str
    message: str
    created_at: Optional[datetime] = None