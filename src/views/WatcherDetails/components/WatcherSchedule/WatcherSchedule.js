import { Anchor, Box, Button, Heading, Text } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import React from 'react';

import ScheduleSelector from '../ScheduleSelector';

function CurrentSchedule({ sortKey, schedule, link, isEditing, onEdit, onDeleteSchedule }) {
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

  if (isEditing) {
    return <ScheduleSelector id={sortKey} showCancel />;
  }

  return (
    <>
      <Text>
        This watcher will check <Anchor href={link} label="the page" target="_blank" /> every{' '}
        {+num === 1 ? '' : `${num} `}
        {unit}.
      </Text>
      <Box direction="row" align="center">
        <Button icon={<Edit />} onClick={onEdit} />
        <Button
          icon={<Trash color="status-critical" />}
          onClick={() => onDeleteSchedule(sortKey)}
        />
      </Box>
    </>
  );
}

function WatcherSchedule({ watcher, isEditingSchedule, onEdit, onDeleteSchedule }) {
  return (
    <>
      <Heading level="4" margin="2rem 0 0">
        Checking schedule
      </Heading>
      {watcher?.event?.schedule ? (
        <CurrentSchedule
          sortKey={watcher.sortKey}
          schedule={watcher.event.schedule}
          link={watcher.link}
          isEditing={isEditingSchedule}
          onEdit={onEdit}
          onDeleteSchedule={onDeleteSchedule}
        />
      ) : (
        <ScheduleSelector id={watcher.sortKey} />
      )}
    </>
  );
}

export default WatcherSchedule;
