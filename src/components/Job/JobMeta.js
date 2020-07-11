import JobActions from './JobActions';
import { Link } from 'react-router-dom';
import React from 'react';

const JobMeta = props => {
  const job = props.job;
  return (
    <div className="job-meta">
      <Link to={`/@${job.creator.username}`}>
        <img src={job.creator.image} alt={job.creator.username} />
      </Link>

      <div className="info">
        <Link to={`/@${job.creator.username}`} className="creator">
          {job.creator.username}
        </Link>
        <span className="date">
          {new Date(job.createdAt).toDateString()}
        </span>
      </div>

      <JobActions canModify={props.canModify} job={job} />
    </div>
  );
};

export default JobMeta;
