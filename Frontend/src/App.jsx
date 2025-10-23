import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/createEventPage";

import "./pages/style.css";

export default function App() {
  return (
    <div className="app-container">
      {/* Top Navbar */}
      

      {/* Main content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Routes>
      </div>
    </div>
  );
}
