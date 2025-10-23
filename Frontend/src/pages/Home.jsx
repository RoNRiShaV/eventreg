import React from "react";
import Navbar from "../pages/Navbar"; // import navbar
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to the Event Registration System</h1>
        <p>Browse events, register for them, or create your own with ease!</p>
      </header>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="card">
          <div className="icon blue">📅</div>
          <h3>Browse Events</h3>
          <p>Discover upcoming events, conferences, and workshops tailored to your interests.</p>
          <a href="/events">View Events →</a>
        </div>

        <div className="card">
          <div className="icon green">🧑‍💻</div>
          <h3>Easy Registration</h3>
          <p>Register for events in seconds with our streamlined registration process.</p>
          <a href="/events">Get Started →</a>
        </div>

        <div className="card">
          <div className="icon orange">🕒</div>
          <h3>Create Events</h3>
          <p>Host your own events and manage registrations, sessions, and schedules effortlessly.</p>
          <a href="/create-event">Create Event →</a>
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Join?</h2>
        <p>Start exploring events happening near you or create your own event to bring people together.</p>
        <div className="cta-buttons">
          <a href="/events" className="btn primary">Browse Events</a>
          <a href="/create-event" className="btn secondary">Create Event</a>
        </div>
      </section>
    </div>
  );
}
