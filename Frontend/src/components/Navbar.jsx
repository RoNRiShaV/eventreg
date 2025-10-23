import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Home
      </NavLink>
      <NavLink
        to="/create-event"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Create Event
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Available Events
      </NavLink>
    </nav>
  );
}
