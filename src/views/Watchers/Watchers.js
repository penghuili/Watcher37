import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import ExampleWatchers from '../../components/ExampleWatchers';
import ExpiredBanner from '../../components/ExpiredBanner';
import HorizontalCenter from '../../components/HorizontalCenter';
import RouteLink from '../../components/RouteLink';
import WatcherAccess from '../../components/WatcherAccess';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { formatDateTime } from '../../lib/date';

function Watchers({
  watchers,
  isAccountValid,
  tried,
  isLoadingSettings,
  isLoading,
  isChecking,
  onFetch,
  onCheckWatcher,
  onTry,
}) {
  const [checkId, setCheckId] = useState();

  useEffectOnce(() => {
    onFetch(false);
  });

  return (
    <>
      <AppBar title="Watchers" />
      <ContentWrapper>
        <ExpiredBanner />

        {isAccountValid && <RouteLink to="/w/add" label="Create watcher" />}

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
            <Text margin="1rem 0 0">No watchers yet.</Text>

            <ExampleWatchers />

            {!tried && (
              <>
                <Heading level="4" margin="2rem 0 0.5rem">
                  Start 14 days of <Text color="status-ok">free</Text> trial to create your own
                  watchers
                </Heading>
                <Button label="Start" onClick={onTry} disabled={isLoadingSettings} />
                <Text margin="1rem 0 0">
                  Check pricing <RouteLink label="here" to="/pricing" />
                </Text>
              </>
            )}
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
