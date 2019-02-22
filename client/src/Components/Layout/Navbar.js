import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { FaChartLine } from 'react-icons/fa'
import Clock from '../Clock';
import "../styles/navbar.css";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };

  // handle the render of the logout button when user is logged in!!!


  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated ? (
          <div className="navbar-container">
            <div className="logo">
              <Link to="/dashboard">Stoq Tracker</Link>
            </div>
            <div className="logout">
              <Button color="inherit" onClick={() => this.handleLogout()}>
                Logout
              </Button>
            </div>
            <Clock />
          </div>
        ) : (
          <div className="navbar-landing">
            <h1>
              <b>Stoq Tracker</b>
            </h1>
            <br />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
