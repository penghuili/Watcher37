import { Anchor, Heading, Menu, Text } from 'grommet';
import { Checkmark, MoreVertical } from 'grommet-icons';
import React from 'react';

import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import ScheduleSelector from '../ScheduleSelector';

function CurrentSchedule({ sid, schedule, link, isEditing }) {
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
    return <ScheduleSelector id={sid} showCancel />;
  }

  return (
    <Text>
      This watcher checks <Anchor href={link} label="the page" target="_blank" /> every{' '}
      {+num === 1 ? '' : `${num} `}
      {unit}.
    </Text>
  );
}

function WatcherSchedule({ watcher, canEdit, isEditingSchedule, onEdit, onDeleteSchedule }) {
  function renderSchedule() {
    if (watcher?.schedule) {
      return (
        <CurrentSchedule
          sid={watcher.sid}
          schedule={watcher.schedule}
          link={watcher.link}
          isEditing={isEditingSchedule}
        />
      );
    }

    return canEdit ? (
      <ScheduleSelector id={watcher.sid} />
    ) : (
      <Text>This watcher has no checking schedule.</Text>
    );
  }

  return (
    <>
      <HorizontalCenter margin="2rem 0 0">
        <Heading level="4" margin="0">
          {canEdit && !watcher?.schedule ? (
            <>
              <Text color="status-warning">TODO</Text>: Setup checking schedule
            </>
          ) : (
            'Checking schedule'
          )}
        </Heading>
        {!!watcher?.schedule && canEdit && (
          <Menu
            icon={<MoreVertical />}
            items={[
              {
                label: 'Edit',
                onClick: onEdit,
                margin: '0.25rem 0',
              },
              {
                label: 'Delete',
                color: 'status-critical',
                onClick: () => onDeleteSchedule(watcher.sid),
                margin: '0.25rem 0',
              },
            ]}
          />
        )}
        {canEdit && !!watcher?.schedule && <Checkmark color="status-ok" size="16px" />}
      </HorizontalCenter>

      {renderSchedule()}
    </>
  );
}

export default WatcherSchedule;
