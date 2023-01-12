import { Box, Header, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

function AppBar({ title, hasBack, isLoggedIn, onBack, onNavToAccount }) {
  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }} justify="between">
        <Box direction="row" justify="start" align="center">
          {hasBack && <Previous onClick={onBack} />}
          <Text size="large">{title}</Text>
        </Box>
        {isLoggedIn && <User onClick={onNavToAccount} />}
      </Header>
    </>
  );
}

export default AppBar;
