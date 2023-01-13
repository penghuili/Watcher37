import { Box, Heading, Spinner, Text } from 'grommet';
import { LinkUp, Refresh, Trash } from 'grommet-icons';
import React from 'react';

import { formatDateTime } from '../../../../lib/date';

function WatcherHistory({
  watcher,
  isChecking,
  isLoading,
  isDeleting,
  onCheckWatcher,
  onDeleteItem,
}) {
  return (
    <>
      <Box align="center" direction="row" margin="2rem 0 0.5rem">
        <Heading level="4" margin="0 1rem 0 0">
          History
        </Heading>
        {isChecking ? <Spinner /> : <Refresh onClick={() => onCheckWatcher(watcher.sortKey)} />}
      </Box>

      {(watcher.history || []).map((item, index) => (
        <Box key={item.sortKey}>
          {index !== 0 && <LinkUp />}
          <Text>
            {item.content}{' '}
            {!isLoading && (
              <Trash
                onClick={() => {
                  if (!isDeleting) {
                    onDeleteItem(watcher.sortKey, item.sortKey);
                  }
                }}
                size="small"
              />
            )}
          </Text>
          <Text>Created at: {formatDateTime(item.createdAt)}</Text>
        </Box>
      ))}
    </>
  );
}

export default WatcherHistory;
