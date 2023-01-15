import { Button, Heading, Text } from 'grommet';
import React from 'react';

import ScheduleSelector from '../ScheduleSelector';

function WatcherSchedule({ watcher, onDeleteSchedule }) {
  return (
    <>
      <Heading level="4" margin="0">
        Checking schedule
      </Heading>
      {!!watcher?.event?.schedule && (
        <>
          <Text>{watcher.event.schedule}</Text>
          <Button label="Delete schedule" onClick={() => onDeleteSchedule(watcher.sortKey)} />
        </>
      )}

      {!watcher?.event?.schedule && <ScheduleSelector id={watcher.sortKey} />}
    </>
  );
}

export default WatcherSchedule;
