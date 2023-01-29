import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Text,
} from 'grommet';
import { Link, Refresh } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
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

        {watchers.map(watcher => (
          <Card
            key={watcher.sortKey}
            width="large"
            margin="0 0 2rem"
          >
            <CardHeader pad="1rem">
              <HorizontalCenter>
                <RouteLink to={`/w/${watcher.sid}`} label={watcher.title} />
                {watcher.isNew && (
                  <Text color="status-critical" size="small" margin="0 0 0 1rem">
                    NEW
                  </Text>
                )}
              </HorizontalCenter>
            </CardHeader>
            <CardBody pad="0 1rem 1rem">
              {!!watcher.gotValueAt && (
                <Text size="xsmall">{formatDateTime(watcher.gotValueAt)}</Text>
              )}
              {watcher.contentLink ? (
                <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
              ) : (
                <Text>{watcher.content}</Text>
              )}
            </CardBody>
            <CardFooter pad="0 1rem" justify="start">
              <Button icon={<Link />} href={watcher.link} target="_blank" hoverIndicator />
              {isChecking && checkId === watcher.sortKey ? (
                <Spinner size="xsmall" />
              ) : (
                <Button
                  icon={<Refresh />}
                  onClick={() => {
                    setCheckId(watcher.sortKey);
                    onCheckWatcher(watcher.sortKey);
                  }}
                  hoverIndicator
                />
              )}
            </CardFooter>
          </Card>
        ))}

        {!watchers?.length && !isLoading && <Text>No watchers.</Text>}
      </ContentWrapper>
    </>
  );
}

export default Watchers;
