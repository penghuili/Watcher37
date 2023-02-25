import { Box, Button, Select, Text } from 'grommet';
import React, { useMemo, useState } from 'react';

import HorizontalCenter from '../../../../shared/react/HorizontalCenter';

const optionTypes = {
  minute: 'minute',
  hour: 'hour',
  day: 'day',
};

function getOptionNumber(optionType) {
  switch (optionType) {
    case optionTypes.minute:
      return [
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
        52, 53, 54, 55, 56, 57, 58, 59,
      ];

    case optionTypes.hour:
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    case optionTypes.day:
      return [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
        49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      ];

    default:
      return [];
  }
}

function ScheduleSelector({ isLoading, id, showCancel, onSchedule, onCancel }) {
  const [num, setNum] = useState(5);
  const scheduleOptions = useMemo(
    () => [
      { label: num > 1 ? 'days' : 'day', value: optionTypes.day },
      { label: num > 1 ? 'hours' : 'hour', value: optionTypes.hour },
      { label: num > 1 ? 'minutes' : 'minute', value: optionTypes.minute },
    ],
    [num]
  );
  const [optionType, setOptionType] = useState(scheduleOptions[0]);

  return (
    <>
      <Text margin="0 0 0.5rem">How often do you want the watcher to check the page?</Text>
      <HorizontalCenter>
        <Text size="small">Every</Text>
        <Select
          options={getOptionNumber(optionType.value)}
          value={num}
          onChange={({ option }) => setNum(option)}
          size="small"
          margin="0 0.5rem"
        />
        <Select
          options={[
            { label: num > 1 ? 'days' : 'day', value: optionTypes.day },
            { label: num > 1 ? 'hours' : 'hour', value: optionTypes.hour },
            { label: num > 1 ? 'minutes' : 'minute', value: optionTypes.minute },
          ]}
          labelKey="label"
          valueKey="value"
          value={optionType}
          onChange={({ option }) => {
            setOptionType(option);
            setNum(5);
          }}
          size="small"
        />
      </HorizontalCenter>
      <Box margin="0.5rem 0 0" direction="row">
        <Button
          label="Setup"
          onClick={() =>
            onSchedule(id, `${num} ${num > 1 ? `${optionType.value}s` : optionType.value}`)
          }
          disabled={!num || !optionType || isLoading}
          margin="0 1rem 0 0"
        />
        {!!showCancel && <Button label="Cancel" onClick={onCancel} disabled={isLoading} />}
      </Box>
    </>
  );
}

export default ScheduleSelector;
