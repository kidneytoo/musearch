import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../blocks/RegistrationForm';
class register extends Component {
  render() {
    return <Register />;
  }
}
export default connect()(register);
