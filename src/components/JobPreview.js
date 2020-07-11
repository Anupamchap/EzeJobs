import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { JOB_FAVORITED, JOB_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: JOB_FAVORITED,
    payload: agent.Jobs.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: JOB_UNFAVORITED,
    payload: agent.Jobs.unfavorite(slug)
  })
});

const JobPreview = props => {
  const job = props.job;
  const usertype=props.usertype;
  const favoriteButtonClass = job.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if(usertype==='seeker'){
    if (job.favorited) {
      props.unfavorite(job.slug);
    } else {
      props.favorite(job.slug);
    }
  }
  };

  return (
    <div className="job-preview">
      <div className="job-meta">
        <Link to={`/@${job.creator.username}`}>
          <img src={job.creator.image} alt={job.creator.username} />
        </Link>

        <div className="info">
          <Link className="creator" to={`/@${job.creator.username}`}>
            {job.creator.username}
          </Link>
          <span className="date">
            {new Date(job.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {job.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/job/${job.slug}`} className="preview-link">
        <h1>{job.title}</h1>
        <h6>{job.description}</h6>
        <span>Know more...</span>
        <ul className="tag-list">
          {
            job.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(JobPreview);
