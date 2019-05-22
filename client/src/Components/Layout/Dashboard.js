import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import fc from "format-currency";
import _ from "lodash";
import isEmpty from "is-empty";
import { getNews } from "../../Actions/newsAction";
import { setCurrentStock } from "../../Actions/stockAction";
import { setCurrentPrices } from "../../Actions/authAction"
import Searchbar from "./Searchbar";
import News from "../News";
import ProfitDisplay from '../ProfitDisplay';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { Button } from "react-materialize";
import "../styles/dashboard.css";

class Dashboard extends Component {

  componentDidMount() {
    console.log("PROPS: ", this.props);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  renderStockList(array) {
    console.log('STOCKLIST RENDERED');
    return _.map(array, c => {
      return (
        <div className="stock-list-card">
          <Card style={{ border: "none", margin: "none", paddingBottom: "5px;"}}>
            <CardHeader 
              style={{ backgroundColor: "#125150", color: "white", border: "none"}}>
              <div className="header-contents">
                <div className="symbol">
                  <b>{c.symbol} </b>
                </div>
                <div className="price">
                  ${fc(this.props.currentPrices[`${c.symbol}`].quote.latestPrice)} <br />
                  {c.shares} shares <br />
                  profit: $
                {fc(
                  this.props.currentPrices[`${c.symbol}`].quote.latestPrice *
                    c.shares -
                    c.cost
                )}
                  {/* ${(this.props.currentPrices[`${c.symbol}`].quote.change)} 
                  ({this.props.currentPrices[`${c.symbol}`].quote.changePercent}%) */}
                </div>
                <div className="trade-button">
                  <Link to="/stock">
                    <Button onClick={() => this.props.setCurrentStock(c.symbol, c)} id="trade-button">
                      Trade {c.symbol}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            {/* <CardBody> */}
              {/* <li>${fc(c.price)}</li>
              <li>{c.shares} shares</li>
              <li>cost: ${fc(c.cost)}</li>
              <li>
                value: $
                {fc(
                  this.props.currentPrices[`${c.symbol}`].quote.latestPrice *
                    c.shares
                )}
              </li>
              <li>
                profit: $
                {fc(
                  this.props.currentPrices[`${c.symbol}`].quote.latestPrice *
                    c.shares -
                    c.cost
                )}
              </li> */}
            {/* </CardBody> */}
            {/* <CardFooter>
              <Link to="/stock">
                <Button onClick={() => this.props.setCurrentStock(c.symbol, c)}>
                  Trade {c.symbol}
                </Button>
              </Link>
            </CardFooter> */}
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.auth.isAuthenticated ? (
          <div className="left-container">
            <div className="account-container">
              <h3>
                <b id="account-balance">${fc(this.props.account.balance)}</b>
              </h3>
                <ProfitDisplay />
              <br />
            </div>
            <div className="stocks-container">
              <div className="stocks-header">
                <h3 style={{color: "white"}}>Stocks</h3>
                <Searchbar />
              </div>
              {!isEmpty(this.props.currentPrices) &&
                this.renderStockList(this.props.stockList)}
            </div>
          </div>

        ) : (<div />)}

        <div className="news-container">
          <News />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    account: state.account,
    stockList: state.account.stockList,
    currentPrices: state.account.currentPrices,
    news: state.news
  };
};

export default connect(
  mapStateToProps,
  { setCurrentStock, getNews, setCurrentPrices }
)(Dashboard);
