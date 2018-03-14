/**
*
* LoginIn
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Carousel, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import Avatar from '../Avatar';

import { ContainerCss, PanelCss } from './css';

const Container = styled(Row)`${ContainerCss}`;
const Panel = styled(Col)`${PanelCss}`;

function LoginIn({ avatarImage, messages, banner }) {
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
            <FormattedMessage {...messages.loginTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.loginDescriptionMessage} />
          </p>
          <Button
            href="http://www.facebook.com/dialog/oauth?client_id=175578203007671&response_type=code&redirect_uri=http://localhost:8080/auth/login"
            type="primary"
          ><b> f    </b>Login Facebook</Button>
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
      <Row
        type="flex"
        justify="center"
      >
        <Col
          span={8}
        >
          <Carousel autoplay>
            {banner && banner.map((element, i) => (
              <div key={`banner_${i}`}>
                {element()}
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

LoginIn.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  messages: PropTypes.any,
  banner: PropTypes.arrayOf(PropTypes.func),
};

export default LoginIn;
