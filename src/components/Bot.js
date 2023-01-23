import { Anchor } from 'grommet';
import React from 'react';

function Bot({ size = 'medium' }) {
  return (
    <Anchor size={size} href="https://t.me/p_watcher_bot" label="PageWatcherBot" target="_blank" />
  );
}

export default Bot;
