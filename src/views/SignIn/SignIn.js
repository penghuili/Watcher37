import { Button, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import PasswordInput from '../../components/PasswordInput';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';

function SignIn({ errorMessage, isLoading, onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <AppBar title="Page Watcher" />
      <ContentWrapper>
        <PageHeader title="Sign in" />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Spacer />
        <PasswordInput placeholder="Password" value={password} onChange={setPassword} />
        {!!errorMessage && <Text color="error">{errorMessage}</Text>}

        <Button
          label={isLoading ? 'Loading...' : 'Sign in'}
          onClick={() => onSignIn(username, password)}
          disabled={!username || !password || isLoading}
          primary
          margin="1rem 0"
        />

        <RouteLink to="/sign-up" label="No account? Sign up" />
      </ContentWrapper>
    </>
  );
}

export default SignIn;
