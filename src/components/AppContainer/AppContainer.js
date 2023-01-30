import 'react-toastify/dist/ReactToastify.css';

import { Grommet, grommet, Page } from 'grommet';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { useNavigateListner } from '../../hooks/useNavigateListener';
import Router from '../../router';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: '#e8751a',
      background: {
        dark: '#15202B',
        light: '#ffffff',
      },
    },
  },
  anchor: {
    color: {
      dark: 'brand',
      light: 'brand',
    },
  },
});

function App({ themeMode }) {
  useNavigateListner();

  return (
    <Grommet theme={theme} full themeMode={themeMode}>
      <Page>
        <Router />

        <ToastContainer />
      </Page>
    </Grommet>
  );
}

export default App;
