import { useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CreateEventForm.css"; // separate CSS file

export default function EventForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!form.title || !form.date || !form.time || !form.location || !form.capacity) {
        setError("❌ Please fill all required fields.");
        return;
      }

      const formattedTime = form.time.length === 5 ? `${form.time}:00` : form.time;

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date,
        time: formattedTime,
        location: form.location.trim(),
        capacity: parseInt(form.capacity, 10),
      };

      await API.post("/events/", payload);
      alert("✅ Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to create event. Try again later.");
    }
  };

  return (
    <div className="event-form-card">
      <h2>Create Event</h2>
      <p className="subtitle">Fill out the details below to create a new event</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter event description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Enter capacity"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-submit">
          Create Event
        </button>
      </form>
    </div>
  );
}
