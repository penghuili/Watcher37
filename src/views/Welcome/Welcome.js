import { Header, PageContent, PageHeader, Text } from 'grommet';
import React from 'react';
import { Link } from 'wouter';

function Welcome() {
  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Welcome</Text>
      </Header>
      <PageContent>
        <PageHeader title="Welcome to Welcome!" />
        <Link to="/sign-up">Sign up</Link>
        <Link to="/sign-in">Sign in</Link>
      </PageContent>
    </>
  );
}

export default Welcome;
