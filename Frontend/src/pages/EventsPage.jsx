import { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { API } from "../api/api";
import Navbar from "../pages/Navbar"; // import navbar
import "./Home.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch(() => setMessage("Error fetching events"));
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      <h1 className="page-title">Available Events</h1>

      {message && <div className="error-message">{message}</div>}

      <div className="cards-container">
        {events.map((event) => (
          <div key={event.id} className="card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><b>Date:</b> {event.date} {event.time}</p>
            <p><b>Location:</b> {event.location}</p>
            <p><b>Capacity:</b> {event.capacity}</p>
            <p><b>Registered:</b> {event.registered_count}</p>
            <button onClick={() => setSelectedEvent(event)} className="btn primary">
              Register
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <RegistrationForm
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}
