import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import _ from "lodash";
import { connect } from "react-redux";
import {
  ADD_TAG,
  SEEKERDATA_PAGE_LOADED,
  REMOVE_TAG,
  SEEKERDATA_SUBMITTED,
  SEEKERDATA_PAGE_UNLOADED,
  UPDATE_FIELD_SEEKERDATA,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.common.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: SEEKERDATA_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: SEEKERDATA_SUBMITTED, payload }),
  onUnload: (payload) => dispatch({ type: SEEKERDATA_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
   // currentUser[key]=value  
  {console.log(key,value)
    dispatch({ type: UPDATE_FIELD_SEEKERDATA, key, value })}
});

class SeekerData extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.currentUser)
    const updateFieldEvent = (key) => (ev) =>
      //this.props.currentUser[key]=ev.target.value;
      this.props.onUpdateField(key, ev.target.value);
    this.changeExperience = updateFieldEvent("workexperience");
    this.changeJobType = updateFieldEvent("jobtype");
    this.changeHighestQualification = updateFieldEvent("highestqualification");
    this.changeDegree = updateFieldEvent("degree");
    this.changeCoverLetter = updateFieldEvent("coverletter");    
    this.changeTagInput = updateFieldEvent("tagInput");

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = (tag) => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      console.log(this.props)
      const user = {
        workexperience: this.props.workexperience,
        jobtype: this.props.jobtype,
        highestqualification: this.props.highestqualification,
        degree: this.props.degree,
        coverletter: this.props.coverletter,        
        tagList: this.props.tagList,
      };
      console.log(user);
      //const username = { slug: this.props.username };
      const promise = agent.Auth.save(user)
        

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(
          agent.Jobs.get(this.props.match.params.slug)
        );
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {

    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="seekerdata-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <h1 className="text-xs-center">
                Please provide below details...
              </h1>
              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      name="Experience"
                      onChange={this.changeExperience}
                    >
                      <option value="" disabled selected>
                        Years of Experience
                      </option>
                      {_.range(0, 40 + 1).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      name="JobType"
                      onChange={this.changeJobType}
                    >
                      <option value="" disabled selected>
                        Looking for Job Type
                      </option>
                      <option value="fullTime">Full-Time</option>
                      <option value="partTime">Part-Time</option>
                      <option value="remote">Remote</option>
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      name="JobType"
                      onChange={this.changeHighestQualification}
                    >
                      <option value="" disabled selected>
                        Highest Qualification
                      </option>
                      <option value="graduation">Graduation</option>
                      <option value="postgraduation">Post Graduation</option>
                      <option value="phd">Phd</option>
                      <option value="highschool">High-School</option>
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Degree"
                      value={this.props.degree}
                      onChange={this.changeDegree}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Cover Letter"
                      value={this.props.coverLetter}
                      onChange={this.changeCoverLetter}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Technologies you know"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />

                    <div className="tag-list">
                      {(this.props.tagList || []).map((tag) => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i
                              className="ion-close-round"
                              onClick={this.removeTagHandler(tag)}
                            ></i>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Submit Details
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerData);
