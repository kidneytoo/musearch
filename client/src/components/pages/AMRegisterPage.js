import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.tel} onChange={this.telChange} />
          <input value={this.state.password} onChange={this.passwordChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AMRegisterPage;
