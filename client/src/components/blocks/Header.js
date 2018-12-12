import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import LoginModal from './LoginModal';

// import { Link } from 'react-router-dom';
class Header extends Component {
  state = {
    loginModalVisible: false
  };

  render() {
    return (
      <div>
        <LoginModal />
        <nav className="header-nav">
          <div className="header-container">
            <a className="logo">Musearch</a>
            <div className="right">
              <Button>Login</Button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
