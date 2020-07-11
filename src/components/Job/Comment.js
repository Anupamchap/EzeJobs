import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.creator.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.creator.username}`}
          className="comment-creator">
          <img src={comment.creator.image} className="comment-creator-img" alt={comment.creator.username} />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.creator.username}`}
          className="comment-creator">
          {comment.creator.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
