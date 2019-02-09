import React, { Component } from "react";
import { Input } from "antd";
import API_KEY from "../../Utils/keys";
const alpha = require("alphavantage")({ key: API_KEY });

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      cardData: [],
      renderStockCard: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(value) {
    alpha.data.quote(value).then(data => {
      const polished = alpha.util.polish(data);
      console.log(polished);
      this.setState({
        cardData: polished,
        renderStockCard: true,
        searchTerm: ""
      });
    });
  }

  // handleChange(e) {
  //   this.setState({searchTerm: e.target.value});
  // }

  render() {
    return (
      <div style={{ marginRight: "65%", marginLeft: "2.5%" }}>
        <Search
          placeholder="input search text"
          onSearch={value => this.handleFormSubmit(value)}
        />
      </div>
    );
  }
}

export default SearchBar;
