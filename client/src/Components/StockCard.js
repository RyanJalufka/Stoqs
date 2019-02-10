import React, { Component } from "react";
import { connect } from "react-redux";

class StockCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{this.props.data.symbol}</h1>
        <h1>{this.props.data.price}</h1>
      </div>
    );
  }
}

export default StockCard;
