import JobPreview from './JobPreview';
import ListPagination from './ListPagination';
import React from 'react';

const JobList = props => {
  if (!props.jobs) {
    return (
      <div className="job-preview">Loading...</div>
    );
  }

  if (props.jobs.length === 0) {
    return (
      <div className="job-preview">
        No jobs are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.jobs.map(job => {
          return (
            <JobPreview job={job} usertype={props.usertype} key={job.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        jobsCount={props.jobsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default JobList;
