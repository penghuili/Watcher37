import { Box, Button, Spinner } from 'grommet';
import React, { useEffect } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import WatcherItem from '../../components/WatcherItem';
import WatcherHistory from './components/WatcherHistory';
import WatcherSchedule from './components/WatcherSchedule';
import WatcherTelegram from './components/WatcherTelegram';

function WatcherDetails({
  params: { id },
  watcher,
  isLoading,
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

            <WatcherSchedule watcher={watcher} />

            <WatcherTelegram watcher={watcher} />

            <WatcherHistory watcher={watcher} />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherDetails;
