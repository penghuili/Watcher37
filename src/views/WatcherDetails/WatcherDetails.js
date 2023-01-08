import { Anchor, Box, Header, PageContent, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
function WatcherDetails({ params: { id }, watcher, isLoading, onEnter }) {
  useEffect(() => {
    onEnter(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Watcher details</Text>
      </Header>
      <PageContent>
        {isLoading && <Spinner />}
        {!!watcher && (
          <Box>
            <Text>
              Link: <Anchor href={watcher.link} label={watcher.link} target="_blank" />
            </Text>
            <Text>Selector: {watcher.selector}</Text>
            <Text>Latest content: {watcher.content}</Text>
            <Text margin="0 0 24px">Update date: {format(watcher.updatedAt, 'Pp')}</Text>

            {(watcher.history || []).map(item => (
              <Box key={item.sortKey}>
                <Text>{watcher.content}</Text>

                <Text>Update date: {format(item.createdAt, 'Pp')}</Text>
              </Box>
            ))}
          </Box>
        )}
      </PageContent>
    </>
  );
}

export default WatcherDetails;
