import EventForm from "../components/EventForm";
import Navbar from "../pages/Navbar"; // import navbar
import "./Home.css";

export default function CreateEventPage() {
  return (
    <div className="home-container">
      <Navbar />

      <h1 className="page-title">Create a New Event</h1>
      <div className="form-wrapper">
        <EventForm />
      </div>
    </div>
  );
}
