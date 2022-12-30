import { format } from 'date-fns';
import { Button, Header, PageContent, PageHeader, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';

function Home({ account, isLoadingAccount, onEnter, onLogOut, onDelete }) {
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
