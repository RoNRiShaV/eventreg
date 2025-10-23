import { useEffect, useState } from "react";
import { API } from "./api/api";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => setMessage("Error fetching events"));
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Event Registration</h1>

      {message && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{message}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="mb-1">{event.description}</p>
            <p className="mb-1"><b>Date:</b> {event.date} {event.time}</p>
            <p className="mb-1"><b>Location:</b> {event.location}</p>
            <p className="mb-1"><b>Capacity:</b> {event.capacity}</p>
            <p className="mb-2"><b>Registered:</b> {event.registered_count}</p>
            <button
              onClick={() => setSelectedEvent(event)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
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

export default App;
