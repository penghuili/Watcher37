import { Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import HorizontalCenter from '../../components/HorizontalCenter';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0">
          <Avatar src={logo} />{' '}
          <Heading level="2" margin="0 0 0 1rem">
            PageWatcher
          </Heading>
        </HorizontalCenter>
        <RouteLink to="/sign-up" label="Sign up" />
        <Spacer />
        <RouteLink to="/sign-in" label="Sign in" />
        <Spacer />
        <Divider />
        <Spacer />
        <RouteLink label="How it works?" to="/how" />
        <Spacer />
        <RouteLink label="Limitations" to="/limitations" />
        <Spacer />
        <RouteLink label="How encryption works?" to="/encryption" />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
