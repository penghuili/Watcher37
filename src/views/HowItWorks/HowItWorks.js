import { Anchor, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import ExampleWatchers from '../../components/ExampleWatchers';
import Pitch from '../../components/Pitch';

function HowItWorks() {
  return (
    <>
      <AppBar title="How it works?" hasBack />
      <ContentWrapper>
        <Pitch />

        <Text margin="3rem 0 0">
          1. PageWatcher makes a request to the link you define, and gets the HTML response.
        </Text>

        <Text margin="1rem 0 0">
          2. Then it uses{' '}
          <Anchor label="cheerio" href="https://github.com/cheeriojs/cheerio" target="_blank" /> to
          search within this HTML, for the content you are interested in, with the CSS selector you
          define.
        </Text>

        <Text margin="1rem 0 0">
          3. Then it will save the found content into database, end-to-end encrypted. Check how
          encnryption works <Anchor label="here" href="/encryption" target="_blank" />.
        </Text>

        <Text margin="1rem 0 0">
          4. If you setup a checking schedule, for example, "check the website every hour", then
          PageWatcher will do step 1 - 3 every hour for you in the background.
        </Text>

        <Text margin="1rem 0 0">
          5. If you integrate Telegram, it will send a message to you whenever it finds something
          new. It won't bother you if nothing is changed.
        </Text>

        <Text margin="1rem 0 0">
          6. If you integrate a Telegram channel, it will send a message to the channel, so everyone
          in that channel will get notified.
        </Text>

        <ExampleWatchers />
      </ContentWrapper>
    </>
  );
}

export default HowItWorks;