// /client/src/components/ProjectCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  const { id, title, description, tags, status, required_skills } = project;
  
  const briefDescription = description.length > 100 ? `${description.substring(0, 97)}...` : description;

  const statusClass = (s) => {
    switch (s) {
      case 'Open': return 'bg-success';
      case 'Full': return 'bg-warning text-dark';
      case 'Completed': return 'bg-secondary';
      default: return 'bg-info';
    }
  };

  return (
    <div className="card h-100 shadow-sm project-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/projects/${id}`} className="text-decoration-none text-primary">
            {title}
          </Link>
        </h5>
        
        <div className="mb-2">
            <span className={`badge ${statusClass(status)} me-2`}>
                {status || 'Draft'}
            </span>
        </div>
        
        <p className="card-text text-muted flex-grow-1">{briefDescription}</p>

        <div className="mb-3">
            <h6 className="small text-dark">Needed Skills:</h6>
            <div className="d-flex flex-wrap">
                {(required_skills || []).slice(0, 3).map((skill, index) => (
                    <span key={index} className="badge bg-light text-secondary border me-1 mb-1 small">{skill}</span>
                ))}
            </div>
        </div>

        <Link to={`/projects/${id}`} className="btn btn-sm btn-outline-primary mt-auto">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;