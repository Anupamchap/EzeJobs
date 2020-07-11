import JobMeta from "./JobMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  JOB_PAGE_LOADED,
  JOB_PAGE_UNLOADED,
} from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.job,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: JOB_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: JOB_PAGE_UNLOADED }),
});

class Job extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Jobs.get(this.props.match.params.id),
        agent.Comments.forJob(
          this.props.match.params.id,
          this.props.currentUser ? this.props.currentUser.usertype : null,
          this.props.currentUser ? this.props.currentUser.username : null
        ),
        //agent.Comments.forJob(this.props.match.params.id)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.job) {
      return null;
    }

    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.job.creator.username;
    return (
      <div className="job-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.job.title}</h1>
            <JobMeta job={this.props.job} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row job-content">
            <div className="col-xs-12">
              <p>{this.props.job.description}</p>
              <p>{this.props.job.body}</p>
              {/*<div dangerouslySetInnerHTML={markup}></div>*/}

              <ul className="tag-list">
                {this.props.job.tagList.map((tag) => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className="job-actions"></div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Job);
