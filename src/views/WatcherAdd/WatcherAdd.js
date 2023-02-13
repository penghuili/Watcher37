import { Anchor, Button, Heading, Text } from 'grommet';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import AreaField from '../../components/AreaField';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import WatcherContent from '../../components/WatcherContent';

function WatcherAdd({
  content,
  contentLink,
  contentError,
  isLoading,
  onFetchContent,
  onClearContent,
  onCreate,
}) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [selector, setSelector] = useState('');

  useEffect(() => {
    return () => {
      onClearContent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Add watcher" hasBack />
      <ContentWrapper>
        <InputField
          label="Which page do you want to watch?"
          placeholder="Link"
          value={link}
          onChange={setLink}
        />
        <Spacer />
        <AreaField
          label="Selector of the content:"
          placeholder="Selector"
          value={selector}
          onChange={setSelector}
        />
        <Anchor label="How to find selector?" href="/selector" target="_blank" />
        <Spacer />
        <Button
          label="Get content"
          onClick={() => onFetchContent(link, selector)}
          disabled={!link || !selector || isLoading}
        />
        {!!content && (
          <>
            <Spacer />
            <WatcherContent content={content} contentLink={contentLink} />
            <Spacer size="2rem" />

            <Heading level="3" margin="0">
              Happy with the selector?
            </Heading>
            <Spacer />
            <InputField
              label="Then give this watcher a name:"
              placeholder="Name"
              value={title}
              onChange={setTitle}
            />
            <Spacer />
            <Button
              label="Create watcher"
              onClick={() => onCreate({ title, link, selector })}
              disabled={!title || !link || !selector || isLoading}
            />
          </>
        )}
        {!!contentError && (
          <>
            <Text color="status-warning" margin="1rem 0 0">
              {contentError}
            </Text>
            <Text>
              Please also check the{' '}
              <Anchor label="limitations" href="/limitations" target="_blank" /> of Watcher37.
            </Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherAdd;
