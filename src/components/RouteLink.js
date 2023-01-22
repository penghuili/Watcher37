import { Anchor } from 'grommet';
import React from 'react';
import { Link } from 'wouter';

function RouteLink({ to, label }) {
  return (
    <Link to={to}>
      <Anchor label={label} />
    </Link>
  );
}

export default RouteLink;
