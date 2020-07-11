import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
  CHANGE_HOME_TAB,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) => {
    dispatch({ type: HOME_PAGE_LOADED, pager, payload });
    dispatch({ type: CHANGE_HOME_TAB, tab });
  },
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  componentWillMount() {
    let tab = "all";
    let jobsPromise = agent.Jobs.all;
    if (this.props.currentUser) {
      if (this.props.currentUser.usertype === "seeker") {
        tab = "feed";
        jobsPromise = agent.Jobs.feed;
      }
    }
    this.props.onLoad(
      tab,
      jobsPromise,
      Promise.all([agent.Tags.getAll(), jobsPromise()])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
