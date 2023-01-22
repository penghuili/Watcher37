import { Button, Heading, Spinner, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import RouteLink from '../../components/RouteLink';
import { formatDate, formatDateTime } from '../../lib/date';

function Home({ account, expiresAt, isLoadingAccount, onLogOut, onDelete }) {
  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>
        {isLoadingAccount && <Spinner />}
        {!!account?.userId && (
          <>
            <Heading level="2">{`Hi ${account.username}`}</Heading>
            <Text margin="0 0 1rem">User ID: {account.userId}</Text>
            <Text margin="0 0 1rem">Created at: {formatDateTime(account.createdAt)}</Text>
            {!!expiresAt && (
              <Text margin="0 0 1rem">Expires at: {formatDate(new Date(expiresAt))}</Text>
            )}
            {!!account.telegramId && (
              <Text margin="0 0 1rem">
                Telegram integration:{' '}
                <RouteLink to="/account/telegram" label={account.telegramId} />
              </Text>
            )}
            <RouteLink to="/account/password" label="Change password" />

            <Button label="Log out" onClick={onLogOut} margin="3rem 0 0" />
            <Button label="Delete account" onClick={onDelete} margin="1rem 0 0" />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Home;
