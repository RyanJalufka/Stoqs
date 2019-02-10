import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import fc from "format-currency";
import _ from "lodash";
import { setUserAccount } from "../../Actions/authAction";
import Searchbar from "./Searchbar";

class Dashboard extends Component {
  // should call all other dashboard components from here... similar to App.js

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleClick = () => {

  }

  renderStockList(array) {
    return _.map(array, c => {
      return (
        <Link to="/stock">
        <li key={c._id} >
            <h4>
              <i>{c.symbol}</i>
            </h4>
            <br />
          <p>price: ${fc(c.price)}</p>
          <p>shares: {c.shares}</p>
          <p>cost: ${fc(c.cost)}</p>
        </li>
        </Link>
      );
    });
  }

  render() {
    return (
      <div style={{ marginLeft: "2.5%" }}>
        {this.props.auth.isAuthenticated ? (
          <div>
            <h3>Hello, {this.props.account.name}</h3>
            <h6>${fc(this.props.account.balance)}</h6>
          </div>
        ) : (
          <div />
        )}
        <Searchbar />
        <div>
        {this.renderStockList(this.props.stockList)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    account: state.account,
    stockList: state.account.stockList
  };
};

export default connect(
  mapStateToProps,
  { setUserAccount }
)(Dashboard);
