import { Anchor, Box, Button, Heading, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';

import RouteLink from '../../../../components/RouteLink';

function OwnTelegram({ watcherId, telegramId, skipped, onEdit }) {
  return (
    <>
      <Box direction="row" align="center">
        <Heading level="5" margin="0.25rem 1rem 0 0">
          Integrate your own Telegram
        </Heading>
        {!!telegramId && <Checkmark color="status-ok" />}
        {skipped ? (
          <Button
            label="DISABLED"
            onClick={() => onEdit(watcherId, { skipPersonalTelegram: false })}
            size="xsmall"
            margin="0 0.5rem"
          />
        ) : (
          <Button
            label="ENABLED"
            onClick={() => onEdit(watcherId, { skipPersonalTelegram: true })}
            size="xsmall"
            margin="0 0.5rem"
          />
        )}
      </Box>
      {skipped ? (
        <Text size="small">
          The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />{' '}
          will NOT send a message to{' '}
          <Text weight="bold" size="small">
            You
          </Text>{' '}
          because this is disabled.
        </Text>
      ) : (
        <Text size="small">
          The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />{' '}
          will send a message to{' '}
          <Text weight="bold" size="small">
            You
          </Text>{' '}
          when this watcher gets new content.
        </Text>
      )}
      {telegramId ? (
        <Text>
          Your Telegram ID: <RouteLink to="/account/telegram" label={telegramId} />
        </Text>
      ) : (
        <Text>
          Follow <RouteLink to="/account/telegram" label="this guide" /> to integrate your own
          Telegram account.
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
          <Text>
            Your Telegram channel ID:{' '}
            <RouteLink to={`/w/${watcherId}/telegram`} label={telegramId} />
          </Text>
          <Text>Your Telegram channel name: {telegramTitle}</Text>
        </>
      ) : (
        <Text>
          Follow <RouteLink to={`/w/${watcherId}/telegram`} label="this guide" /> to integrate a
          Telegram channel.
        </Text>
      )}
    </>
  );
}

function WatcherTelegram({ watcher, accountTelegramId, isLoadingAccount, onEdit }) {
  if (!watcher || isLoadingAccount) {
    return null;
  }

  return (
    <>
      <Heading level="4" margin="2rem 0 0">
        Integrate Telegram
      </Heading>
      <OwnTelegram
        watcherId={watcher.sortKey}
        telegramId={accountTelegramId}
        skipped={watcher.skipPersonalTelegram}
        onEdit={onEdit}
      />
      <SpecificTelegram
        watcherId={watcher.sortKey}
        telegramId={watcher.telegramId}
        telegramTitle={watcher.telegramTitle}
      />
    </>
  );
}

export default WatcherTelegram;
