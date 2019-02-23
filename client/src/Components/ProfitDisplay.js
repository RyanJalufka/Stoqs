import React, {Component} from 'react';
import { connect } from 'react-redux';
import fc from 'format-currency';


class ProfitDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profit: 0,
      currentPrices: {},
      style: ''
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentPrices !== this.props.currentPrices){ 
      this.addProfit();
    }
 }

  addProfit = () => {
    let object = this.props.currentPrices;
    let stockList = this.props.stockList;
    let totalValue = 0;
    
    Object.keys(object).map((objectKey, index) => {
      let currentValue = 0;
      currentValue = object[objectKey].quote.latestPrice;

      let shares = stockList.filter((stock) => {
        return stock.symbol === object[objectKey].quote.symbol;
      })
      
      totalValue += currentValue * shares[0].shares;
      
  });


  let totalCost = 0;
  for(let i = 0; i < stockList.length; i++) {
    totalCost += stockList[i].cost;

  }

  let profit = totalValue-totalCost;
  let style = '';
  let positive = '+';
  if(profit >= 0) { style = 'green' } else { style = 'red'; positive='-' };
  this.setState({ profit: profit, style: style });

  }

  render() {
    let positive = ''
    if(this.state.profit > 0) { positive = '+';}

    return(
      <div style={{ color: this.state.style}}>
        {positive}${fc(this.state.profit)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPrices: state.account.currentPrices,
    stockList: state.account.stockList
  }
}

export default connect(mapStateToProps)(ProfitDisplay);