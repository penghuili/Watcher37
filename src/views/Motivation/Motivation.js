import { Anchor, Heading, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import ExampleWatchers from '../../components/ExampleWatchers';
import Spacer from '../../components/Spacer';

function Motivation() {
  return (
    <>
      <AppBar title="How everything starts?" hasBack />
      <ContentWrapper>
        <Heading level="3" margin="0">
          The story:
        </Heading>
        <Text margin="0.5rem 0 0">
          Early this year, I went to a small city in Germany to ski, but unfortunately it was too
          warm, there was no snow.
        </Text>
        <Text margin="0.5rem 0 0">
          On top of the ski website, there is a banner, giving updates about the status.
        </Text>
        <Text margin="0.5rem 0 0">
          But there is no option to subscribe to the updates, for example with email.
        </Text>
        <Text margin="0.5rem 0 0">So I checked the website everyday for several days.</Text>
        <Text margin="0.5rem 0 0">
          Then an idea came to my mind: I can build a bot that checks the website everyday for me,
          and send me an email whenever the status changes.
        </Text>
        <Text margin="0.5rem 0 0">
          That's how PageWatcher starts. (In the end I used Telegram, not email, for notification.)
        </Text>
        <Text margin="0.5rem 0 0">
          And this is the{' '}
          <Anchor
            label="website"
            href="https://www.wurmberg-seilbahn.de/start-winter.html"
            target="_blank"
          />
          , and the watcher:{' '}
          <Anchor label="Ski in Braunlage" href="/w/z6fb0huCWg2" target="_blank" />, you will see a
          history of the updates :)
        </Text>

        <Spacer />
        <Divider />
        <Spacer />

        <Text margin="0.5rem 0 0">
          Many websites give the option to subscribe websites updates, like Youtube, Twitter, Github
          etc.
        </Text>
        <Text margin="0.5rem 0 0">
          But a lot more websites don't. If you want to know if there is something new, you need to
          open the site and check it yourself.
        </Text>
        <Text margin="0.5rem 0 0">PageWatcher can help.</Text>

        <Text margin="1rem 0 0">
          See how PageWatcher works <Anchor label="here" href="/how" target="_blank" />.
        </Text>

        <Spacer />
        <Divider />

        <ExampleWatchers />
      </ContentWrapper>
    </>
  );
}

export default Motivation;
