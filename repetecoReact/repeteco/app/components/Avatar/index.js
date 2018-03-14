/**
*
* Avatar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
`;

function Avatar({ image }) {
  return (
    <div>
      <Image src={image} />
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Avatar;
