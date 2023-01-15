import { Anchor, Box, Button, Heading, Spinner, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import { useListener } from '../../hooks/useListener';

function IntegrateTelegram({ isLoading, telegramId, onAddTelegramId }) {
  const [newTelegramId, setNewTelegramId] = useState(telegramId || '');
  useListener(telegramId, value => setNewTelegramId(value || ''));

  return (
    <>
      <AppBar title="Integrate Telegram" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}

        <Text margin="0 0 1rem">
          The <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />{' '}
          will send a message to <Text weight="bold">You</Text> when any watcher gets new content.
        </Text>

        <Heading level="4" margin="0">
          How to {telegramId ? 'update' : 'integrate'} Telegram:
        </Heading>
        <Text margin="0 0 0.5rem">
          1. Search <Text weight="bold">p_watcher_bot</Text> in your Telegram, or open this link:{' '}
          <Anchor href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />;
        </Text>
        <Text margin="0 0 0.5rem">
          2. Tap <Text weight="bold">Start</Text> at the bottom, or if you are already in the bot,
          send <Text weight="bold">/id</Text> and you will get a number (your Telegram ID);
        </Text>
        <Text>
          3. Add the Telegram ID below, and click{' '}
          <Text weight="bold">{telegramId ? 'Update' : 'Add'}</Text>.
        </Text>

        <TextInput
          placeholder="Telegram id"
          value={newTelegramId}
          onChange={event => setNewTelegramId(event.target.value)}
        />

        <Box direction="row" margin="1rem 0">
          <Button
            label={telegramId ? 'Update' : 'Add'}
            onClick={() => onAddTelegramId(newTelegramId)}
            disabled={!newTelegramId || isLoading}
          />

          {!!telegramId && (
            <Button
              label="Remove Telegram"
              onClick={() => onAddTelegramId(null)}
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

export default IntegrateTelegram;
