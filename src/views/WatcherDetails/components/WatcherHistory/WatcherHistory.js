import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet';
import { LinkUp, Refresh, Trash } from 'grommet-icons';
import React, { useState } from 'react';

import HorizontalCenter from '../../../../components/HorizontalCenter';
import { formatDateTime } from '../../../../lib/date';

function WatcherHistory({
  isOwner,
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
        {isOwner &&
          (isChecking ? <Spinner /> : <Refresh onClick={() => onCheckWatcher(watcher.sid)} />)}
        {!!watcher.checkedAt && (
          <Text size="xsmall" margin="0 0 0 1rem">
            {formatDateTime(watcher.checkedAt)}
          </Text>
        )}
      </HorizontalCenter>

      {(history || []).map((item, index) => (
        <Box key={item.sortKey}>
          {index !== 0 && <LinkUp />}
          <HorizontalCenter>
            <Text size="xsmall" margin="0 1rem 0 0">
              {formatDateTime(item.createdAt)}
            </Text>
            {isOwner &&
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

          {item.contentLink ? (
            <Anchor
              label={item.content}
              href={item.contentLink}
              target="_blank"
              margin="0 1rem 0 0"
            />
          ) : (
            <Text margin="0 1rem 0 0">{item.content}</Text>
          )}
        </Box>
      ))}

      {!!hasMore && (
        <Button label="Load more" onClick={() => onFetchHistory(watcher.sid)} margin="1rem 0 0" />
      )}
      {isLoadingHistory && <Spinner size="small" margin="1rem 0 0" />}
    </>
  );
}

export default WatcherHistory;
