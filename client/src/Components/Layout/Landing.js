import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../Utils/Images/stoqtracker.png'
import icon from '../../Utils/Images/icon.png'
import "../styles/landing.css";


class Landing extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" id="headers">
            <img src={logo} alt="Stoq Tracker" className="logo"/>
            <h4 style={{ fontWeight: "lighter"}}>
              Trade Stocks
            </h4>
            <h4>
              Make Money
            </h4>
            <br />
            <div className="buttons">
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "auto",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn waves-effect hoverable black"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "auto",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn waves-effect hoverable black"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
