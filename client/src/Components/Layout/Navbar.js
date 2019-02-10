import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authAction";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from '@material-ui/core/Grid';
import Searchbar from "./Searchbar";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };

  // handle the render of the logout button when user is logged in!!!

  render() {
    const styles = {
      menuButton: {}
    };

    return (
      // <div className="navbar-fixed">
      //   <button onClick={() => this.handleLogout()}>Logout</button>
      //   <nav className="z-depth-0">
      //     <div className="nav-wrapper white">
      //       {this.props.auth.isAuthenticated ? (
      // <Link
      //   to="/dashboard"
      //   style={{
      //     fontFamily: "monospace"
      //   }}
      //   className="col s5 brand-logo center black-text"
      // >
      //   STOCKS
      // </Link>
      //       ) : (
      //         <Link
      //           to="/"
      //           style={{
      //             fontFamily: "monospace"
      //           }}
      //           className="col s5 brand-logo center black-text"
      //         >
      //           STOCKS
      //         </Link>
      //       )}
      //     </div>
      //   </nav>
      // </div>
      <div>
        {this.props.auth.isAuthenticated ? (
          <AppBar position="static">
            <Toolbar style={{ background: "black" }}>
              <Grid container spacing={8}>
                
                  <Grid item xs={3}>
                      <Link to="/dashboard">
                        <Typography variant="h5" color="inherit">
                          STOQtracker
                        </Typography>
                      </Link>
                  </Grid>

                  <Grid item xs={3}>
                      <Searchbar />
                  </Grid>

                  <Grid item xs={3}>
                      <h10>Hello, {this.props.auth.account.name}</h10>
                  </Grid>

                  <Grid item xs={3}>
                      <Button color="inherit" onClick={() => this.handleLogout()}>
                        Logout
                      </Button>
                  </Grid>

              </Grid>
            </Toolbar>
          </AppBar>
        ) : (
          <div style={{ textAlign: "center" }}>
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
