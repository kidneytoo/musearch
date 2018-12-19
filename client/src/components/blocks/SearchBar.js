import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }
  onInputChange(term) {
    this.setState({ term });
  }
  resetSearch = () => {
    this.setState({ term: '' });
  };

  render() {
    return (
      <div className="search-bar">
        <Search
          placeholder="URL"
          onSearch={value => {
            console.log('value', value);
            this.props.handleSearch(value);
            this.resetSearch();
          }}
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          enterButton
        />
      </div>
    );
  }
}

export default SearchBar;
