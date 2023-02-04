import { Anchor, Box, Heading, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import HorizontalCenter from '../../components/HorizontalCenter';
import RouteLink from '../../components/RouteLink';
import WatcherAccess from '../../components/WatcherAccess';
import { formatDateTime } from '../../lib/date';

function Watchers({ watchers, isLoading, isChecking, onFetch, onCheckWatcher }) {
  const [checkId, setCheckId] = useState();

  useEffect(() => {
    onFetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Watchers" />
      <ContentWrapper>
        <RouteLink to="/w/add" label="Create watcher" />

        <Box margin="1rem 0">
          {isLoading && <Spinner />}
          {!isLoading && <Refresh onClick={() => onFetch(true)} />}
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

              <WatcherAccess watcher={watcher} />
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
              />
            )}
          </Box>
        ))}

        {!watchers?.length && !isLoading && (
          <>
            <Text margin="1rem 0 0">No watchers.</Text>
            <Heading level="4" margin="1rem 0 0.5rem">
              Check some public watchers:
            </Heading>
            <Box direction="row" wrap>
              <Anchor
                label="Berlin Weather"
                href="/w/8U3nmNJWxBl"
                target="_blank"
                margin="0 1.5rem 0 0"
              />
              <Anchor
                label="ETH Price"
                href="/w/l10wKJvjs89"
                target="_blank"
                margin="0 1.5rem 0 0"
              />
              <Anchor
                label="Ski in Braunlage"
                href="/w/z6fb0huCWg2"
                target="_blank"
                margin="0 1.5rem 0 0"
              />
            </Box>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
