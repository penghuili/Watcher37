import { Anchor, Button, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import Payment from '../Account/components/Payment';

function Tickets({ payError, isLoading, onPay }) {
  const [code, setCode] = useState('');

  return (
    <>
      <AppBar title="Buy tickets" hasBack />
      <ContentWrapper>
        <Text>You can try Watcher37 for free for 14 days.</Text>
        <Text margin="0 0 1rem">After that, it's only $29 / year.</Text>

        <Divider />

        <Spacer />
        <Payment showBuyButton={false} />
        <Divider />

        <Text margin="1rem 0 0">
          You can buy ticket at my{' '}
          <Anchor label="ko-fi" href="https://ko-fi.com/penghuili/shop" target="_blank" /> shop.
        </Text>
        <Text>
          (I only created 5 tickets for now,{' '}
          <Anchor label="let me know" href="mailto:peng@duck.com" target="_blank" /> if sold out)
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
