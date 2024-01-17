import { addDays, format } from 'date-fns';
import { Box, Button, Select, Text } from 'grommet';
import React, { useMemo, useState } from 'react';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';

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

const timeHours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
const timeMinutes = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];

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
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('00');

  return (
    <>
      <Text margin="0 0 0.5rem">How often do you want the watcher to check the page?</Text>
      <HorizontalCenter>
        <Box width="36px">
          <Text size="small">Every</Text>
        </Box>
        <Select
          options={getOptionNumber(optionType.value)}
          value={num}
          onChange={({ option }) => setNum(option)}
          size="small"
          margin="0 0.5rem"
        />
        <Select
          options={scheduleOptions}
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
      {optionType.value === optionTypes.day && (
        <HorizontalCenter margin="0.5rem 0 0">
          <Box width="36px">
            <Text size="small">At</Text>
          </Box>
          <Select
            options={timeHours}
            value={hour}
            onChange={({ option }) => setHour(option)}
            size="small"
            margin="0 0.5rem"
          />
          <Select
            options={timeMinutes}
            labelKey="label"
            valueKey="value"
            value={minute}
            onChange={({ option }) => {
              setMinute(option);
            }}
            size="small"
          />
        </HorizontalCenter>
      )}
      <Box margin="0.5rem 0 0" direction="row">
        <Button
          label="Setup"
          onClick={() => {
            let cron = undefined;
            if (optionType.value === optionTypes.day) {
              const current = format(new Date(), 'kk:mm');
              const chosen = `${hour}:${minute}`;
              const date = current < chosen ? new Date() : addDays(new Date(), 1);
              const dateWithTime = new Date(
                `${format(date, 'yyyy-MM-dd')}T${chosen}`
              ).toISOString();
              cron = `cron(${+dateWithTime.slice(14, 16)} ${+dateWithTime.slice(
                11,
                13
              )} ${+dateWithTime.slice(8, 10)} ${+dateWithTime.slice(5, 7)} ? ${+dateWithTime.slice(
                0,
                4
              )})`;
            }
            onSchedule(
              id,
              `rate(${num} ${num > 1 ? `${optionType.value}s` : optionType.value})`,
              cron
            );
          }}
          primary
          color="brand"
          disabled={!num || !optionType || isLoading}
          margin="0 1rem 0 0"
        />
        {!!showCancel && <Button label="Cancel" onClick={onCancel} disabled={isLoading} />}
      </Box>
    </>
  );
}

export default ScheduleSelector;
