import { Anchor, Box, Button, Heading } from 'grommet';
import { Add, Close } from 'grommet-icons';
import React, { useState } from 'react';

import AreaField from '../../shared/react/AreaField';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import InputField from '../../shared/react/InputField';
import Spacer from '../../shared/react/Spacer';
import { WatcherContents } from '../WatcherContents';

function WatcherSelectors({
  link,
  selectors,
  isLoading,
  content,
  contentLink,
  contentError,
  onChange,
  onFetchContent,
}) {
  const [activeSelector, setActiveSelector] = useState('');

  return (
    <>
      <Heading level="3" margin="0">
        Selectors
      </Heading>
      {selectors.map((item, index) => (
        <Box
          key={item.id || item.selector}
          direction="row"
          align="start"
          width="100%"
          margin="0 0 0.5rem"
        >
          <Box flex="grow">
            <AreaField
              label={`Selector ${index + 1}`}
              placeholder="CSS selector"
              value={item.selector}
              onChange={value =>
                onChange(
                  selectors.map(s =>
                    s.id === item.id ? { ...s, selector: value, selectorForBot: value } : s
                  )
                )
              }
              resize="vertical"
              disabled={isLoading}
            />
            {index === selectors.length - 1 && (
              <Box direction="row">
                <Anchor label="How to find selector?" href="/selector" target="_blank" />
              </Box>
            )}
            <Spacer size="0.25rem" />
            <InputField
              label="Give it a name (optional)"
              placeholder="Selector name"
              value={item.title}
              onChange={value =>
                onChange(selectors.map(s => (s.id === item.id ? { ...s, title: value } : s)))
              }
              disabled={isLoading}
            />

            <HorizontalCenter margin="0.5rem 0">
              <Button
                label="Get content"
                onClick={() => {
                  onFetchContent(link, item.selector);
                  setActiveSelector(item.selector);
                }}
                disabled={!link || !item.selector || isLoading}
                margin="0 1rem 0 0"
              />

              {index === selectors.length - 1 && (
                <Button
                  icon={<Add />}
                  label="Add another selector"
                  onClick={() =>
                    onChange([
                      ...selectors,
                      { id: Date.now(), title: '', selector: '', selectorForBot: '' },
                    ])
                  }
                  disabled={!link || !item.selector || isLoading}
                />
              )}
            </HorizontalCenter>

            {activeSelector === item.selector && (!!content || !!contentError) && (
              <WatcherContents
                contents={content ? [{ selector: item.selector, content, contentLink }] : null}
                contentError={contentError}
              />
            )}
          </Box>

          <Button
            icon={<Close />}
            onClick={() => onChange(selectors.filter(s => s.id !== item.id))}
            margin="1rem 0 0"
          />
        </Box>
      ))}
    </>
  );
}

export default WatcherSelectors;
