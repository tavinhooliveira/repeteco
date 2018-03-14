/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LoginPanel from '../../components/LoginPanel';

import repetecoDefaultAvatar from '../../images/repeteco.png';
import bg from '../../images/bg.png';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      avatarImage: repetecoDefaultAvatar,
      logged: false,
      user: {
        name: 'arioston',
        link: 'google.com.br',
        friendInApp: 5,
        friends_total: 500,
      },
    };
  }
  render() {
    const {
      avatarImage,
      logged,
      user,
    } = this.state;
    return (
      <LoginPanel
        isLogged={logged}
        user={user}
        image={bg}
        avatarImage={avatarImage}
        messages={messages}
        banner={[() => (<p>Faça o Login e Confira: Repeteco APP</p>),
          () => (<div><p>e se você podesse classificar todos os seus amigos do Facebook?</p><br></br><p>Secretamente</p></div>),
          () => (<h1>que tal um Flash Backs ou um novo Lance com pessoas da sua bolha social</h1>)]
        }
      >
      </LoginPanel>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
