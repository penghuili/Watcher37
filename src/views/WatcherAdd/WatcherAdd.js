import { Button, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function WatcherAdd({ pageContent, isLoading, onFetchContent, onCreate }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [selector, setSelector] = useState('');

  return (
    <>
      <AppBar title="Add watcher" hasBack />
      <ContentWrapper>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <TextInput
          placeholder="Link"
          value={link}
          onChange={event => setLink(event.target.value)}
        />
        <TextInput
          placeholder="Selector"
          value={selector}
          onChange={event => setSelector(event.target.value)}
        />
        <Button
          label="Get content"
          onClick={() => onFetchContent(link, selector)}
          disabled={!link || !selector || isLoading}
        />

        {!!pageContent && <Text>{pageContent}</Text>}

        <Button
          label="Create watcher"
          onClick={() => onCreate({ title, link, selector })}
          disabled={!title || !link || !selector || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default WatcherAdd;
