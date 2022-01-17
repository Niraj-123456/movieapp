import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "./services/userService";
class Register extends Form {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().min(3).max(100).label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-6 text-center p-2">
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Submit")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
