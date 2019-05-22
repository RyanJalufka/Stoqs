import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentStock } from "../../Actions/stockAction";
import { Redirect, withRouter } from "react-router-dom";
import { Autocomplete, Button, Row } from "react-materialize";
import API_KEY from "../../Utils/keys";
//import symbols from "../../Utils/symbols.json";
import "../styles/searchbar.css";
const alpha = require("alphavantage")({ key: API_KEY });

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      cardData: [],
      renderStockCard: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let value = this.state.value;
    this.props.setCurrentStock(value);
    this.props.history.push("/stock");
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{display: "inline-flex", paddingTop: "4vh"}}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        <Button type="submit" value="Submit">Search</Button>
      </form>

      // <div>
      //   <Row>
      //   <Autocomplete title="stock" data={ symbols } limit="5"/>
      //   </Row>
      //   <Button waves='light'>button</Button>
      // </div>

    );
  }
}

export default withRouter(
  connect(
    null,
    { setCurrentStock }
  )(SearchBar)
);
