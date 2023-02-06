import { Anchor, Button, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import ExpiredTag from '../../components/ExpiredTag';
import HorizontalCenter from '../../components/HorizontalCenter';
import InputField from '../../components/InputField';
import { formatDate } from '../../lib/date';

function Tickets({ payError, expiresAt, isAccountValid, isLoading, onPay }) {
  const [code, setCode] = useState('');

  return (
    <>
      <AppBar title="Buy tickets" hasBack />
      <ContentWrapper>
        <Text>You can try PageWatcher for free for 14 days.</Text>
        <Text margin="0 0 1rem">After that, it's $29 / year.</Text>

        <Divider />

        {!!expiresAt && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Text color={isAccountValid ? 'status-ok' : 'status-warning'} margin="0 0.5rem 0 0">
                You account expires on: {formatDate(new Date(expiresAt))}
              </Text>
              <ExpiredTag />
            </HorizontalCenter>
            <Divider />
          </>
        )}

        <Text margin="1rem 0 0">
          You can buy ticket at my{' '}
          <Anchor label="ko-fi" href="https://ko-fi.com/penghuili/shop" target="_blank" /> shop.
        </Text>

        <Text margin="1rem 0 0">You will get a code in a txt file after payment.</Text>
        <Text margin="0 0 1rem">Apply the code below.</Text>

        <InputField label="1 year ticket code:" value={code} onChange={setCode} />
        {!!payError && <Text color="status-error">{payError}</Text>}
        <Button
          label="Apply"
          onClick={() => onPay(code)}
          disabled={!code || isLoading}
          margin="1rem 0 0"
        />
      </ContentWrapper>
    </>
  );
}

export default Tickets;
