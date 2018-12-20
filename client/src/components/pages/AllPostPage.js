import React, { Component } from 'react';
import axios from 'axios';
import GigCard from '../blocks/GigCard';

class AllPostPage extends Component {
  state = {
    allPost: null
  };
  getAllPost = () => {
    return axios.get('http://localhost:5000/api/post').then(res => {
      this.setState({
        allPost: res.data
      });
    });
  };
  componentDidMount = () => {
    this.getAllPost();
  };
  render() {
    if (!this.state.allPost) return <div />;
    return (
      <div className="all-post-container">
        <h3>All Gigs</h3>
        {this.state.allPost.map((data, idx) => {
          return <GigCard key={idx} data={data} />;
        })}
      </div>
    );
  }
}

export default AllPostPage;
