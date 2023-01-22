import { Anchor, Box, Heading, Spinner, Text } from 'grommet';
import { Link, Next, Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import RouteLink from '../../components/RouteLink';
import { formatDateTime } from '../../lib/date';

function Watchers({ watchers, isLoading, isChecking, onFetch, onCheckWatcher }) {
  const [checkId, setCheckId] = useState();

  useEffect(() => {
    onFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Watchers" />
      <ContentWrapper>
        <RouteLink to="/w/add" label="Create watcher" />

        <Box margin="1rem 0">
          {isLoading && <Spinner />}
          {!isLoading && <Refresh onClick={onFetch} />}
        </Box>

        {watchers.map(watcher => (
          <Box key={watcher.sortKey} margin="0 0 2rem" align="start">
            <Heading level="4" margin="0">
              {watcher.title}{' '}
              {watcher.isNew && (
                <Text color="status-critical" size="small">
                  NEW
                </Text>
              )}
            </Heading>
            {!!watcher.gotValueAt && (
              <Text size="xsmall">{formatDateTime(watcher.gotValueAt)}</Text>
            )}
            {watcher.contentLink ? (
              <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
            ) : (
              <Text>{watcher.content}</Text>
            )}

            <Box direction="row" align="center" margin="0.25rem 0 0">
              {isChecking && checkId === watcher.sortKey ? (
                <Spinner size="xsmall" />
              ) : (
                <Refresh
                  onClick={() => {
                    setCheckId(watcher.sortKey);
                    onCheckWatcher(watcher.sortKey);
                  }}
                />
              )}
              <Anchor href={watcher.link} label={<Link />} target="_blank" margin="0 1rem" />
              <RouteLink to={`/w/${watcher.sortKey}`} label={<Next />} />
              <Box width="1rem" />
            </Box>
          </Box>
        ))}

        {!watchers?.length && !isLoading && <Text>No watchers.</Text>}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
