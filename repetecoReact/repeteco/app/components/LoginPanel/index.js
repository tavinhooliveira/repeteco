/**
*
* LoginPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import LoginIn from './LoginIn';
import Logged from './Logged';

function LoginPanel(props) {
  const { isLogged } = props;
  return (<div>{isLogged ? <Logged {...props} /> : <LoginIn {...props} /> }</div>);
}

LoginPanel.propTypes = {
  isLogged: PropTypes.bool,
};

export default LoginPanel;
