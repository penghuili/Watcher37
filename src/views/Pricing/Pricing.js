import { Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import RouteLink from '../../components/RouteLink';
import ContentWrapper from '../../components/ContentWrapper';

function Pricing({ isLoggedIn }) {
  return (
    <>
      <AppBar title="Pricing" hasBack />
      <ContentWrapper>
        <Text>You can try Watcher37 for free for 14 days.</Text>
        <Text margin="0 0 1rem">After that, it's only $29 / year.</Text>

        <Text margin="0 0 1rem">
          You can buy tickets <RouteLink label="here" to="/tickets" />
          {!isLoggedIn ? ' after login' : ''}.
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Pricing;
