import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEventPage from "./pages/CreateEventPage";
import EventsPage from "./pages/EventsPage";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();

  // Optional: redirect to home if route not found
  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </div>
    </div>
  );
}
