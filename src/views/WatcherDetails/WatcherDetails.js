import { Box, Button, Heading, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import WatcherItem from '../../components/WatcherItem';
import Schedule from './components/Schedule';
import WatcherHistory from './components/WatcherHistory';

function WatcherDetails({
  params: { id },
  watcher,
  isLoading,
  telegramId,
  isLoadingAccount,
  onFetchWatcher,
  onDelete,
  onEdit,
}) {
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
          <>
            <WatcherItem watcher={watcher} />

            <Box direction="row" margin="0 0 2rem">
              <Button label="Edit watcher" onClick={() => onEdit(id)} margin="0 1rem 0 0" />
              <Button label="Delete watcher" onClick={() => onDelete(id)} />
            </Box>

            <Schedule watcher={watcher} />

            {!telegramId && !isLoadingAccount && (
              <>
                <Heading level="4" margin="2rem 0 0">
                  Integrate Telegram
                </Heading>
                <Text>
                  <Link to="/account/telegram">Integrate Telegram</Link> to get notifications when the page
                  content changes.
                </Text>
              </>
            )}

            <WatcherHistory watcher={watcher} />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherDetails;
