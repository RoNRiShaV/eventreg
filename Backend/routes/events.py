from fastapi import APIRouter, HTTPException
from database import get_connection
from models.event_models import Event

router = APIRouter()



# Get all events
@router.get("/")
def get_events():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM events ORDER BY date ASC")
    events = cursor.fetchall()
    cursor.close()
    conn.close()
    return events

# Get event by ID
@router.get("/{event_id}")
def get_event(event_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM events WHERE id=%s", (event_id,))
    event = cursor.fetchone()
    cursor.close()
    conn.close()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# Add new event (admin)
@router.post("/")
def add_event(event: Event):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO events (title, description, date, time, location, capacity) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (event.title, event.description, event.date, event.time, event.location, event.capacity))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Event added successfully"}
