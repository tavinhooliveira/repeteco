/**
*
* Logged
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Carousel, Button } from 'antd';
import { FormattedHTMLMessage } from 'react-intl';

import Avatar from '../Avatar';

import { ContainerCss, PanelCss } from './css';

const Container = styled(Row)`${ContainerCss}`;
const Panel = styled(Col)`${PanelCss}`;

function Logged({ avatarImage, messages, banner, user }) {
  return (
    <Container>
      <Row
        type="flex"
        justify="center"
      >
        <Panel>
          <Avatar
            image={avatarImage}
          />
          <h3>
            <FormattedHTMLMessage
              {...messages.loginUserName}
              values={{ perfillink: user.link, name: user.name }}
            />
          </h3>
          <p>
            <FormattedHTMLMessage
              {...messages.loginUserFacebookDescription}
              values={{ number_friend_in_app: user.friendInApp, friends_total: user.friends_total }}
            />
          </p>
          <Button>Classificar</Button>
        </Panel>
      </Row>
      <Row
        type="flex"
        justify="space-around"
      >
        <Button>
          Como Funciona
        </Button>
      </Row>
    </Container>
  );
}

Logged.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  messages: PropTypes.any,
  user: PropTypes.object.isRequired,
  banner: PropTypes.arrayOf(PropTypes.func),
};

export default Logged;
