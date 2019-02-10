import React, { Component } from "react";
import { connect } from "react-redux";
import fc from 'format-currency';
import { setUserAccount } from '../../Actions/authAction';
import Searchbar from "./Searchbar";
import OwnedStocks from '../Dashboard/OwnedStocks';

class Dashboard extends Component {
  // should call all other dashboard components from here... similar to App.js

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={{ marginLeft: "2.5%"}}>
        {this.props.auth.isAuthenticated ?
        <div>
          <h3>${fc(this.props.auth.account.balance)}</h3>
          <h10>+ 1.09</h10><br/>
          <h10>- 0.95</h10>
        </div>
        :
          <div></div>
        }
        <OwnedStocks />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { setUserAccount })(Dashboard);
