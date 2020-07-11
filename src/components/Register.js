import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  RECRUITERDATA,
  SEEKERDATA,
  REGISTER_PAGE_UNLOADED,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onChangeUserType: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "usertype", value }),
  onSubmit: (usertype, username, email, password) => {
    const payload = agent.Auth.register(usertype, username, email, password);
    console.log(payload);
    dispatch({ type: REGISTER, payload });
    if (usertype === "seeker") {
      dispatch({ type: SEEKERDATA, payload });
    }
    if (usertype === "recruiter") {
      dispatch({ type: RECRUITERDATA, payload });
    }
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.changeUserType = (ev) => this.props.onChangeUserType(ev.target.value);
    this.changeUsername = (ev) => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (usertype, username, email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(usertype, username, email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const usertype = this.props.usertype;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form
                onSubmit={this.submitForm(usertype, username, email, password)}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <select
                      className="form-control form-control-dropdown"
                      name="usertype"
                      onChange={this.changeUserType}
                    > 
                      <option value="" disabled selected>
                        You are a...
                      </option>
                      <option id="0" value="seeker">
                        Job Seeker
                      </option>
                      <option id="1" value="recruiter">
                        Recruiter
                      </option>
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username || ""}
                      onChange={this.changeUsername}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email || ""}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password || ""}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign up
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
