import { Anchor, Box, Button, Heading, Text, TextInput } from 'grommet';
import { Trash } from 'grommet-icons';
import React, { useMemo, useState } from 'react';
import Bot from '../../components/Bot';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function IntegrateTelegramChannel({
  id,
  watcher,
  telegramChannels,
  isLoading,
  onFetch,
  onFetchTelegramChannels,
  onEdit,
}) {
  const [telegramId, setTelegramId] = useState('');

  const telegramChannelsObj = useMemo(() => {
    return (telegramChannels || []).reduce((acc, c) => {
      acc[c.id] = c;
      return acc;
    }, {});
  }, [telegramChannels]);
  const selectedChannel = useMemo(
    () => telegramChannelsObj[watcher?.telegramId],
    [telegramChannelsObj, watcher?.telegramId]
  );

  useEffectOnce(() => {
    onFetch(id);
    onFetchTelegramChannels();
  });

  function renderChannels() {
    if (!telegramChannels?.length) {
      return null;
    }

    return (
      <>
        <Heading level="4" margin="0 0 0.5rem">
          Send messages to an existing channel:
        </Heading>
        <Box direction="row" wrap>
          {telegramChannels.map(c => {
            const isSelected = c.id.toString() === watcher?.telegramId;
            return (
              <Box key={c.id} direction="row">
                <Button
                  label={c.title}
                  plain
                  color={isSelected ? 'status-ok' : undefined}
                  margin={'0 1rem 0.5rem 0'}
                  onClick={() => {
                    if (isSelected) {
                      onEdit(id, { telegramId: null });
                    } else {
                      onEdit(id, { telegramId: c.id.toString() });
                    }
                  }}
                />
              </Box>
            );
          })}
        </Box>
        <Spacer />
        <Divider />
        <Spacer />
      </>
    );
  }

  return (
    <>
      <AppBar title="Integrate Telegram channel" hasBack isLoading={isLoading} />
      <ContentWrapper>
        {!!watcher && (
          <Heading level="3" margin="0 0 1rem">
            Watcher: {watcher.title}
          </Heading>
        )}

        <Text>
          <Bot /> can send a message to a Telegram channel when this watcher gets new content.
        </Text>
        {!!selectedChannel && (
          <>
            <Spacer />
            <Box direction="row" align="center">
              <Text>
                It sends to the <Text weight="bold">{selectedChannel?.title}</Text> channel
                currently.
              </Text>
              <Button
                icon={<Trash size="small" />}
                size="small"
                onClick={() => {
                  onEdit(id, { telegramId: null });
                }}
              />
            </Box>
          </>
        )}

        <Spacer />
        <Divider />
        <Spacer />

        {renderChannels()}

        <Heading level="4" margin="0 0 0.5rem">
          Send messages to a new channel:
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
          2. Find the <Bot />: Search <Text weight="bold">Watcher37Bot</Text> in your Telegram, or
          open this link: <Bot />;
        </Text>
        <Text margin="0 0 0.5rem">
          3. Tap <Text weight="bold">Start</Text> at the bottom, if you have not added the bot (The
          bot will send your Telegram ID, you can ignore this for now);
        </Text>
        <Text margin="0 0 0.5rem">
          4. Add <Text weight="bold">Watcher37Bot</Text> to your channel: Go to the{' '}
          <Text weight="bold">Info</Text> page of your channel, then add{' '}
          <Text weight="bold">Watcher37Bot</Text> as an <Text weight="bold">Administrator</Text>.
          Make sure to give it the <Text weight="bold">Post Messages</Text> permission, so the bot
          can send messages to this channel. (The bot will not do anything else.)
        </Text>
        <Text margin="0 0 0.5rem">
          5. Get the Telegram ID of your channel: Send a random message to{' '}
          <Text weight="bold">your channel</Text>, then forward it to{' '}
          <Text weight="bold">Watcher37Bot</Text>. The bot will send you the ID of your channel.
        </Text>
        <Text margin="0 0 0.5rem">
          6. Add your channel&lsquo;s Telegram ID below (It may have a leading{' '}
          <Text weight="bold">-</Text>, also include it), and click <Text weight="bold">Add</Text>.
        </Text>

        <TextInput
          placeholder="Telegram channel id"
          value={telegramId}
          onChange={event => setTelegramId(event.target.value)}
        />
        <Box direction="row" margin="1rem 0">
          <Button
            label="Add"
            onClick={() => onEdit(id, { telegramId })}
            color="brand"
            disabled={!telegramId || isLoading}
          />
        </Box>
      </ContentWrapper>
    </>
  );
}

export default IntegrateTelegramChannel;
