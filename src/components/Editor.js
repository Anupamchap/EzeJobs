import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import _ from "lodash";
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  JOB_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: JOB_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');
    this.changeExperience = updateFieldEvent("workexperience");
    this.changeJobType = updateFieldEvent("jobtype");


    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const job = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList,
        workexperience: this.props.workexperience,
        jobtype: this.props.jobtype
      };

      const slug = { slug: this.props.jobSlug };
      const promise = this.props.jobSlug ?
        agent.Jobs.update(Object.assign(job, slug)) :
        agent.Jobs.create(job);

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Jobs.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Jobs.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Job Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Job Description"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  
                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      name="Experience"
                      onChange={this.changeExperience}
                    >
                      <option value="" disabled selected>
                        Minimum Experience required
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
                        Job Type
                      </option>
                      <option value="fullTime">Full-Time</option>
                      <option value="partTime">Part-Time</option>
                      <option value="remote">Remote</option>
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Provide more details about job (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>



                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Technologies required"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Job
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
