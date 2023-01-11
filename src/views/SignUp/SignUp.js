import { Button, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { Link } from 'wouter';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

function SignUp({ errorMessage, isLoading, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <AppBar title="Sign up" />
      <ContentWrapper>
        <PageHeader title="Welcome to SignUp!" />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        {!!errorMessage && <Text color="error">{errorMessage}</Text>}

        <Button
          label={isLoading ? 'Loading...' : 'Sign up'}
          onClick={() => onSignUp(username, password)}
          disabled={!username || !password || isLoading}
          primary
          margin="8px 0"
        />

        <Link to="/sign-in">Already have account? Sign in</Link>
      </ContentWrapper>
    </>
  );
}

export default SignUp;
