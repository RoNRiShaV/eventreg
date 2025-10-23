from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import events, registrations  # make sure these are in routes folder

app = FastAPI(title="Event Registration System")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(registrations.router, prefix="/api/registrations", tags=["Registrations"])

@app.get("/")
def root():
    return {"message": "Event Registration API running successfully!"}
