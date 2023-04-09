import { Anchor, Text } from 'grommet';
import React from 'react';

import { contactEmail } from '../../shared/js/constants';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import AppBar from '../../shared/react/AppBar';

function Terms() {
  return (
    <>
      <AppBar title="Terms" hasBack />
      <ContentWrapper>
        <Text>1. You can try Watcher37 14 days for free;</Text>

        <Text margin="1rem 0 0">2. You can buy tickets to continue using Watcher37;</Text>

        <Text margin="1rem 0 0">
          3. After your account is expired, you can't create new watchers, you can't update or
          delete existing watchers, Watcher37 will also stop checking the websites in the
          background. You can still view your watchers;
        </Text>

        <Text margin="1rem 0 0">4. After a payment is made, it won't be possible to refund;</Text>

        <Text margin="1rem 0 0">
          Contact me for anything:{' '}
          <Anchor label={contactEmail} href={`mailto:${contactEmail}`} target="_blank" />
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Terms;
