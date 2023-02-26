import { Box, Button, RadioButton, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../shared/react/AppBar';
import WatcherSelectors from '../../components/WatcherSelectors';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import InputField from '../../shared/react/InputField';
import Spacer from '../../shared/react/Spacer';

function getEmptySelector() {
  return { id: Date.now(), title: '', selector: '' };
}

function WatcherEdit({ id, watcher, isLoading, onFetch, onEdit, onClearContent }) {
  const [title, setTitle] = useState(watcher?.title || '');
  useListener(watcher?.title, value => setTitle(value || ''));
  const [link, setLink] = useState(watcher?.link || '');
  useListener(watcher?.link, value => setLink(value || ''));
  const [selectors, setSelectors] = useState([getEmptySelector()]);
  useListener(watcher?.selectors, value => {
    if (value?.length) {
      setSelectors(value);
    } else {
      setSelectors([getEmptySelector()]);
    }
  });
  const [allowDuplication, setAllowDuplication] = useState(!watcher?.noDuplication);
  useListener(watcher?.noDuplication, value => setAllowDuplication(!value));

  useEffectOnce(() => {
    onFetch(id);

    return onClearContent;
  });

  return (
    <>
      <AppBar title="Edit watcher" hasBack />
      <ContentWrapper>
        <InputField label="Title" value={title} onChange={setTitle} disabled={isLoading} />
        <Spacer />
        <InputField label="Link" value={link} onChange={setLink} disabled={isLoading} />

        <Spacer size="2rem" />
        <Divider />
        <Spacer size="2rem" />

        <WatcherSelectors link={link} selectors={selectors} onChange={setSelectors} />

        <Spacer size="2rem" />
        <Divider />
        <Spacer size="2rem" />

        <Text>Allow duplication for the content?</Text>
        <HorizontalCenter>
          <RadioButton
            name="dark"
            checked={allowDuplication}
            label="Yes"
            onChange={() => setAllowDuplication(true)}
            disabled={isLoading}
          />
          <Box width="1rem" />
          <RadioButton
            name="light"
            checked={!allowDuplication}
            label="No"
            onChange={() => setAllowDuplication(false)}
            disabled={isLoading}
          />
        </HorizontalCenter>

        <Spacer size="2rem" />
        <Divider />
        <Spacer size="2rem" />

        <Button
          label="Update"
          onClick={() =>
            onEdit(id, {
              title,
              selectors: selectors.filter(s => s.selector),
              link,
              noDuplication: !allowDuplication,
            })
          }
          disabled={!title || !selectors.filter(s => s.selector).length || isLoading}
          primary
        />
      </ContentWrapper>
    </>
  );
}

export default WatcherEdit;
