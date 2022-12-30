import { Button, Header, PageContent, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { Link } from 'wouter';

function SignIn({ errorMessage, isLoading, onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">Sign in</Text>
      </Header>
      <PageContent>
        <PageHeader title="Welcome to sign in!" />
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
          label={isLoading ? 'Loading...' : 'Sign in'}
          onClick={() => onSignIn(username, password)}
          disabled={!username || !password || isLoading}
          primary
          margin="8px 0"
        />

        <Link to="/sign-up">No account? Sign up</Link>
      </PageContent>
    </>
  );
}

export default SignIn;
