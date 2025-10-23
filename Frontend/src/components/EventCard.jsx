export default function EventCard({ event, selectEvent }) {
  return (
    <div className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <p className="text-gray-700 mb-3">{event.description}</p>

      <div className="text-gray-600 text-sm mb-1">
        <strong>Date:</strong> {event.date} {event.time}
      </div>
      <div className="text-gray-600 text-sm mb-1">
        <strong>Location:</strong> {event.location}
      </div>
      <div className="text-gray-600 text-sm mb-4">
        <strong>Seats:</strong> {event.registered_count}/{event.capacity}
      </div>

      <button
        onClick={() => selectEvent(event)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Register
      </button>
    </div>
  );
}
