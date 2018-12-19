import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import LoginModal from './LoginModal';
import bg from '../../dist/bg/1.jpg';
import * as actions from '../../actions';
import { compose, lifecycle } from 'recompose';

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
      <div
        className="App"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100vh'
        }}
      >
        <LoginModal
          loginModalVisible={this.state.loginModalVisible}
          handleOk={this.handleOk.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
        />
        <nav className="header-nav">
          <div className="header-container">
            <a className="logo">Musearch</a>
            <div className="right">
              <Button type="primary" onClick={this.showModal}>
                SIGN IN
              </Button>
            </div>
          </div>
        </nav>
        <div />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const enhance = compose(
  connect(
    mapStateToProps,
    actions
  ),

  lifecycle({
    componentDidMount() {
      this.props.fetchUser();
    }
  })
);
export default enhance(Header);
