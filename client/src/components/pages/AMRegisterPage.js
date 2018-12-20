import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Input, Button, Icon } from 'antd';

class AMRegisterPage extends Component {
  state = {
    tel: '',
    password: '',
    isRegist: false
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
  handleSubmit = () => {
    let result = axios.post(`http://localhost:5000/api/register/`, {
      tel: this.state.tel,
      password: this.state.password
    });
    result.then(res => {
      this.setState({
        isRegist: true
      });
    });
  };

  render() {
    if (this.state.isRegist) return <Redirect to="/" />;
    return (
      <div className="am-register-container">
        <form onSubmit={this.handleSubmit}>
          <Input
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            className="input"
            placeholder={'Telephone'}
            value={this.state.tel}
            onChange={this.telChange}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder={'Password'}
            value={this.state.password}
            onChange={this.passwordChange}
          />
          <Button className="submit-button" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default AMRegisterPage;
