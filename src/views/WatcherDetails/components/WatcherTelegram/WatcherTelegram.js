import { Anchor, Box, Heading, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';
import { Link } from 'wouter';

function OwnTelegram({ telegramId }) {
  return (
    <>
      <Box direction="row" align="center">
        <Heading level="5" margin="0.25rem 1rem 0 0">
          Integrate your own Telegram
        </Heading>
        {!!telegramId && <Checkmark color="status-ok" />}
      </Box>
      <Text size="small">
        The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" /> will
        send a message to{' '}
        <Text weight="bold" size="small">
          You
        </Text>{' '}
        when this watcher gets new content.
      </Text>
      {telegramId ? (
        <Text>Your Telegram ID: <Link to="/account/telegram">{telegramId}</Link></Text>
      ) : (
        <Text>
          Follow <Link to="/account/telegram">this guide</Link> to integrate your own Telegram
          account.
        </Text>
      )}
    </>
  );
}

function SpecificTelegram({ telegramId, telegramTitle, watcherId }) {
  const integrated = !!telegramId && !!telegramTitle;

  return (
    <>
      <Box direction="row" align="center">
        <Heading level="5" margin="0.25rem 1rem 0 0">
          Integrate a Telegram channel
        </Heading>
        {integrated && <Checkmark color="status-ok" />}
      </Box>
      <Text size="small">
        The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" /> will
        send a message to the{' '}
        <Text weight="bold" size="small">
          Telegram channel
        </Text>{' '}
        when this watcher gets new content.
      </Text>
      <Text size="small">Anyone in the channel will get notified.</Text>
      {integrated ? (
        <>
          <Text>Your Telegram channel ID: <Link to={`/watchers/${watcherId}/telegram`}>{telegramId}</Link></Text>
          <Text>Your Telegram channel name: {telegramTitle}</Text>
        </>
      ) : (
        <Text>
          Follow <Link to={`/watchers/${watcherId}/telegram`}>this guide</Link> to integrate a
          Telegram channel.
        </Text>
      )}
    </>
  );
}

function WatcherTelegram({ watcher, accountTelegramId, isLoadingAccount }) {
  if (!watcher || isLoadingAccount) {
    return null;
  }

  return (
    <>
      <Heading level="4" margin="2rem 0 0">
        Integrate Telegram
      </Heading>
      <OwnTelegram telegramId={accountTelegramId} />
      <SpecificTelegram
        telegramId={watcher.telegramId}
        telegramTitle={watcher.telegramTitle}
        watcherId={watcher.sortKey}
      />
    </>
  );
}

export default WatcherTelegram;
