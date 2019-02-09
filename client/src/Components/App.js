import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Landing from "./Layout/Landing";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./Layout/Dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
