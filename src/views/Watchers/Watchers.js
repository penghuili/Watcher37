import { Box, Button, Heading, Spinner, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { useMemo, useState } from 'react';
import ExampleWatchers from '../../components/ExampleWatchers';
import ExpiredBanner from '../../components/ExpiredBanner';
import WatcherAccess from '../../components/WatcherAccess';
import { WatcherContentsInner } from '../../components/WatcherContents';
import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import RouteLink from '../../shared/react/RouteLink';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { getQueryParams, objectToQueryString } from '../../shared/react/routeHelpers';

function Watchers({
  watchers,
  telegramChannels,
  isAccountValid,
  tried,
  isLoadingSettings,
  isTrying,
  isLoading,
  isChecking,
  onFetch,
  onFetchTelegramChannels,
  onCheckWatcher,
  onTry,
  onNav,
}) {
  const [checkId, setCheckId] = useState();
  const [selectedTelegramChannelId, setSelectedTelegramChannelId] = useState();

  const innerWatchers = useMemo(() => {
    if (!selectedTelegramChannelId) {
      return watchers;
    }

    return watchers.filter(w => +w.telegramId === selectedTelegramChannelId);
  }, [watchers, selectedTelegramChannelId]);

  useEffectOnce(() => {
    onFetch(false);
    onFetchTelegramChannels();

    const queryParams = getQueryParams();
    setSelectedTelegramChannelId(+queryParams.telegramChannel);
  });

  function handleSelectChannel(channel) {
    const newChannelId = selectedTelegramChannelId === channel.id ? null : channel.id;
    setSelectedTelegramChannelId(newChannelId);

    const queryString =
      objectToQueryString({
        telegramChannel: newChannelId,
      }) || Date.now();
    onNav(`/?${queryString}`);
  }

  function renderTelegramChannels() {
    if (!telegramChannels?.length) {
      return null;
    }

    return (
      <>
        <Heading level="3" margin="0 0 0.5rem">Telegram channels</Heading>
        <Box direction="row" wrap>
          {telegramChannels.map(channel => (
            <Button
              key={channel.id}
              label={channel.title}
              plain
              onClick={() => handleSelectChannel(channel)}
              margin="0 1rem 0.5rem 0"
              color={selectedTelegramChannelId === channel.id ? 'brand' : undefined}
            />
          ))}
        </Box>
      </>
    );
  }

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
        <Spacer />

        {renderTelegramChannels()}

        {innerWatchers.map(watcher => (
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

            <WatcherContentsInner contents={watcher.contents} />

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

        {!watchers?.length && !isLoading && !isLoadingSettings && (
          <>
            {tried && <Text margin="1rem 0 0">No watchers yet.</Text>}

            <Spacer />
            <ExampleWatchers />

            {!tried && (
              <>
                <Heading level="4" margin="2rem 0 0.5rem">
                  Start 14 days of <Text color="status-ok">free</Text> trial to create your own
                  watchers.
                </Heading>
                <Button label="Start" onClick={onTry} primary color="brand" Í disabled={isTrying} />
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
