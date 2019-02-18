import React, { Component } from "react";
import API_KEY from "../../Utils/keys";
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
    let value = this.state.value;
    alpha.data.quote(value).then(data => {
      const polished = alpha.util.polish(data);
      console.log(polished);
      this.setState({ cardData: polished, value: "" });
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {

    return (
        <form onSubmit={this.handleSubmit} >
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          <input type="submit" value="Submit" />
        </form>
    );
  }
}

export default SearchBar;
