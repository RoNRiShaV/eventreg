import React from "react";
import "./Home.css"; // navbar styles are here

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Event Registration System</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/create-event">Create Event</a>
      </div>
    </nav>
  );
}
