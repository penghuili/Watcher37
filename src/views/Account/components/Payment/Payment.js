import { Button, Text } from 'grommet';
import React from 'react';
import HorizontalCenter from '../../../../components/HorizontalCenter';

import { formatDate } from '../../../../lib/date';

function Payment({ isLoading, expiresAt, tried, onTry }) {
  if (expiresAt) {
    return <Text margin="0 0 1rem">Expires at: {formatDate(new Date(expiresAt))}</Text>;
  }

  if (!tried) {
    return (
      <HorizontalCenter margin="0 0 1rem">
        <Text color="status-ok">Try 14 days for free</Text>
        <Button
          label="Start"
          onClick={onTry}
          disabled={isLoading}
          size="small"
          margin="0 0 0 1rem"
        />
      </HorizontalCenter>
    );
  }

  return null;
}

export default Payment;
