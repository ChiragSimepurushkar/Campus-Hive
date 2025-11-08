// /client/src/components/EventList.jsx

import React from 'react';
import EventCard from './eventcard.jsx';

function EventList({ events }) {
  if (!events || events.length === 0) {
    return <p>No events to display at this time.</p>;
  }

  return (
    <div className="event-list row">
      {events.map((event) => (
        <div key={event.id} className="col-md-6 col-lg-4 mb-3">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}

export default EventList;