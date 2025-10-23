import { useState } from "react";
import { API } from "../api/api";

export default function RegistrationForm({ event, setSelectedEvent, setMessage }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!form.name || !form.email) {
      setMessage("Please enter both name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post(`/registrations/${event.id}`, form);
      setMessage(res.data.message); // success message
      setForm({ name: "", email: "" });
      setSelectedEvent(null);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error registering";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">Register for {event.title}</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={register}
          disabled={loading}
          className={`w-full py-2 rounded-lg mb-2 transition ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {loading ? "Registering..." : "Submit"}
        </button>

        <button
          onClick={() => setSelectedEvent(null)}
          className="w-full text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
