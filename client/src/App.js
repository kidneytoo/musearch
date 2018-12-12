import React, { Component } from 'react';
import './styles/App.scss';
import bg from './dist/bg/1.jpg';
class App extends Component {
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
    );
  }
}

export default App;
