import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class StockPage extends Component {

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return(
      <div>
        <h3>{this.props.currentStock.companyName}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    account: state.account,
    currentStock: state.currentStock
  };
};

export default connect(mapStateToProps)(StockPage);