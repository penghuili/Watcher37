import { Anchor, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';

import Bot from '../../../../components/Bot';
import HorizontalCenter from '../../../../components/HorizontalCenter';
import RouteLink from '../../../../components/RouteLink';

function OwnTelegram({ watcherId, telegramId, skipped, onNavigate, onEdit }) {
  return (
    <>
      <HorizontalCenter>
        <Heading level="5" margin="0.25rem 1rem 0 0">
          1. Notify yourself
        </Heading>
        <Menu
          icon={<MoreVertical size="small" />}
          items={[
            {
              label: 'Update',
              onClick: () => onNavigate('/account/telegram'),
              margin: '0.25rem 0',
            },
            skipped
              ? {
                  label: 'Unmute',
                  onClick: () => onEdit(watcherId, { skipPersonalTelegram: false }),
                  margin: '0.25rem 0',
                }
              : {
                  label: 'Mute',
                  onClick: () => onEdit(watcherId, { skipPersonalTelegram: true }),
                  margin: '0.25rem 0',
                },
          ]}
        />
      </HorizontalCenter>
      {telegramId ? (
        skipped ? (
          <Text size="small">
            <Bot size="small" /> will NOT notify you. It is muted.
          </Text>
        ) : (
          <Text size="small">
            <Bot size="small" /> will notify you.
          </Text>
        )
      ) : (
        <Text size="small">
          Follow <RouteLink to="/account/telegram" label="this guide" size="small" /> to integrate
          your Telegram account.
        </Text>
      )}
    </>
  );
}

function SpecificTelegram({ telegram, watcherId, onNavigate }) {
  const integrated = !!telegram;

  return (
    <>
      <HorizontalCenter>
        <Heading level="5" margin="0.5rem 1rem 0 0">
          2. Notify a channel
        </Heading>
        <Menu
          icon={<MoreVertical size="small" />}
          items={[
            {
              label: 'Update',
              onClick: () => onNavigate(`/w/${watcherId}/telegram`),
              margin: '0.25rem 0',
            },
          ]}
        />
      </HorizontalCenter>
      {integrated ? (
        <>
          <Text size="small">
            <Bot size="small" /> will notify the{' '}
            <Text size="small" weight="bold">
              {telegram.title}
            </Text>{' '}
            channel.
          </Text>
          {telegram.username ? (
            <Text size="small">
              This is a public channel.{' '}
              <Anchor label="Join" href={`https://t.me/${telegram.username}`} target="_blank" />
            </Text>
          ) : (
            <Text size="small">This is a private channel.</Text>
          )}
        </>
      ) : (
        <Text size="small">
          Follow <RouteLink to={`/w/${watcherId}/telegram`} label="this guide" size="small" /> to
          integrate a Telegram channel.
        </Text>
      )}
      <Text size="small">Anyone in the channel will get notified.</Text>
    </>
  );
}

function WatcherTelegram({ watcher, accountTelegramId, isLoadingAccount, onNavigate, onEdit }) {
  if (!watcher || isLoadingAccount) {
    return null;
  }

  return (
    <>
      <Heading level="4" margin="2rem 0 0">
        Integrate Telegram
      </Heading>
      <Text> Get a Telegram message when this watcher gets new content.</Text>
      <OwnTelegram
        watcherId={watcher.sortKey}
        telegramId={accountTelegramId}
        skipped={watcher.skipPersonalTelegram}
        onNavigate={onNavigate}
        onEdit={onEdit}
      />
      <SpecificTelegram
        watcherId={watcher.sortKey}
        telegram={watcher.telegram}
        onNavigate={onNavigate}
      />
    </>
  );
}

export default WatcherTelegram;
