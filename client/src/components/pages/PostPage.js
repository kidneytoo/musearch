import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class PostPage extends Component {
  state = {
    postInfo: null
  };
  getArtistInfo = () => {
    const id = this.props.match.params.id;
    return axios.get(`http://localhost:5000/api/post/${id}`).then(res => {
      this.setState({
        postInfo: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getArtistInfo();
  };

  render() {
    if (!this.state.postInfo) return <div />;
    return (
      <div className="post-page-container">
        <h3>{this.state.postInfo.topic}</h3>
        <p>By {this.state.postInfo.artist[0].name}</p>
        <p>{this.state.postInfo.description}</p>
        <p>{moment(this.state.postInfo.date[0]).format('DD/MM/YYYY')}</p>
        <div className="ticket-container">
          <p>
            {this.state.postInfo.tickets.cost.map(data => {
              return <span> {data} </span>;
            })}
          </p>
          <p>{this.state.postInfo.tickets.method}</p>
          <a href={this.state.postInfo.tickets.link}>
            {this.state.postInfo.tickets.link}
          </a>
        </div>
      </div>
    );
  }
}

export default PostPage;
