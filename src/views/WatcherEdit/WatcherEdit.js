import { Anchor, Button, Text, TextArea, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import HorizontalCenter from '../../components/HorizontalCenter';
import Spacer from '../../components/Spacer';
import WatcherContent from '../../components/WatcherContent';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';

function WatcherEdit({
  id,
  watcher,
  content,
  contentLink,
  contentError,
  isLoading,
  onFetch,
  onEdit,
  onFetchContent,
  onClearContent,
}) {
  const [title, setTitle] = useState(watcher?.title || '');
  useListener(watcher?.title, value => setTitle(value || ''));
  const [link, setLink] = useState(watcher?.link || '');
  useListener(watcher?.link, value => setLink(value || ''));
  const [selector, setSelector] = useState(watcher?.selector || '');
  useListener(watcher?.selector, value => setSelector(value || ''));

  useEffectOnce(() => {
    onFetch(id);
  });
  useEffect(() => {
    return () => {
      onClearContent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Edit watcher" hasBack />
      <ContentWrapper>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={isLoading}
        />
        <Spacer />
        <TextInput
          placeholder="Link"
          value={link}
          onChange={event => setLink(event.target.value)}
          disabled={isLoading}
        />
        <Spacer />
        <TextArea
          placeholder="Selector"
          value={selector}
          onChange={event => setSelector(event.target.value)}
          resize="vertical"
          disabled={isLoading}
        />
        <Anchor label="How to find selector?" href="/selector" target="_blank" />

        <HorizontalCenter margin="1rem 0">
          <Button
            label="Get content"
            onClick={() => onFetchContent(link, selector)}
            disabled={!link || !selector || isLoading}
            margin=" 0 1rem 0 0"
          />
          <Button
            label="Update watcher"
            onClick={() => onEdit(id, { title, selector, link })}
            disabled={!title || isLoading}
          />
        </HorizontalCenter>

        {!!content && <WatcherContent content={content} contentLink={contentLink} />}

        {!!contentError && (
          <>
            <Text color="status-warning">{contentError}</Text>
            <Text>
              Please also check the{' '}
              <Anchor label="limitations" href="/limitations" target="_blank" /> of PageWatcher.
            </Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherEdit;
