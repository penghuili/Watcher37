import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import Pitch from './components/Pitch';
import Router from './router';
import { apps } from './shared/js/apps';
import ContentWrapper from './shared/react-pure/ContentWrapper';
import Divider from './shared/react-pure/Divider';
import Spacer from './shared/react-pure/Spacer';
import createTheme from './shared/react-pure/createTheme';
import AppContainer from './shared/react/AppContainer';
import Toast from './shared/react/Toast';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import store from './store';

initShared({
  logo: `${process.env.REACT_APP_ASSETS_FOR_CODE}/watcher37-logo-231017.png`,
  app: apps.watcher37.name,
  privacyUrl: 'https://encrypt37.com/watcher37/privacy/',
  termsUrl: 'https://encrypt37.com/watcher37/terms/',
});

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
