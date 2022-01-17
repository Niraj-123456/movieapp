import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { login } from "./services/auth";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      console.log(jwt);
      localStorage.setItem("token", jwt);
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
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
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

export default Login;
