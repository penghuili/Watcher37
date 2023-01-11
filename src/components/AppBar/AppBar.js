import { Box, Header, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

function AppBar({ title, hasBack, onBack, onNavToAccount }) {
  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }} justify="between">
        <Box direction="row" justify="start">
          {hasBack && <Previous onClick={onBack} />}
          <Text size="large">{title}</Text>
        </Box>
        <User onClick={onNavToAccount} />
      </Header>
    </>
  );
}

export default AppBar;
