import { Box } from 'grommet';
import { FormView, FormViewHide, Insecure, Secure } from 'grommet-icons';
import React, { useState } from 'react';

import Modal from '../shared/react/Modal';

function WatcherAccess({ watcher }) {
  const [modalMessage, setModalMessage] = useState('');

  return (
    <>
      {watcher.encrypted ? (
        <Secure
          onClick={() => setModalMessage('This watcher is end-to-end encrytped.')}
          size="20px"
        />
      ) : (
        <Insecure onClick={() => setModalMessage('This watcher is not encrypted.')} size="20px" />
      )}
      <Box width="0.25rem" />

      {watcher.isPublic ? (
        <FormView onClick={() => setModalMessage('This watcher is public.')} size="24px" />
      ) : (
        <FormViewHide onClick={() => setModalMessage('This watcher is private.')} size="24px" />
      )}

      <Modal show={!!modalMessage} onClose={() => setModalMessage('')}>
        {modalMessage}
      </Modal>
    </>
  );
}

export default WatcherAccess;
