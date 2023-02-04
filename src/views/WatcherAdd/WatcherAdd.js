import { Anchor, Button, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import AreaField from '../../components/AreaField';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import WatcherContent from '../../components/WatcherContent';

function WatcherAdd({ content, contentLink, isLoading, onFetchContent, onCreate }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [selector, setSelector] = useState('');

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
        <Anchor label="How to find the selector of a content?" href="/selector" target="_blank" />
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

            <Text>Happy with the selector?</Text>
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
      </ContentWrapper>
    </>
  );
}

export default WatcherAdd;
