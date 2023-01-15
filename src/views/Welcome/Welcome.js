import { Avatar, Box, Heading } from 'grommet';
import React from 'react';
import { Link } from 'wouter';

import logo from '../../assets/logo.png';
import ContentWrapper from '../../components/ContentWrapper';
import Spacer from '../../components/Spacer';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <Box direction="row" align="center" margin="2rem 0">
          <Avatar src={logo} /> <Heading level="2" margin="0 0 0 1rem">Page Watcher</Heading>
        </Box>
        <Link to="/sign-up">Sign up</Link>
        <Spacer />
        <Link to="/sign-in">Sign in</Link>
      </ContentWrapper>
    </>
  );
}

export default Welcome;
