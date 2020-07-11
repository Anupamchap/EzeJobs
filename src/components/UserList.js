import UserPreview from './UserPreview';
import ListPagination from './ListPagination';
import React from 'react';

const UserList = props => {
  if (!props.users) {
    return (
      <div className="job-preview">Loading...</div>
    );
  }

  if (props.users.length === 0) {
    return (
      <div className="job-preview">
        No Job Seekers are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.users.map(user => {
          return (
            <UserPreview user={user} key={user.username} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        //jobsCount={props.jobsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default UserList;
