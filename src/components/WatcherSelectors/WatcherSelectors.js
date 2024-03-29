import { Anchor, Box, Button, Heading, RadioButton, Text } from 'grommet';
import { Add, Close } from 'grommet-icons';
import React, { useCallback, useState } from 'react';
import AreaField from '../../shared/react-pure/AreaField';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
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

  const handleSelectorChange = useCallback(
    (index, value) => {
      const newSelectors = [...selectors];
      newSelectors[index].selector = value;
      newSelectors[index].selectorForBot = value;
      onChange(newSelectors);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectors]
  );

  const handleTitleChange = useCallback(
    (index, value) => {
      const newSelectors = [...selectors];
      newSelectors[index].title = value;
      onChange(newSelectors);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectors]
  );

  return (
    <>
      <Heading level="3" margin="0">
        Selectors
      </Heading>
      {selectors.map((item, index) => (
        <Box key={item.id} direction="row" align="start" width="100%" margin="0 0 1rem">
          <Box flex="grow">
            <AreaField
              label={`Selector ${index + 1}`}
              placeholder="CSS selector"
              value={item.selector}
              onChange={value => {
                handleSelectorChange(index, value);
              }}
              resize="vertical"
              disabled={isLoading}
            />
            {index === selectors.length - 1 && (
              <Box direction="row">
                <Anchor
                  label="How to find selector?"
                  href="https://encrypt37.com/watcher37/selectors/"
                  target="_blank"
                />
              </Box>
            )}
            <Spacer size="0.25rem" />
            <InputField
              label="Give it a name (optional)"
              placeholder="Selector name"
              value={item.title}
              onChange={value => {
                handleTitleChange(index, value);
              }}
              disabled={isLoading}
            />

            <Spacer size="0.25rem" />
            <Text>Get notified when this selector has new content?</Text>
            <HorizontalCenter>
              <RadioButton
                name="dark"
                checked={!item.ignoreNotify}
                label="Yes"
                onChange={() => {
                  const newSelectors = [...selectors];
                  newSelectors[index].ignoreNotify = false;
                  onChange(newSelectors);
                }}
                disabled={isLoading}
              />
              <Box width="1rem" />
              <RadioButton
                name="light"
                checked={!!item.ignoreNotify}
                label="No"
                onChange={() => {
                  const newSelectors = [...selectors];
                  newSelectors[index].ignoreNotify = true;
                  onChange(newSelectors);
                }}
                disabled={isLoading}
              />
            </HorizontalCenter>

            <HorizontalCenter margin="0.75rem 0">
              <Button
                label="Get content"
                onClick={() => {
                  const selector = item.selector;
                  if (selector) {
                    onFetchContent(link, selector);
                    setActiveSelector(selector);
                  }
                }}
                color="brand"
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
                  color="brand"
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
