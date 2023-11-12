import { Anchor, Box, Heading } from 'grommet';
import React from 'react';

function ExampleWatchers() {
  return (
    <>
      <Heading level="4" margin="0 0 0.5rem">
        Check some public watchers:
      </Heading>
      <Box direction="row" wrap>
        <Anchor
          label="Ski in Braunlage"
          href="/w/z6fb0huCWg2"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor
          label="Hacker News Top1"
          href="/w/osSaqppygsf"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor
          label="indiehackers Hacker"
          href="/w/ZdBLNoxHX8J"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor
          label="ETH Price"
          href="/w/l10wKJvjs89"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor
          label="imdb popular top 5"
          href="/w/dCh1xGXCcZ4"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor
          label="n-tv news"
          href="/w/LKpZKriJUem"
          target="_blank"
          margin="0 1.5rem 0.25rem 0"
        />
        <Anchor label="My Blog" href="/w/LrzSD8oJfAl" target="_blank" margin="0 1.5rem 0.25rem 0" />
      </Box>
    </>
  );
}

export default ExampleWatchers;
