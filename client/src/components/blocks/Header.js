import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown, Icon } from 'antd';
import LoginModal from './LoginModal';
import Logo from '../../styles/img/logo.svg';
import { NavLink } from 'react-router-dom';
import * as actions from '../../actions';

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

  renderDropdown = () => {
    return (
      <Menu className="account-menu">
        <Menu.Item>
          <NavLink to={`/amProfile`}>View Profile</NavLink>
        </Menu.Item>
        <Menu.Item>
          <a href="/api/logout">Logout</a>
        </Menu.Item>
      </Menu>
    );
  };

  componentDidMount() {
    this.props.fetchUser();
  }

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
            <NavLink className="logo" to="/">
              <img src={Logo} />
            </NavLink>
            <div className="right">
              <ul className="menu-item">
                <li>
                  <NavLink className="menu" to="/artist">
                    ARTIST
                  </NavLink>
                </li>
              </ul>
              {!this.props.auth ? (
                <Button className="sign-in-button" onClick={this.showModal}>
                  SIGN IN
                </Button>
              ) : this.props.auth.tel ? (
                <Dropdown overlay={this.renderDropdown()} trigger={['click']}>
                  <div className="user-icon">
                    <Icon type="user" className="icon" />
                  </div>
                </Dropdown>
              ) : (
                <a href="api/logout">Logout</a>
              )}
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
export default connect(
  mapStateToProps,
  actions
)(Header);
