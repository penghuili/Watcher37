import { Anchor, Box, Heading, Spinner, Text } from 'grommet';
import { LinkUp, Refresh, Trash } from 'grommet-icons';
import React, { useState } from 'react';

import { formatDateTime } from '../../../../lib/date';

function WatcherHistory({ watcher, isChecking, isDeleting, onCheckWatcher, onDeleteItem }) {
  const [currentId, setCurrentId] = useState('');

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
          <Text>Created at: {formatDateTime(item.createdAt)}</Text>

          <Box direction="row" align="center">
            {item.contentLink ? (
              <Anchor label={item.content} href={item.contentLink} target="_blank" margin="0 1rem 0 0" />
            ) : (
              <Text margin="0 1rem 0 0">{item.content}</Text>
            )}

            {isDeleting && currentId === item.sortKey ? (
              <Spinner size="small" />
            ) : (
              <Trash
                onClick={() => {
                  setCurrentId(item.sortKey);
                  onDeleteItem(watcher.sortKey, item.sortKey);
                }}
                size="small"
              />
            )}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default WatcherHistory;
