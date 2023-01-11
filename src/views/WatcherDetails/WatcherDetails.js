import { format } from 'date-fns';
import { Anchor, Box, Button, Heading, Spinner, Text, TextInput } from 'grommet';
import { LinkUp, Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import ScheduleSelector from './components/ScheduleSelector';

function WatcherDetails({
  params: { id },
  watcher,
  isLoading,
  isChecking,
  telegramId,
  isLoadingAccount,
  onFetchWatcher,
  onCheckWatcher,
  onDeleteSchedule,
  onDelete,
  onEdit,
  onAddTelegramId,
}) {
  const [newTelegramId, setNewTelegramId] = useState('');

  useEffect(() => {
    onFetchWatcher(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Watcher details" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}
        {!!watcher && (
          <Box align="start" margin="0 0 2rem">
            {!!watcher.title && (
              <Heading level="4" margin="1rem 0 0">
                {watcher.title}
              </Heading>
            )}
            <Text wordBreak="break-word">
              Link: <Anchor href={watcher.link} label={watcher.link} target="_blank" />
            </Text>
            <Text>Selector: {watcher.selector}</Text>
            <Text>Latest content: {watcher.content}</Text>
            <Text>Update date: {format(watcher.updatedAt || watcher.createdAt, 'Pp')}</Text>
            <Box direction="row" margin="0 0 24px">
              <Button label="Edit watcher" onClick={() => onEdit(id)} margin="0 1rem 0 0" />
              <Button label="Delete watcher" onClick={() => onDelete(id)} />
            </Box>

            <Box margin="0 0 24px">
              <Heading level="4" margin="1rem 0 0">
                Checking schedule
              </Heading>
              {!!watcher?.event?.schedule && (
                <>
                  <Text>{watcher.event.schedule}</Text>
                  <Button label="Delete schedule" onClick={() => onDeleteSchedule(id)} />
                </>
              )}

              {!watcher?.event?.schedule && <ScheduleSelector id={id} />}

              {!telegramId && (
                <>
                  <Heading level="4" margin="1rem 0 0">
                    Integrate Telegram
                  </Heading>
                  <Box margin="1rem 0">
                    <TextInput
                      placeholder="Telegram id"
                      value={newTelegramId}
                      onChange={event => setNewTelegramId(event.target.value)}
                    />

                    <Button
                      label="Add telegram id"
                      onClick={() => onAddTelegramId(newTelegramId)}
                      disabled={!newTelegramId || isLoadingAccount}
                    />
                  </Box>
                </>
              )}
            </Box>

            <Box align="center" direction="row" margin="1rem 0 0.5rem">
              <Heading level="4" margin="0 1rem 0 0">
                History
              </Heading>
              <Refresh onClick={() => onCheckWatcher(id)} />
            </Box>

            {!!watcher.checkedAt && (
              <Text margin="0 0 1rem">Latest check time: {format(watcher.checkedAt, 'Pp')}</Text>
            )}

            {isChecking && <Spinner />}
            {(watcher.history || []).map((item, index) => (
              <Box key={item.sortKey}>
                {index !== 0 && <LinkUp />}
                <Text>{item.content}</Text>

                <Text>Check time: {format(item.createdAt, 'Pp')}</Text>
              </Box>
            ))}
          </Box>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherDetails;
