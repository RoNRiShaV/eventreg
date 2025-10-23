import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events/");
        // Log to verify backend structure
        console.log("Fetched events:", res.data);
        setEvents(res.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  if (events.length === 0)
    return <p className="text-center mt-10">No events available yet.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p>
              📅{" "}
              {event.datetime
                ? new Date(event.datetime).toLocaleString()
                : "Date not set"}
            </p>
            <p>📍 {event.location || "Location not specified"}</p>
            <p>👥 Capacity: {event.capacity ?? "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events/");
        console.log("Fetched events:", res.data);
        setEvents(res.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Convert backend numeric "time" (seconds since midnight) to readable HH:MM
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "No time specified";
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 5); // HH:MM
  };

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (events.length === 0)
    return <p className="text-center mt-10">No events available yet.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p>📅 {event.date}</p>
            <p>⏰ {formatTime(event.time)}</p>
            <p>📍 {event.location}</p>
            <p>👥 Capacity: {event.capacity}</p>
            <p>🕒 Created at: {new Date(event.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
