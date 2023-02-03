import { Anchor, Box, Text } from 'grommet';
import React from 'react';

function WatcherContent({ content, contentLink }) {
  if (!content) {
    return null;
  }

  return (
    <Box pad="1rem" border={{ size: 'medium', style: 'ridge' }}>
      {contentLink ? (
        <Anchor label={content} href={contentLink} target="_blank" />
      ) : (
        <Text>{content}</Text>
      )}
    </Box>
  );
}

export default WatcherContent;
