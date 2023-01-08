import { format } from 'date-fns';
import { TextInput, Button, Header, PageContent, PageHeader, Spinner, Text } from 'grommet';
import React, { useEffect, useState } from 'react';

function Home({
  account,
  isLoadingAccount,
  pageContent,
  onEnter,
  onLogOut,
  onDelete,
  onFetchContent,
}) {
  const [link, setLink] = useState('');
  const [selector, setSelector] = useState('');

  useEffect(() => {
    onEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderContent() {
    if (isLoadingAccount) {
      return <Spinner size="large" />;
    }

    if (account?.userId) {
      return (
        <>
          <PageHeader title={`Hi ${account.username}`} />
          <Text>Your account is created at {format(account.createdAt, 'Pp')}</Text>
          <Button label="Log out" onClick={onLogOut} />
          <Button label="Delete account" onClick={onDelete} margin="8px 0 0" />

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
            disabled={!link || !selector}
          />

          {!!pageContent && <Text>{pageContent}</Text>}
        </>
      );
    }

    return null;
  }

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Home</Text>
      </Header>
      <PageContent>{renderContent()}</PageContent>
    </>
  );
}

export default Home;
