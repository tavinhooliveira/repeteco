/**
*
* NavBar
*
*/

import React from 'react';
import { Row } from 'antd';
import styled from 'styled-components';
import repetecoImg from '../../images/logo.png';

const Logo = styled.img`
  max-height: 50px;
  max-width: 100px;
  padding: 10px;
`;

const NavBarStyled = styled(Row)`
    background-color: #f8f8f8;
    border-color: #e7e7e7;
`;

function NavBar() {
  return (
    <NavBarStyled
      type="flex"
      justify="center"
    >
      <Logo src={repetecoImg} />
    </NavBarStyled>
  );
}

NavBar.propTypes = {

};

export default NavBar;
