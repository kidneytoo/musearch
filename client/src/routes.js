import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/blocks/Header';
import register from './components/pages/register';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Header} />
    <Route path="/register" component={register} />
  </Switch>
);

export default Routes;
