/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NavBar from 'components/NavBar';

export default function App() {
  return (
    <Row>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/homePage" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Row>
  );
}
