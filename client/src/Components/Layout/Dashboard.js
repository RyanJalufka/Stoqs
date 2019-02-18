import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import fc from "format-currency";
import _ from "lodash";
import { setUserAccount } from "../../Actions/authAction";
import { getNews } from "../../Actions/newsAction";
import { setCurrentStock } from "../../Actions/stockAction";
import Searchbar from "./Searchbar";
import News from "../News";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { Button } from '@material-ui/core';
import "../styles/dashboard.css";

class Dashboard extends Component {
  // should call all other dashboard components from here... similar to App.js

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  renderStockList(array) {
    return _.map(array, c => {
      return (
        <div className="stock-list-card">

          <Card>
            <CardHeader><b>{c.symbol}</b></CardHeader>
            <CardBody>
              <li>${fc(c.price)}</li>
              <li>{c.shares} shares</li>
              <li>${fc(c.cost)}</li>
            </CardBody>
            <CardFooter>
              <Link to="/stock">
                <Button onClick={() => this.props.setCurrentStock(c.symbol)}>Trade {c.symbol}</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.auth.isAuthenticated ? (
          <div className="account-container">
            <h3>
              <b>${fc(this.props.account.balance)}</b>
            </h3>
            <br />
            <h3>Stocks</h3>
            {this.renderStockList(this.props.stockList)}
          </div>
        ) : (
          <div />
        )}
        {/* <Searchbar /> */}
        <div className="news-container">
          <News />
        </div>
        {this.props.getNews(this.props.stockList)}
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
  { setUserAccount, getNews, setCurrentStock }
)(Dashboard);
