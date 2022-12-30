import { Header, PageContent, PageHeader, Text } from 'grommet';
import React from 'react';

function About() {
  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">About</Text>
      </Header>
      <PageContent>
        <PageHeader title="Welcome to About!" />
      </PageContent>
    </>
  );
}

export default About;
