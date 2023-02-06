import { Spinner, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ChangeTheme from '../../components/ChangeTheme';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';
import { formatDateTime } from '../../lib/date';
import Payment from './components/Payment';

function Home({ account, isLoadingAccount }) {
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
            <Payment />

            <Divider />
            <Spacer />

            {!!account.telegramId && (
              <Text margin="0 0 1rem">
                Telegram ID: <RouteLink to="/account/telegram" label={account.telegramId} />
              </Text>
            )}

            <ChangeTheme />

            <Divider />
            <Spacer />

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
