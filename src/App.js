import 'react-toastify/dist/ReactToastify.css';

import { Grommet, grommet, Page } from 'grommet';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useNavigateListner } from './hooks/useNavigateListener';
import Router from './router';
import store from './store';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: '#e8751a',
    },
  },
});

function App() {
  useNavigateListner();

  return (
    <StoreProvider store={store}>
      <Grommet theme={theme} full themeMode="dark">
        <Page>
          <Router />

          <ToastContainer />
        </Page>
      </Grommet>
    </StoreProvider>
  );
}

export default App;
