import { Button, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Spacer from '../../components/Spacer';

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
        <Spacer />
        <TextInput
          placeholder="Link"
          value={link}
          onChange={event => setLink(event.target.value)}
        />
        <Spacer />
        <TextInput
          placeholder="Selector"
          value={selector}
          onChange={event => setSelector(event.target.value)}
        />
        <Button
          label="Get content"
          onClick={() => onFetchContent(link, selector)}
          disabled={!link || !selector || isLoading}
          margin="1rem 0"
        />

        {!!pageContent && (
          <>
            <Text margin="0 0 2rem">{pageContent}</Text>

            {!!title && <Text>Happy with the selector?</Text>}
            <Button
              label="Create watcher"
              onClick={() => onCreate({ title, link, selector })}
              disabled={!title || !link || !selector || isLoading}
              margin="0.5rem 0 0"
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherAdd;
