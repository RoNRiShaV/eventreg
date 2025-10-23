from fastapi import APIRouter, HTTPException
from database import get_connection
from models.event_models import Event, EventCreate

router = APIRouter()

# ✅ Get all events
@router.get("/events/")
def get_events():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM events ORDER BY date ASC")
        events = cursor.fetchall()
        cursor.close()
        conn.close()
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Add new event
@router.post("/events/")
def add_event(event: EventCreate):
    try:
        print("📥 Received event:", event.dict())
        conn = get_connection()
        cursor = conn.cursor()

        sql = """
        INSERT INTO events (title, description, date, time, location, capacity)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(
            sql,
            (
                event.title,
                event.description,
                event.date,
                event.time,
                event.location,
                event.capacity,
            ),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "✅ Event added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
