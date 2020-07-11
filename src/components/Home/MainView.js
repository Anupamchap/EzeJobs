import JobList from "../JobList";
import UserList from "../UserList";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  CHANGE_TAB,
  USER_CHANGE_TAB,
  CHANGE_HOME_TAB,
} from "../../constants/actionTypes";

const YourFeedTab = (props) => {
  if (props.token && props.usertype === "seeker") {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick("feed", agent.Jobs.feed, agent.Jobs.feed());
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Jobs from followed companies
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", agent.Jobs.all, agent.Jobs.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        All Job Posts
      </a>
    </li>
  );
};

const RecruiterFeedTab = (props) => {
  console.log(props.username, props.usertype);
  if (props.token && props.usertype === "recruiter") {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        "recruiter",
        agent.Jobs.byCreator,
        agent.Jobs.byCreator(props.username)
      );
    };
    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === "recruiter" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          My posts
        </a>
      </li>
    );
  }
  return null;
};

const AppliedJobTab = (props) => {
  console.log(props.usertype);
  if (props.token && props.usertype === "seeker") {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick("applied", agent.User.get, agent.User.get("seeker", 50));
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === "applied" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Job's Applied
        </a>
      </li>
    );
  }
  return null;
};

const SeekerFeedTab = (props) => {
  console.log(props.usertype);
  if (props.token && props.usertype === "recruiter") {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onUserTabClick(
        "seeker",
        agent.User.get,
        agent.User.get("seeker", 50)
      );
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === "seeker" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Job Seekers
        </a>
      </li>
    );
  }
  return null;
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.jobList,
  users: state.userList.users,
  tab: state.home.tab,
  tags: state.home.tags,
  token: state.common.token,
  usertype: state.common.currentUser ? state.common.currentUser.usertype : null,
  username: state.common.currentUser ? state.common.currentUser.username : null,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => {
    dispatch({ type: CHANGE_TAB, pager, payload });
    dispatch({ type: CHANGE_HOME_TAB, tab });
  },
  onUserTabClick: (tab, pager, payload) => {
    dispatch({ type: USER_CHANGE_TAB, pager, payload });
    dispatch({ type: CHANGE_HOME_TAB, tab });
  },
});

const MainView = (props) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={props.token}
            usertype={props.usertype}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <AppliedJobTab
            token={props.token}
            usertype={props.usertype}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <RecruiterFeedTab
            token={props.token}
            usertype={props.usertype}
            username={props.username}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <SeekerFeedTab
            token={props.token}
            usertype={props.usertype}
            tab={props.tab}
            onUserTabClick={props.onUserTabClick}
          />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      {props.tab !== "seeker" && (
        <JobList
          pager={props.pager}
          jobs={props.jobs}
          usertype={props.usertype}
          loading={props.loading}
          jobsCount={props.jobsCount}
          currentPage={props.currentPage}
        />
      )}

      {props.tab === "seeker" && (
        <UserList
          pager={props.pager}
          users={props.users}
          loading={props.loading}
          //jobsCount={props.jobsCount}
          currentPage={props.currentPage}
        />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
