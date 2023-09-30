import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

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
import Toast from './shared/react/Toast';
import store from './store';

initShared({ logo: `${process.env.REACT_APP_ASSETS_FOR_CODE}/logo.png`, app: apps.watcher37.name, showTerms: true });

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

        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
