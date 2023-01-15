import { Avatar, Box, Header, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

import logo from '../../assets/logo.png';

function AppBar({ title, hasBack, isLoggedIn, onBack, onNavToAccount }) {
  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }} justify="between">
        <Box direction="row" justify="start" align="center">
          {hasBack ? <Previous onClick={onBack} /> : <Avatar src={logo} size="32px" />}
          <Text size="large" margin="0 0 0 1rem">{title}</Text>
        </Box>
        {isLoggedIn && !hasBack && <User onClick={onNavToAccount} />}
      </Header>
    </>
  );
}

export default AppBar;
