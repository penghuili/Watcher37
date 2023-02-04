import { Avatar, Header, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

import logo from '../../assets/logo.png';
import HorizontalCenter from '../HorizontalCenter';

function AppBar({ title, hasBack, isLoggedIn, onBack, onNavToAccount }) {
  return (
    <>
      <Header pad="12px 16px" responsive={false} justify="between">
        <HorizontalCenter>
          {hasBack ? <Previous onClick={onBack} /> : <Avatar src={logo} size="32px" />}
          <Text size="large" margin="0 0 0 1rem">{title}</Text>
        </HorizontalCenter>
        {isLoggedIn && !hasBack && <User onClick={onNavToAccount} />}
      </Header>
    </>
  );
}

export default AppBar;
