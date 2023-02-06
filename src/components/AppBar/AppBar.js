import { Avatar, Header, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

import logo from '../../assets/logo.png';
import ExpiredTag from '../ExpiredTag';
import HorizontalCenter from '../HorizontalCenter';

function AppBar({ title, hasBack, isLoggedIn, onBack, onNav }) {
  const showUserIcon = isLoggedIn && !hasBack;

  return (
    <Header pad="12px 16px" responsive={false} justify="between">
      <HorizontalCenter>
        {hasBack ? <Previous onClick={onBack} /> : <Avatar src={logo} size="32px" />}
        <Text size="large" margin="0 0 0 1rem">
          {title}
        </Text>
      </HorizontalCenter>
      <HorizontalCenter>
        {isLoggedIn && (
          <Text margin={showUserIcon ? '0 1rem 0 0' : '0'}>
            <ExpiredTag />
          </Text>
        )}
        {showUserIcon && <User onClick={() => onNav('/account')} />}
      </HorizontalCenter>
    </Header>
  );
}

export default AppBar;
