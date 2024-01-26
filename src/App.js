import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import Router from './router';
import { apps } from './shared/js/apps';
import createTheme from './shared/react-pure/createTheme';
import AppContainer from './shared/react/AppContainer';
import Toast from './shared/react/Toast';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import store from './store';

initShared({
  logo: 'https://static.peng37.com/faviconapi/52190fe8-4549-4a16-b25b-3b42954128bc/a6513021c134ddaedcafbef5596381019f1756fed4a499d2f1f4d3553d073e62/icon-192.png',
  app: apps.Watcher37.name,
  encryptionUrl: 'https://encrypt37.com/watcher37/encryption/',
  privacyUrl: 'https://encrypt37.com/watcher37/privacy/',
  termsUrl: 'https://encrypt37.com/watcher37/terms/',
});

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme(apps.Watcher37.color);

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />

        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
