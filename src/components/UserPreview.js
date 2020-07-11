import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { JOB_FAVORITED, JOB_UNFAVORITED } from '../constants/actionTypes';

//const FAVORITED_CLASS = 'btn btn-sm btn-primary';
//const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

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

const UserPreview = props => {
  const user = props.user;
  /*const favoriteButtonClass = job.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (user.favorited) {
      props.unfavorite(user.slug);
    } else {
      props.favorite(user.slug);
    }
  };*/

  return (
    <div className="job-preview">
      <div className="job-meta">
        <Link to={`/@${user.username}`}>
          <img src={user.image} alt={user.username} />
        </Link>

        <div className="info">
          <Link className="creator" to={`/@${user.username}`}>
            {user.username}
          </Link>
        </div>

       {/* <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {job.favoritesCount}
          </button>
  </div>*/}
      </div>

    {/* <Link to={`/job/${job.slug}`} className="preview-link"> */}
        <h1>{user.username}</h1>
        <p>{user.username}</p>
        <span>Read more...</span>
        {/*<ul className="tag-list">
          {
            user.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>*/}
     {/* </Link> */}
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(UserPreview);
