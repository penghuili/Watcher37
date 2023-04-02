import { Box, Button, Heading, Spinner, Text } from 'grommet';
import { Refresh, Trash } from 'grommet-icons';
import React, { useState } from 'react';

import { WatcherContentsInner } from '../../../../components/WatcherContents';
import { formatDateTime } from '../../../../shared/js/date';
import HorizontalCenter from '../../../../shared/react/HorizontalCenter';

function WatcherHistory({
  canEdit,
  watcher,
  history,
  hasMore,
  isLoadingHistory,
  isChecking,
  isDeleting,
  onCheckWatcher,
  onFetchHistory,
  onDeleteItem,
}) {
  const [currentId, setCurrentId] = useState('');

  return (
    <>
      <HorizontalCenter margin="2rem 0 0.5rem">
        <Heading level="4" margin="0 1rem 0 0">
          History
        </Heading>
        {canEdit && (
          <Box margin="0 1rem 0 0">
            {isChecking ? <Spinner /> : <Refresh onClick={() => onCheckWatcher(watcher.sid)} />}
          </Box>
        )}
        {!!watcher.checkedAt && <Text size="xsmall">{formatDateTime(watcher.checkedAt)}</Text>}
      </HorizontalCenter>

      {(history || []).map(item => (
        <Box key={item.sortKey} border="bottom" pad="1rem 0">
          <HorizontalCenter>
            <Text size="xsmall" margin="0 1rem 0 0">
              {formatDateTime(item.createdAt)}
            </Text>
            {canEdit &&
              (isDeleting && currentId === item.sortKey ? (
                <Spinner size="small" />
              ) : (
                <Trash
                  onClick={() => {
                    setCurrentId(item.sortKey);
                    onDeleteItem(watcher.sortKey, item.sortKey);
                  }}
                  size="small"
                />
              ))}
          </HorizontalCenter>

          <WatcherContentsInner contents={item.contents} />
        </Box>
      ))}

      {!history?.length && !isLoadingHistory && <Text>No history yet.</Text>}

      {!!hasMore && !isLoadingHistory && (
        <Button label="Load more" onClick={() => onFetchHistory(watcher.sid)} margin="1rem 0 0" />
      )}
      {isLoadingHistory && <Spinner size="small" margin="1rem 0 0" />}
    </>
  );
}

export default WatcherHistory;
