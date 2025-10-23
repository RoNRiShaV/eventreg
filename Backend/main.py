from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import events, registrations

app = FastAPI(title="Event Registration System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ clean prefixes
app.include_router(events.router, prefix="/api", tags=["Events"])
app.include_router(registrations.router, prefix="/api", tags=["Registrations"])

@app.get("/")
def root():
    return {"message": "API running successfully"}
