from pydantic import BaseModel
from typing import Optional

class Event(BaseModel):
    id: Optional[int]
    title: str
    description: str
    date: str
    time: str
    location: str
    capacity: int
    registered_count: Optional[int] = 0

class User(BaseModel):
    id: Optional[int]
    name: str
    email: str
    role: Optional[str] = "attendee"

class Registration(BaseModel):
    name: str
    email: str
