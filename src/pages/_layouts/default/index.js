import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Container } from 'react-bootstrap';
import { Wrapper } from './styles';
import { HeaderComponentUnsigned } from '../../../components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <HeaderComponentUnsigned />
      <Container>{children}</Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
