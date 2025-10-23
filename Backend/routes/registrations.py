from fastapi import APIRouter, HTTPException
from database import get_connection
from models.event_models import Registration

router = APIRouter()

@router.post("/registrations/{event_id}")
def register_user(event_id: int, reg: Registration):
    with get_connection() as conn:
        with conn.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM events WHERE id=%s", (event_id,))
            event = cursor.fetchone()
            if not event:
                raise HTTPException(status_code=404, detail="Event not found")

            if event["registered_count"] >= event["capacity"]:
                raise HTTPException(status_code=400, detail="Event is full")

            cursor.execute("SELECT * FROM users WHERE email=%s", (reg.email,))
            user = cursor.fetchone()
            if not user:
                cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (reg.name, reg.email))
                conn.commit()
                cursor.execute("SELECT * FROM users WHERE email=%s", (reg.email,))
                user = cursor.fetchone()

            cursor.execute(
                "SELECT * FROM registrations WHERE event_id=%s AND user_id=%s",
                (event_id, user["id"])
            )
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Already registered")

            cursor.execute(
                "INSERT INTO registrations (event_id, user_id) VALUES (%s, %s)",
                (event_id, user["id"])
            )
            cursor.execute(
                "UPDATE events SET registered_count = registered_count + 1 WHERE id = %s",
                (event_id,)
            )
            conn.commit()
            return {"message": f"{reg.name} successfully registered for {event['title']}"}
