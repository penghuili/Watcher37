import { Anchor, Heading, Menu, Text } from 'grommet';
import { Checkmark, MoreVertical } from 'grommet-icons';
import React from 'react';

import Bot from '../../../../components/Bot';
import HorizontalCenter from '../../../../components/HorizontalCenter';
import RouteLink from '../../../../components/RouteLink';

function OwnTelegram({ isOwner, watcherId, telegramId, skipped, onNavigate, onEdit }) {
  if (!isOwner) {
    return null;
  }

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

        {isOwner && !!telegramId && <Checkmark color="status-ok" size="16px" />}
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

function TelegramChannel({ isOwner, telegram, watcherId, onNavigate }) {
  const integrated = !!telegram;

  return (
    <>
      <HorizontalCenter>
        <Heading level="5" margin="0.5rem 1rem 0 0">
          {isOwner ? '2. ' : ''}Notify a channel
        </Heading>

        {isOwner && (
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
        )}

        {isOwner && !!telegram && <Checkmark color="status-ok" size="16px" />}
      </HorizontalCenter>
      {integrated && (
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
      )}
      {!integrated && isOwner && (
        <Text size="small">
          Follow <RouteLink to={`/w/${watcherId}/telegram`} label="this guide" size="small" /> to
          integrate a Telegram channel.
        </Text>
      )}
      {!integrated && !isOwner && (
        <Text size="small">This watcher does not notify any Telegram channel.</Text>
      )}
      <Text size="small">Anyone in the channel will get notified.</Text>
    </>
  );
}

function WatcherTelegram({
  watcher,
  isOwner,
  accountTelegramId,
  isLoadingAccount,
  onNavigate,
  onEdit,
}) {
  if (!watcher || isLoadingAccount) {
    return null;
  }

  return (
    <>
      <Heading level="4" margin="2rem 0 0">
        {isOwner && !accountTelegramId && !watcher.telegram ? (
          <>
            <Text color="status-warning">TODO</Text>: Integrate Telegram
          </>
        ) : (
          'Integrate Telegram'
        )}
      </Heading>
      <Text>Get a Telegram message when this watcher gets new content.</Text>
      <OwnTelegram
        isOwner={isOwner}
        watcherId={watcher.sid}
        telegramId={accountTelegramId}
        skipped={watcher.skipPersonalTelegram}
        onNavigate={onNavigate}
        onEdit={onEdit}
      />
      <TelegramChannel
        isOwner={isOwner}
        watcherId={watcher.sid}
        telegram={watcher.telegram}
        onNavigate={onNavigate}
      />
    </>
  );
}

export default WatcherTelegram;
