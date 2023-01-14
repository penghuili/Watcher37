import { Button, Heading, Spinner, Text } from 'grommet';
import React from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import { formatDateTime } from '../../lib/date';

function Home({ account, isLoadingAccount, onLogOut, onDelete }) {
  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>
        {isLoadingAccount && <Spinner />}
        {!!account?.userId && (
          <>
            <Heading level="2">{`Hi ${account.username}`}</Heading>
            <Text>Created at {formatDateTime(account.createdAt)}</Text>
            {!!account.telegramId && (
              <Text>
                Telegram integration: <Link to="/account/telegram">{account.telegramId}</Link>
              </Text>
            )}
            <Link to="/account/password">Change password</Link>

            <Button label="Log out" onClick={onLogOut} margin="2rem 0 0" />
            <Button label="Delete account" onClick={onDelete} margin="1rem 0 0" />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Home;
