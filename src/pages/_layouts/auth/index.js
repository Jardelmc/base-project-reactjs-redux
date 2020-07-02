import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Container } from 'react-bootstrap';
import { Wrapper } from './styles';
import { HeaderComponentSigned } from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function AuthLayout({ children }) {
  return (
    <>
      <Wrapper>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        <HeaderComponentSigned />
        <Container style={{ maxWidth: '600px' }}>{children}</Container>
      </Wrapper>

      <br />
      <Footer />
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
