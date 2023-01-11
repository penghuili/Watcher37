import { PageHeader } from 'grommet';
import React from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function Welcome() {
  return (
    <>
      <AppBar title="Welcome" />

      <ContentWrapper>
        <PageHeader title="Welcome to page watcher!" />
        <Link to="/sign-up">Sign up</Link>
        <Link to="/sign-in">Sign in</Link>
      </ContentWrapper>
    </>
  );
}

export default Welcome;
