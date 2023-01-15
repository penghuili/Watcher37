import { Anchor, Box, Button, Heading, Spinner, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';

function IntegrateTelegramChannel({ id, watcher, isLoading, onFetch, onEdit }) {
  const [telegramId, setTelegramId] = useState('');
  useListener(watcher?.telegramId, value => setTelegramId(value || ''));

  useEffectOnce(onFetch);

  const hasTelegram = !!watcher?.telegramId && !!watcher?.telegramChannelTitle;

  return (
    <>
      <AppBar title="Integrate Telegram channel" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}

        {!!watcher && (
          <Heading level="3" margin="0 0 1rem">
            Watcher: {watcher.title}
          </Heading>
        )}

        <Text margin="0 0 1rem">
          The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />{' '}
          will send a message to the{' '}
          {hasTelegram ? (
            <>
              <Text weight="bold">{watcher.telegramChannelTitle}</Text> Telegram channel
            </>
          ) : (
            <Text weight="bold">Telegram channel</Text>
          )}{' '}
          when this watcher gets new content.
        </Text>

        <Heading level="4" margin="0">
          How to {hasTelegram ? 'update' : 'integrate'} Telegram channel:
        </Heading>
        <Text margin="0 0 0.5rem">
          1. Create a Telegram channel: Follow the{' '}
          <Anchor
            href="https://telegram.org/faq_channels#q-what-39s-a-channel"
            label="official guide"
            target="_blank"
          />
          ;
        </Text>
        <Text margin="0 0 0.5rem">
          2. Find the{' '}
          <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />:
          Search <Text weight="bold">p_watcher_bot</Text> in your Telegram, or open this link:{' '}
          <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />;
        </Text>
        <Text margin="0 0 0.5rem">
          3. Tap <Text weight="bold">Start</Text> at the bottom (The bot will send your Telegram ID,
          you can ignore this for now);
        </Text>
        <Text margin="0 0 0.5rem">
          4. Add <Text weight="bold">PageWatcherBot</Text> to your channel: Go to the{' '}
          <Text weight="bold">Info</Text> page of your channel, then add{' '}
          <Text weight="bold">PageWatcherBot</Text> as an <Text weight="bold">Administrator</Text>.
          Make sure to give it the <Text weight="bold">Post Messages</Text> permission, so the bot
          can send messages to this channel.
        </Text>
        <Text margin="0 0 0.5rem">
          5. Get the Telegram ID of your channel: Send a random message to your channel, then
          forward it to <Text weight="bold">PageWatcherBot</Text>. The bot will send you the ID of
          your channel.
        </Text>
        <Text margin="0 0 0.5rem">
          6. Add your channel&lsquo;s Telegram ID below (It may have a leading{' '}
          <Text weight="bold">-</Text>, also include it), and click{' '}
          <Text weight="bold">{hasTelegram ? 'Update' : 'Add'}</Text>.
        </Text>

        <TextInput
          placeholder="Telegram channel id"
          value={telegramId}
          onChange={event => setTelegramId(event.target.value)}
        />
        <Box direction="row" margin="1rem 0">
          <Button
            label={hasTelegram ? 'Update' : 'Add'}
            onClick={() => onEdit(id, { telegramId })}
            disabled={!telegramId || isLoading}
          />

          {hasTelegram && (
            <Button
              label="Remove Telegram"
              onClick={() =>
                onEdit(id, { telegramId: null, telegramTitle: null, telegramLink: null })
              }
              disabled={isLoading}
              color="status-critical"
              margin="0 0 0 1rem"
            />
          )}
        </Box>
      </ContentWrapper>
    </>
  );
}

export default IntegrateTelegramChannel;
