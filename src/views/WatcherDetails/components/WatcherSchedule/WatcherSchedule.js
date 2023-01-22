import { Anchor, Button, Heading, Text } from 'grommet';
import React from 'react';

import ScheduleSelector from '../ScheduleSelector';

function CurrentSchedule({ schedule, link }) {
  if (!schedule) {
    return null;
  }

  const value = /\(([^)]+)\)/.exec(schedule)?.[1];
  if (!value) {
    return value;
  }

  const parts = value.split(' ');
  if (parts?.length !== 2) {
    return null;
  }

  const num = parts[0];
  const unit = parts[1];

  return (
    <Text>
      This watcher will check <Anchor href={link} label="the page" target="_blank" /> every{' '}
      {+num === 1 ? '' : `${num} `}
      {unit}.
    </Text>
  );
}

function WatcherSchedule({ watcher, onDeleteSchedule }) {
  return (
    <>
      <Heading level="4" margin="0">
        Checking schedule
      </Heading>
      {!!watcher?.event?.schedule && (
        <>
          <CurrentSchedule schedule={watcher.event.schedule} link={watcher.link} />
          <Button label="Delete schedule" onClick={() => onDeleteSchedule(watcher.sortKey)} />
        </>
      )}

      {!watcher?.event?.schedule && <ScheduleSelector id={watcher.sortKey} />}
    </>
  );
}

export default WatcherSchedule;
