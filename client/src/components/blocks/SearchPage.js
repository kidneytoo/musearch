import _ from 'lodash';
import React, { Component } from 'react';

import SearchBar from './SearchBar';
import Results from './Results';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isSearch: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = value => {
    try {
      var video_id = value.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      this.setState({
        isSearch: true,
        urls: [...this.state.urls, video_id]
      });
    } catch (e) {
      console.log('Error');
    }
  };

  getVideoContent = () => {
    var videoContent = this.state.urls.map((item, id) => {
      return <Results videoId={item} />;
    });
    return videoContent;
  };

  render() {
    var videoContent = this.getVideoContent();

    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        <br />
        {this.state.isSearch ? videoContent : ''}
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
export default SearchPage;
