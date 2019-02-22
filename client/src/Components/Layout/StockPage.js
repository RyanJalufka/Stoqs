import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import fc from 'format-currency';
 import { buyNewStock } from "../../Actions/accountAction";
import { setUserStocklist } from "../../Actions/authAction";


class StockPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleSubmit = (event) => {
    console.log(
      "STOCK ORDER: \n", this.props.currentStock.symbol, this.state.value,
      this.props.currentStock.latestPrice,
      (this.state.value * this.props.currentStock.latestPrice),
      this.props.auth.user.id
    );

    const purchasedStock = {
      symbol: this.props.currentStock.symbol,
      shares: this.state.value,
      price: this.props.currentStock.latestPrice,
      cost: (this.state.value * this.props.currentStock.latestPrice),
      owner: this.props.auth.user.id
    }

    this.props.buyNewStock(purchasedStock, this.props.account.balance);

    this.props.history.push("/dashboard");

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div>
        <h3>{this.props.currentStock.companyName}</h3>
        <h3>${fc(this.props.currentStock.latestPrice)}</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

// symbol: currentStock.symbol
// shares: user input
// price: currentStock.iexAskPrice
// cost: (shares * price)
// owner: auth.user.id


const mapStateToProps = state => {
  return {
    auth: state.auth,
    account: state.account,
    stockList: state.account.stockList,
    currentStock: state.currentStock
  };
};

export default connect(mapStateToProps, { buyNewStock, setUserStocklist })(StockPage);