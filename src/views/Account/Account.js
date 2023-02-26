import { Spinner, Text } from 'grommet';
import React from 'react';

import AppBar from '../../shared/react/AppBar';
import { formatDateTime } from '../../shared/js/date';
import ChangeTheme from '../../shared/react/ChangeTheme';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';
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
            <Payment showBuyButton />
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
            <Divider />
            <Spacer />
            <RouteLink label="Motivation" to="/motivation" />
            <Spacer />
            <RouteLink label="How it works?" to="/how" />
            <Spacer />
            <RouteLink label="Limitations" to="/limitations" />
            <Spacer />
            <RouteLink label="How encryption works?" to="/encryption" />
            <Spacer />
            <RouteLink label="How to find selector?" to="/selector" />
            <Spacer />
            <RouteLink label="Pricing" to="/pricing" />
            <Spacer />
            <RouteLink label="Privacy" to="/privacy" />
            <Spacer />
            <RouteLink label="Terms" to="/terms" />
            <Spacer />
            <RouteLink label="Contact" to="/contact" />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Home;
