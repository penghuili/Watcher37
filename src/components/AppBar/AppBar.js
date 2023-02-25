import { Avatar, Header, Spinner, Text } from 'grommet';
import { Previous, User } from 'grommet-icons';
import React from 'react';

import logo from '../../assets/logo.png';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import ExpiredTag from '../ExpiredTag';

function AppBar({ title, isLoading, hasBack, isLoggedIn, onBack, onNav }) {
  const showUserIcon = isLoggedIn && !hasBack;

  return (
    <Header pad="12px 16px" responsive={false} justify="between">
      <HorizontalCenter>
        {hasBack ? <Previous onClick={onBack} /> : <Avatar src={logo} size="32px" />}
        <Text size="large" margin="0 0 0 1rem">
          {title}
        </Text>
        {!!isLoading && <Spinner margin="0 0 0 1rem" />}
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
