import { Text } from 'grommet';
import React from 'react';
import { useLocation } from 'wouter';

import RouteLink from '../shared/react/RouteLink';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <Text>
        Get notified when web pages change, <RouteLink label="encrytped" to="/encryption" />.
      </Text>
      {showHome && location !== '/' && <RouteLink label="Home" to="/" />}
    </>
  );
}

export default Pitch;
