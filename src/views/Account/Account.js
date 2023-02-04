import { Spinner, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ChangeTheme from '../../components/ChangeTheme';
import ContentWrapper from '../../components/ContentWrapper';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';
import { formatDate, formatDateTime } from '../../lib/date';

function Home({ account, expiresAt, isLoadingAccount }) {
  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>
        {isLoadingAccount && <Spinner />}
        {!!account?.userId && (
          <>
            <Text margin="0 0 1rem">Username: {account.username}</Text>
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

            <ChangeTheme />

            <Spacer size="3rem" />
            <RouteLink label="Security" to="/security" />
            <Spacer />
            <RouteLink label="How it works?" to="/how" />
            <Spacer />
            <RouteLink label="Limitations" to="/limitations" />
            <Spacer />
            <RouteLink label="How encryption works?" to="/encryption" />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Home;
