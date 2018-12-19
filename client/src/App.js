import React, { Component } from 'react';
import './styles/App.scss';
import 'antd/dist/antd.css';
import Header from './components/blocks/Header';
import { connect } from 'react-redux';
import * as actions from './actions';
import RegistrationForm from './components/blocks/RegistrationForm';
import SearchPage from './components/blocks/SearchPage';
import { Switch, Route, Redirect } from 'react-router-dom';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <div className="App">
          <Header />
        </div>
        <Switch>
          <Route path="/register" render={() => <RegistrationForm />} />
          <Route path="/search" render={() => <SearchPage />} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
