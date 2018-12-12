import React, { Component } from 'react';
import './styles/App.scss';
import bg from './dist/bg/1.jpg';
import 'antd/dist/antd.css';
import Header from './components/blocks/Header';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100vh'
        }}
      />
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
