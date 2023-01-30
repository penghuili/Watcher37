import { Anchor, Box, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import HorizontalCenter from '../../components/HorizontalCenter';
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

        <Divider />

        {watchers.map(watcher => (
          <Box key={watcher.sid} margin="0 0 2rem">
            <HorizontalCenter margin="1rem 0 0">
              <Text>
                <RouteLink to={`/w/${watcher.sid}`} label={watcher.title} />
                {watcher.isNew && (
                  <Text color="status-critical" size="small" margin="0 0 0 1rem">
                    NEW
                  </Text>
                )}
              </Text>
            </HorizontalCenter>
            <HorizontalCenter>
              {!!watcher.gotValueAt && (
                <Text size="xsmall" margin="0 0.5rem 0 0">
                  {formatDateTime(watcher.gotValueAt)}
                </Text>
              )}
            </HorizontalCenter>

            {watcher.contentLink ? (
              <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
            ) : (
              <Text>{watcher.content}</Text>
            )}

            {isChecking && checkId === watcher.sid ? (
              <Spinner size="xsmall" />
            ) : (
              <Refresh
                size="18px"
                onClick={() => {
                  setCheckId(watcher.sid);
                  onCheckWatcher(watcher.sid);
                }}
                hoverIndicator
              />
            )}
          </Box>
        ))}

        {!watchers?.length && !isLoading && <Text>No watchers.</Text>}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
