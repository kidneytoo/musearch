import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import ArtistCard from '../blocks/ArtistCard';

class AMProfilePage extends Component {
  render() {
    if (!this.props.auth.tel) return <Redirect to="/" />;
    return (
      <div className="am-profile-page">
        <h3>Your Artist</h3>
        {this.props.auth.artist.map((data, idx) => {
          return <ArtistCard key={idx} data={data} />;
        })}
        <NavLink className="add-artist" to="/artistRegister">
          Add Artist
        </NavLink>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  null
)(AMProfilePage);
