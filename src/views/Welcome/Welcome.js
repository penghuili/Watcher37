import { Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import ContentWrapper from '../../components/ContentWrapper';
import HorizontalCenter from '../../components/HorizontalCenter';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0">
          <Avatar src={logo} /> <Heading level="2" margin="0 0 0 1rem">Page Watcher</Heading>
        </HorizontalCenter>
        <RouteLink to="/sign-up" label="Sign up" />
        <Spacer />
        <RouteLink to="/sign-in" label="Sign in" />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
