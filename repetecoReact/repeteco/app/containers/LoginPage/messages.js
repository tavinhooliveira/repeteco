/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.LoginPage.header',
    defaultMessage: 'This is LoginPage container !',
  },
  loginTitle: {
    id: 'app.containers.loginPane.loginTitle',
    defaultMessage: 'Vamos La!',
  },
  loginDescriptionMessage: {
    id: 'app.containers.loginPane.loginDescriptionMessage',
    defaultMessage: 'Para Entrar! é Obrigatório o login no Facebook!',
  },
  loginUserName: {
    id: 'app.containers.loginPane.username',
    defaultMessage: '<a href={perfillink}>{name}</a>',
  },
  loginUserFacebookDescription: {
    id: 'app.containers.loginPane.userfacebookdescription',
    defaultMessage: 'Você tem {number_friend_in_app} amigos no APP de {friends_total} no facebook!',
  },
});
