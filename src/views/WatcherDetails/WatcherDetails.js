import { Anchor, Box, Heading, Menu, Spinner, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useEffect } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import HorizontalCenter from '../../components/HorizontalCenter';
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
            <HorizontalCenter>
              <Heading level="3" margin="0">
                {watcher.title}
              </Heading>
              <Menu
                icon={<MoreVertical />}
                items={[
                  { label: 'Link', href: watcher.link, target: '_blank', margin: '0.25rem 0' },
                  {
                    label: 'Edit',
                    onClick: () => onEdit(id),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    color: 'status-critical',
                    onClick: () => onDelete(id),
                    margin: '0.25rem 0',
                  },
                ]}
              />
            </HorizontalCenter>
            {!!watcher.gotValueAt && (
              <Text size="xsmall">{formatDateTime(watcher.gotValueAt)}</Text>
            )}
            <Text size="xsmall" wordBreak="break-word" margin="0 0 0.5rem">Selector: {watcher.selector}</Text>

            <Box pad="1rem" border={{ size: 'medium', style: 'ridge' }}>
              {watcher.contentLink ? (
                <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
              ) : (
                <Text>{watcher.content}</Text>
              )}
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
