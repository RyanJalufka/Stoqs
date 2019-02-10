import React, { Component } from "react";
import { Input } from "antd";
import StockCard from "../StockCard";
import API_KEY from "../../Utils/keys";
const alpha = require("alphavantage")({ key: API_KEY });

const Search = Input.Search;

//maybe just put this stuff in global state?? idk fuck

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
    let value = this.state.value;
    alpha.data.quote(value).then(data => {
      const polished = alpha.util.polish(data);
      console.log(polished);
      this.setState({ cardData: polished });
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
