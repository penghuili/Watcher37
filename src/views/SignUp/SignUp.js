import { Button, Header, PageContent, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { Link } from 'wouter';

function SignUp({ errorMessage, isLoading, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Header pad={{ left: 'medium', right: 'small', vertical: 'small' }}>
        <Text size="large">SignUp</Text>
      </Header>
      <PageContent>
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
      </PageContent>
    </>
  );
}

export default SignUp;
