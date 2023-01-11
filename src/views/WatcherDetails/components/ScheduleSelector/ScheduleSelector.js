import { Box, Button, Select } from 'grommet';
import React, { useMemo, useState } from 'react';

const optionTypes = {
  minute: 'minute',
  hour: 'hour',
  day: 'day',
};

function getOptionNumber(optionType) {
  switch (optionType) {
    case optionTypes.minute:
      return [5, 15, 30];

    case optionTypes.hour:
      return [1, 5, 10];

    case optionTypes.day:
      return [1, 2, 7, 14, 30];

    default:
      return [];
  }
}

function ScheduleSelector({ id, onSchedule }) {
  const [num, setNum] = useState(1);
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
      <Box direction="row">
        <Select
          options={getOptionNumber(optionType.value)}
          value={num}
          onChange={({ option }) => setNum(option)}
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
            setNum(null);
          }}
        />

        <Button
          label="Schedule"
          onClick={() => onSchedule(id, `${num} ${num > 1 ? `${optionType.value}s` : optionType.value}`)}
          disabled={!num || !optionType}
          margin="0 0 0 1rem"
        />
      </Box>
    </>
  );
}

export default ScheduleSelector;
