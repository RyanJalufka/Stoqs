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
<<<<<<< HEAD
import OwnedStocks from '../Dashboard/OwnedStocks';
=======
import News from "../News";
import ProfitDisplay from '../ProfitDisplay';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { Button } from "react-materialize";
import "../styles/dashboard.css";
>>>>>>> ac4c5dfd11176afffefd809f58f15ac3d61f2413

class Dashboard extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  renderStockList(array) {
    return _.map(array, c => {
      return (
        <div className="stock-list-card">
          <Card>
            <CardHeader>
              <b>{c.symbol} </b> - $
              {fc(this.props.currentPrices[`${c.symbol}`].quote.latestPrice)}
            </CardHeader>
            <CardBody>
              <li>${fc(c.price)}</li>
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
              </li>
            </CardBody>
            <CardFooter>
              <Link to="/stock">
                <Button onClick={() => this.props.setCurrentStock(c.symbol, c)}>
                  Trade {c.symbol}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
<<<<<<< HEAD
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
=======
      <div className="container">
        {this.props.auth.isAuthenticated ? (
          <div className="account-container">
            <h3>
              <b>${fc(this.props.account.balance)}</b>
            </h3>
            <ProfitDisplay />
            <br />
            <Searchbar />
            <h3>Stocks</h3>
            {!isEmpty(this.props.currentPrices) &&
              this.renderStockList(this.props.stockList)}
          </div>

        ) : (<div />)}

        <div className="news-container">
          <News />
        </div>
>>>>>>> ac4c5dfd11176afffefd809f58f15ac3d61f2413
      </div>
    );
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
