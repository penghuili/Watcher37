import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet';
import { Edit, Link, Trash } from 'grommet-icons';
import React, { useEffect } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import { formatDateTime } from '../../lib/date';
import WatcherHistory from './components/WatcherHistory';
import WatcherSchedule from './components/WatcherSchedule';
import WatcherTelegram from './components/WatcherTelegram';

function WatcherDetails({ params: { id }, watcher, isLoading, onFetchWatcher, onDelete, onEdit }) {
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
            <Heading level="4" margin="0">
              {watcher.title}
            </Heading>
            {!!watcher.gotValueAt && (
              <Text size="xsmall">{formatDateTime(watcher.gotValueAt)}</Text>
            )}
            <Box direction="row" align="center">
              <Button icon={<Link />} href={watcher.link} target="_blank" margin="0 1rem 0 0" />
              <Button icon={<Edit />} onClick={() => onEdit(id)} margin="0 1rem 0 0" />
              <Button icon={<Trash color="status-critical" />} onClick={() => onDelete(id)} margin="0 1rem 0 0" />
            </Box>

            <>
              {watcher.contentLink ? (
                <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
              ) : (
                <Text>{watcher.content}</Text>
              )}
            </>

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
