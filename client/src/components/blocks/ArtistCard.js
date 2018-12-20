import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArtistCard extends Component {
  render() {
    return (
      <NavLink
        className="artist-card-link"
        to={`/artist/${this.props.data.url}`}
      >
        <div className="artist-card-container">
          <h3>{this.props.data.name}</h3>
          <p>{this.props.data.description}</p>
        </div>
      </NavLink>
    );
  }
}

export default ArtistCard;
