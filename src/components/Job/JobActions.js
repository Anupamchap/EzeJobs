import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_JOB } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_JOB, payload })
});

const JobActions = props => {
  const job = props.job;
  const del = () => {
    props.onClickDelete(agent.Jobs.del(job.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${job.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Job
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Job
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(JobActions);
