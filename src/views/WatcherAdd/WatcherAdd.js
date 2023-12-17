import { Button, Heading } from 'grommet';
import React, { useState } from 'react';
import WatcherSelectors from '../../components/WatcherSelectors';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function WatcherAdd({ content, isLoading, onClearContent, onCreate }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [selectors, setSelectors] = useState([{ id: Date.now(), title: '', selector: '' }]);

  useEffectOnce(() => {
    return onClearContent;
  });

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

        <Spacer size="2rem" />
        <Divider />
        <Spacer size="2rem" />

        <WatcherSelectors link={link} selectors={selectors} onChange={setSelectors} />

        {!!content && (
          <>
            <Spacer size="2rem" />
            <Divider />
            <Spacer size="2rem" />

            <Heading level="3" margin="0">
              Happy with the selectors?
            </Heading>
            <Spacer />
            <InputField
              label="Then give this watcher a name:"
              placeholder="Name"
              value={title}
              onChange={setTitle}
            />
            <Spacer />
            <Button
              label="Create"
              onClick={() => onCreate({ title, link, selectors })}
              primary
              color="brand"
              disabled={!title || !link || !selectors.filter(s => s.selector).length || isLoading}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherAdd;
