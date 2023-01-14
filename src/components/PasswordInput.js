import { Box, TextInput } from 'grommet';
import { FormView, FormViewHide } from 'grommet-icons';
import React, { useState } from 'react';

function PasswordInput({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <Box direction="row" align="center" width="100%">
      <TextInput
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <Box width="0.5rem" />
      {show ? (
        <FormView
          onClick={() => {
            setShow(false);
          }}
          size="large"
        />
      ) : (
        <FormViewHide
          onClick={() => {
            setShow(true);
          }}
          size="large"
        />
      )}
    </Box>
  );
}

export default PasswordInput;
