import React, { Component } from 'react';
import ArtistCard from '../blocks/ArtistCard';
import axios from 'axios';

class AllArtistPage extends Component {
  state = {
    allArtist: []
  };

  getAllArtist = () => {
    return axios.get('http://localhost:5000/api/artist').then(res => {
      this.setState({
        allArtist: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getAllArtist();
  };

  render() {
    return (
      <div className="all-artist-container">
        <h3>All Artist</h3>
        {this.state.allArtist.map((data, idx) => {
          return <ArtistCard key={idx} data={data} />;
        })}
      </div>
    );
  }
}

export default AllArtistPage;
