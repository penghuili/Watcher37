import { Button, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Spacer from '../../components/Spacer';

function WatcherEdit({ id, watcher, pageContent, isLoading, onEdit, onFetchContent }) {
  const [title, setTitle] = useState(watcher?.title || '');
  const [link, setLink] = useState(watcher?.link || '');
  const [selector, setSelector] = useState(watcher?.selector || '');

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

        {!!pageContent && <Text margin="1rem 0">{pageContent}</Text>}

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
