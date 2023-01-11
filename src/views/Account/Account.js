import { format } from 'date-fns';
import { Button, PageHeader, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function Home({
  account,
  isLoadingAccount,
  pageContent,
  onEnter,
  onLogOut,
  onDelete,
}) {

  useEffect(() => {
    onEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderContent() {
    if (isLoadingAccount) {
      return <Spinner />;
    }

    if (account?.userId) {
      return (
        <>
          <PageHeader title={`Hi ${account.username}`} />
          <Text>Created at {format(account.createdAt, 'Pp')}</Text>
          {!!account.telegramId && <Text>Telegram id: {account.telegramId}</Text>}

          <Button label="Log out" onClick={onLogOut} margin="2rem 0 0" />
          <Button label="Delete account" onClick={onDelete} margin="1rem 0 0" />

          {!!pageContent && <Text>{pageContent}</Text>}
        </>
      );
    }

    return null;
  }

  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>{renderContent()}</ContentWrapper>
    </>
  );
}

export default Home;
