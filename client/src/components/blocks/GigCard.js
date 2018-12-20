import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class GigCard extends Component {
  render() {
    return (
      <NavLink className="gig-card-link" to={`/post/${this.props.data._id}`}>
        <div className="gig-card-container">
          <div className="left">
            <h3>{this.props.data.topic}</h3>
            {this.props.data.artist[0].name ? (
              <p>By {this.props.data.artist[0].name}</p>
            ) : null}
          </div>
          <div className="right">
            <p>{moment(this.props.data.date[0]).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default GigCard;
