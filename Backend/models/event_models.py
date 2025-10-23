from pydantic import BaseModel
from typing import Optional

# Model used for reading events from the database or returning responses
class Event(BaseModel):
    id: Optional[int]
    title: str
    description: Optional[str] = None
    date: str  # YYYY-MM-DD
    time: str  # HH:MM:SS
    location: Optional[str] = None
    capacity: int
    registered_count: Optional[int] = 0


# ✅ New model used for creating new events (no id, no registered_count)
class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: str  # YYYY-MM-DD
    time: str  # HH:MM:SS
    location: Optional[str] = None
    capacity: int


# Model for event registration (if applicable)
class Registration(BaseModel):
    name: str
    email: str
