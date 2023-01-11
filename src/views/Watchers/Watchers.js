import { format } from 'date-fns';
import { Anchor, Box, Heading, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useEffect } from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function Watchers({ watchers, isLoading, onFetch }) {
  useEffect(() => {
    onFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Watchers" />
      <ContentWrapper>
        <Link to="/watchers/add">Create watcher</Link>

        <Box margin="1rem 0">
          {isLoading && <Spinner />}
          {!isLoading && <Refresh onClick={onFetch} />}
        </Box>

        {watchers.map(watcher => (
          <Box key={watcher.sortKey} margin="0 0 2rem" align="start">
            {!!watcher.title && (
              <Heading level="4" margin="0">
                {watcher.title}
              </Heading>
            )}

            <Text wordBreak="break-word">
              Link: <Anchor href={watcher.link} label={watcher.link} target="_blank" />
            </Text>

            <Text>Selector: {watcher.selector}</Text>

            <Text>Content: {watcher.content}</Text>

            {!!watcher.checkedAt && <Text>Check date: {format(watcher.checkedAt, 'Pp')}</Text>}

            <Link to={`/watchers/${watcher.sortKey}`}>Details</Link>
          </Box>
        ))}

        {!watchers?.length && !isLoading && <Text>No watchers.</Text>}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
