import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../Chart';
// import { Link } from "react-router-dom";
import { Button } from "react-materialize";
import fc from 'format-currency';
// import _ from 'lodash';
// import isEmpty from 'is-empty';
 import { buyNewStock } from "../../Actions/accountAction";
import { setUserStocklist } from "../../Actions/authAction";
import { ClipLoader } from 'react-spinners';
import "../styles/stockpage.css"


class StockPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      ownedStockStats: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount = () => {
    console.log("STOCKPAGE PROPS: ", this.props);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  } 


  handleSubmit = (event) => {

    const purchasedStock = {
      symbol: this.props.currentStock.symbol,
      shares: this.state.value,
      price: this.props.currentStock.latestPrice,
      cost: (this.state.value * this.props.currentStock.latestPrice),
      owner: this.props.auth.user.id
    }

    let owned = false;
    let ownedStockId;

    for(let i = 0; i < this.props.stockList.length; i++) {
      if(this.props.currentStock.symbol === this.props.stockList[i].symbol)
      {
        owned = true;
        ownedStockId = this.props.stockList[i]._id
        console.log('THERE IS A MATCH: ', ownedStockId);
      } 
    }

      if(owned === false) {
        this.props.buyNewStock(purchasedStock, this.props.account.balance);
        //this.props.history.push("/dashboard");
      } else {
        console.log('updating existing stock...')
      }

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {

     if(this.props.currentStock.loading) {
      return (
      <div className="cliploader">
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={'#36D7B7'}
          loading={true}
        /> 
      </div>);
    } else {

      let chart = this.props.currentStock.chart;
      
          let dates = [];
          let prices = [];
          for(let i = 0; i < this.props.currentStock.chart.length; i++) {
            dates.push(chart[i].label);
            prices.push(chart[i].close);
          }
          console.log("prices: ", prices)

    return(

      <div>
        <h3>{this.props.currentStock.quote.companyName}</h3>
        <h4>${fc(this.props.currentStock.quote.latestPrice)}</h4>
        <div className="chart-container">
          <Chart 
            dates={dates}
            prices={prices} />
        </div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Shares Owned: {this.props.currentStock.shares}</p>
          <p>Average Cost: ${fc(this.props.currentStock.cost / this.props.currentStock.shares)} per share</p>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <Button type="submit" value="Submit">Buy</Button>
          <p>${fc(this.props.account.balance)} buying power</p>
        </form>
      </div>
      </div>
    );
  }
}}

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
    currentStock: state.currentStock,
    chart: state.currentStock.chart
  };
};

export default connect(mapStateToProps, { buyNewStock, setUserStocklist })(StockPage);