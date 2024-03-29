import { Anchor, Spinner, Text } from 'grommet';
import React from 'react';
import { apps } from '../../shared/js/apps';
import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import AppVersion from '../../shared/react/AppVersion';
import ChangeTheme from '../../shared/react/ChangeTheme';
import LogoutLink from '../../shared/react/LogoutLink';
import OneAccountForAll from '../../shared/react/OneAccountForAll';
import PaymentStatus from '../../shared/react/PaymentStatus';
import RouteLink from '../../shared/react/RouteLink';
import { encryptionUrl, privacyUrl, termsUrl } from '../../shared/react/initShared';

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
            <PaymentStatus app={apps.Watcher37.name} showBuyButton />
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
            <Anchor
              label="Motivation"
              href="https://encrypt37.com/watcher37/motivation/"
              target="_blank"
            />
            <Spacer />
            <Anchor
              label="How it works?"
              href="https://encrypt37.com/watcher37/how/"
              target="_blank"
            />
            <Spacer />
            <Anchor
              label="Limitations"
              href="https://encrypt37.com/watcher37/limitations/"
              target="_blank"
            />
            <Spacer />
            <Anchor label="Encryption" href={encryptionUrl} target="_blank" />
            <Spacer />
            <Anchor
              label="How to find selector?"
              href="https://encrypt37.com/watcher37/selectors/"
              target="_blank"
            />
            <Spacer />
            <Anchor
              label="Source code"
              href="https://github.com/penghuili/Watcher37"
              target="_blank"
            />
            <Spacer />
            <RouteLink label="Pricing" to="/pricing" />
            <Spacer />
            <RouteLink label="Buy tickets" to="/tickets" />
            <Spacer />
            <Anchor label="Privacy" href={privacyUrl} target="_blank" />
            <Spacer />
            <Anchor label="Terms" href={termsUrl} target="_blank" />
            <Spacer />
            <Anchor label="Contact" href="https://peng37.com/contact" target="_blank" />
            <Spacer />
            <Divider />
            <Spacer />
            <LogoutLink />
            <Spacer />
            <Divider />
            <Spacer />
            <OneAccountForAll app={apps.Watcher37.name} />
            <Spacer />
            <AppVersion />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Home;
