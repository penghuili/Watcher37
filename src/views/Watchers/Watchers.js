import { Anchor, Box, Spinner, Text } from 'grommet';
import { Link, Refresh } from 'grommet-icons';
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
            <Box direction="row" align="center">
              <RouteLink to={`/w/${watcher.sortKey}`} label={watcher.title} />
              {watcher.isNew && (
                <Text color="status-critical" size="small" margin="0 0 0 1rem">
                  NEW
                </Text>
              )}
            </Box>

            {!!watcher.gotValueAt && (
              <Text size="xsmall">{formatDateTime(watcher.gotValueAt)}</Text>
            )}
            {watcher.contentLink ? (
              <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
            ) : (
              <Text>{watcher.content}</Text>
            )}

            <Box direction="row" align="center" margin="0.25rem 0 0">
              <Anchor href={watcher.link} label={<Link />} target="_blank" margin="0 1rem 0 0" />
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
            </Box>
          </Box>
        ))}

        {!watchers?.length && !isLoading && <Text>No watchers.</Text>}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
