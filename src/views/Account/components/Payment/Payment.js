import { Button, Text } from 'grommet';
import React from 'react';

import ExpiredTag from '../../../../components/ExpiredTag';
import HorizontalCenter from '../../../../components/HorizontalCenter';
import { formatDate } from '../../../../lib/date';

function Payment({
  isLoading,
  expiresAt,
  tried,
  isAccountValid,
  showBuyButton,
  onTry,
  onNavigate,
}) {
  if (expiresAt) {
    return (
      <HorizontalCenter margin="0 0 1rem">
        <Text color={isAccountValid ? 'status-ok' : 'status-warning'} margin="0 0.5rem 0 0">
          Expires on: {formatDate(new Date(expiresAt))}
        </Text>
        <ExpiredTag />
        {showBuyButton && (
          <Button
            label="Buy ticket"
            onClick={() => onNavigate('/tickets')}
            size="small"
            margin="0 0 0 1rem"
          />
        )}
      </HorizontalCenter>
    );
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
