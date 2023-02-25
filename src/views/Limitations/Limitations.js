import { Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import RouteLink from '../../shared/react/RouteLink';

function Limitations() {
  return (
    <>
      <AppBar title="Limitations of Watcher37" hasBack />
      <ContentWrapper>
        <Text>Watcher37 can fetch content from a lot of websites, but not all. Including:</Text>

        <Text margin="1rem 0 0">
          1. Websites that don't return the full HTML. Like Youtube, Twitter, Medium etc.
        </Text>

        <Text margin="1rem 0 0">2. Websites that need to login.</Text>

        <Text margin="1rem 0 0">
          You can find why in <RouteLink label="How it works?" to="/how" />
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Limitations;
