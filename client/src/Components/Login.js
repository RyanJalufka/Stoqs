import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import App from "./App";

const Login = () => (
  <div>
    <h1>Login</h1>
    <nav>
      <Link to="/home">Click to Login</Link>
      <Route path="/home" component={App} />
    </nav>
  </div>
);

export default Login;
