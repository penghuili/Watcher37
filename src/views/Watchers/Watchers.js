import { Box, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import WatcherItem from '../../components/WatcherItem';

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
        <Link to="/w/add">Create watcher</Link>

        <Box margin="1rem 0">
          {isLoading && <Spinner />}
          {!isLoading && <Refresh onClick={onFetch} />}
        </Box>

        {watchers.map(watcher => (
          <Box key={watcher.sortKey} margin="0 0 2rem" align="start">
            <WatcherItem watcher={watcher} />

            <Box direction="row" align="center">
              <Link to={`/w/${watcher.sortKey}`}>Details</Link>
              <Box width="1rem" />
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
