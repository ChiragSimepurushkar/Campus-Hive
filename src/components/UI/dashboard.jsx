// /client/src/components/Dashboard.jsx

import React from 'react';
import ProjectCard from './projectcard.jsx';
import EventList from './eventlist.jsx';
// Using the .js extension for the pure logic hook
import LoadingSpinner from './loadingspinner.jsx';
import { useFetch } from '../../hooks/useFetch.jsx';

function Dashboard() {
  // Fetch Projects (Recommendations/User's Projects)
  // Assumes the API endpoint /projects handles filtering for the dashboard view
  const { data: projects, loading: loadingProjects, error: projectError } = useFetch('/projects');

  // Fetch Events
  const { data: events, loading: loadingEvents, error: eventError } = useFetch('/events');
  
  if (loadingProjects || loadingEvents) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  if (projectError || eventError) {
    return <div className="alert alert-danger">Error loading data. Please try again.</div>;
  }

  const projectList = projects || [];
  const eventList = events || [];

  return (
    <div className="dashboard-content container py-4">
      <h1 className="mb-4">Welcome Back to Campus Connect!</h1>
      
      {/* --- Project Section --- */}
      <section className="mb-5">
        <h2>🌟 Recommended Projects</h2>
        <div className="row">
          {projectList.length > 0 ? (
            projectList.slice(0, 3).map(project => (
              <div key={project.id} className="col-md-4 mb-3">
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="text-muted">No projects found. Start a new one!</p>
          )}
        </div>
      </section>

      {/* --- Events Section --- */}
      <section className="mb-5">
        <h2>📅 Upcoming Campus Events</h2>
        {eventList.length > 0 ? (
            <EventList events={eventList.slice(0, 3)} />
        ) : (
            <p className="text-muted">No upcoming events listed.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;