import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Divider } from 'antd';
import { Link, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class LoginModal extends Component {
  state = {
    isLoggedIn: false,
    tel: '',
    password: '',
    failed: false,
    success: false
  };

  login = (tel, password) => {
    return axios
      .post('http://localhost:5000/api/login', { tel, password })
      .then(res => {
        this.props.fetchUserLogin(res.data);
      })
      .then(res => {
        this.setState({
          success: true
        });
      })
      .catch(e => {
        this.setState({
          failed: true
        });
      });
  };

  telChange = e => {
    this.setState({
      tel: e.target.value
    });
  };

  passwordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.login(this.state.tel, this.state.password);
  };
  render() {
    if (this.state.success) return <Redirect to="/" />;
    return (
      <Modal
        visible={this.props.loginModalVisible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >
        <h3>Login as User</h3>
        <a href="/auth/facebook">Login Facebook</a>
        <Divider> OR </Divider>
        <h3>Login as Artist Manager</h3>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem>
            <Input
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Telephone"
              value={this.state.tel}
              onChange={this.telChange}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.passwordChange}
            />
          </FormItem>
          <FormItem>
            <Button htmlType="submit">Sign in</Button>
          </FormItem>
        </Form>
        {this.state.failed ? <p>Failed</p> : null}
        <p>
          Not have an account?{' '}
          <NavLink to="/register" onClick={this.props.handleCancel}>
            Register
          </NavLink>
        </p>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(LoginModal);
