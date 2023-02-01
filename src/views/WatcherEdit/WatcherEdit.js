import { Button, Text, TextArea, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';

function WatcherEdit({ id, watcher, pageContent, isLoading, onFetch, onEdit, onFetchContent }) {
  const [title, setTitle] = useState(watcher?.title || '');
  useListener(watcher?.title, value => setTitle(value || ''));
  const [link, setLink] = useState(watcher?.link || '');
  useListener(watcher?.link, value => setLink(value || ''));
  const [selector, setSelector] = useState(watcher?.selector || '');
  useListener(watcher?.selector, value => setSelector(value || ''));

  useEffectOnce(() => {
    onFetch(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      <AppBar title="Edit watcher" hasBack />
      <ContentWrapper>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <Spacer />
        <TextInput
          placeholder="Link"
          value={link}
          onChange={event => setLink(event.target.value)}
        />
        <Spacer />
        <TextArea
          placeholder="Selector"
          value={selector}
          onChange={event => setSelector(event.target.value)}
          resize="vertical"
        />

        <Button
          label="Get content"
          onClick={() => onFetchContent(link, selector)}
          disabled={!link || !selector || isLoading}
          margin="1rem 0"
        />

        {!!pageContent && <Text margin="0 0 1rem">{pageContent}</Text>}

        <Button
          label="Update watcher"
          onClick={() => onEdit(id, { title, selector, link })}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default WatcherEdit;
