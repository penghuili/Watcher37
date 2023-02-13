import { Anchor, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function Privacy() {
  return (
    <>
      <AppBar title="Privacy" hasBack />
      <ContentWrapper>
        <Text>
          1. Watcher37 encrypts your data by default. You can check how encryption works{' '}
          <Anchor label="here" href="/encryption" target="_blank" />.
        </Text>

        <Text margin="1rem 0 0">2. Watcher37 has no tracking;</Text>

        <Text margin="1rem 0 0">
          3. Watcher37 doesn't sell third party ads, and it never sells your data. Watcher37 makes
          money through paid customers.
        </Text>

        <Text margin="1rem 0 0">4. Watcher37 doesn't save your payment info;</Text>

        <Text margin="1rem 0 0">
          5. If you integrate Telegram, for watchers that are decrypted, Watcher37 will send some
          watcher info to Telegram. The{' '}
          <Anchor label="encryption" href="/encryption" target="_blank" /> page explains this very
          well.
        </Text>

        <Text margin="1rem 0 0">
          Contact me for anything:{' '}
          <Anchor label="peng@duck.com" href="mailto:peng@duck.com" target="_blank" />
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Privacy;
