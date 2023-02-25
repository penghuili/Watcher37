import { Button, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import apps from '../../shared/js/apps';
import CannotResetPassword from '../../shared/react/CannotResetPassword';
import ContentWrapper from '../../shared/react/ContentWrapper';
import OneAccountFor from '../../shared/react/OneAccountFor';
import PasswordInput from '../../shared/react/PasswordInput';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';

function SignIn({ errorMessage, isLoading, onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = !username || !password || isLoading;

  function handleSubmit() {
    if (isDisabled) {
      return;
    }

    onSignIn(username, password);
  }
  return (
    <>
      <AppBar title="Watcher37 sign in" hasBack />
      <ContentWrapper>
        <OneAccountFor app={apps.watcher37.name} />

        <PageHeader title="Sign in" />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Spacer />
        <PasswordInput placeholder="Password" value={password} onChange={setPassword} />
        {!!errorMessage && <Text color="status-error">{errorMessage}</Text>}

        <Button
          label={isLoading ? 'Loading...' : 'Sign in'}
          onClick={handleSubmit}
          disabled={isDisabled}
          primary
          margin="1rem 0"
        />

        <RouteLink to="/sign-up" label="No account? Sign up" />
        <Spacer />
        <CannotResetPassword app={apps.watcher37.name} />
      </ContentWrapper>
    </>
  );
}

export default SignIn;
