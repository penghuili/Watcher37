import { Anchor, Button, Spinner, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import { useListener } from '../../hooks/useListener';

function IntegrateTelegram({ isLoading, telegramId, onAddTelegramId }) {
  const [newTelegramId, setNewTelegramId] = useState(telegramId || '');
  useListener(telegramId, setNewTelegramId, value => value || '');

  return (
    <>
      <AppBar title="Integrate telegram" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <Text margin="0 0 0.5rem">
              1. Search <Text weight="bold">p_watcher_bot</Text> in your Telegram, or open this
              link:{' '}
              <Anchor href="https://t.me/p_watcher_bot" label="p_watcher_bot" target="_blank" />;
            </Text>
            <Text margin="0 0 0.5rem">
              2. {telegramId ? 'Type' : 'Tap'}{' '}
              {telegramId ? <Text weight="bold">/id</Text> : <Text weight="bold">Start</Text>} and
              you will get a number (your Telegram ID);
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
            <Button
              label={telegramId ? 'Update' : 'Add'}
              onClick={() => onAddTelegramId(newTelegramId)}
              disabled={!newTelegramId || isLoading}
              margin="1rem 0"
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default IntegrateTelegram;
