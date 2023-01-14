import { Button, Spinner } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import PasswordInput from '../../components/PasswordInput';
import Spacer from '../../components/Spacer';

function ChangePassword({ isLoading, onChange }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <>
      <AppBar title="Change password" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}
        <PasswordInput
          placeholder="Current password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
        <Spacer />
        <PasswordInput
          placeholder="New password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <Button
          label="Change"
          onClick={() => onChange(currentPassword, newPassword)}
          disabled={!currentPassword || !newPassword || isLoading}
          margin="1rem 0"
        />
      </ContentWrapper>
    </>
  );
}

export default ChangePassword;