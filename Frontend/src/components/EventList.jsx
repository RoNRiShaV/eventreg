import EventCard from "./EventCard";

export default function EventList({ events, selectEvent }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">No events available.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} selectEvent={selectEvent} />
        ))
      )}
    </div>
  );
}
