import { Anchor, Box, Header, PageContent, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';
import { Link } from 'wouter';

function Watchers({ watchers, isLoading, onEnter }) {
  useEffect(() => {
    onEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Watchers</Text>
      </Header>
      <PageContent>
        <Link to="/watchers/add">Create watcher</Link>

        {isLoading && <Spinner />}
        {watchers.map(watcher => (
          <Box key={watcher.sortKey}>
            <Text>
              Link: <Anchor href={watcher.link} label={watcher.link} target="_blank" />
            </Text>

            <Text>Selector: {watcher.selector}</Text>

            <Text>Content: {watcher.content}</Text>

            <Link to={`/watchers/${watcher.sortKey}`}>Details</Link>
          </Box>
        ))}
        {!watchers?.length && <Text>No watchers.</Text>}
      </PageContent>
    </>
  );
}

export default Watchers;
