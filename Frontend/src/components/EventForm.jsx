import { useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

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
      // ✅ Ensure all fields are filled
      if (!form.title || !form.date || !form.time || !form.location || !form.capacity) {
        setError("❌ Please fill all required fields.");
        return;
      }

      // ✅ Send time as HH:MM:SS (string) since backend expects string
      const formattedTime = form.time.length === 5 ? `${form.time}:00` : form.time;

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date, // YYYY-MM-DD
        time: formattedTime, // HH:MM:SS format
        location: form.location.trim(),
        capacity: parseInt(form.capacity, 10),
      };

      const res = await API.post("/events/", payload);
      alert("✅ Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err.response?.data || err);
      if (err.response?.status === 422) {
        setError("❌ Validation error. Please check your input fields.");
      } else {
        setError("❌ Failed to create event. Try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
