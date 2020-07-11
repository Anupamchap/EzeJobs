import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import _ from "lodash";
import { connect } from "react-redux";
import {
  ADD_TAG,
  RECRUITERDATA_PAGE_LOADED,
  REMOVE_TAG,
  RECRUITERDATA_SUBMITTED,
  RECRUITERDATA_PAGE_UNLOADED,
  UPDATE_FIELD_RECRUITERDATA,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.common.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: RECRUITERDATA_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: RECRUITERDATA_SUBMITTED, payload }),
  onUnload: (payload) => dispatch({ type: RECRUITERDATA_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
   // currentUser[key]=value  
  {console.log(key,value)
    dispatch({ type: UPDATE_FIELD_RECRUITERDATA, key, value })}
});

class RecruiterData extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.currentUser)
    const updateFieldEvent = (key) => (ev) =>
      //this.props.currentUser[key]=ev.target.value;
      this.props.onUpdateField(key, ev.target.value);
    this.changeOgranization = updateFieldEvent("organization");
    this.changeNumberOfEmployees = updateFieldEvent("numberofemployees");
    this.changeEstablishedIn = updateFieldEvent("establishedin");
    this.changeCountry = updateFieldEvent("country");
    this.changeAboutCompany = updateFieldEvent("aboutcompany");    

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
        organization: this.props.organization,
        numberofemployees: this.props.numberofemployees,
        establishedin: this.props.establishedin,
        country: this.props.country,
        aboutcompany: this.props.aboutcompany,        
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
      <div className="recruiterdata-page">
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
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name of Organization"
                      value={this.props.organization}
                      onChange={this.changeOgranization}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Number of Employees"
                      value={this.props.numberemployees}
                      onChange={this.changeNumberOfEmployees}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      onChange={this.changeEstablishedIn}
                    >
                      <option value="" disabled selected>
                        Established in
                      </option>
                      {_.range(1950, 2020 + 1).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </fieldset>                  

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Country"
                      value={this.props.contry}
                      onChange={this.changeCountry}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="About your company"
                      value={this.props.aboutcompany}
                      onChange={this.changeAboutCompany}
                    ></textarea>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterData);
