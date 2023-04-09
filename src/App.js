import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import logo from './assets/logo.png';
import Pitch from './components/Pitch';
import Router from './router';
import apps from './shared/js/apps';
import ContentWrapper from './shared/react-pure/ContentWrapper';
import createTheme from './shared/react-pure/createTheme';
import Divider from './shared/react-pure/Divider';
import Spacer from './shared/react-pure/Spacer';
import AppContainer from './shared/react/AppContainer';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import store from './store';
import { deleteAccount } from './store/watcher/watcherNetwork';

initShared({ logo, app: apps.watcher37.name, onDeleteAccount: deleteAccount });

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme('#e8751a');

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />

        <ContentWrapper as="footer">
          <Spacer />
          <Divider />
          <Spacer />
          <Pitch showHome />
        </ContentWrapper>
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
