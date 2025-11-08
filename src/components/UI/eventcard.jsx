// /client/src/components/EventCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="card h-100 shadow-sm event-card">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/events/${event.id}`} className="text-decoration-none">
            {event.title}
          </Link>
        </h5>
        <p className="card-text text-muted mb-1">{event.domain || 'General'}</p>
        <p className="card-text small">
          <i className="bi bi-clock me-1"></i> 
          {formatDate(event.start_datetime || new Date())}
        </p>
        <span className={`badge bg-primary`}>
          {event.location || 'Online'}
        </span>
      </div>
    </div>
  );
}

export default EventCard;