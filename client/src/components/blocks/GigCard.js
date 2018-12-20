import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class GigCard extends Component {
  render() {
    console.log(this.props.data);
    return (
      <NavLink className="gig-card-link" to={`/post/${this.props.data._id}`}>
        <div className="gig-card-container">
          <h3>{this.props.data.topic}</h3>
          {this.props.data.artist[0].name ? (
            <p>By {this.props.data.artist[0].name}</p>
          ) : null}
        </div>
      </NavLink>
    );
  }
}

export default GigCard;
