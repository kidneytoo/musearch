import React, { Component } from 'react';
import './styles/App.scss';
import 'antd/dist/antd.css';
import Header from './components/blocks/Header';
import { connect } from 'react-redux';
import * as actions from './actions';
import AMRegisterPage from './components/pages/AMRegisterPage';
import AllArtistPage from './components/pages/AllArtistPage';
import ArtistPage from './components/pages/ArtistPage';
import PostPage from './components/pages/PostPage';
import AllPostPage from './components/pages/AllPostPage';
import AMProfilePage from './components/pages/AMProfilePage';
import ArtistRegisterPage from './components/pages/ArtistRegisterPage';
import { Switch, Route, Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/register" render={() => <AMRegisterPage />} />
            <Route
              path="/artist/:url"
              render={props => <ArtistPage {...props} />}
            />
            <Route path="/artist" render={() => <AllArtistPage />} />
            <Route path="/amProfile" render={() => <AMProfilePage />} />
            <Route path="/post/:id" render={props => <PostPage {...props} />} />
            <Route
              path="/artistRegister"
              render={() => <ArtistRegisterPage />}
            />
            <Route exact path="/" render={() => <AllPostPage />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
