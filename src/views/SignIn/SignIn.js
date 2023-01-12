import { Button, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Spacer from '../../components/Spacer';

function SignIn({ errorMessage, isLoading, onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <AppBar title="Sign in" />
      <ContentWrapper>
        <PageHeader title="Welcome to sign in!" />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Spacer />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        {!!errorMessage && <Text color="error">{errorMessage}</Text>}

        <Button
          label={isLoading ? 'Loading...' : 'Sign in'}
          onClick={() => onSignIn(username, password)}
          disabled={!username || !password || isLoading}
          primary
          margin="1rem 0"
        />

        <Link to="/sign-up">No account? Sign up</Link>
      </ContentWrapper>
    </>
  );
}

export default SignIn;
