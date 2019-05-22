import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, InfiniteScroll } from "grommet";
import "./styles/news.css";

import _ from "lodash";

class News extends Component {
  renderNewsList(array) {
       return (
        <Box height="medium" overflow="auto" elevation="medium" id="news-box">
          <InfiniteScroll items={array}>
            {item => (
              <Box
                id="news-item"
                flex={false}
                pad="medium">
                <a href={item.url} target="_blank" style={{color: 'white'}}>{item.headline}</a>
                <p style={{paddingLeft: "1%"}}> - {item.source}</p>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
       );
  }

  render() {
    let newsArray = [];

    const vals = Object.keys(this.props.news).map(key => this.props.news[key]);

    for (let i = 0; i < vals.length; i++) {
      for (let j = 0; j < vals[i].news.length; j++) {
        newsArray.push(vals[i].news[j]);
      }
    }

    return (
      <div>
        <h3>News</h3>
        {this.props.news && <ul>{this.renderNewsList(newsArray)}</ul>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  };
};

export default connect(mapStateToProps)(News);
