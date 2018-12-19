import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <Search
          placeholder="URL"
          onSearch={this.props.handleSearch}
          enterButton
        />
      </div>
    );
  }
}

export default SearchBar;
