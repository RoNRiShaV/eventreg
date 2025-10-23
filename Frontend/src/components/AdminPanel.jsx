import { useState, useEffect } from "react";
import { API } from "../api/api";

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    API.get("/registrations") // backend endpoint to get all registrations
      .then(res => setRegistrations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>📝 All Registrations</h2>
      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.event_title}</td>
                <td>{reg.registered_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
