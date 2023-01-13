import { Anchor, Heading, Text } from 'grommet';
import React from 'react';

import { formatDateTime } from '../lib/date';

function WatcherItem({ watcher }) {
  return (
    <>
      {!!watcher.title && (
        <Heading level="4" margin="0">
          {watcher.title}
        </Heading>
      )}
      <Text wordBreak="break-word">
        Link: <Anchor href={watcher.link} label={watcher.link} target="_blank" />
      </Text>
      <Text>Selector: {watcher.selector}</Text>
      <Text>Content: {watcher.content}</Text>
      {!!watcher.gotValueAt && <Text>New content time: {formatDateTime(watcher.gotValueAt)}</Text>}
      {!!watcher.checkedAt && <Text>Check time: {formatDateTime(watcher.checkedAt)}</Text>}
    </>
  );
}

export default WatcherItem;
