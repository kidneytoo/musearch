import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import LoginModal from './LoginModal';
import Logo from '../../styles/img/logo.svg';

// import { Link } from 'react-router-dom';
class Header extends Component {
  state = {
    loginModalVisible: false
  };
  showModal = () => {
    this.setState({
      loginModalVisible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      loginModalVisible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      loginModalVisible: false
    });
  };

  render() {
    return (
      <div>
        <LoginModal
          loginModalVisible={this.state.loginModalVisible}
          handleOk={this.handleOk.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
        />
        <nav className="header-nav">
          <div className="header-container">
            <a className="logo">
              <img src={Logo} />
            </a>
            <div className="right">
              <Button type="primary" onClick={this.showModal}>
                SIGN IN
              </Button>
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
