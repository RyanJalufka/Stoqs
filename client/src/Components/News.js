import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

class News extends Component {

  renderNewsList(array) {
    return _.map(array, c => {
      return (
        <li key={c.url}>
            <h6>
              <i>{c.headline}</i>
            </h6>
          <p>{(c.source)}</p>
        </li>
      );
    });
  }

  render() {

    let newsArray = [];

    const vals = Object.keys(this.props.news).map(key => this.props.news[key]);

    for(let i = 0; i < vals.length; i++) {
      for(let j = 0; j < vals[i].news.length; j++) {
        newsArray.push(vals[i].news[j]);
      }
    }

    return(
      <div>
        <h3>News</h3>
        {this.props.news &&
        <ul>
          {this.renderNewsList(newsArray)}
        </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  }
}

export default connect(mapStateToProps)(News)