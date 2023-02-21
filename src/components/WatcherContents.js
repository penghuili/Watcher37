import { Anchor, Box, Text } from 'grommet';
import React from 'react';

export function WatcherContentsInner({ contents }) {
  if (contents?.length) {
    return contents.map((item, index) => (
      <Box key={item.selector || item.content} margin={index !== contents.length - 1 ? '0 0 0.25rem' : '0'}>
        {!!item.selectorTitle && (
          <Text size="xsmall" wordBreak="break-word">
            {item.selectorTitle}
          </Text>
        )}
        {item.contentLink ? (
          <Anchor label={item.content} href={item.contentLink} target="_blank" />
        ) : (
          <Text>{item.content}</Text>
        )}
      </Box>
    ));
  }

  return null;
}

export function WatcherContents({ contents, contentError }) {
  if (contents?.length) {
    return (
      <>
        <Box pad="1rem" border={{ size: 'medium', style: 'ridge' }}>
          <WatcherContentsInner contents={contents} />
        </Box>
      </>
    );
  }

  if (contentError) {
    return (
      <>
        <Text color="status-warning">{contentError}</Text>
        <Text>
          Please also check the <Anchor label="limitations" href="/limitations" target="_blank" />{' '}
          of Watcher37.
        </Text>
      </>
    );
  }

  return null;
}
