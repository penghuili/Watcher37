import { Button, Header, PageContent, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

function WatcherAdd({ pageContent, isLoading, onFetchContent, onCreate }) {
  const [link, setLink] = useState('');
  const [selector, setSelector] = useState('');

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Add watcher</Text>
      </Header>
      <PageContent>
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
          onClick={() => onCreate({ link, selector })}
          disabled={!link || !selector || isLoading}
        />
      </PageContent>
    </>
  );
}

export default WatcherAdd;
