import { Anchor } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import Confirm from '../../components/Confirm';
import ContentWrapper from '../../components/ContentWrapper';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';

function Security({ onLogOut, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <AppBar title="Security" hasBack />
      <ContentWrapper>
        <RouteLink label="Change password" to="/security/password" />
        <Spacer />
        <Anchor label="Log out" onClick={onLogOut} />
        <Spacer />
        <Anchor
          label="Delete account"
          onClick={() => setShowConfirm(true)}
          color="status-critical"
        />

        <Confirm
          message="Your account and all watchers and their history will be deleted. Are you sure?"
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={onDelete}
        />
      </ContentWrapper>
    </>
  );
}

export default Security;
